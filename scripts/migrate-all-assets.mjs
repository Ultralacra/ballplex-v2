import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import https from 'https';
import http from 'http';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = join(__dirname, '..');
config({ path: join(root, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error('Missing SUPABASE env vars in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);
const BUCKET = 'ballplex-assets';
const baseUrl = `${supabaseUrl}/storage/v1/object/public/${BUCKET}`;

// Each asset: { storagePath, localFile?, url? }
// storagePath must match what assetUrl() generates from original references
const ASSETS = [
  // === LOCAL FILES (mismo path relativo que en /public/) ===
  { storagePath: 'LOGO.png', localFile: 'public/LOGO.png' },
  { storagePath: 'ballplex-promo.mp4', localFile: 'public/ballplex-promo.mp4', note: '81MB - puede exceder limite free' },

  { storagePath: 'COACHES/JAMIE.jpeg', localFile: 'public/COACHES/JAMIE.jpeg' },
  { storagePath: 'COACHES/Rylan.jpeg', localFile: 'public/COACHES/Rylan.jpeg' },
  { storagePath: 'COACHES/Taylor Jensen.jpeg', localFile: 'public/COACHES/Taylor Jensen.jpeg' },
  { storagePath: 'COACHES/Gianmarco.jpeg', localFile: 'public/COACHES/Gianmarco.jpeg' },

  { storagePath: 'images-lessons/d577b0a5-d7c6-4fd8-a896-b72b3d522a96 2.JPG.jpeg', localFile: 'public/images-lessons/d577b0a5-d7c6-4fd8-a896-b72b3d522a96 2.JPG.jpeg' },
  { storagePath: 'images-lessons/DSC00748.JPG.jpeg', localFile: 'public/images-lessons/DSC00748.JPG.jpeg' },
  { storagePath: 'images-lessons/DSC00828.JPG.jpeg', localFile: 'public/images-lessons/DSC00828.JPG.jpeg' },

  { storagePath: 'SC/IMG_4119 2.jpg', localFile: 'public/SC/IMG_4119 2.jpg' },
  { storagePath: 'SC/IMG_5973.jpg', localFile: 'public/SC/IMG_5973.jpg' },

  { storagePath: 'rentals/IMG_5967.jpg.jpeg', localFile: 'public/rentals/IMG_5967.jpg.jpeg' },
  { storagePath: 'rentals/e13429f3-b13b-4bc5-a54a-6173978d8248.JPG.jpeg', localFile: 'public/rentals/e13429f3-b13b-4bc5-a54a-6173978d8248.JPG.jpeg' },

  // === EXTERNAL IMAGES (download de URLs y subir a Storage) ===
  // Coaches from theballplex.com
  { storagePath: 'external/coaches/leo-rojas.jpeg', url: 'https://theballplex.com/wp-content/uploads/brizy/imgs/3-480x320x73x0x353x320x1759182471.jpeg' },
  { storagePath: 'external/coaches/santiago-chirino.jpeg', url: 'https://theballplex.com/wp-content/uploads/brizy/imgs/2-480x320x68x0x353x320x1759181406.jpeg' },
  { storagePath: 'external/coaches/raychel-trocki.jpeg', url: 'https://theballplex.com/wp-content/uploads/brizy/imgs/4-478x319x62x0x354x319x1759182060.jpeg' },
  { storagePath: 'external/coaches/kyle-huckaby.jpeg', url: 'https://theballplex.com/wp-content/uploads/brizy/imgs/6-445x296x46x0x353x296x1759182173.jpeg' },
  { storagePath: 'external/coaches/tristen-carranza.png', url: 'https://theballplex.com/wp-content/uploads/brizy/imgs/Screen-Shot-2024-09-06-at-11.25.51-AM-353x372x0x0x353x296x1725636374.png' },
  { storagePath: 'external/coaches/jose-bermudez.jpeg', url: 'https://theballplex.com/wp-content/uploads/brizy/imgs/1-446x297x51x0x354x297x1759181286.jpeg' },
  { storagePath: 'external/coaches/melissa-martinez.jpeg', url: 'https://theballplex.com/wp-content/uploads/brizy/imgs/5-431x287x43x0x353x287x1759182302.jpeg' },
  { storagePath: 'external/coaches/austin-dennis.png', url: 'https://theballplex.com/wp-content/uploads/brizy/imgs/Screen-Shot-2024-05-02-at-6.00.35-PM-353x359x0x0x353x287x1714687262.png' },
  { storagePath: 'external/coaches/gianmarco-marcelletti.jpeg', url: 'https://mediumorchid-pig-468212.hostingersite.com/wp-content/uploads/2026/07/Gianmarco-scaled.jpeg' },

  // Facility images
  { storagePath: 'external/facility/img_4117.webp', url: 'https://theballplex.com/wp-content/uploads/brizy/imgs/IMG_4117-548x731x0x80x548x570x1758559312.webp' },
  { storagePath: 'external/facility/img_4121.webp', url: 'https://theballplex.com/wp-content/uploads/brizy/imgs/IMG_4121-323x431x0x86x323x259x1758559372.webp' },

  // Event images from Unsplash
  { storagePath: 'external/events/summer-elite-camp.jpg', url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800' },
  { storagePath: 'external/events/fall-classic.jpg', url: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800' },
  { storagePath: 'external/events/turkey-camp.jpg', url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800' },
  { storagePath: 'external/events/christmas-clinic.jpg', url: 'https://images.unsplash.com/photo-1478144592103-25e218a04891?w=800' },
  { storagePath: 'external/events/mlk-showcase.jpg', url: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf8b?w=800' },
  { storagePath: 'external/events/spring-showcase.jpg', url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800' },
  { storagePath: 'external/events/pitching-clinic.jpg', url: 'https://images.unsplash.com/photo-1631714783727-b01aef4c6b4d?w=800' },
  { storagePath: 'external/events/hitting-clinic.jpg', url: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800' },
  { storagePath: 'external/events/easter-tournament.jpg', url: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=800' },
  { storagePath: 'external/events/family-fun-day.jpg', url: 'https://images.unsplash.com/photo-1579208575657-c595a63483b7?w=800' },

  // External videos
  { storagePath: 'external/videos/cage-rentals-demo.mov', url: 'https://mediumorchid-pig-468212.hostingersite.com/wp-content/uploads/2026/07/IMG_6794.mov' },
  { storagePath: 'external/videos/homeschool-program.mp4', url: 'https://mediumorchid-pig-468212.hostingersite.com/wp-content/uploads/2026/07/Ball-Plex-HS-Program.mp4' },
];

function download(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { timeout: 120000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject).on('timeout', function() { this.destroy(); reject(new Error('Timeout')); });
  });
}

function getMimeType(name) {
  const ext = name.split('.').pop()?.toLowerCase().split('?')[0];
  const mimes = {
    jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
    gif: 'image/gif', webp: 'image/webp', svg: 'image/svg+xml',
    ico: 'image/x-icon', mp4: 'video/mp4', mov: 'video/quicktime',
    webm: 'video/webm',
  };
  return mimes[ext] || 'application/octet-stream';
}

async function ensureBucket() {
  const { data: buckets } = await supabase.storage.listBuckets();
  if (buckets?.some((b) => b.name === BUCKET)) return;
  const { error } = await supabase.storage.createBucket(BUCKET, { public: true });
  if (error) throw new Error(`Failed to create bucket: ${error.message}`);
  console.log(`Bucket "${BUCKET}" created`);
}

async function existsOnStorage(storagePath) {
  const parts = storagePath.split('/');
  const fileName = parts.pop();
  const folder = parts.join('/');
  if (!folder) {
    const { data } = await supabase.storage.from(BUCKET).list('', { search: fileName });
    return data?.some((f) => f.name === fileName) ?? false;
  }
  const { data } = await supabase.storage.from(BUCKET).list(folder, { search: fileName });
  return data?.some((f) => f.name === fileName) ?? false;
}

async function main() {
  console.log('Ensuring bucket...');
  await ensureBucket();
  console.log(`\nTotal assets to process: ${ASSETS.length}\n`);

  let ok = 0, fail = 0, skip = 0;

  for (const asset of ASSETS) {
    const exists = await existsOnStorage(asset.storagePath);
    if (exists) {
      console.log(`  SKIP  ${asset.storagePath}`);
      skip++;
      continue;
    }

    try {
      let buffer;
      if (asset.localFile) {
        buffer = readFileSync(join(root, asset.localFile));
        console.log(`  READ  ${asset.localFile}`);
      } else if (asset.url) {
        console.log(`  DL    ${asset.storagePath}...`);
        buffer = await download(asset.url);
      } else continue;

      const { error } = await supabase.storage.from(BUCKET).upload(asset.storagePath, buffer, {
        contentType: getMimeType(asset.storagePath),
        upsert: true,
      });
      if (error) throw new Error(error.message);

      console.log(`  OK    ${asset.storagePath}  (${(buffer.length / 1024 / 1024).toFixed(1)}MB)`);
      ok++;
    } catch (err) {
      console.error(`  FAIL  ${asset.storagePath}: ${err.message}`);
      fail++;
    }
  }

  console.log(`\n=== RESULT ===`);
  console.log(`OK: ${ok} | Skipped: ${skip} | Failed: ${fail}`);
  console.log(`Storage base: ${baseUrl}`);

  // ====== GENERAR SQL UPDATE ======
  let sql = `-- Actualizar referencias a Supabase Storage\n`;
  sql += `-- Base URL: ${baseUrl}\n\n`;

  // Coaches
  const coachMap = [
    ['Leo Rojas', 'external/coaches/leo-rojas.jpeg'],
    ['Santiago Chirino', 'external/coaches/santiago-chirino.jpeg'],
    ['Raychel Trocki', 'external/coaches/raychel-trocki.jpeg'],
    ['Kyle Huckaby', 'external/coaches/kyle-huckaby.jpeg'],
    ['Tristen Carranza', 'external/coaches/tristen-carranza.png'],
    ['José Bermúdez', 'external/coaches/jose-bermudez.jpeg'],
    ['Melissa Martínez', 'external/coaches/melissa-martinez.jpeg'],
    ['Austin Dennis', 'external/coaches/austin-dennis.png'],
    ['Jamie Gilbert', 'COACHES/JAMIE.jpeg'],
    ['Gianmarco Marcelletti', 'external/coaches/gianmarco-marcelletti.jpeg'],
    ['Rylan Thomas', 'COACHES/Rylan.jpeg'],
    ['Taylor Jensen', 'COACHES/Taylor Jensen.jpeg'],
  ];
  for (const [name, path] of coachMap) {
    sql += `UPDATE coaches SET image_url = '${baseUrl}/${path}' WHERE name = '${name.replace(/'/g, "''")}';\n`;
  }

  // Events
  const eventMap = [
    ['summer-elite-camp-2025', 'external/events/summer-elite-camp.jpg'],
    ['fall-baseball-classic-2025', 'external/events/fall-classic.jpg'],
    ['thanksgiving-turkey-camp-2025', 'external/events/turkey-camp.jpg'],
    ['christmas-break-clinic-2025', 'external/events/christmas-clinic.jpg'],
    ['mlk-weekend-showcase-2026', 'external/events/mlk-showcase.jpg'],
    ['spring-training-showcase-2026', 'external/events/spring-showcase.jpg'],
    ['pitching-mechanics-clinic-2026', 'external/events/pitching-clinic.jpg'],
    ['hitting-mechanics-clinic-2026', 'external/events/hitting-clinic.jpg'],
    ['easter-weekend-tournament-2026', 'external/events/easter-tournament.jpg'],
    ['family-fun-day-2026', 'external/events/family-fun-day.jpg'],
  ];
  sql += `\n-- Events\n`;
  for (const [slug, path] of eventMap) {
    sql += `UPDATE events SET image_url = '${baseUrl}/${path}' WHERE slug = '${slug}';\n`;
  }

  // Page sections - hero video
  sql += `\n-- Hero videos\n`;
  sql += `UPDATE page_sections SET props = jsonb_set(props, '{videoSrc}', '"${baseUrl}/ballplex-promo.mp4"') WHERE props->>'videoSrc' LIKE '%ballplex-promo.mp4';\n`;

  // Facility images
  sql += `\n-- Facility images in page_sections\n`;
  sql += `UPDATE page_sections SET props = jsonb_set(props, '{images}', '["${baseUrl}/external/facility/img_4117.webp","${baseUrl}/external/facility/img_4121.webp"]'::jsonb) WHERE page_slug = 'home' AND type = 'facility';\n`;

  const sqlPath = join(root, 'supabase', 'update_storage_urls.sql');
  writeFileSync(sqlPath, sql);
  console.log(`\nSQL update script: ${sqlPath}`);
}

main().catch(console.error);
