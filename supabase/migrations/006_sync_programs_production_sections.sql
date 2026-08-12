-- Make the Programs page_sections match the production content model.
DO $$
DECLARE
  sections jsonb := '[
    {
      "type": "pricing_table", "label": "Private Lessons", "order_index": 2,
      "props": {
        "anchor": "lessons", "eyebrow": "Private Lessons", "title": "1-on-1 & Duo Instruction",
        "subtitle": "Private Lessons",
        "description": "Whether your goal is to make the team, earn a starting spot, or get recruited by top college programs, our coaches are here to help you get there. HitTrax and Rapsodo technology are available for detailed performance tracking.",
        "features": [
          {"name": "Hitting", "description": "Swing mechanics, approach, Rapsodo data"},
          {"name": "Pitching", "description": "Mechanics, velocity, arm care, pitch design"},
          {"name": "Catching", "description": "Receiving, blocking, throwing, game IQ"},
          {"name": "Fielding", "description": "Footwork, glove work, arm strength"}
        ],
        "rapsodo": {"title": "Rapsodo Pro 2.0 - Powered by Data", "description": "See what the numbers say. Rapsodo Pro 2.0 provides detailed hitting and pitching metrics that help our certified coaches identify strengths, areas for improvement, and build a plan based on objective data. Book your session today."},
        "plans": [
          {"name": "Hitting / Fielding / Catching", "privatePrice": "$80", "duoPrice": "$100"},
          {"name": "Softball Pitching", "privatePrice": "$80", "duoPrice": "$100"},
          {"name": "Baseball Pitching", "privatePrice": "$80", "duoPrice": "$100"}
        ]
      }
    },
    {
      "type": "pricing_table", "label": "Memberships", "order_index": 3,
      "props": {
        "anchor": "memberships", "eyebrow": "Memberships", "title": "Three Tiers. One Goal.",
        "subtitle": "Memberships",
        "description": "Plans designed for athletes who take their development seriously. Each plan adds real value with assessments, programming, and exclusive benefits.",
        "highlighted_index": 1,
        "plans": [
          {"name": "Pro", "price": "$95", "duration": "/mo", "benefits": ["Assessment Sessions", "App Access + Programming", "10% Off Store & Events", "S&C from $240/mo", "Lessons: $75 single / $45 duo"]},
          {"name": "All-Access", "price": "$175", "duration": "/mo", "benefits": ["Unlimited Open Cage (+1 Guest)", "1 Monthly HitTrax Rental", "Open Gym (16+)", "15% Off Store & Events", "S&C from $240/mo"]},
          {"name": "Elite", "price": "$295", "duration": "/mo", "benefits": ["Assessment + Programming", "Unlimited Open Cage (+1 Guest)", "Open Gym (16+)", "20% Off Store & Events", "S&C from $200/mo", "Lessons: $65 single / $40 duo"]}
        ]
      }
    },
    {
      "type": "pricing_table", "label": "Strength & Conditioning", "order_index": 4,
      "props": {
        "anchor": "strength", "eyebrow": "Strength & Conditioning", "title": "Stronger. Faster. Unstoppable.",
        "subtitle": "Strength & Conditioning",
        "description": "Sport-specific training for baseball and softball athletes. Fewer injuries. More power. Led by Coach Gianmarco Marcelletti, a former college player with ISSA certifications and over 5 years of experience training athletes up to the MLB level.",
        "plans": [
          {"name": "2 Days/Week", "memberPrice": "$240", "nonMemberPrice": "$280", "dropInPrice": "$50"},
          {"name": "3 Days/Week", "memberPrice": "$315", "nonMemberPrice": "$375", "dropInPrice": "$50"},
          {"name": "4 Days/Week", "memberPrice": "$375", "nonMemberPrice": "$435", "dropInPrice": "$50"}
        ]
      }
    },
    {
      "type": "schedule_table", "label": "S&C Schedule", "order_index": 5,
      "props": {
        "anchor": "strength", "title": "Training Schedule",
        "items": [
          {"day": "3:30-5:30PM", "time": "Ages 7-10"},
          {"day": "5:30-7:30PM", "time": "Ages 11-14"},
          {"day": "7:30-9:30PM", "time": "High School"}
        ]
      }
    },
    {
      "type": "pricing_table", "label": "Cage Rentals", "order_index": 6,
      "props": {
        "anchor": "rentals", "eyebrow": "Cage Rentals", "title": "5 Indoor Cages. Unlimited Possibilities.",
        "subtitle": "Cage Rentals",
        "description": "6,000 sqft of indoor cage space with 5 cages available for individual, duo or team rentals. Pitching machines and equipment options available.",
        "note": "Rates for 1-hour rental. Special discounts for multiple hours and long-term rentals.",
        "rates": [
          {"name": "Just the Cage", "lane45": "$40", "lanes45": "$75", "lane70": "$55", "lanes70": "$95"},
          {"name": "Cage + Equipment", "lane45": "$45", "lanes45": "$80", "lane70": "$60", "lanes70": "$100"},
          {"name": "Cage + Machine + Equipment", "lane45": "$50", "lanes45": "$85", "lane70": "$65", "lanes70": "$105"}
        ],
        "teamPacks": [
          {"name": "Mint Pack", "description": "2 Cages - 4 Hours/Month - Machine Included", "price": "$275"},
          {"name": "Gold Pack", "description": "2 Cages - 8 Hours/Month - Machine Included", "price": "$475"}
        ],
        "plans": []
      }
    }
  ]'::jsonb;
  section jsonb;
BEGIN
  FOR section IN SELECT value FROM jsonb_array_elements(sections)
  LOOP
    UPDATE page_sections
    SET
      props = section->'props',
      order_index = (section->>'order_index')::int,
      is_visible = true
    WHERE page_slug = 'programs'
      AND type = section->>'type'
      AND label = section->>'label';

    IF NOT FOUND THEN
      INSERT INTO page_sections (page_slug, type, label, props, order_index, is_visible)
      VALUES (
        'programs',
        section->>'type',
        section->>'label',
        section->'props',
        (section->>'order_index')::int,
        true
      );
    END IF;
  END LOOP;

  UPDATE page_sections
  SET props = jsonb_build_object(
    'title', 'Meet the Team',
    'subtitle', 'Former professional players with Division 1 experience and years coaching young athletes.'
  )
  WHERE page_slug = 'programs' AND type = 'coaches_grid';
END $$;