-- Subscription plans (already in previous schema)
CREATE TABLE subscription_plans (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price_monthly_cents INTEGER NOT NULL,
    price_yearly_cents INTEGER,
    
    -- Feature limits
    max_resumes INTEGER, -- NULL for unlimited
    max_downloads_per_month INTEGER,
    ai_optimizations_per_month INTEGER,
    max_team_members INTEGER DEFAULT 1,
    
    -- Feature flags
    premium_templates BOOLEAN DEFAULT FALSE,
    custom_branding BOOLEAN DEFAULT FALSE,
    priority_support BOOLEAN DEFAULT FALSE,
    advanced_analytics BOOLEAN DEFAULT FALSE,
    api_access BOOLEAN DEFAULT FALSE,
    team_collaboration BOOLEAN DEFAULT FALSE,
    
    -- Metadata
    features JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Usage tracking for plan limits
CREATE TABLE user_usage (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Current period usage
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    
    -- Usage counters
    resumes_created INTEGER DEFAULT 0,
    downloads_used INTEGER DEFAULT 0,
    ai_optimizations_used INTEGER DEFAULT 0,
    
    -- Reset tracking
    last_reset_date DATE DEFAULT CURRENT_DATE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, period_start)
);

-- Subscription events for analytics
CREATE TABLE subscription_events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
    event_type TEXT NOT NULL, -- 'subscribed', 'upgraded', 'downgraded', 'canceled', 'renewed'
    
    -- Plan details
    from_plan_id TEXT REFERENCES subscription_plans(id),
    to_plan_id TEXT REFERENCES subscription_plans(id),
    
    -- Financial details
    amount_cents INTEGER,
    currency TEXT DEFAULT 'usd',
    
    -- Metadata
    reason TEXT, -- cancellation reason, upgrade trigger, etc.
    metadata JSONB DEFAULT '{}',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert subscription plans
INSERT INTO subscription_plans (id, name, description, price_monthly_cents, price_yearly_cents, max_resumes, max_downloads_per_month, ai_optimizations_per_month, premium_templates, custom_branding, priority_support, advanced_analytics, api_access, team_collaboration, sort_order) VALUES
('free', 'Free', 'Perfect for getting started with your first resume', 0, 0, 1, 5, 3, false, false, false, false, false, false, 1),
('professional', 'Professional', 'Ideal for active job seekers and career changers', 999, 9990, 5, 50, 25, true, false, false, false, false, false, 2),
('premium', 'Premium', 'Everything you need for a successful job search', 1999, 19990, NULL, NULL, NULL, true, false, true, true, false, false, 3),
('enterprise', 'Enterprise', 'Advanced features for teams and organizations', 4999, 49990, NULL, NULL, NULL, true, true, true, true, true, true, 4);
