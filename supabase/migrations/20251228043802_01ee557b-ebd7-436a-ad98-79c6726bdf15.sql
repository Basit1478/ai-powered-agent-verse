-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create enum for agent status
CREATE TYPE public.agent_status AS ENUM ('draft', 'published', 'archived');

-- Create enum for order status
CREATE TYPE public.order_status AS ENUM ('pending', 'paid', 'failed', 'refunded');

-- Create enum for payment method
CREATE TYPE public.payment_method AS ENUM ('card', 'jazzcash', 'easypaisa', 'bank_transfer');

-- Create user_roles table (security-first approach)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create industries table
CREATE TABLE public.industries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create agent_categories table (roles like Assistant, Sales Agent, etc.)
CREATE TABLE public.agent_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create platforms table
CREATE TABLE public.platforms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    base_price DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create features table
CREATE TABLE public.features (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
    is_premium BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create complexity_levels table
CREATE TABLE public.complexity_levels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    multiplier DECIMAL(4,2) NOT NULL DEFAULT 1.0,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create marketplace_agents table (pre-built agents)
CREATE TABLE public.marketplace_agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    industry_id UUID REFERENCES public.industries(id),
    category_id UUID REFERENCES public.agent_categories(id),
    platform_id UUID REFERENCES public.platforms(id),
    complexity_id UUID REFERENCES public.complexity_levels(id),
    base_price DECIMAL(10,2) NOT NULL DEFAULT 0,
    features UUID[] DEFAULT '{}',
    capabilities TEXT[],
    use_cases TEXT[],
    system_prompt TEXT,
    preview_image TEXT,
    status agent_status DEFAULT 'published',
    is_featured BOOLEAN DEFAULT false,
    purchases_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create custom_agents table (user-built agents)
CREATE TABLE public.custom_agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    industry_id UUID REFERENCES public.industries(id),
    category_id UUID REFERENCES public.agent_categories(id),
    platform_id UUID REFERENCES public.platforms(id),
    complexity_id UUID REFERENCES public.complexity_levels(id),
    selected_features UUID[] DEFAULT '{}',
    calculated_price DECIMAL(10,2) NOT NULL DEFAULT 0,
    status agent_status DEFAULT 'draft',
    system_prompt TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    agent_id UUID,
    agent_type TEXT NOT NULL CHECK (agent_type IN ('marketplace', 'custom')),
    total_amount DECIMAL(10,2) NOT NULL,
    payment_method payment_method,
    status order_status DEFAULT 'pending',
    invoice_number TEXT UNIQUE,
    payment_reference TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user_agents table (purchased/provisioned agents)
CREATE TABLE public.user_agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    order_id UUID REFERENCES public.orders(id),
    agent_id UUID,
    agent_type TEXT NOT NULL CHECK (agent_type IN ('marketplace', 'custom')),
    name TEXT NOT NULL,
    configuration JSONB DEFAULT '{}',
    api_key TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create support_requests table
CREATE TABLE public.support_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    agent_id UUID,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
    priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    admin_response TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complexity_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for public lookup tables (everyone can read)
CREATE POLICY "Anyone can view industries" ON public.industries FOR SELECT USING (true);
CREATE POLICY "Anyone can view agent_categories" ON public.agent_categories FOR SELECT USING (true);
CREATE POLICY "Anyone can view platforms" ON public.platforms FOR SELECT USING (true);
CREATE POLICY "Anyone can view features" ON public.features FOR SELECT USING (true);
CREATE POLICY "Anyone can view complexity_levels" ON public.complexity_levels FOR SELECT USING (true);

-- Admin policies for lookup tables
CREATE POLICY "Admins can manage industries" ON public.industries FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage agent_categories" ON public.agent_categories FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage platforms" ON public.platforms FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage features" ON public.features FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage complexity_levels" ON public.complexity_levels FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for marketplace_agents
CREATE POLICY "Anyone can view published marketplace agents" ON public.marketplace_agents FOR SELECT USING (status = 'published');
CREATE POLICY "Admins can manage marketplace agents" ON public.marketplace_agents FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for custom_agents
CREATE POLICY "Users can view their own custom agents" ON public.custom_agents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own custom agents" ON public.custom_agents FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own custom agents" ON public.custom_agents FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own custom agents" ON public.custom_agents FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all custom agents" ON public.custom_agents FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for orders
CREATE POLICY "Users can view their own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all orders" ON public.orders FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update orders" ON public.orders FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_agents
CREATE POLICY "Users can view their own agents" ON public.user_agents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own agents" ON public.user_agents FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all user agents" ON public.user_agents FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for support_requests
CREATE POLICY "Users can view their own support requests" ON public.support_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create support requests" ON public.support_requests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can manage all support requests" ON public.support_requests FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Insert seed data for industries
INSERT INTO public.industries (name, description, icon) VALUES
('Education', 'AI agents for educational institutions and e-learning', 'GraduationCap'),
('Healthcare', 'AI agents for hospitals, clinics, and health services', 'Heart'),
('E-commerce', 'AI agents for online retail and shopping', 'ShoppingCart'),
('Real Estate', 'AI agents for property management and sales', 'Building'),
('Startups', 'AI agents for early-stage companies', 'Rocket'),
('Marketing', 'AI agents for digital marketing and campaigns', 'Megaphone'),
('HR', 'AI agents for human resources and recruitment', 'Users'),
('Customer Support', 'AI agents for customer service', 'Headphones'),
('Finance', 'AI agents for banking and financial services', 'DollarSign'),
('Legal', 'AI agents for law firms and legal services', 'Scale'),
('Logistics', 'AI agents for supply chain and delivery', 'Truck');

-- Insert seed data for agent categories
INSERT INTO public.agent_categories (name, description) VALUES
('Assistant', 'General-purpose virtual assistant'),
('Sales Agent', 'Lead generation and sales support'),
('Support Agent', 'Customer support and helpdesk'),
('Analyst', 'Data analysis and insights'),
('Coach', 'Training and mentorship'),
('Manager', 'Project and task management');

-- Insert seed data for platforms
INSERT INTO public.platforms (name, description, base_price) VALUES
('Website Chatbot', 'Embed on your website', 0),
('WhatsApp', 'WhatsApp Business integration', 50),
('Mobile App', 'iOS and Android SDK', 100),
('Internal Tool', 'Private internal deployment', 25),
('API', 'REST API access', 75),
('CRM Integration', 'Connect to your CRM', 150);

-- Insert seed data for features
INSERT INTO public.features (name, description, price, is_premium) VALUES
('Chat Support', 'Basic text-based chat', 0, false),
('Lead Generation', 'Capture and qualify leads', 50, false),
('Document Analysis', 'PDF, DOC, CSV processing', 75, true),
('CRM Integration', 'Sync with popular CRMs', 100, true),
('Voice Support', 'Voice input and output', 150, true),
('Multi-language', 'Support for 50+ languages', 100, true),
('Automation Workflows', 'Custom automation rules', 125, true),
('Analytics Dashboard', 'Usage and performance metrics', 75, false),
('Custom Integrations', 'Connect external tools', 200, true);

-- Insert seed data for complexity levels
INSERT INTO public.complexity_levels (name, multiplier, description) VALUES
('Basic', 1.0, 'Simple use cases, limited customization'),
('Pro', 1.5, 'Advanced features, moderate customization'),
('Enterprise', 2.5, 'Full customization, dedicated support');

-- Create trigger for updated_at
CREATE TRIGGER update_marketplace_agents_updated_at BEFORE UPDATE ON public.marketplace_agents FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_custom_agents_updated_at BEFORE UPDATE ON public.custom_agents FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_user_agents_updated_at BEFORE UPDATE ON public.user_agents FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_support_requests_updated_at BEFORE UPDATE ON public.support_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to generate invoice number
CREATE OR REPLACE FUNCTION public.generate_invoice_number()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.invoice_number := 'INV-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || SUBSTRING(NEW.id::TEXT, 1, 8);
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_invoice_number BEFORE INSERT ON public.orders FOR EACH ROW EXECUTE FUNCTION public.generate_invoice_number();

-- Function to provision agent after payment
CREATE OR REPLACE FUNCTION public.provision_agent_on_payment()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.status = 'paid' AND OLD.status = 'pending' THEN
    INSERT INTO public.user_agents (user_id, order_id, agent_id, agent_type, name, api_key)
    SELECT 
      NEW.user_id,
      NEW.id,
      NEW.agent_id,
      NEW.agent_type,
      CASE 
        WHEN NEW.agent_type = 'marketplace' THEN (SELECT name FROM public.marketplace_agents WHERE id = NEW.agent_id)
        ELSE (SELECT name FROM public.custom_agents WHERE id = NEW.agent_id)
      END,
      encode(gen_random_bytes(32), 'hex');
      
    -- Update purchase count for marketplace agents
    IF NEW.agent_type = 'marketplace' THEN
      UPDATE public.marketplace_agents SET purchases_count = purchases_count + 1 WHERE id = NEW.agent_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER provision_agent_trigger AFTER UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.provision_agent_on_payment();