const BUCKET = 'ballplex-assets';

const coachStoragePaths: Record<string, string> = {
  'Leo Rojas': 'external/coaches/leo-rojas.jpeg',
  'Santiago Chirino': 'external/coaches/santiago-chirino.jpeg',
  'Raychel Trocki': 'external/coaches/raychel-trocki.jpeg',
  'Kyle Huckaby': 'external/coaches/kyle-huckaby.jpeg',
  'Tristen Carranza': 'external/coaches/tristen-carranza.png',
  'José Bermúdez': 'external/coaches/jose-bermudez.jpeg',
  'Melissa Martínez': 'external/coaches/melissa-martinez.jpeg',
  'Austin Dennis': 'external/coaches/austin-dennis.png',
  'Jamie Gilbert': 'COACHES/JAMIE.jpeg',
  'Gianmarco Marcelletti': 'external/coaches/gianmarco-marcelletti.jpeg',
  'Rylan Thomas': 'COACHES/Rylan.jpeg',
  'Taylor Jensen': 'COACHES/Taylor Jensen.jpeg',
};

export function getStorageUrl(path: string): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return path;
  const clean = path.replace(/^\//, '');
  return `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${clean}`;
}

export function assetUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return path;
}

export function coachAssetUrl(name: string, currentPath?: string | null): string {
  const storagePath = coachStoragePaths[name.trim()];
  return storagePath ? getStorageUrl(storagePath) : assetUrl(currentPath);
}
