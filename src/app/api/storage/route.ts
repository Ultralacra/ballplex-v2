import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

const BUCKET = 'ballplex-assets';
type StorageFile = {
  name: string;
  path: string;
  id: string | null;
  metadata?: { size?: number; mimetype?: string };
  created_at: string | null;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prefix = searchParams.get('prefix') || '';
  const recursive = searchParams.get('recursive') === 'true';

  const listFiles = async (folder: string): Promise<StorageFile[]> => {
    const listedFiles: StorageFile[] = [];
    const pageSize = 1000;
    let offset = 0;

    while (true) {
      const { data: files, error } = await supabaseAdmin.storage.from(BUCKET).list(folder, {
        limit: pageSize,
        offset,
        sortBy: { column: 'created_at', order: 'desc' },
      });
      if (error) throw error;

      const page = (files || [])
        .filter((file) => Boolean(file?.name))
        .map((file) => ({
          ...file,
          path: folder ? `${folder}/${file.name}` : file.name,
        })) as StorageFile[];
      listedFiles.push(...page);

      if (page.length < pageSize) break;
      offset += pageSize;
    }

    if (!recursive) return listedFiles;

    const nested = await Promise.all(
      listedFiles
        .filter((file) => !file.id)
        .map((file) => listFiles(folder ? `${folder}/${file.name}` : file.name)),
    );
    return [
      ...listedFiles.filter((file) => file.id),
      ...nested.flat(),
    ];
  };

  let files;
  try {
    files = await listFiles(prefix);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to list storage' }, { status: 500 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

  const items = (files || [])
    .filter((f) => f.id)
    .map((f) => ({
      name: f.name,
        path: f.path,
        url: `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${f.path
          .split('/')
          .map(encodeURIComponent)
          .join('/')}`,
      size: f.metadata?.size || 0,
      mimetype: f.metadata?.mimetype || '',
      created_at: f.created_at,
    }));

  const folders = recursive ? [] : (files || [])
    .filter((f) => !f.id)
    .map((f) => f.name);

  return NextResponse.json({ items, folders });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  const path = (formData.get('path') as string) || '';

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filePath = path ? `${path}/${file.name}` : file.name;

  const { data, error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

  return NextResponse.json({
    name: file.name,
    path: data?.path || filePath,
    url: `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${data?.path || filePath}`,
  });
}

export async function DELETE(request: Request) {
  const { path } = await request.json();

  if (!path) {
    return NextResponse.json({ error: 'Path is required' }, { status: 400 });
  }

  const { error } = await supabaseAdmin.storage.from(BUCKET).remove([path]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
