const BUCKET = 'ballplex-assets';

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
