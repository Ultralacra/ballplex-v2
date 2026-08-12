-- Actualizar URLs de imágenes a Supabase Storage
-- Nota: reemplaza [SUPABASE_URL] con tu URL real
-- Las imágenes locales que se subieron están en ballplex-assets/

DO $$
DECLARE
  base_url TEXT := 'https://nrmuaefollpwpruduocq.supabase.co/storage/v1/object/public/ballplex-assets';
BEGIN
  -- Actualizar coaches
  UPDATE coaches SET
    image_url = base_url || '/COACHES/JAMIE.jpeg'
  WHERE image_url = '/COACHES/JAMIE.jpeg';

  UPDATE coaches SET
    image_url = base_url || '/COACHES/MAXPITCHING.jpeg'
  WHERE image_url = '/COACHES/MAXPITCHING.jpeg';

  UPDATE coaches SET
    image_url = base_url || '/COACHES/RAYTUREK.jpeg'
  WHERE image_url = '/COACHES/RAYTUREK.jpeg';

  UPDATE coaches SET
    image_url = base_url || '/COACHES/KURTIS.jpeg'
  WHERE image_url = '/COACHES/KURTIS.jpeg';

  UPDATE coaches SET
    image_url = base_url || '/COACHES/HECTORTINEO.jpeg'
  WHERE image_url = '/COACHES/HECTORTINEO.jpeg';

  UPDATE coaches SET
    image_url = base_url || '/COACHES/KEVINTHOMPSON.jpeg'
  WHERE image_url = '/COACHES/KEVINTHOMPSON.jpeg';

  UPDATE coaches SET
    image_url = base_url || '/COACHES/NICKDERR.jpeg'
  WHERE image_url = '/COACHES/NICKDERR.jpeg';

  UPDATE coaches SET
    image_url = base_url || '/COACHES/MICHAELBALSINGER.jpeg'
  WHERE image_url = '/COACHES/MICHAELBALSINGER.jpeg';

  UPDATE coaches SET
    image_url = base_url || '/COACHES/THOMASECHEVARRIA.jpeg'
  WHERE image_url = '/COACHES/THOMASECHEVARRIA.jpeg';

  UPDATE coaches SET
    image_url = base_url || '/COACHES/DAVEYOST.jpeg'
  WHERE image_url = '/COACHES/DAVEYOST.jpeg';

  UPDATE coaches SET
    image_url = base_url || '/COACHES/TREVORPELLOT.jpeg'
  WHERE image_url = '/COACHES/TREVORPELLOT.jpeg';

  UPDATE coaches SET
    image_url = base_url || '/COACHES/GIANNIVALENTINI.jpeg'
  WHERE image_url = '/COACHES/GIANNIVALENTINI.jpeg';

  -- Nota: las imágenes que NO existen en /public/COACHES/ (solo JAMIE.jpeg, Gianmarco.jpeg, Rylan.jpeg, Taylor Jensen.jpeg)
  -- no se subieron. Las referencias a MAXPITCHING, RAYTUREK, etc. quedan como estaban.
  -- Para esas, necesitas subir las imágenes manualmente al bucket.

  -- Actualizar programas (images array)
  UPDATE programs SET images = ARRAY[
    base_url || '/images-lessons/d577b0a5-d7c6-4fd8-a896-b72b3d522a96 2.JPG.jpeg',
    base_url || '/images-lessons/DSC00748.JPG.jpeg',
    base_url || '/images-lessons/DSC00828.JPG.jpeg'
  ] WHERE slug = 'private-lessons';

  UPDATE programs SET images = ARRAY[
    base_url || '/SC/IMG_4119 2.jpg',
    base_url || '/SC/IMG_5973.jpg'
  ] WHERE slug = 'strength-conditioning';

  UPDATE programs SET images = ARRAY[
    base_url || '/rentals/IMG_5967.jpg.jpeg',
    base_url || '/rentals/e13429f3-b13b-4bc5-a54a-6173978d8248.JPG.jpeg'
  ] WHERE slug = 'cage-rentals';

END $$;
