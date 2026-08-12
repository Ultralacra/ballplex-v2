-- Keep the admin page builder and public home page aligned with the complete facility copy.
UPDATE page_sections
SET props = jsonb_set(
  props,
  '{features}',
  '[
    {"icon": "target", "title": "HitTrax System", "description": "Real-time hitting analytics and simulation technology for the most precise player development data available."},
    {"icon": "radar", "title": "Rapsodo", "description": "Pro-level pitch and hitting tracking that measures velocity, spin rate, exit velo, and launch angle."},
    {"icon": "snowflake", "title": "25 Tons of A/C", "description": "Full climate control across the entire facility. Train comfortably year-round regardless of Florida weather."},
    {"icon": "dumbbell", "title": "Full Gym", "description": "Complete strength and conditioning setup designed specifically for baseball and softball athletes."},
    {"icon": "layers", "title": "Turf & Cages", "description": "Premium turf playing surface and 5 indoor batting cages with Hack Attack pitching machines."},
    {"icon": "ruler", "title": "10,500 sqft", "description": "Massive indoor training space. Everything — hitting, pitching, defense, and strength — in specialized facilities."}
  ]'::jsonb
)
WHERE page_slug = 'home' AND type = 'facility';