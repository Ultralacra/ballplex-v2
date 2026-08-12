import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync, statSync, existsSync, mkdirSync } from 'fs';
import { join, relative, sep } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = join(__dirname, '..');

config({ path: join(root, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);
const BUCKET = 'ballplex-assets';

const ALLOWED_EXTENSIONS = new Set([
  '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.ico',
  '.mp4', '.mov', '.webm',
  '.pdf', '.json', '.txt', '.xml',
]);

const SKIP_PATHS = [
  'node_modules',
  '.next',
  '.git',
  'favicon.ico',
  'robots.txt',
];

function getFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    const relPath = relative(join(root, 'public'), fullPath).replace(/\\/g, '/');

    if (SKIP_PATHS.some((skip) => relPath.startsWith(skip) || relPath === skip)) continue;

    if (entry.isDirectory()) {
      files.push(...getFiles(fullPath));
    } else {
      const ext = '.' + entry.name.split('.').pop()?.toLowerCase();
      if (ALLOWED_EXTENSIONS.has(ext)) {
        files.push({ fullPath, relPath });
      }
    }
  }

  return files;
}

async function ensureBucket() {
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some((b) => b.name === BUCKET);

  if (!exists) {
    const { error } = await supabase.storage.createBucket(BUCKET, {
      public: true,
    });
    if (error) {
      console.error('Failed to create bucket:', error.message);
      console.log('Trying to use bucket anyway...');
      return true;
    }
    console.log(`Bucket "${BUCKET}" created`);
  }
  return true;
}

async function uploadAll() {
  console.log('Ensuring bucket...');
  const ready = await ensureBucket();
  if (!ready) process.exit(1);

  const publicDir = join(root, 'public');
  const files = getFiles(publicDir);

  console.log(`Found ${files.length} files to upload\n`);

  let success = 0;
  let skipped = 0;
  let failed = 0;

  for (const { fullPath, relPath } of files) {
    const exists = await checkExists(relPath);
    if (exists) {
      console.log(`  SKIP  ${relPath} (already exists)`);
      skipped++;
      continue;
    }

    try {
      const buffer = readFileSync(fullPath);
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(relPath, buffer, {
          contentType: getMimeType(relPath),
          upsert: true,
        });

      if (error) {
        console.error(`  FAIL  ${relPath}: ${error.message}`);
        failed++;
      } else {
        console.log(`  OK    ${relPath}`);
        success++;
      }
    } catch (err) {
      console.error(`  FAIL  ${relPath}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone: ${success} uploaded, ${skipped} skipped, ${failed} failed`);
}

async function checkExists(path) {
  const { data } = await supabase.storage.from(BUCKET).list(path.split('/').slice(0, -1).join('/') || '', {
    search: path.split('/').pop(),
  });
  return (data || []).some((f) => f.name === path.split('/').pop());
}

function getMimeType(path) {
  const ext = path.split('.').pop()?.toLowerCase();
  const mimes = {
    jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
    gif: 'image/gif', webp: 'image/webp', svg: 'image/svg+xml',
    ico: 'image/x-icon', mp4: 'video/mp4', mov: 'video/quicktime',
    webm: 'video/webm', pdf: 'application/pdf',
    json: 'application/json', txt: 'text/plain', xml: 'text/xml',
  };
  return mimes[ext] || 'application/octet-stream';
}

uploadAll().catch(console.error);
