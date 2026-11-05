-- Short links managed from the admin panel.
CREATE TABLE short_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL,
  destination_url TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  is_active BOOLEAN NOT NULL DEFAULT true,
  click_count BIGINT NOT NULL DEFAULT 0,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT short_links_code_format CHECK (code ~ '^[a-z0-9][a-z0-9_-]*$'),
  CONSTRAINT short_links_destination_url_format CHECK (
    destination_url ~* '^https?://'
  )
);

CREATE UNIQUE INDEX short_links_code_lower_idx ON short_links (lower(code));
CREATE INDEX short_links_active_idx ON short_links (is_active);

ALTER TABLE short_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin manage short links" ON short_links
  FOR ALL USING (
    EXISTS (
      SELECT 1
      FROM admin_users
      WHERE auth_user_id = auth.uid()
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1
      FROM admin_users
      WHERE auth_user_id = auth.uid()
    )
  );

CREATE TRIGGER update_short_links_updated_at
  BEFORE UPDATE ON short_links
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE FUNCTION increment_short_link_click(link_id UUID)
RETURNS VOID
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE short_links
  SET click_count = click_count + 1
  WHERE id = link_id;
$$;
