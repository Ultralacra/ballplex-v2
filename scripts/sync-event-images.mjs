import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';
import { config } from 'dotenv';

config({ path: join(process.cwd(), '.env.local') });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) throw new Error('Missing Supabase credentials in .env.local');

const supabase = createClient(url, serviceKey);
const bucket = 'ballplex-assets';
const publicUrl = `${url}/storage/v1/object/public/${bucket}`;
const root = join(process.cwd(), 'public');

const images = {
  'summer-elite-camp-2025': 'images-lessons/DSC00828.JPG.jpeg',
  'fall-baseball-classic-2025': 'images-lessons/DSC00748.JPG.jpeg',
  'thanksgiving-turkey-camp-2025': 'SC/IMG_5973.jpg',
  'christmas-break-clinic-2025': 'SC/IMG_4119 2.jpg',
  'mlk-weekend-showcase-2026': 'rentals/IMG_5967.jpg.jpeg',
  'spring-training-showcase-2026': 'rentals/e13429f3-b13b-4bc5-a54a-6173978d8248.JPG.jpeg',
  'pitching-mechanics-clinic-2026': 'images-lessons/d577b0a5-d7c6-4fd8-a896-b72b3d522a96 2.JPG.jpeg',
  'hitting-mechanics-clinic-2026': 'images-lessons/DSC00828.JPG.jpeg',
  'easter-weekend-tournament-2026': 'SC/IMG_5973.jpg',
  'family-fun-day-2026': 'rentals/IMG_5967.jpg.jpeg',
};

const mime = (path) => path.endsWith('.png') ? 'image/png' : 'image/jpeg';

async function main() {
  const { data: buckets } = await supabase.storage.listBuckets();
  if (!buckets?.some((item) => item.name === bucket)) {
    const { error } = await supabase.storage.createBucket(bucket, { public: true });
    if (error) throw error;
  }

  for (const [slug, source] of Object.entries(images)) {
    const filePath = `events/${slug}.jpg`;
    const { error: uploadError } = await supabase.storage.from(bucket).upload(
      filePath,
      readFileSync(join(root, source)),
      { contentType: mime(source), upsert: true },
    );
    if (uploadError) throw uploadError;

    const { error: updateError } = await supabase
      .from('events')
      .update({ image_url: `${publicUrl}/${filePath}` })
      .eq('slug', slug);
    if (updateError) throw updateError;
    console.log(`Synced ${slug}`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});