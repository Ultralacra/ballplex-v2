-- Limpiar imágenes de coaches que no existen en Storage
-- Solo JAMIE.jpeg, Rylan.jpeg y Taylor Jensen.jpeg existen localmente y se subieron
UPDATE coaches SET image_url = '' WHERE image_url NOT IN (
  'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets/COACHES/JAMIE.jpeg',
  '/COACHES/JAMIE.jpeg',
  'COACHES/JAMIE.jpeg',
  'JAMIE.jpeg'
) AND image_url != '';
