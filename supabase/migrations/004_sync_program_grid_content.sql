-- Align local programs data with the content and anchors rendered by the production grid.
UPDATE programs
SET
  slug = CASE title
    WHEN 'Private Lessons' THEN 'lessons'
    WHEN 'Strength & Conditioning' THEN 'strength'
    WHEN 'Cage Rentals' THEN 'rentals'
    WHEN 'Camps & Events' THEN 'camps'
    ELSE slug
  END,
  description = CASE title
    WHEN 'Private Lessons' THEN 'Personalized 1-on-1 or duo instruction in hitting, pitching, catching, and fielding. HitTrax and Rapsodo technology available for detailed performance tracking.'
    WHEN 'Memberships' THEN 'Monthly plans designed for athletes who take their development seriously. Includes assessments, programming, open cage time, and exclusive discounts.'
    WHEN 'Strength & Conditioning' THEN 'Sport-specific training led by Coach Gianmarco Marcelletti. Semi-private sessions for ages 7+ with focus on injury prevention, speed, power, and agility.'
    WHEN 'Homeschool Program' THEN 'A complete academic and athletic program for competitive baseball and softball student-athletes. Daily training with our coaches combined with a nationally recognized curriculum led by our certified teachers.'
    WHEN 'Cage Rentals' THEN '6,000 sqft of indoor cage space with 5 cages available for individual, duo or team rentals. Pitching machines and equipment options available.'
    WHEN 'Camps & Events' THEN 'Seasonal baseball and softball camps designed to accelerate player development in a team environment. Special events hosted year-round.'
    ELSE description
  END,
  pricing = CASE title
    WHEN 'Private Lessons' THEN jsonb_set(pricing, '{0,price}', '"From $80/hr"')
    WHEN 'Memberships' THEN jsonb_set(pricing, '{0,price}', '"From $95/month"')
    WHEN 'Strength & Conditioning' THEN jsonb_set(pricing, '{0,price}', '"From $200/month"')
    WHEN 'Cage Rentals' THEN jsonb_set(pricing, '{0,price}', '"From $40/hr"')
    ELSE pricing
  END
WHERE title IN ('Private Lessons', 'Memberships', 'Strength & Conditioning', 'Homeschool Program', 'Cage Rentals', 'Camps & Events');