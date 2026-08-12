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

CREATE INDEX idx_page_sections_page ON page_sections(page_slug);
CREATE INDEX idx_page_sections_order ON page_sections(page_slug, order_index);

ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read page_sections" ON page_sections
  FOR SELECT USING (true);

CREATE POLICY "Admin write page_sections" ON page_sections
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email')
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE email = auth.jwt() ->> 'email')
  );

CREATE TRIGGER update_page_sections_updated_at
  BEFORE UPDATE ON page_sections FOR EACH ROW EXECUTE FUNCTION update_updated_at();
