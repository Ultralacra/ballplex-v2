-- Restore the fifth Home gallery image through page_sections API data.
UPDATE page_sections
SET props = jsonb_set(
  props,
  '{images}',
  COALESCE(props->'images', '[]'::jsonb) || '["/rentals/e13429f3-b13b-4bc5-a54a-6173978d8248.JPG.jpeg"]'::jsonb,
  true
)
WHERE page_slug = 'home'
  AND type = 'gallery'
  AND NOT COALESCE(props->'images', '[]'::jsonb)
    @> '["/rentals/e13429f3-b13b-4bc5-a54a-6173978d8248.JPG.jpeg"]'::jsonb;
