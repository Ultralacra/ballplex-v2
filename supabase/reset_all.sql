-- ============================================
-- Ballplex - RESET COMPLETO
-- Elimina todo y crea desde cero
-- ============================================

-- Primero eliminar tablas (CASCADE elimina triggers + policies automáticamente)
DROP TABLE IF EXISTS page_sections CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS event_categories CASCADE;
DROP TABLE IF EXISTS coaches CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS programs CASCADE;
DROP TABLE IF EXISTS site_config CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;

-- Eliminar función
DROP FUNCTION IF EXISTS update_updated_at CASCADE;

-- ============================================
-- AHORA CREAR TODO DESDE CERO
-- ============================================

-- Función para updated_at automático
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Site config (una sola fila, id=1)
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

-- Admin users
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Page sections (para el editor visual)
CREATE TABLE page_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug TEXT NOT NULL,
  type TEXT NOT NULL,
  label TEXT NOT NULL DEFAULT '',
  props JSONB NOT NULL DEFAULT '{}',
  order_index INT NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_programs_order ON programs(order_index);
CREATE INDEX idx_coaches_order ON coaches(order_index);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_category ON events(category_id);
CREATE INDEX idx_events_featured ON events(featured) WHERE featured = true;
CREATE INDEX idx_testimonials_order ON testimonials(order_index);
CREATE INDEX idx_page_sections_page ON page_sections(page_slug);
CREATE INDEX idx_page_sections_order ON page_sections(page_slug, order_index);

-- Triggers para updated_at
CREATE TRIGGER update_site_config_updated_at
  BEFORE UPDATE ON site_config FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_programs_updated_at
  BEFORE UPDATE ON programs FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_coaches_updated_at
  BEFORE UPDATE ON coaches FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_page_sections_updated_at
  BEFORE UPDATE ON page_sections FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;

-- Policies: lectura pública
CREATE POLICY "Public read site_config" ON site_config FOR SELECT USING (true);
CREATE POLICY "Public read programs" ON programs FOR SELECT USING (true);
CREATE POLICY "Public read coaches" ON coaches FOR SELECT USING (true);
CREATE POLICY "Public read event_categories" ON event_categories FOR SELECT USING (true);
CREATE POLICY "Public read events" ON events FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read page_sections" ON page_sections FOR SELECT USING (true);

-- Policies: escritura solo admins
CREATE POLICY "Admin write site_config" ON site_config
  FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email'))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email'));
CREATE POLICY "Admin write programs" ON programs
  FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email'))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email'));
CREATE POLICY "Admin write coaches" ON coaches
  FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email'))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email'));
CREATE POLICY "Admin write event_categories" ON event_categories
  FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email'))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email'));
CREATE POLICY "Admin write events" ON events
  FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email'))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email'));
CREATE POLICY "Admin write testimonials" ON testimonials
  FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email'))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email'));
CREATE POLICY "Admin write page_sections" ON page_sections
  FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email'))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email'));


-- ============================================
-- SEED DATA
-- ============================================

-- Site Config
INSERT INTO site_config (id, name, tagline, description, phone, email, addresses, book_now_url, socials, nav_links, stats, facility_features)
VALUES (
  1,
  'Ballplex',
  'Learn. Develop. Perform.',
  'Elite Baseball & Softball Player Development in Viera, Florida. Private Lessons, Homeschool Program, Strength & Conditioning and Cage Rentals.',
  '(321) 321-5558',
  'manager@theballplex.com',
  '[
    {"label": "Rentals", "address": "7285 Waelti Dr., Viera, FL 32940, US."},
    {"label": "Player Development", "address": "7255 Waelti Dr., Viera, FL 32940, US."}
  ]',
  'https://book.runswiftapp.com/facilities/ballplex',
  '{"instagram": "https://www.instagram.com/ballplex/", "facebook": "https://www.facebook.com/ballplex/"}',
  '[
    {"label": "Home", "href": "/"},
    {"label": "Services", "href": "/programs", "children": [
      {"label": "Private Lessons", "href": "/programs#lessons"},
      {"label": "Memberships", "href": "/programs#memberships"},
      {"label": "Strength & Conditioning", "href": "/programs#strength"},
      {"label": "Homeschool", "href": "/homeschool"},
      {"label": "Cage Rentals", "href": "/programs#rentals"},
      {"label": "Camps & Events", "href": "/programs#camps"}
    ]},
    {"label": "Coaches", "href": "/programs#coaches"},
    {"label": "Events", "href": "/events"},
    {"label": "Store", "href": "/store"},
    {"label": "Contact", "href": "/contact"}
  ]',
  '[
    {"value": "150+", "label": "Athletes Trained Weekly"},
    {"value": "10,500", "label": "sqft Climate-Controlled"},
    {"value": "40+", "label": "Homeschool Athletes"},
    {"value": "12", "label": "Professional Coaches"}
  ]',
  '[
    {"icon": "target", "title": "HitTrax System", "description": "Real-time hitting analytics and simulation technology for the most precise player development data available."},
    {"icon": "radar", "title": "Rapsodo", "description": "Pro-level pitch and hitting tracking that measures velocity, spin rate, exit velo, and launch angle."},
    {"icon": "snowflake", "title": "25 Tons of A/C", "description": "Full climate control across the entire facility. Train comfortably year-round regardless of Florida weather."},
    {"icon": "dumbbell", "title": "Full Gym", "description": "Complete strength and conditioning setup designed specifically for baseball and softball athletes."},
    {"icon": "layers", "title": "Turf & Cages", "description": "Premium turf playing surface and 5 indoor batting cages with Hack Attack pitching machines."},
    {"icon": "ruler", "title": "10,500 sqft", "description": "Massive indoor training space. Everything — hitting, pitching, defense, and strength — in specialized facilities."}
  ]'
);

-- Event Categories
INSERT INTO event_categories (slug, name, icon, description, order_index) VALUES
  ('camps', 'Camps', 'School', 'Multi-day intensive training camps designed to accelerate player development.', 1),
  ('tournaments', 'Tournaments', 'EmojiEvents', 'Competitive tournaments for travel teams and local organizations.', 2),
  ('clinics', 'Clinics', 'TipsAndUpdates', 'Focused single-day clinics on specific skills like hitting, pitching, and defense.', 3),
  ('showcases', 'Showcases', 'VisibilityIcon', 'Showcase events for athletes looking to get recruited by college programs.', 4),
  ('community', 'Community', 'Groups', 'Family-friendly events, fundraisers, and open-house celebrations.', 5);

-- Programs
INSERT INTO programs (slug, title, subtitle, description, features, pricing, schedule, images, order_index) VALUES
(
  'lessons',
  'Private Lessons',
  'One-on-One Elite Training',
  'Personalized 1-on-1 or duo instruction in hitting, pitching, catching, and fielding. HitTrax and Rapsodo technology available for detailed performance tracking.',
  '["One-on-one coaching", "Personalized development plan", "Video analysis included", "Progress tracking"]',
  '[
    {"name": "Single Lesson", "price": "From $80/hr", "duration": "1 Hour", "description": "Perfect for targeted skill work."},
    {"name": "10-Lesson Pack", "price": "$600", "duration": "10 Hours", "description": "Save $50 — commit to your growth."},
    {"name": "20-Lesson Pack", "price": "$1,100", "duration": "20 Hours", "description": "Save $200 — best value for serious athletes."}
  ]',
  '[]',
  ARRAY['/images-lessons/lessons-1.jpg', '/images-lessons/lessons-2.jpg', '/images-lessons/lessons-3.jpg'],
  1
),
(
  'memberships',
  'Memberships',
  'Train Like a Pro',
  'Monthly plans designed for athletes who take their development seriously. Includes assessments, programming, open cage time, and exclusive discounts.',
  '["Unlimited cage access", "Turf field access", "Strength & Conditioning area", "Member-only events"]',
  '[
    {"name": "Individual", "price": "From $95/month", "duration": "/Month", "description": "Full facility access for one athlete."},
    {"name": "Family", "price": "$80", "duration": "/Month", "description": "Access for up to 4 family members."},
    {"name": "Team", "price": "$35", "duration": "/Month per Athlete", "description": "Discounted rate for full teams (min. 10)."}
  ]',
  '[]',
  ARRAY[]::text[],
  2
),
(
  'strength',
  'Strength & Conditioning',
  'Build a Stronger Athlete',
  'Sport-specific training led by Coach Gianmarco Marcelletti. Semi-private sessions for ages 7+ with focus on injury prevention, speed, power, and agility.',
  '["Sport-specific training", "Certified S&C coaches", "Injury prevention focus", "Progress assessments"]',
  '[
    {"name": "Monthly", "price": "From $200/month", "duration": "/Month", "description": "Unlimited S&C sessions."},
    {"name": "3-Month", "price": "$390", "duration": "$130/mo", "description": "Save $60 — commit to the process."},
    {"name": "6-Month", "price": "$660", "duration": "$110/mo", "description": "Save $240 — best long-term value."}
  ]',
  '[
    {"day": "Monday", "time": "3:30 PM - 7:30 PM"},
    {"day": "Tuesday", "time": "3:30 PM - 7:30 PM"},
    {"day": "Wednesday", "time": "3:30 PM - 7:30 PM"},
    {"day": "Thursday", "time": "3:30 PM - 7:30 PM"},
    {"day": "Friday", "time": "3:30 PM - 6:30 PM"}
  ]',
  ARRAY['/SC/sc-1.png', '/SC/sc-2.png'],
  3
),
(
  'homeschool',
  'Homeschool Program',
  'Academics + Elite Training',
  'A complete academic and athletic program for competitive baseball and softball student-athletes. Daily training with our coaches combined with a nationally recognized curriculum led by our certified teachers.',
  '["Flexible academic schedule", "Daily baseball/softball training", "Strength & Conditioning", "College recruitment guidance", "Small class sizes"]',
  '[]',
  '[]',
  ARRAY[]::text[],
  4
),
(
  'rentals',
  'Cage Rentals',
  'Book Your Time',
  '6,000 sqft of indoor cage space with 5 cages available for individual, duo or team rentals. Pitching machines and equipment options available.',
  '["5 indoor batting cages", "Hack Attack pitching machines", "Climate-controlled facility", "Available for private events"]',
  '[
    {"name": "1 Hour", "price": "From $40/hr", "duration": "60 min", "description": "Single cage rental."},
    {"name": "10-Hour Pack", "price": "$270", "duration": "10 Hours", "description": "Save $30 on bulk rental."},
    {"name": "Monthly Unlimited", "price": "$100", "duration": "/Month", "description": "Unlimited cage access for one athlete."}
  ]',
  '[]',
  ARRAY['/rentals/rental-1.jpg', '/rentals/rental-2.jpg', '/rentals/rental-3.jpg'],
  5
),
(
  'camps',
  'Camps & Events',
  'Take Your Game to the Next Level',
  'Seasonal baseball and softball camps designed to accelerate player development in a team environment. Special events hosted year-round.',
  '["Elite coaching staff", "College exposure opportunities", "Position-specific training", "Live game experience"]',
  '[]',
  '[]',
  ARRAY[]::text[],
  6
);

-- Coaches (basado en src/data/coaches.ts)
INSERT INTO coaches (name, role, bio, specialties, quote, image_url, instagram, order_index) VALUES
('Leo Rojas', 'Head of Player Development', 'COACH LEO is our Head of Player Development. He was a professional catcher for the San Francisco Giants.', ARRAY['Catching', 'Hitting'], 'Impossible dreams demand impossible work ethic.', 'https://theballplex.com/wp-content/uploads/brizy/imgs/3-480x320x73x0x353x320x1759182471.jpeg', '@leobsbl', 1),
('Santiago Chirino', 'Hitting & Fielding Coach', 'Signed as an international free agent by the Texas Rangers in 2008. Known as the Frontier League Hit King.', ARRAY['Hitting', 'Fielding'], 'Never allow the fear of striking out keep you from playing the game.', 'https://theballplex.com/wp-content/uploads/brizy/imgs/2-480x320x68x0x353x320x1759181406.jpeg', '@santiagochirino', 2),
('Raychel Trocki', 'Softball Pitching Coach', 'A standout player at Florida Institute of Technology. Over 10 pitchers with scholarships under her guidance.', ARRAY['Pitching', 'Softball'], 'If you want it bad enough and you are willing to make the sacrifices, you can do it.', 'https://theballplex.com/wp-content/uploads/brizy/imgs/4-478x319x62x0x354x319x1759182060.jpeg', '@coach.raychel', 3),
('Kyle Huckaby', 'Pitching Coach', 'Division I arm at Eastern Michigan University. Signed with the Toronto Blue Jays.', ARRAY['Pitching', 'Baseball'], 'The best pitchers have a short term memory and a bullet proof confidence.', 'https://theballplex.com/wp-content/uploads/brizy/imgs/6-445x296x46x0x353x296x1759182173.jpeg', '@fluid_baseball', 4),
('Tristen Carranza', 'Hitting & Fielding Coach', 'Signed as a Free Agent with the Arizona Diamondbacks. Pioneer League All-Star in 2019.', ARRAY['Hitting', 'Fielding'], 'A teacher is never a giver of truth, he is a guide.', 'https://theballplex.com/wp-content/uploads/brizy/imgs/Screen-Shot-2024-09-06-at-11.25.51-AM-353x372x0x0x353x296x1725636374.png', '', 5),
('José Bermúdez', 'Private Coach', 'Signed by the Atlanta Braves in 2016. Over six years of professional baseball experience.', ARRAY['Hitting', 'Fielding'], 'Talent may get you out on the field, but it is attitude and effort that will keep you there.', 'https://theballplex.com/wp-content/uploads/brizy/imgs/1-446x297x51x0x354x297x1759181286.jpeg', '', 6),
('Melissa Martínez', 'Softball Hitting Coach', 'Played 4 years as a D1 softball player at Florida Atlantic University.', ARRAY['Hitting', 'Softball'], 'A true champion is someone who wants to make a difference.', 'https://theballplex.com/wp-content/uploads/brizy/imgs/5-431x287x43x0x353x287x1759182302.jpeg', '@xmelissaamartinez', 7),
('Austin Dennis', 'Hitting & Fielding Coach', 'Drafted in 2018 by the Houston Astros. Played AAA for the organization.', ARRAY['Hitting', 'Fielding'], 'Every strike brings me closer to the next home run.', 'https://theballplex.com/wp-content/uploads/brizy/imgs/Screen-Shot-2024-05-02-at-6.00.35-PM-353x359x0x0x353x287x1714687262.png', '@austindennis2', 8),
('Jamie Gilbert', 'Pitching Coach (Softball)', 'Former Division I pitcher at the University of Texas at San Antonio.', ARRAY['Pitching', 'Softball'], '', '/COACHES/JAMIE.jpeg', '', 9),
('Gianmarco Marcelletti', 'Strength & Conditioning Coach', 'Former college baseball player with ISSA certifications.', ARRAY['Strength & Conditioning'], '', 'https://mediumorchid-pig-468212.hostingersite.com/wp-content/uploads/2026/07/Gianmarco-scaled.jpeg', '', 10),
('Rylan Thomas', 'Hitting Coach (Baseball & Softball)', 'Former Division I standout at UCF. Drafted by the Cincinnati Reds in 2018.', ARRAY['Hitting'], '', '/COACHES/Rylan.jpeg', '', 11),
('Taylor Jensen', 'Softball Catching & Hitting Coach', 'Two-time NJCAA National Champion at Florida SouthWestern State College.', ARRAY['Catching', 'Hitting', 'Softball'], 'Don''t be upset by the results you didn''t get, with the work you didn''t do.', '/COACHES/Taylor Jensen.jpeg', '', 12);

-- Events (insert one by one to avoid subquery issues in VALUES)
DO $$
DECLARE
  camps_id UUID; tournaments_id UUID; clinics_id UUID; showcases_id UUID; community_id UUID;
BEGIN
  SELECT id INTO camps_id FROM event_categories WHERE slug = 'camps';
  SELECT id INTO tournaments_id FROM event_categories WHERE slug = 'tournaments';
  SELECT id INTO clinics_id FROM event_categories WHERE slug = 'clinics';
  SELECT id INTO showcases_id FROM event_categories WHERE slug = 'showcases';
  SELECT id INTO community_id FROM event_categories WHERE slug = 'community';

  INSERT INTO events (title, slug, description, short_description, date, end_date, price, age_group, location, image_url, highlights, category_id, featured, order_index) VALUES
    ('Summer Elite Camp', 'summer-elite-camp-2025', 'Our premier summer camp featuring professional instruction, live game play, and college recruitment exposure.', 'Three-day elite training camp.', '2025-07-21'::date, '2025-07-23'::date, '$299', '8-18', 'Ballplex Facility', 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800', ARRAY['Professional instruction', 'Live game play', 'College coach showcase'], camps_id, true, 1);
  INSERT INTO events (title, slug, description, short_description, date, end_date, price, age_group, location, image_url, highlights, category_id, featured, order_index) VALUES
    ('Fall Baseball Classic', 'fall-baseball-classic-2025', 'A competitive weekend tournament for travel teams and local clubs.', 'Weekend tournament for travel teams.', '2025-10-11'::date, '2025-10-13'::date, '$450/team', '8-14', 'Viera, FL', 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800', ARRAY['Multiple age divisions', 'Championship format', 'Professional umpires'], tournaments_id, true, 2);
  INSERT INTO events (title, slug, description, short_description, date, end_date, price, age_group, location, image_url, highlights, category_id, featured, order_index) VALUES
    ('Thanksgiving Turkey Camp', 'thanksgiving-turkey-camp-2025', 'Keep your skills sharp over the holiday break!', 'Two-day skills camp.', '2025-11-25'::date, '2025-11-26'::date, '$149', '7-14', 'Ballplex Facility', 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800', ARRAY['Defensive drills', 'Hitting stations', 'Live at-bats'], camps_id, false, 3);
  INSERT INTO events (title, slug, description, short_description, date, end_date, price, age_group, location, image_url, highlights, category_id, featured, order_index) VALUES
    ('Christmas Break Clinic', 'christmas-break-clinic-2025', 'Don''t let your skills cool down over winter break!', 'Four-day winter break clinic.', '2025-12-22'::date, '2025-12-26'::date, '$249', '7-18', 'Ballplex Facility', 'https://images.unsplash.com/photo-1478144592103-25e218a04891?w=800', ARRAY['Position-specific training', 'Hitting & pitching', 'Cage sessions'], camps_id, false, 4);
  INSERT INTO events (title, slug, description, short_description, date, end_date, price, age_group, location, image_url, highlights, category_id, featured, order_index) VALUES
    ('MLK Weekend Showcase', 'mlk-weekend-showcase-2026', 'College recruitment showcase featuring measurable drills and live game action.', 'College recruitment showcase.', '2026-01-17'::date, '2026-01-19'::date, '$199', '14-18', 'Ballplex Facility', 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf8b?w=800', ARRAY['Measurable drills', 'Live game action', 'College coach Q&A'], showcases_id, true, 5);
  INSERT INTO events (title, slug, description, short_description, date, end_date, price, age_group, location, image_url, highlights, category_id, featured, order_index) VALUES
    ('Spring Training Showcase', 'spring-training-showcase-2026', 'Prepare for the spring season with our comprehensive showcase event.', 'Pre-spring season showcase.', '2026-02-14'::date, '2026-02-15'::date, '$179', '14-18', 'Ballplex Facility', 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800', ARRAY['Pro-style workout', 'Defensive evaluations', 'Batting practice'], showcases_id, false, 6);
  INSERT INTO events (title, slug, description, short_description, date, end_date, price, age_group, location, image_url, highlights, category_id, featured, order_index) VALUES
    ('Pitching Mechanics Clinic', 'pitching-mechanics-clinic-2026', 'Master your mechanics in this focused clinic.', 'Pitching mechanics clinic.', '2026-03-08'::date, NULL::date, '$79', '10-18', 'Ballplex Facility', 'https://images.unsplash.com/photo-1631714783727-b01aef4c6b4d?w=800', ARRAY['Video analysis', 'Mechanical breakdown', 'Arm care program'], clinics_id, false, 7);
  INSERT INTO events (title, slug, description, short_description, date, end_date, price, age_group, location, image_url, highlights, category_id, featured, order_index) VALUES
    ('Hitting Mechanics Clinic', 'hitting-mechanics-clinic-2026', 'Join our Director of Hitting for a deep dive into swing mechanics.', 'Hitting mechanics clinic.', '2026-03-22'::date, NULL::date, '$79', '10-18', 'Ballplex Facility', 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800', ARRAY['Swing analysis', 'Bat path drills', 'Approach & strategy'], clinics_id, false, 8);
  INSERT INTO events (title, slug, description, short_description, date, end_date, price, age_group, location, image_url, highlights, category_id, featured, order_index) VALUES
    ('Easter Weekend Tournament', 'easter-weekend-tournament-2026', 'A great way to spend Easter weekend!', 'Easter weekend tournament.', '2026-04-04'::date, '2026-04-06'::date, '$425/team', '8-14', 'Viera, FL', 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=800', ARRAY['Pool play + bracket', 'Team awards', 'Home run derby'], tournaments_id, false, 9);
  INSERT INTO events (title, slug, description, short_description, date, end_date, price, age_group, location, image_url, highlights, category_id, featured, order_index) VALUES
    ('Family Fun Day', 'family-fun-day-2026', 'A free community event with inflatables, games, food trucks, and baseball/softball activities.', 'Free community event.', '2026-05-16'::date, NULL::date, 'Free', 'All Ages', 'Ballplex Facility', 'https://images.unsplash.com/photo-1579208575657-c595a63483b7?w=800', ARRAY['Baseball activities', 'Inflatables & games', 'Food trucks'], community_id, true, 10);
END $$;

-- Testimonials
INSERT INTO testimonials (name, relation, content, rating, order_index) VALUES
  ('Lorena Brown', 'Athlete''s Mom', 'Every coach we''ve encountered at Ballplex has been deeply invested in the athletes they train. Whether it''s hitting, catching, pitching, or fielding, they tailor their instruction to your child''s unique needs, building on their strengths while helping them grow in all aspects of the game. If you''re a parent considering joining Ballplex, I can''t recommend it enough.', 5, 1),
  ('Wes Herold', 'Athlete''s Dad', 'Both girls have grown tremendously in balance and form, but most importantly in their confidence.', 5, 2),
  ('Thelma Tortolo', 'Athlete''s Mom', 'Her mindset as a player has changed a lot. The coaches have done an excellent job both physically and mentally. On the field, she is able to make decisions by recalling the work done in her hitting lessons, showing a lot of confidence. She has made great progress and always maintains effective communication with her coach.', 5, 3);

-- Page Sections (para el editor visual del admin)
INSERT INTO page_sections (page_slug, type, label, props, order_index) VALUES
-- HOME
('home', 'hero', 'Hero Section', '{
  "videoSrc": "/ballplex-promo.mp4",
  "tagline": "Learn. Develop. Perform.",
  "description": "Elite Baseball & Softball Player Development in Viera, Florida.",
  "location": "Viera, Florida",
  "primaryCTA": {"text": "Get Started", "href": "https://book.runswiftapp.com/facilities/ballplex"},
  "secondaryCTA": {"text": "Explore Programs", "href": "/programs"}
}', 1),
('home', 'stats', 'Stats Bar', '{
  "stats": [
    {"value": "150+", "label": "Athletes Trained Weekly"},
    {"value": "10,500", "label": "sqft Climate-Controlled"},
    {"value": "40+", "label": "Homeschool Athletes"},
    {"value": "12", "label": "Professional Coaches"}
  ]
}', 2),
('home', 'programs_grid', 'Programs Grid', '{
  "title": "Built for Athletes Development",
  "subtitle": "Technology to Track Your Progress, two Facilities and an Elite Coaching Team."
}', 3),
('home', 'facility', 'Facility Features', '{
  "title": "Why Athletes Choose Ballplex",
  "subtitle": "Technology to Track Your Progress, two Facilities and an Elite Coaching Team.",
  "features": [
    {"icon": "target", "title": "HitTrax System", "description": "Real-time hitting analytics and simulation technology for the most precise player development data available."},
    {"icon": "radar", "title": "Rapsodo", "description": "Pro-level pitch and hitting tracking that measures velocity, spin rate, exit velo, and launch angle."},
    {"icon": "snowflake", "title": "25 Tons of A/C", "description": "Full climate control across the entire facility. Train comfortably year-round regardless of Florida weather."},
    {"icon": "dumbbell", "title": "Full Gym", "description": "Complete strength and conditioning setup designed specifically for baseball and softball athletes."},
    {"icon": "layers", "title": "Turf & Cages", "description": "Premium turf playing surface and 5 indoor batting cages with Hack Attack pitching machines."},
    {"icon": "ruler", "title": "10,500 sqft", "description": "Massive indoor training space. Everything — hitting, pitching, defense, and strength — in specialized facilities."}
  ],
  "images": [
    "https://theballplex.com/wp-content/uploads/brizy/imgs/IMG_4117-548x731x0x80x548x570x1758559312.webp",
    "https://theballplex.com/wp-content/uploads/brizy/imgs/IMG_4121-323x431x0x86x323x259x1758559372.webp"
  ]
}', 4),
('home', 'coaches_grid', 'Coaches Grid', '{
  "title": "Meet the Team",
  "subtitle": "Former professional players with Division 1 experience."
}', 5),
('home', 'gallery', 'Facility Gallery', '{
  "title": "See the Facility",
  "images": ["/images-lessons/d577b0a5-d7c6-4fd8-a896-b72b3d522a96 2.JPG.jpeg", "/images-lessons/DSC00748.JPG.jpeg", "/images-lessons/DSC00828.JPG.jpeg", "/SC/IMG_4119 2.jpg", "/SC/IMG_5973.jpg", "/rentals/IMG_5967.jpg.jpeg", "/rentals/e13429f3-b13b-4bc5-a54a-6173978d8248.JPG.jpeg"]
}', 6),
('home', 'testimonials_grid', 'Testimonials', '{
  "title": "What Families Say",
  "subtitle": "Trusted by parents and athletes across Brevard County."
}', 7),
('home', 'cta_banner', 'CTA Banner', '{
  "title": "Ready to Take Your Game\nto the Next Level?",
  "description": "Join the most complete baseball and softball development center in Brevard County. Everything you need — coaching, technology, training, and community — all under one roof.",
  "primaryCTA": {"text": "Get Started Today", "href": "https://book.runswiftapp.com/facilities/ballplex"},
  "secondaryCTA": {"text": "Contact Us", "href": "/contact"}
}', 8),

-- PROGRAMS
('programs', 'hero', 'Page Hero', '{
  "tagline": "Built for Athletes Development",
  "description": "Technology to Track Your Progress.",
  "location": "Services"
}', 1),
('programs', 'coaches_grid', 'Coaching Staff', '{
  "title": "Meet the Team",
  "subtitle": "Former professional players with Division 1 experience."
}', 2),
('programs', 'cta_banner', 'CTA Banner', '{
  "title": "Ready to Take Your Game\nto the Next Level?",
  "description": "Join the most complete baseball and softball development center in Brevard County. Everything you need — coaching, technology, training, and community — all under one roof.",
  "primaryCTA": {"text": "Get Started Today", "href": "https://book.runswiftapp.com/facilities/ballplex"},
  "secondaryCTA": {"text": "Contact Us", "href": "/contact"}
}', 3),

-- EVENTS
('events', 'hero', 'Page Hero', '{
  "tagline": "Train. Compete. Connect.",
  "description": "Year-round camps, tournaments, clinics, and community events.",
  "location": "Camps & Events"
}', 1),
('events', 'events_grid', 'All Events', '{
  "title": "Can''t Miss Events",
  "subtitle": "Our marquee events. Early registration is strongly recommended."
}', 2),
('events', 'event_categories_grid', 'Browse by Category', '{
  "title": "Find the Right Event",
  "subtitle": "Camps, tournaments, clinics, showcases, and community events — there''s something for everyone."
}', 3),
('events', 'facility', 'Why Attend', '{
  "title": "The Ballplex Difference",
  "subtitle": "Our events are more than just games — they''re opportunities to grow, get seen, and get better.",
  "features": [
    {"icon": "TipsAndUpdates", "title": "Pro-Level Tech", "description": "HitTrax and Rapsodo at every camp and clinic. Real data, real results, real development."},
    {"icon": "School", "title": "Expert Coaching", "description": "Every event is staffed by former pros, D1 players, and certified coaches who care about development."},
    {"icon": "VisibilityIcon", "title": "Recruiting Exposure", "description": "Showcases with verified metrics and video packages sent directly to college programs."},
    {"icon": "Groups", "title": "Community", "description": "Our family events and open play nights create a welcoming environment where everyone belongs."}
  ]
}', 4),
('events', 'cta_banner', 'CTA Banner', '{
  "title": "Ready to Take Your Game\nto the Next Level?",
  "description": "Join the most complete baseball and softball development center in Brevard County. Everything you need — coaching, technology, training, and community — all under one roof.",
  "primaryCTA": {"text": "Get Started Today", "href": "https://book.runswiftapp.com/facilities/ballplex"},
  "secondaryCTA": {"text": "Contact Us", "href": "/contact"}
}', 3),

-- HOMESCHOOL
('homeschool', 'homeschool_hero', 'Page Hero', '{
  "title": "Built for Advanced Athletes",
  "subtitle": "Homeschool Program",
  "description": "A complete academic and athletic program for competitive baseball and softball student-athletes.",
  "cta": {"text": "", "href": ""}
}', 1),
('homeschool', 'homeschool_academics', 'Academics & Training', '{
  "title": "Academics + Athletics. Every Day.",
  "description": "The Ballplex Homeschool Program is designed for competitive baseball and softball student-athletes.",
  "features": ["Flexible academic schedule", "Daily baseball/softball training", "Strength & Conditioning included", "College recruitment guidance"]
}', 2),
('homeschool', 'stats', 'Program Stats', '{
  "stats": [
    {"value": "10,500", "label": "sqft Facility"},
    {"value": "12", "label": "Pro Coaches"},
    {"value": "4", "label": "Days/Week"},
    {"value": "6th+", "label": "Grade Entry"}
  ]
}', 3),
('homeschool', 'cta_banner', 'CTA Banner', '{
  "title": "Ready to Take Your Game\nto the Next Level?",
  "description": "Join the most complete baseball and softball development center in Brevard County. Everything you need — coaching, technology, training, and community — all under one roof.",
  "primaryCTA": {"text": "Get Started Today", "href": "https://book.runswiftapp.com/facilities/ballplex"},
  "secondaryCTA": {"text": "Contact Us", "href": "/contact"}
}', 4),

-- CONTACT
('contact', 'contact_info', 'Contact Information', '{
  "phone": "(321) 321-5558",
  "email": "manager@theballplex.com",
  "addresses": [
    {"label": "Rentals", "address": "7285 Waelti Dr., Viera, FL 32940, US."},
    {"label": "Player Development", "address": "7255 Waelti Dr., Viera, FL 32940, US."}
  ],
  "socials": {
    "instagram": "https://www.instagram.com/ballplex/",
    "facebook": "https://www.facebook.com/ballplex/"
  }
}', 1),
('contact', 'map_embed', 'Google Maps', '{
  "title": "Our Location",
  "address": "7255 Waelti Dr., Viera, FL 32940",
  "embedUrl": "https://www.google.com/maps/embed?pb=!1m18..."
}', 2),
('contact', 'contact_form', 'Contact Form', '{}', 3);
