-- ============================================
-- Ballplex - Page Sections Seed Data
-- ============================================

-- ============================================
-- HOME PAGE
-- ============================================
INSERT INTO page_sections (page_slug, type, label, props, order_index) VALUES
(
  'home', 'hero', 'Hero Section',
  '{
    "videoSrc": "/ballplex-promo.mp4",
    "tagline": "Learn. Develop. Perform.",
    "description": "Elite Baseball & Softball Player Development in Viera, Florida. Private Lessons, Homeschool Program, Strength & Conditioning and Cage Rentals.",
    "location": "Viera, Florida",
    "primaryCTA": {"text": "Get Started", "href": "https://book.runswiftapp.com/facilities/ballplex"},
    "secondaryCTA": {"text": "Explore Programs", "href": "/programs"}
  }',
  1
),
(
  'home', 'stats', 'Stats Bar',
  '{
    "stats": [
      {"value": "150+", "label": "Athletes Trained Weekly"},
      {"value": "10,500", "label": "sqft Climate-Controlled"},
      {"value": "40+", "label": "Homeschool Athletes"},
      {"value": "12", "label": "Professional Coaches"}
    ]
  }',
  2
),
(
  'home', 'programs_grid', 'Programs Grid',
  '{
    "title": "Built for Athletes Development",
    "subtitle": "Technology to Track Your Progress, two Facilities and an Elite Coaching Team."
  }',
  3
),
(
  'home', 'facility', 'Facility Features',
  '{
    "title": "Why Athletes Choose Ballplex",
    "subtitle": "Technology to Track Your Progress, two Facilities and an Elite Coaching Team.",
    "features": [
      {"icon": "target", "title": "HitTrax System", "description": "Real-time hitting analytics and simulation technology for the most precise player development data available."},
      {"icon": "radar", "title": "Rapsodo", "description": "Pro-level pitch and hitting tracking that measures velocity, spin rate, exit velo, and launch angle."},
      {"icon": "snowflake", "title": "25 Tons of A/C", "description": "Full climate control across the entire facility. Train comfortably year-round regardless of Florida weather."},
      {"icon": "dumbbell", "title": "Full Gym", "description": "Complete strength and conditioning setup designed specifically for baseball and softball athletes."},
      {"icon": "layers", "title": "Turf & Cages", "description": "Premium turf playing surface and 5 indoor batting cages with Hack Attack pitching machines."},
      {"icon": "ruler", "title": "10,500 sqft", "description": "Massive indoor training space. Everything — hitting, pitching, defense, and strength — in specialized facilities."}
    ],
    "images": [
      "https://theballplex.com/wp-content/uploads/brizy/imgs/IMG_4117-548x731x0x80x548x570x1758559312.webp",
      "https://theballplex.com/wp-content/uploads/brizy/imgs/IMG_4121-323x431x0x86x323x259x1758559372.webp"
    ]
  }',
  4
),
(
  'home', 'coaches_grid', 'Coaches Grid',
  '{
    "title": "Meet the Team",
    "subtitle": "Former professional players with Division 1 experience and years coaching young athletes."
  }',
  5
),
(
  'home', 'testimonials_grid', 'Testimonials',
  '{
    "title": "What Parents Say",
    "subtitle": "Hear from our community about the Ballplex difference."
  }',
  6
),
(
  'home', 'cta_banner', 'CTA Banner',
  '{
    "title": "Ready to Take Your Game\nto the Next Level?",
    "description": "Join the most complete baseball and softball development center in Brevard County. Everything you need — coaching, technology, training, and community — all under one roof.",
    "primaryCTA": {"text": "Get Started Today", "href": "https://book.runswiftapp.com/facilities/ballplex"},
    "secondaryCTA": {"text": "Contact Us", "href": "/contact"}
  }',
  7
);

-- ============================================
-- PROGRAMS PAGE
-- ============================================
INSERT INTO page_sections (page_slug, type, label, props, order_index) VALUES
(
  'programs', 'hero', 'Page Hero',
  '{
    "videoSrc": "",
    "tagline": "Built for Athletes Development",
    "description": "Technology to Track Your Progress, two Facilities and an Elite Coaching Team.",
    "location": "Services",
    "primaryCTA": {"text": "", "href": ""},
    "secondaryCTA": {"text": "", "href": ""}
  }',
  1
),
(
  'programs', 'pricing_table', 'Private Lessons',
  '{
    "title": "1-on-1 & Duo Instruction",
    "subtitle": "Private Lessons",
    "description": "Whether your goal is to make the team, earn a starting spot, or get recruited by top college programs, our coaches are here to help you get there.",
    "plans": [
      {"name": "Hitting / Fielding / Catching", "price": "$80 / $100", "duration": "Private / Duo", "description": "Swing mechanics, approach, Rapsodo data"},
      {"name": "Softball Pitching", "price": "$80 / $100", "duration": "Private / Duo", "description": "Mechanics, velocity, arm care"},
      {"name": "Baseball Pitching", "price": "$80 / $100", "duration": "Private / Duo", "description": "Mechanics, velocity, arm care, pitch design"}
    ]
  }',
  2
),
(
  'programs', 'pricing_table', 'Memberships',
  '{
    "title": "Three Tiers. One Goal.",
    "subtitle": "Memberships",
    "description": "Plans designed for athletes who take their development seriously. Each plan adds real value with assessments, programming, and exclusive benefits.",
    "plans": [
      {"name": "Pro", "price": "$95", "duration": "/mo", "description": "Assessment Sessions. App Access + Programming. 10% Off Store & Events. S&C from $240/mo. Lessons: $75 single / $45 duo"},
      {"name": "All-Access", "price": "$175", "duration": "/mo", "description": "Unlimited Open Cage (+1 Guest). 1 Monthly HitTrax Rental. Open Gym (16+). 15% Off Store & Events. S&C from $240/mo"},
      {"name": "Elite", "price": "$295", "duration": "/mo", "description": "Assessment + Programming. Unlimited Open Cage (+1 Guest). Open Gym (16+). 20% Off Store & Events. S&C from $200/mo. Lessons: $65 single / $40 duo"}
    ],
    "highlighted_index": 1
  }',
  3
),
(
  'programs', 'pricing_table', 'Strength & Conditioning',
  '{
    "title": "Stronger. Faster. Unstoppable.",
    "subtitle": "Strength & Conditioning",
    "description": "Sport-specific training for baseball and softball athletes.",
    "plans": [
      {"name": "2 Days/Week", "price": "$240 / $280", "duration": "Members / Non-Members", "description": "Drop-in: $50"},
      {"name": "3 Days/Week", "price": "$315 / $375", "duration": "Members / Non-Members", "description": "Drop-in: $50"},
      {"name": "4 Days/Week", "price": "$375 / $435", "duration": "Members / Non-Members", "description": "Drop-in: $50"}
    ]
  }',
  4
),
(
  'programs', 'schedule_table', 'S&C Schedule',
  '{
    "title": "Training Schedule",
    "items": [
      {"day": "3:30-5:30PM", "time": "Ages 7-10"},
      {"day": "5:30-7:30PM", "time": "Ages 11-14"},
      {"day": "7:30-9:30PM", "time": "High School"}
    ]
  }',
  5
),
(
  'programs', 'pricing_table', 'Cage Rentals',
  '{
    "title": "5 Indoor Cages. Unlimited Possibilities.",
    "subtitle": "Cage Rentals",
    "description": "6,000 sqft of indoor cage space with 5 cages available for individual, duo or team rentals.",
    "plans": [
      {"name": "Just the Cage", "price": "$40-$95", "duration": "1 Hour", "description": "1 Lane 45ft: $40 / 2 Lanes 45ft: $75 / 1 Lane 70ft: $55 / 2 Lanes 70ft: $95"},
      {"name": "Cage + Equipment", "price": "$45-$100", "duration": "1 Hour", "description": "1 Lane 45ft: $45 / 2 Lanes 45ft: $80 / 1 Lane 70ft: $60 / 2 Lanes 70ft: $100"},
      {"name": "Cage + Machine + Equip", "price": "$50-$105", "duration": "1 Hour", "description": "1 Lane 45ft: $50 / 2 Lanes 45ft: $85 / 1 Lane 70ft: $65 / 2 Lanes 70ft: $105"}
    ]
  }',
  6
),
(
  'programs', 'coaches_grid', 'Coaching Staff',
  '{
    "title": "Meet the Team",
    "subtitle": "Former professional players with Division 1 experience and years coaching young athletes."
  }',
  7
),
(
  'programs', 'cta_banner', 'CTA Banner',
  '{
    "title": "Ready to Take Your Game\nto the Next Level?",
    "description": "Join the most complete baseball and softball development center in Brevard County.",
    "primaryCTA": {"text": "Get Started Today", "href": "https://book.runswiftapp.com/facilities/ballplex"},
    "secondaryCTA": {"text": "Contact Us", "href": "/contact"}
  }',
  8
);

-- ============================================
-- EVENTS PAGE
-- ============================================
INSERT INTO page_sections (page_slug, type, label, props, order_index) VALUES
(
  'events', 'hero', 'Page Hero',
  '{
    "videoSrc": "",
    "tagline": "Train. Compete. Connect.",
    "description": "Year-round camps, tournaments, clinics, and community events for athletes of all ages and skill levels.",
    "location": "Camps & Events",
    "primaryCTA": {"text": "", "href": ""},
    "secondaryCTA": {"text": "", "href": ""}
  }',
  1
),
(
  'events', 'events_grid', 'Featured Events',
  '{
    "title": "Can\'t Miss Events",
    "subtitle": "Our marquee events. Early registration is strongly recommended — spots fill fast."
  }',
  2
),
(
  'events', 'event_categories_grid', 'Browse by Category',
  '{
    "title": "Find the Right Event",
    "subtitle": "Camps, tournaments, clinics, showcases, and community events — there\'s something for everyone."
  }',
  3
),
(
  'events', 'facility', 'Why Attend',
  '{
    "title": "The Ballplex Difference",
    "subtitle": "Our events are more than just games — they\'re opportunities to grow, get seen, and get better.",
    "features": [
      {"icon": "TipsAndUpdates", "title": "Pro-Level Tech", "description": "HitTrax and Rapsodo at every camp and clinic. Real data, real results, real development."},
      {"icon": "School", "title": "Expert Coaching", "description": "Every event is staffed by former pros, D1 players, and certified coaches who care about development."},
      {"icon": "VisibilityIcon", "title": "Recruiting Exposure", "description": "Showcases with verified metrics and video packages sent directly to college programs."},
      {"icon": "Groups", "title": "Community", "description": "Our family events and open play nights create a welcoming environment where everyone belongs."}
    ]
  }',
  4
),
(
  'events', 'events_grid', 'All Events',
  '{
    "title": "Upcoming Schedule",
    "subtitle": "Browse all upcoming camps, clinics, tournaments, showcases, and community events."
  }',
  5
),
(
  'events', 'cta_banner', 'CTA Banner',
  '{
    "title": "Ready to Take Your Game\nto the Next Level?",
    "description": "Join the most complete baseball and softball development center in Brevard County.",
    "primaryCTA": {"text": "Get Started Today", "href": "https://book.runswiftapp.com/facilities/ballplex"},
    "secondaryCTA": {"text": "Contact Us", "href": "/contact"}
  }',
  6
);

-- ============================================
-- HOMESCHOOL PAGE
-- ============================================
INSERT INTO page_sections (page_slug, type, label, props, order_index) VALUES
(
  'homeschool', 'homeschool_hero', 'Page Hero',
  '{
    "title": "Built for Advanced Athletes",
    "subtitle": "Homeschool Program",
    "description": "A complete academic and athletic program for competitive baseball and softball student-athletes. Daily training with our coaches combined with a nationally recognized curriculum led by our certified teachers.",
    "cta": {"text": "", "href": ""}
  }',
  1
),
(
  'homeschool', 'homeschool_academics', 'Academics & Training',
  '{
    "title": "Academics + Athletics. Every Day.",
    "description": "The Ballplex Homeschool Program is designed for competitive baseball and softball student-athletes who want to maximize their athletic development while maintaining a structured academic path.\n\nStudents follow a nationally recognized curriculum powered by Edmentum, supported by certified educators who monitor academic progress and ensure educational standards are met.\n\nTraining takes place in our 10,500 sq. ft. facility, where athletes work daily with an experienced coaching staff led by Coach Leo Rojas, former professional players and high-level coaches.",
    "features": [
      "Flexible academic schedule",
      "Daily baseball/softball training",
      "Strength & Conditioning included",
      "College recruitment guidance",
      "Small class sizes"
    ]
  }',
  2
),
(
  'homeschool', 'stats', 'Program Stats',
  '{
    "stats": [
      {"value": "10,500", "label": "sqft Facility"},
      {"value": "12", "label": "Pro Coaches"},
      {"value": "4", "label": "Days/Week"},
      {"value": "6th+", "label": "Grade Entry"}
    ]
  }',
  3
),
(
  'homeschool', 'cta_banner', 'CTA Banner',
  '{
    "title": "Ready to Take Your Game\nto the Next Level?",
    "description": "Join the most complete baseball and softball development center in Brevard County.",
    "primaryCTA": {"text": "Get Started Today", "href": "https://book.runswiftapp.com/facilities/ballplex"},
    "secondaryCTA": {"text": "Contact Us", "href": "/contact"}
  }',
  4
);

-- ============================================
-- CONTACT PAGE
-- ============================================
INSERT INTO page_sections (page_slug, type, label, props, order_index) VALUES
(
  'contact', 'contact_info', 'Contact Information',
  '{
    "phone": "(321) 321-5558",
    "email": "manager@theballplex.com",
    "addresses": [
      {"label": "Rentals", "address": "7285 Waelti Dr., Viera, FL 32940, US."},
      {"label": "Player Development", "address": "7255 Waelti Dr., Viera, FL 32940, US."}
    ],
    "socials": {
      "instagram": "https://www.instagram.com/ballplex/",
      "facebook": "https://www.facebook.com/ballplex/"
    }
  }',
  1
),
(
  'contact', 'map_embed', 'Google Maps',
  '{
    "title": "Our Location",
    "address": "7255 Waelti Dr., Viera, FL 32940",
    "embedUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.5!2d-80.75!3d28.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88de0c5a2cf13d2b%3A0xf1f2c6c942a0b3c9!2s7255%20Waelti%20Dr%2C%20Melbourne%2C%20FL%2032940!5e0!3m2!1sen!2sus!4v1700000000000"
  }',
  2
),
(
  'contact', 'contact_form', 'Contact Form',
  '{}',
  3
);
