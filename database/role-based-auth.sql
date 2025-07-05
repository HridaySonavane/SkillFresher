-- Role-based authentication schema
-- Add role field to user_profiles table

-- First, let's create an enum for user roles
CREATE TYPE user_role AS ENUM ('user', 'admin', 'moderator', 'premium_user');

-- Add role column to user_profiles table
ALTER TABLE user_profiles 
ADD COLUMN role user_role DEFAULT 'user' NOT NULL;

-- Add role-based permissions table
CREATE TABLE role_permissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    role user_role NOT NULL,
    permission TEXT NOT NULL,
    resource TEXT NOT NULL,
    action TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(role, permission, resource, action)
);

-- Insert default permissions for each role
INSERT INTO role_permissions (role, permission, resource, action) VALUES
-- User permissions (basic)
('user', 'read', 'resume', 'own'),
('user', 'create', 'resume', 'own'),
('user', 'update', 'resume', 'own'),
('user', 'delete', 'resume', 'own'),
('user', 'download', 'resume', 'own'),

-- Premium user permissions (enhanced)
('premium_user', 'read', 'resume', 'own'),
('premium_user', 'create', 'resume', 'own'),
('premium_user', 'update', 'resume', 'own'),
('premium_user', 'delete', 'resume', 'own'),
('premium_user', 'download', 'resume', 'own'),
('premium_user', 'access', 'premium_templates', 'all'),
('premium_user', 'access', 'ai_optimization', 'unlimited'),
('premium_user', 'access', 'advanced_analytics', 'own'),

-- Moderator permissions
('moderator', 'read', 'resume', 'all'),
('moderator', 'update', 'resume', 'all'),
('moderator', 'delete', 'resume', 'all'),
('moderator', 'moderate', 'content', 'all'),
('moderator', 'access', 'admin_panel', 'limited'),

-- Admin permissions (full access)
('admin', 'read', 'resume', 'all'),
('admin', 'create', 'resume', 'all'),
('admin', 'update', 'resume', 'all'),
('admin', 'delete', 'resume', 'all'),
('admin', 'access', 'admin_panel', 'full'),
('admin', 'manage', 'users', 'all'),
('admin', 'manage', 'subscriptions', 'all'),
('admin', 'manage', 'templates', 'all'),
('admin', 'view', 'analytics', 'all'),
('admin', 'manage', 'roles', 'all');

-- Create a function to check user permissions
CREATE OR REPLACE FUNCTION check_user_permission(
    user_uuid UUID,
    required_permission TEXT,
    resource_name TEXT,
    action_name TEXT
) RETURNS BOOLEAN AS $$
DECLARE
    user_role_val user_role;
    has_permission BOOLEAN;
BEGIN
    -- Get user's role
    SELECT role INTO user_role_val
    FROM user_profiles
    WHERE id = user_uuid;
    
    -- Check if user has the required permission
    SELECT EXISTS(
        SELECT 1 FROM role_permissions
        WHERE role = user_role_val
        AND permission = required_permission
        AND resource = resource_name
        AND action = action_name
    ) INTO has_permission;
    
    RETURN has_permission;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get user's role
CREATE OR REPLACE FUNCTION get_user_role(user_uuid UUID) RETURNS user_role AS $$
DECLARE
    user_role_val user_role;
BEGIN
    SELECT role INTO user_role_val
    FROM user_profiles
    WHERE id = user_uuid;
    
    RETURN user_role_val;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create indexes for better performance
CREATE INDEX idx_user_profiles_role ON user_profiles(role);
CREATE INDEX idx_role_permissions_role ON role_permissions(role);
CREATE INDEX idx_role_permissions_permission ON role_permissions(permission, resource, action);

-- Add some sample admin users (replace with actual admin emails)
-- INSERT INTO user_profiles (id, email, full_name, role) VALUES 
-- ('admin-uuid-1', 'admin@skillfresher.com', 'System Admin', 'admin'),
-- ('admin-uuid-2', 'moderator@skillfresher.com', 'Content Moderator', 'moderator');

-- Create a view for easy permission checking
CREATE VIEW user_permissions_view AS
SELECT 
    up.id as user_id,
    up.email,
    up.full_name,
    up.role,
    rp.permission,
    rp.resource,
    rp.action
FROM user_profiles up
JOIN role_permissions rp ON up.role = rp.role;

-- Grant necessary permissions
GRANT SELECT ON user_permissions_view TO authenticated;
GRANT EXECUTE ON FUNCTION check_user_permission(UUID, TEXT, TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_role(UUID) TO authenticated; 