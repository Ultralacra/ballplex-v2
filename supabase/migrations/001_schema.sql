-- ============================================
-- Ballplex - Database Schema
-- ============================================

-- Site configuration (single row, id=1)
CREATE TABLE site_config (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  name TEXT NOT NULL DEFAULT 'Ballplex',
  tagline TEXT DEFAULT 'Learn. Develop. Perform.',
  description TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  email TEXT DEFAULT '',
  addresses JSONB DEFAULT '[]',
  book_now_url TEXT DEFAULT '',
  socials JSONB DEFAULT '{}',
  nav_links JSONB DEFAULT '[]',
  stats JSONB DEFAULT '[]',
  facility_features JSONB DEFAULT '[]',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Programs / Services
CREATE TABLE programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  features JSONB DEFAULT '[]',
  pricing JSONB DEFAULT '[]',
  schedule JSONB DEFAULT '[]',
  images TEXT[] DEFAULT '{}',
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Coaches
CREATE TABLE coaches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  bio TEXT,
  specialties TEXT[] DEFAULT '{}',
  quote TEXT,
  image_url TEXT,
  instagram TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Event categories
CREATE TABLE event_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  description TEXT,
  order_index INT DEFAULT 0
);

-- Events
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  date DATE,
  end_date DATE,
  price TEXT,
  age_group TEXT,
  location TEXT,
  image_url TEXT,
  highlights TEXT[] DEFAULT '{}',
  category_id UUID REFERENCES event_categories(id) ON DELETE SET NULL,
  featured BOOLEAN DEFAULT false,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Testimonials
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  relation TEXT,
  content TEXT NOT NULL,
  rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Admin users (maps to Supabase Auth)
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_programs_order ON programs(order_index);
CREATE INDEX idx_coaches_order ON coaches(order_index);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_category ON events(category_id);
CREATE INDEX idx_events_featured ON events(featured) WHERE featured = true;
CREATE INDEX idx_testimonials_order ON testimonials(order_index);

-- Enable Row Level Security
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read site_config" ON site_config FOR SELECT USING (true);
CREATE POLICY "Public read programs" ON programs FOR SELECT USING (true);
CREATE POLICY "Public read coaches" ON coaches FOR SELECT USING (true);
CREATE POLICY "Public read event_categories" ON event_categories FOR SELECT USING (true);
CREATE POLICY "Public read events" ON events FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);

-- Admin write policies (authenticated users in admin_users table)
CREATE POLICY "Admin write site_config" ON site_config
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email')
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email')
  );

CREATE POLICY "Admin write programs" ON programs
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email')
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email')
  );

CREATE POLICY "Admin write coaches" ON coaches
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email')
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email')
  );

CREATE POLICY "Admin write event_categories" ON event_categories
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email')
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email')
  );

CREATE POLICY "Admin write events" ON events
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email')
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email')
  );

CREATE POLICY "Admin write testimonials" ON testimonials
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email')
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email')
  );

CREATE POLICY "Admin read admin_users" ON admin_users
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email')
  );

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_site_config_updated_at
  BEFORE UPDATE ON site_config FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_programs_updated_at
  BEFORE UPDATE ON programs FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_coaches_updated_at
  BEFORE UPDATE ON coaches FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at();
