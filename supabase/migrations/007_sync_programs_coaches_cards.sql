-- Align the coach cards used by Programs with the current public roster.
ALTER TABLE coaches ADD COLUMN IF NOT EXISTS object_position TEXT;

WITH roster (name, role, specialties, quote, image_url, instagram, object_position) AS (
  VALUES
    ('Leo Rojas', 'Head of Player Development', ARRAY['Catching', 'Hitting (Baseball & Softball)'], 'Impossible dreams demand impossible work ethic, let''s get to work.', 'https://theballplex.com/wp-content/uploads/brizy/imgs/3-480x320x73x0x353x320x1759182471.jpeg', '@leobsbl', NULL),
    ('Santiago Chirino', 'Hitting & Fielding Coach', ARRAY['Hitting', 'Fielding (Baseball & Softball)'], 'Never allow the fear of striking out keep you from playing the game. — Babe Ruth', 'https://theballplex.com/wp-content/uploads/brizy/imgs/2-480x320x68x0x353x320x1759181406.jpeg', '@santiagochirino', NULL),
    ('Raychel Trocki', 'Softball Pitching Coach', ARRAY['Pitching (Softball)'], 'If you want it bad enough and you''re willing to make the sacrifices, you can do it. But first you have to believe in yourself. — Jennie Finch', 'https://theballplex.com/wp-content/uploads/brizy/imgs/4-478x319x62x0x354x319x1759182060.jpeg', '@coach.raychel', NULL),
    ('Kyle Huckaby', 'Pitching Coach', ARRAY['Pitching (Baseball)'], 'The best pitchers have a short term memory and a bullet proof confidence.', 'https://theballplex.com/wp-content/uploads/brizy/imgs/6-445x296x46x0x353x296x1759182173.jpeg', '@fluid_baseball', NULL),
    ('Tristen Carranza', 'Hitting & Fielding Coach', ARRAY['Hitting', 'Fielding (Baseball & Softball)'], 'A teacher is never a giver of truth, he is a guide, a pointer to the truth that each student must find for himself. A good teacher is merely a catalyst.', 'https://theballplex.com/wp-content/uploads/brizy/imgs/Screen-Shot-2024-09-06-at-11.25.51-AM-353x372x0x0x353x296x1725636374.png', '', NULL),
    ('José Bermúdez', 'Private Coach', ARRAY['Hitting', 'Fielding (Baseball & Softball)'], 'Talent may get you out on the field, but it''s attitude and effort that will keep you there. — Ken Griffey Jr.', 'https://theballplex.com/wp-content/uploads/brizy/imgs/1-446x297x51x0x354x297x1759181286.jpeg', '', NULL),
    ('Melissa Martínez', 'Softball Hitting Coach', ARRAY['Hitting', 'Fielding (Softball)'], 'A true champion is someone who wants to make a difference, who never gives up, and who gives everything she has no matter what the circumstances are. — Dot Richardson', 'https://theballplex.com/wp-content/uploads/brizy/imgs/5-431x287x43x0x353x287x1759182302.jpeg', '@xmelissaamartinez', NULL),
    ('Austin Dennis', 'Hitting & Fielding Coach', ARRAY['Hitting', 'Fielding (Baseball)'], 'Every strike brings me closer to the next home run. — Yogi Berra', 'https://theballplex.com/wp-content/uploads/brizy/imgs/Screen-Shot-2024-05-02-at-6.00.35-PM-353x359x0x0x353x287x1714687262.png', '@austindennis2', NULL),
    ('Jamie Gilbert', 'Pitching Coach (Softball)', ARRAY['Pitching (Softball)'], '', '/COACHES/JAMIE.jpeg', '', NULL),
    ('Gianmarco Marcelletti', 'Strength & Conditioning Coach', ARRAY['Strength & Conditioning'], '', 'https://mediumorchid-pig-468212.hostingersite.com/wp-content/uploads/2026/07/Gianmarco-scaled.jpeg', '', NULL),
    ('Rylan Thomas', 'Hitting Coach (Baseball & Softball)', ARRAY['Hitting (Baseball & Softball)'], '', '/COACHES/Rylan.jpeg', '', NULL),
    ('Taylor Jensen', 'Softball Catching & Hitting Coach', ARRAY['Catching', 'Hitting (Softball)'], 'Don''t be upset by the results you didn''t get, with the work you didn''t do.', '/COACHES/Taylor Jensen.jpeg', '', '50% 30%')
)
UPDATE coaches AS coach
SET
  role = roster.role,
  specialties = roster.specialties,
  quote = roster.quote,
  image_url = roster.image_url,
  instagram = roster.instagram,
  object_position = roster.object_position
FROM roster
WHERE trim(coach.name) = roster.name;