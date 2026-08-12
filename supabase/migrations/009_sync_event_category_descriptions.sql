-- Keep event category copy aligned with production.
UPDATE event_categories
SET description = CASE slug
  WHEN 'camps' THEN 'Multi-day intensive training camps designed to accelerate player development.'
  WHEN 'tournaments' THEN 'Competitive tournaments for travel teams and local organizations.'
  WHEN 'clinics' THEN 'Focused single-day clinics on specific skills like hitting, pitching, and defense.'
  WHEN 'showcases' THEN 'Showcase events for athletes looking to get recruited by college programs.'
  WHEN 'community' THEN 'Family-friendly events, fundraisers, and open-house celebrations.'
  ELSE description
END
WHERE slug IN ('camps', 'tournaments', 'clinics', 'showcases', 'community');