-- Add the editable Why Attend section used by the Events page.
DO $$
BEGIN
  UPDATE page_sections
  SET
    props = jsonb_build_object(
      'title', 'The Ballplex Difference',
      'subtitle', 'Our events are more than just games — they''re opportunities to grow, get seen, and get better.',
      'features', jsonb_build_array(
        jsonb_build_object('icon', 'TipsAndUpdates', 'title', 'Pro-Level Tech', 'description', 'HitTrax and Rapsodo at every camp and clinic. Real data, real results, real development.'),
        jsonb_build_object('icon', 'School', 'title', 'Expert Coaching', 'description', 'Every event is staffed by former pros, D1 players, and certified coaches who care about development.'),
        jsonb_build_object('icon', 'VisibilityIcon', 'title', 'Recruiting Exposure', 'description', 'Showcases with verified metrics and video packages sent directly to college programs.'),
        jsonb_build_object('icon', 'Groups', 'title', 'Community', 'description', 'Our family events and open play nights create a welcoming environment where everyone belongs.')
      )
    ),
    is_visible = true,
    order_index = 5
  WHERE page_slug = 'events' AND type = 'facility';

  IF NOT FOUND THEN
    INSERT INTO page_sections (page_slug, type, label, props, order_index, is_visible)
    VALUES (
      'events',
      'facility',
      'Why Attend',
      jsonb_build_object(
        'title', 'The Ballplex Difference',
        'subtitle', 'Our events are more than just games — they''re opportunities to grow, get seen, and get better.',
        'features', jsonb_build_array(
          jsonb_build_object('icon', 'TipsAndUpdates', 'title', 'Pro-Level Tech', 'description', 'HitTrax and Rapsodo at every camp and clinic. Real data, real results, real development.'),
          jsonb_build_object('icon', 'School', 'title', 'Expert Coaching', 'description', 'Every event is staffed by former pros, D1 players, and certified coaches who care about development.'),
          jsonb_build_object('icon', 'VisibilityIcon', 'title', 'Recruiting Exposure', 'description', 'Showcases with verified metrics and video packages sent directly to college programs.'),
          jsonb_build_object('icon', 'Groups', 'title', 'Community', 'description', 'Our family events and open play nights create a welcoming environment where everyone belongs.')
        )
      ),
      5,
      true
    );
  END IF;
END $$;