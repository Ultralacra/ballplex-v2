-- Actualizar referencias a Supabase Storage
-- Base URL: https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets

UPDATE coaches SET image_url = 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/external/coaches/leo-rojas.jpeg' WHERE name = 'Leo Rojas';
UPDATE coaches SET image_url = 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/external/coaches/santiago-chirino.jpeg' WHERE name = 'Santiago Chirino';
UPDATE coaches SET image_url = 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/external/coaches/raychel-trocki.jpeg' WHERE name = 'Raychel Trocki';
UPDATE coaches SET image_url = 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/external/coaches/kyle-huckaby.jpeg' WHERE name = 'Kyle Huckaby';
UPDATE coaches SET image_url = 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/external/coaches/tristen-carranza.png' WHERE name = 'Tristen Carranza';
UPDATE coaches SET image_url = 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/external/coaches/jose-bermudez.jpeg' WHERE name = 'José Bermúdez';
UPDATE coaches SET image_url = 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/external/coaches/melissa-martinez.jpeg' WHERE name = 'Melissa Martínez';
UPDATE coaches SET image_url = 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/external/coaches/austin-dennis.png' WHERE name = 'Austin Dennis';
UPDATE coaches SET image_url = 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/COACHES/JAMIE.jpeg' WHERE name = 'Jamie Gilbert';
UPDATE coaches SET image_url = 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/external/coaches/gianmarco-marcelletti.jpeg' WHERE name = 'Gianmarco Marcelletti';
UPDATE coaches SET image_url = 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/COACHES/Rylan.jpeg' WHERE name = 'Rylan Thomas';
UPDATE coaches SET image_url = 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/COACHES/Taylor Jensen.jpeg' WHERE name = 'Taylor Jensen';

-- Events
UPDATE events SET image_url = 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/external/events/summer-elite-camp.jpg' WHERE slug = 'summer-elite-camp-2025';
UPDATE events SET image_url = 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/external/events/fall-classic.jpg' WHERE slug = 'fall-baseball-classic-2025';
UPDATE events SET image_url = 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/external/events/turkey-camp.jpg' WHERE slug = 'thanksgiving-turkey-camp-2025';
UPDATE events SET image_url = 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/external/events/christmas-clinic.jpg' WHERE slug = 'christmas-break-clinic-2025';
UPDATE events SET image_url = 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/external/events/mlk-showcase.jpg' WHERE slug = 'mlk-weekend-showcase-2026';
UPDATE events SET image_url = 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/external/events/spring-showcase.jpg' WHERE slug = 'spring-training-showcase-2026';
UPDATE events SET image_url = 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/external/events/pitching-clinic.jpg' WHERE slug = 'pitching-mechanics-clinic-2026';
UPDATE events SET image_url = 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/external/events/hitting-clinic.jpg' WHERE slug = 'hitting-mechanics-clinic-2026';
UPDATE events SET image_url = 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/external/events/easter-tournament.jpg' WHERE slug = 'easter-weekend-tournament-2026';
UPDATE events SET image_url = 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/external/events/family-fun-day.jpg' WHERE slug = 'family-fun-day-2026';

-- Hero videos (mantener ruta local, el video es muy grande para Storage)

-- Facility images in page_sections
UPDATE page_sections SET props = jsonb_set(props, '{images}', '["https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/external/facility/img_4117.webp","https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/external/facility/img_4121.webp"]'::jsonb) WHERE page_slug = 'home' AND type = 'facility';
