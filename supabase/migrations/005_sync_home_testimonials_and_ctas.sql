-- Align existing local content with the current testimonials and CTA copy.
UPDATE testimonials
SET
  name = CASE order_index
    WHEN 1 THEN 'Lorena Brown'
    WHEN 2 THEN 'Wes Herold'
    WHEN 3 THEN 'Thelma Tortolo'
  END,
  relation = CASE order_index
    WHEN 1 THEN 'Athlete''s Mom'
    WHEN 2 THEN 'Athlete''s Dad'
    WHEN 3 THEN 'Athlete''s Mom'
  END,
  content = CASE order_index
    WHEN 1 THEN 'Every coach we''ve encountered at Ballplex has been deeply invested in the athletes they train. Whether it''s hitting, catching, pitching, or fielding, they tailor their instruction to your child''s unique needs, building on their strengths while helping them grow in all aspects of the game. If you''re a parent considering joining Ballplex, I can''t recommend it enough.'
    WHEN 2 THEN 'Both girls have grown tremendously in balance and form, but most importantly in their confidence.'
    WHEN 3 THEN 'Her mindset as a player has changed a lot. The coaches have done an excellent job both physically and mentally. On the field, she is able to make decisions by recalling the work done in her hitting lessons, showing a lot of confidence. She has made great progress and always maintains effective communication with her coach.'
  END,
  rating = 5
WHERE order_index IN (1, 2, 3);

UPDATE page_sections
SET props = jsonb_set(
  props,
  '{description}',
  '"Join the most complete baseball and softball development center in Brevard County. Everything you need — coaching, technology, training, and community — all under one roof."'::jsonb
)
WHERE type = 'cta_banner';