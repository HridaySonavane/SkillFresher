# Role-Based Authentication Implementation

This document explains how to implement and use the role-based authentication system in your ResumeAI application.

## Overview

The role-based authentication system provides:
- **4 User Roles**: `user`, `premium_user`, `moderator`, `admin`
- **Permission-based Access Control**: Granular permissions for different resources and actions
- **Route Protection**: Middleware-based route protection
- **Admin Dashboard**: User management interface for administrators
- **Role-based Navigation**: Dynamic navigation based on user roles

## Database Schema

### 1. User Roles Enum
```sql
CREATE TYPE user_role AS ENUM ('user', 'admin', 'moderator', 'premium_user');
```

### 2. User Profiles Table
The `user_profiles` table now includes a `role` field:
```sql
ALTER TABLE user_profiles 
ADD COLUMN role user_role DEFAULT 'user' NOT NULL;
```

### 3. Role Permissions Table
```sql
CREATE TABLE role_permissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    role user_role NOT NULL,
    permission TEXT NOT NULL,
    resource TEXT NOT NULL,
    action TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(role, permission, resource, action)
);
```

### 4. Database Functions
- `check_user_permission(user_uuid, permission, resource, action)` - Checks if a user has a specific permission
- `get_user_role(user_uuid)` - Gets a user's role

## Setup Instructions

### 1. Run Database Migration
Execute the SQL commands in `database/role-based-auth.sql` in your Supabase database.

### 2. Update Environment Variables
Make sure your environment variables are properly configured for Supabase authentication.

### 3. Install Dependencies
The system uses existing dependencies from your project.

## Usage

### 1. User Registration with Role Selection

The signup form now includes a role selection dropdown:

```tsx
<div className="space-y-2">
  <Label htmlFor="role">Account Type</Label>
  <select
    id="role"
    value={formData.role}
    onChange={(e) => setFormData((prev) => ({
      ...prev,
      role: e.target.value as "user" | "admin" | "moderator" | "premium_user",
    }))}
    className="w-full px-3 py-2 border border-gray-300 rounded-md"
    required
  >
    <option value="user">Regular User</option>
    <option value="premium_user">Premium User</option>
    <option value="moderator">Moderator</option>
    <option value="admin">Administrator</option>
  </select>
</div>
```

### 2. Role-Based Service

Use the `RoleAuthService` for role and permission checking:

```tsx
import { RoleAuthService } from "@/lib/auth/role-auth";

// Check user role
const userRole = await RoleAuthService.getUserRole(userId);

// Check permissions
const hasPermission = await RoleAuthService.hasPermission(
  userId,
  "read",
  "resume",
  "own"
);

// Check if user is admin
const isAdmin = await RoleAuthService.isAdmin(userId);

// Check if user is premium
const isPremium = await RoleAuthService.isPremium(userId);
```

### 3. Route Protection

The middleware automatically protects routes based on roles:

```tsx
// In middleware.ts
const roleCheck = await RoleMiddleware.handleRequest(req);
if (roleCheck) {
  return roleCheck;
}
```

### 4. Component-Level Access Control

Use role checking in components:

```tsx
"use client";

import { useRoleAuth } from "@/lib/auth/role-auth";

export function MyComponent() {
  const { isAdmin, isPremium } = useRoleAuth();
  
  return (
    <div>
      {isAdmin && <AdminPanel />}
      {isPremium && <PremiumFeatures />}
      <RegularFeatures />
    </div>
  );
}
```

### 5. Server-Side Protection

Protect server components and API routes:

```tsx
// In a server component
import { RoleAuthService } from "@/lib/auth/role-auth";

export default async function AdminPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/signin");
  }

  const isAdmin = await RoleAuthService.isAdmin(user.id);
  if (!isAdmin) {
    redirect("/dashboard?error=insufficient_permissions");
  }

  return <AdminDashboard />;
}
```

## Role Hierarchy

### User Roles and Permissions

1. **User** (Default)
   - Create, read, update, delete own resumes
   - Basic template access
   - Limited downloads

2. **Premium User**
   - All user permissions
   - Access to premium templates
   - Unlimited AI optimizations
   - Advanced analytics
   - More downloads

3. **Moderator**
   - All premium user permissions
   - Content moderation capabilities
   - Access to limited admin panel
   - Can manage user content

4. **Admin**
   - All permissions
   - Full admin panel access
   - User management
   - System analytics
   - Role management

## Route Configuration

Routes are automatically protected based on configuration in `lib/auth/role-middleware.ts`:

```tsx
const routeConfigs: RouteConfig[] = [
  {
    path: "/admin",
    roles: ["admin"],
  },
  {
    path: "/premium/templates",
    roles: ["premium_user", "moderator", "admin"],
    permissions: [
      { permission: "access", resource: "premium_templates", action: "all" },
    ],
  },
];
```

## Admin Dashboard

The admin dashboard (`/admin`) provides:
- User statistics
- User management table
- Role assignment interface
- Real-time user data

Access: Only users with `admin` role

## Navigation

The `RoleBasedNavigation` component automatically shows/hides menu items based on user roles:

```tsx
const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <Activity className="h-4 w-4" />,
    roles: ["user", "premium_user", "moderator", "admin"],
  },
  {
    label: "Admin Dashboard",
    href: "/admin",
    icon: <Shield className="h-4 w-4" />,
    roles: ["admin"],
  },
];
```

## API Endpoints

### Role Management API

You can create API endpoints for role management:

```tsx
// app/api/admin/users/[id]/role/route.ts
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isAdmin = await RoleAuthService.isAdmin(user.id);
  if (!isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { role } = await request.json();
  const success = await RoleAuthService.updateUserRole(user.id, params.id, role);

  if (success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ error: "Failed to update role" }, { status: 500 });
  }
}
```

## Security Considerations

1. **Server-Side Validation**: Always validate permissions on the server side
2. **Role Escalation**: Only admins can change user roles
3. **Permission Inheritance**: Higher roles inherit permissions from lower roles
4. **Route Protection**: Use middleware for consistent route protection
5. **API Protection**: Protect all API endpoints with role checks

## Testing

### Test Different Roles

1. Create test users with different roles
2. Test route access for each role
3. Verify permission-based features
4. Test admin dashboard functionality

### Example Test Cases

```tsx
// Test admin access
const adminUser = await createTestUser("admin");
const canAccessAdmin = await RoleAuthService.isAdmin(adminUser.id);
expect(canAccessAdmin).toBe(true);

// Test permission checking
const hasPermission = await RoleAuthService.hasPermission(
  adminUser.id,
  "manage",
  "users",
  "all"
);
expect(hasPermission).toBe(true);
```

## Troubleshooting

### Common Issues

1. **Role not updating**: Check if the user exists in the database
2. **Permission denied**: Verify the user has the required role and permissions
3. **Route not protected**: Check the route configuration in `role-middleware.ts`
4. **Database errors**: Ensure all SQL migrations have been executed

### Debug Mode

Enable debug logging in the role service:

```tsx
// Add to role-auth.ts
const DEBUG = process.env.NODE_ENV === 'development';

if (DEBUG) {
  console.log('Checking permission:', { userId, permission, resource, action });
}
```

## Future Enhancements

1. **Dynamic Permissions**: Allow admins to create custom permissions
2. **Role Groups**: Support for role hierarchies and groups
3. **Audit Logging**: Track permission changes and access attempts
4. **Time-based Permissions**: Temporary role assignments
5. **Multi-tenant Support**: Role-based access for different organizations

## Support

For issues or questions about the role-based authentication system:
1. Check the database schema in `database/role-based-auth.sql`
2. Review the service implementation in `lib/auth/role-auth.ts`
3. Verify middleware configuration in `lib/auth/role-middleware.ts`
4. Test with the admin dashboard at `/admin` 