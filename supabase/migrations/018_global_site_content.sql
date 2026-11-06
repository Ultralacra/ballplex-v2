-- Global content controlled from the Site Config admin page.
ALTER TABLE site_config
  ADD COLUMN IF NOT EXISTS logo_url TEXT DEFAULT '/LOGO.png',
  ADD COLUMN IF NOT EXISTS footer_tagline TEXT DEFAULT 'Elite Baseball & Softball Development — Viera, Florida',
  ADD COLUMN IF NOT EXISTS copyright_text TEXT DEFAULT 'Ballplex Sports Academy & Facility. All Rights Reserved.';
