-- Make the Contact page heading editable from Page Builder.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM page_sections
    WHERE page_slug = 'contact'
      AND type = 'contact_hero'
  ) THEN
    UPDATE page_sections
    SET order_index = order_index + 1
    WHERE page_slug = 'contact';

    INSERT INTO page_sections (
      page_slug,
      type,
      label,
      props,
      order_index,
      is_visible
    )
    VALUES (
      'contact',
      'contact_hero',
      'Contact Hero',
      '{
        "eyebrow": "Contact",
        "title": "Get in Touch",
        "description": "Have questions? Want to book the facility or organize a special event? We''ll get back to you as soon as possible."
      }'::jsonb,
      0,
      true
    );
  END IF;
END $$;
