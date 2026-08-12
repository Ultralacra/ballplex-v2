-- ============================================
-- Ballplex - Seed Data
-- ============================================

-- Site Config
INSERT INTO site_config (id, name, tagline, description, phone, email, addresses, book_now_url, socials, nav_links, stats, facility_features)
VALUES (
  1,
  'Ballplex',
  'Learn. Develop. Perform.',
  'Elite Baseball & Softball Player Development in Viera, Florida. Private Lessons, Homeschool Program, Strength & Conditioning and Cage Rentals.',
  '(321) 321-5558',
  'manager@theballplex.com',
  '[
    {"label": "Rentals", "address": "7285 Waelti Dr., Viera, FL 32940, US."},
    {"label": "Player Development", "address": "7255 Waelti Dr., Viera, FL 32940, US."}
  ]',
  'https://book.runswiftapp.com/facilities/ballplex',
  '{"instagram": "https://www.instagram.com/ballplex/", "facebook": "https://www.facebook.com/ballplex/"}',
  '[
    {"label": "Home", "href": "/"},
    {"label": "Services", "href": "/programs", "children": [
      {"label": "Private Lessons", "href": "/programs#lessons"},
      {"label": "Memberships", "href": "/programs#memberships"},
      {"label": "Strength & Conditioning", "href": "/programs#strength"},
      {"label": "Homeschool", "href": "/homeschool"},
      {"label": "Cage Rentals", "href": "/programs#rentals"},
      {"label": "Camps & Events", "href": "/programs#camps"}
    ]},
    {"label": "Coaches", "href": "/programs#coaches"},
    {"label": "Events", "href": "/events"},
    {"label": "Store", "href": "/store"},
    {"label": "Contact", "href": "/contact"}
  ]',
  '[
    {"value": "150+", "label": "Athletes Trained Weekly"},
    {"value": "10,500", "label": "sqft Climate-Controlled"},
    {"value": "40+", "label": "Homeschool Athletes"},
    {"value": "12", "label": "Professional Coaches"}
  ]',
  '[
    {"icon": "target", "title": "HitTrax System", "description": "Real-time hitting analytics and simulation technology for the most precise player development data available."},
    {"icon": "radar", "title": "Rapsodo", "description": "Pro-level pitch and hitting tracking that measures velocity, spin rate, exit velo, and launch angle."},
    {"icon": "snowflake", "title": "25 Tons of A/C", "description": "Full climate control across the entire facility. Train comfortably year-round regardless of Florida weather."},
    {"icon": "dumbbell", "title": "Full Gym", "description": "Complete strength and conditioning setup designed specifically for baseball and softball athletes."},
    {"icon": "layers", "title": "Turf & Cages", "description": "Premium turf playing surface and 5 indoor batting cages with Hack Attack pitching machines."},
    {"icon": "ruler", "title": "10,500 sqft", "description": "Massive indoor training space. Everything — hitting, pitching, defense, and strength — in specialized facilities."}
  ]'
);

-- Event Categories
INSERT INTO event_categories (slug, name, icon, description, order_index) VALUES
  ('camps', 'Camps', 'School', 'Multi-day intensive training camps designed to accelerate player development.', 1),
  ('tournaments', 'Tournaments', 'EmojiEvents', 'Competitive tournaments for travel teams and local organizations.', 2),
  ('clinics', 'Clinics', 'TipsAndUpdates', 'Focused single-day clinics on specific skills like hitting, pitching, and defense.', 3),
  ('showcases', 'Showcases', 'VisibilityIcon', 'Showcase events for athletes looking to get recruited by college programs.', 4),
  ('community', 'Community', 'Groups', 'Family-friendly events, fundraisers, and open-house celebrations.', 5);

-- Programs
INSERT INTO programs (slug, title, subtitle, description, features, pricing, schedule, images, order_index) VALUES
(
  'lessons',
  'Private Lessons',
  'One-on-One Elite Training',
  'Personalized 1-on-1 or duo instruction in hitting, pitching, catching, and fielding. HitTrax and Rapsodo technology available for detailed performance tracking.',
  '["One-on-one coaching", "Personalized development plan", "Video analysis included", "Progress tracking"]',
  '[
    {"name": "Single Lesson", "price": "From $80/hr", "duration": "1 Hour", "description": "Perfect for targeted skill work."},
    {"name": "10-Lesson Pack", "price": "$600", "duration": "10 Hours", "description": "Save $50 — commit to your growth."},
    {"name": "20-Lesson Pack", "price": "$1,100", "duration": "20 Hours", "description": "Save $200 — best value for serious athletes."}
  ]',
  '[]',
  ARRAY['/images-lessons/lessons-1.jpg', '/images-lessons/lessons-2.jpg', '/images-lessons/lessons-3.jpg'],
  1
),
(
  'memberships',
  'Memberships',
  'Train Like a Pro',
  'Monthly plans designed for athletes who take their development seriously. Includes assessments, programming, open cage time, and exclusive discounts.',
  '["Unlimited cage access", "Turf field access", "Strength & Conditioning area", "Member-only events"]',
  '[
    {"name": "Individual", "price": "From $95/month", "duration": "/Month", "description": "Full facility access for one athlete."},
    {"name": "Family", "price": "$80", "duration": "/Month", "description": "Access for up to 4 family members."},
    {"name": "Team", "price": "$35", "duration": "/Month per Athlete", "description": "Discounted rate for full teams (min. 10)."}
  ]',
  '[]',
  ARRAY[]::text[],
  2
),
(
  'strength',
  'Strength & Conditioning',
  'Build a Stronger Athlete',
  'Sport-specific training led by Coach Gianmarco Marcelletti. Semi-private sessions for ages 7+ with focus on injury prevention, speed, power, and agility.',
  '["Sport-specific training", "Certified S&C coaches", "Injury prevention focus", "Progress assessments"]',
  '[
    {"name": "Monthly", "price": "From $200/month", "duration": "/Month", "description": "Unlimited S&C sessions."},
    {"name": "3-Month", "price": "$390", "duration": "$130/mo", "description": "Save $60 — commit to the process."},
    {"name": "6-Month", "price": "$660", "duration": "$110/mo", "description": "Save $240 — best long-term value."}
  ]',
  '[
    {"day": "Monday", "time": "3:30 PM - 7:30 PM"},
    {"day": "Tuesday", "time": "3:30 PM - 7:30 PM"},
    {"day": "Wednesday", "time": "3:30 PM - 7:30 PM"},
    {"day": "Thursday", "time": "3:30 PM - 7:30 PM"},
    {"day": "Friday", "time": "3:30 PM - 6:30 PM"}
  ]',
  ARRAY['/SC/sc-1.png', '/SC/sc-2.png'],
  3
),
(
  'homeschool',
  'Homeschool Program',
  'Academics + Elite Training',
  'A complete academic and athletic program for competitive baseball and softball student-athletes. Daily training with our coaches combined with a nationally recognized curriculum led by our certified teachers.',
  '["Flexible academic schedule", "Daily baseball/softball training", "Strength & Conditioning", "College recruitment guidance", "Small class sizes"]',
  '[]',
  '[]',
  ARRAY[]::text[],
  4
),
(
  'rentals',
  'Cage Rentals',
  'Book Your Time',
  '6,000 sqft of indoor cage space with 5 cages available for individual, duo or team rentals. Pitching machines and equipment options available.',
  '["5 indoor batting cages", "Hack Attack pitching machines", "Climate-controlled facility", "Available for private events"]',
  '[
    {"name": "1 Hour", "price": "From $40/hr", "duration": "60 min", "description": "Single cage rental."},
    {"name": "10-Hour Pack", "price": "$270", "duration": "10 Hours", "description": "Save $30 on bulk rental."},
    {"name": "Monthly Unlimited", "price": "$100", "duration": "/Month", "description": "Unlimited cage access for one athlete."}
  ]',
  '[]',
  ARRAY['/rentals/rental-1.jpg', '/rentals/rental-2.jpg', '/rentals/rental-3.jpg'],
  5
),
(
  'camps',
  'Camps & Events',
  'Take Your Game to the Next Level',
  'Seasonal baseball and softball camps designed to accelerate player development in a team environment. Special events hosted year-round.',
  '["Elite coaching staff", "College exposure opportunities", "Position-specific training", "Live game experience"]',
  '[]',
  '[]',
  ARRAY[]::text[],
  6
);

-- Coaches
INSERT INTO coaches (name, role, bio, specialties, quote, image_url, instagram, order_index) VALUES
(
  'Jamie DAntona',
  'Co-Owner & Director of Hitting',
  'Former MLB player for the Arizona Diamondbacks. Collegiate career at Wake Forest University. Over 15 years of professional coaching experience developing hitters at all levels.',
  ARRAY['Hitting', 'Game Strategy', 'Mental Approach'],
  '"Hitting is an art and a science. We blend proven mechanics with mental toughness to build complete hitters."',
  '/COACHES/JAMIE.jpeg',
  '@jdamac11',
  1
),
(
  'Max Russell',
  'Co-Owner & Head Pitching Coach',
  'Former professional pitcher in the Atlanta Braves organization. Collegiate pitcher at Florida Gulf Coast University. Dedicated to developing the next generation of arms with proper mechanics and arm care.',
  ARRAY['Pitching', 'Arm Care', 'Mechanics'],
  '"Pitching is about more than velocity. We build complete pitchers with command, movement, and durability."',
  '/COACHES/MAXPITCHING.jpeg',
  '@passionforthearm',
  2
),
(
  'Ray Turek',
  'Hitting & Catching Coach',
  'Brings extensive knowledge in hitting mechanics and catching fundamentals. Known for his ability to connect with athletes and simplify complex concepts.',
  ARRAY['Hitting', 'Catching', 'Fundamentals'],
  '"Success comes from mastering the fundamentals. Every great player started with the basics."',
  '/COACHES/RAYTUREK.jpeg',
  '@rayray_24',
  3
),
(
  'Kurtis Dantona',
  'Infield & Hitting Coach',
  'Specializes in infield defense and hitting mechanics. Brings a modern approach to player development with emphasis on footwork and bat path efficiency.',
  ARRAY['Infield', 'Hitting', 'Defense'],
  '"Defense wins games, but offense puts butts in seats. We develop both."',
  '/COACHES/KURTIS.jpeg',
  '@kurt_dan23',
  4
),
(
  'Hector Tineo',
  'Pitching Coach',
  'Expert pitching coach with a focus on arm health, mechanics, and pitch design. Works with athletes from youth to professional levels.',
  ARRAY['Pitching', 'Pitch Design', 'Arm Health'],
  '"Every pitcher has unique strengths. Our job is to find them and maximize them."',
  '/COACHES/HECTORTINEO.jpeg',
  '@hectortineo_20',
  5
),
(
  'Kevin Thompson',
  'Hitting Coach',
  'Passionate hitting instructor with a track record of developing consistent, powerful hitters. Emphasizes bat speed, launch angle, and approach.',
  ARRAY['Hitting', 'Bat Speed', 'Approach'],
  '"Your swing is your signature. Let''s make it unforgettable."',
  '/COACHES/KEVINTHOMPSON.jpeg',
  '@coach_kt305',
  6
),
(
  'Nick Derr',
  'Hitting & Infield Coach',
  'Former collegiate standout. Brings high-energy instruction to every lesson with focus on swing mechanics and infield fundamentals.',
  ARRAY['Hitting', 'Infield', 'Agility'],
  '"Energy is contagious. Bring it every single day."',
  '/COACHES/NICKDERR.jpeg',
  '@nick_derr5',
  7
),
(
  'Michael Balsinger',
  'Hitting & Infield Coach',
  'Dedicated to developing well-rounded athletes through comprehensive hitting and infield training. Known for his meticulous attention to detail.',
  ARRAY['Hitting', 'Infield', 'Footwork'],
  '"Details make the difference. We leave no stone unturned."',
  '/COACHES/MICHAELBALSINGER.jpeg',
  '@mikebalsinger',
  8
),
(
  'Thomas Echevarria',
  'Strength & Conditioning Coach',
  'Certified S&C coach specializing in baseball and softball-specific training programs. Focuses on functional strength, mobility, and injury prevention.',
  ARRAY['Strength & Conditioning', 'Mobility', 'Injury Prevention'],
  '"Strength is the foundation of every athletic movement. We build it the right way."',
  '/COACHES/THOMASECHEVARRIA.jpeg',
  '@t.coach.e',
  9
),
(
  'Dave Yost',
  'Head Baseball & Softball Coach',
  'Oversees the entire player development curriculum. With decades of coaching experience, Dave ensures every program meets the highest standards of excellence.',
  ARRAY['Player Development', 'Baseball', 'Softball', 'Program Design'],
  '"Excellence is not a destination. It is a daily practice."',
  '/COACHES/DAVEYOST.jpeg',
  '@daveyost',
  10
),
(
  'Trevor Pellot',
  'Hitting & Outfield Coach',
  'Specializes in outfield play and hitting mechanics. Brings energy and expertise to every training session.',
  ARRAY['Hitting', 'Outfield', 'Speed'],
  '"Hard work beats talent when talent doesn''t work hard."',
  '/COACHES/TREVORPELLOT.jpeg',
  '@tpellot3',
  11
),
(
  'Gianni Valentini',
  'Pitching & Hitting Coach',
  'Versatile coach skilled in both pitching and hitting instruction. Brings a unique dual perspective to player development.',
  ARRAY['Pitching', 'Hitting', 'Versatility'],
  '"Understanding both sides of the game makes you a better coach and a better player."',
  '/COACHES/GIANNIVALENTINI.jpeg',
  '@giannivalentini04',
  12
);

-- Events
INSERT INTO events (title, slug, description, short_description, date, end_date, price, age_group, location, image_url, highlights, category_id, featured, order_index)
SELECT * FROM (
  VALUES
    (
      'Summer Elite Camp',
      'summer-elite-camp-2025',
      'Our premier summer camp featuring professional instruction, live game play, and college recruitment exposure. Three days of intensive training covering hitting, pitching, fielding, and base running.',
      'Three-day elite training camp with pro instruction and college exposure.',
      '2025-07-21', '2025-07-23',
      '$299', '8-18', 'Ballplex Facility',
      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
      ARRAY['Professional instruction', 'Live game play', 'College coach showcase', 'Position-specific training', 'Strength & conditioning session'],
      (SELECT id FROM event_categories WHERE slug = 'camps'), true, 1
    ),
    (
      'Fall Baseball Classic',
      'fall-baseball-classic-2025',
      'A competitive weekend tournament for travel teams and local clubs. Multiple age divisions with championship format. All games played at premier fields in Brevard County.',
      'Weekend tournament for travel teams in multiple age divisions.',
      '2025-10-11', '2025-10-13',
      '$450/team', '8-14', 'Viera, FL',
      'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800',
      ARRAY['Multiple age divisions', 'Championship format', 'Professional umpires', 'Team awards', 'Player stats tracked'],
      (SELECT id FROM event_categories WHERE slug = 'tournaments'), true, 2
    ),
    (
      'Thanksgiving Turkey Camp',
      'thanksgiving-turkey-camp-2025',
      'Keep your skills sharp over the holiday break! Two days of focused training including defensive drills, hitting stations, and live at-bats.',
      'Two-day skills camp during Thanksgiving break.',
      '2025-11-25', '2025-11-26',
      '$149', '7-14', 'Ballplex Facility',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
      ARRAY['Defensive drills', 'Hitting stations', 'Live at-bats', 'Speed & agility'],
      (SELECT id FROM event_categories WHERE slug = 'camps'), false, 3
    ),
    (
      'Christmas Break Clinic',
      'christmas-break-clinic-2025',
      'Don''t let your skills cool down over winter break! Four days of position-specific training with our elite coaching staff.',
      'Four-day winter break skills clinic.',
      '2025-12-22', '2025-12-26',
      '$249', '7-18', 'Ballplex Facility',
      'https://images.unsplash.com/photo-1478144592103-25e218a04891?w=800',
      ARRAY['Position-specific training', 'Hitting & pitching', 'Cage sessions', 'Strength training'],
      (SELECT id FROM event_categories WHERE slug = 'camps'), false, 4
    ),
    (
      'MLK Weekend Showcase',
      'mlk-weekend-showcase-2026',
      'College recruitment showcase featuring measurable drills, live game action, and direct exposure to college coaches from across the Southeast.',
      'College recruitment showcase with live game action and coach exposure.',
      '2026-01-17', '2026-01-19',
      '$199', '14-18', 'Ballplex Facility',
      'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf8b?w=800',
      ARRAY['Measurable drills (60yd, exit velo, velo)', 'Live game action', 'College coach Q&A', 'Recruitment seminar for parents'],
      (SELECT id FROM event_categories WHERE slug = 'showcases'), true, 5
    ),
    (
      'Spring Training Showcase',
      'spring-training-showcase-2026',
      'Prepare for the spring season with our comprehensive showcase event. Metrics, game play, and college coach attendance.',
      'Pre-spring season showcase with metrics and game play.',
      '2026-02-14', '2026-02-15',
      '$179', '14-18', 'Ballplex Facility',
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
      ARRAY['Pro-style workout', 'Defensive evaluations', 'Batting practice', 'Bullpen sessions'],
      (SELECT id FROM event_categories WHERE slug = 'showcases'), false, 6
    ),
    (
      'Pitching Mechanics Clinic',
      'pitching-mechanics-clinic-2026',
      'Master your mechanics in this focused clinic led by our Head Pitching Coach. Limited spots for maximum individual attention.',
      'Focused pitching mechanics clinic with limited spots.',
      '2026-03-08',
      '$79', '10-18', 'Ballplex Facility',
      'https://images.unsplash.com/photo-1631714783727-b01aef4c6b4d?w=800',
      ARRAY['Video analysis', 'Mechanical breakdown', 'Arm care program', 'Bullpen session'],
      (SELECT id FROM event_categories WHERE slug = 'clinics'), false, 7
    ),
    (
      'Hitting Mechanics Clinic',
      'hitting-mechanics-clinic-2026',
      'Join our Director of Hitting for a deep dive into swing mechanics, bat path efficiency, and approach at the plate.',
      'Deep-dive hitting mechanics clinic.',
      '2026-03-22',
      '$79', '10-18', 'Ballplex Facility',
      'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800',
      ARRAY['Swing analysis', 'Bat path drills', 'Approach & strategy', 'HitTrax data review'],
      (SELECT id FROM event_categories WHERE slug = 'clinics'), false, 8
    ),
    (
      'Easter Weekend Tournament',
      'easter-weekend-tournament-2026',
      'A great way to spend Easter weekend! Competitive tournament play in a fun, family-friendly environment.',
      'Competitive Easter weekend tournament.',
      '2026-04-04', '2026-04-06',
      '$425/team', '8-14', 'Viera, FL',
      'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=800',
      ARRAY['Pool play + bracket', 'Team awards', 'Home run derby', 'Skills competition'],
      (SELECT id FROM event_categories WHERE slug = 'tournaments'), false, 9
    ),
    (
      'Family Fun Day',
      'family-fun-day-2026',
      'A free community event with inflatables, games, food trucks, and baseball/softball activities for the whole family. Meet our coaches and tour the facility!',
      'Free community event with games, food, and baseball activities.',
      '2026-05-16',
      'Free', 'All Ages', 'Ballplex Facility',
      'https://images.unsplash.com/photo-1579208575657-c595a63483b7?w=800',
      ARRAY['Baseball & softball activities', 'Inflatables & games', 'Food trucks', 'Facility tours', 'Meet the coaches'],
      (SELECT id FROM event_categories WHERE slug = 'community'), true, 10
    )
) AS e;

-- Testimonials
INSERT INTO testimonials (name, relation, content, rating, order_index) VALUES
  (
    'Lorena Brown',
    'Athlete''s Mom',
    'Every coach we''ve encountered at Ballplex has been deeply invested in the athletes they train. Whether it''s hitting, catching, pitching, or fielding, they tailor their instruction to your child''s unique needs, building on their strengths while helping them grow in all aspects of the game. If you''re a parent considering joining Ballplex, I can''t recommend it enough.',
    5, 1
  ),
  (
    'Wes Herold',
    'Athlete''s Dad',
    'Both girls have grown tremendously in balance and form, but most importantly in their confidence.',
    5, 2
  ),
  (
    'Thelma Tortolo',
    'Athlete''s Mom',
    'Her mindset as a player has changed a lot. The coaches have done an excellent job both physically and mentally. On the field, she is able to make decisions by recalling the work done in her hitting lessons, showing a lot of confidence. She has made great progress and always maintains effective communication with her coach.',
    5, 3
  );
