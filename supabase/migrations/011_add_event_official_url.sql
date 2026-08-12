-- Add an optional official event page URL.
ALTER TABLE events
ADD COLUMN IF NOT EXISTS official_url TEXT;
