-- Keep coach images on Supabase Storage instead of external URLs that may block hotlinking.
UPDATE coaches
SET image_url = CASE trim(name)
  WHEN 'Leo Rojas' THEN 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/external/coaches/leo-rojas.jpeg'
  WHEN 'Santiago Chirino' THEN 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/external/coaches/santiago-chirino.jpeg'
  WHEN 'Raychel Trocki' THEN 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/external/coaches/raychel-trocki.jpeg'
  WHEN 'Kyle Huckaby' THEN 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/external/coaches/kyle-huckaby.jpeg'
  WHEN 'Tristen Carranza' THEN 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/external/coaches/tristen-carranza.png'
  WHEN 'José Bermúdez' THEN 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/external/coaches/jose-bermudez.jpeg'
  WHEN 'Melissa Martínez' THEN 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/external/coaches/melissa-martinez.jpeg'
  WHEN 'Austin Dennis' THEN 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/external/coaches/austin-dennis.png'
  WHEN 'Jamie Gilbert' THEN 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/COACHES/JAMIE.jpeg'
  WHEN 'Gianmarco Marcelletti' THEN 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/external/coaches/gianmarco-marcelletti.jpeg'
  WHEN 'Rylan Thomas' THEN 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/COACHES/Rylan.jpeg'
  WHEN 'Taylor Jensen' THEN 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/COACHES/Taylor%20Jensen.jpeg'
END
WHERE trim(name) IN (
  'Leo Rojas', 'Santiago Chirino', 'Raychel Trocki', 'Kyle Huckaby',
  'Tristen Carranza', 'José Bermúdez', 'Melissa Martínez', 'Austin Dennis',
  'Jamie Gilbert', 'Gianmarco Marcelletti', 'Rylan Thomas', 'Taylor Jensen'
);