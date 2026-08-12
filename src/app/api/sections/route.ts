import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');
  const includeHidden = searchParams.get('includeHidden') === '1';

  if (!page) {
    return NextResponse.json({ error: 'Page slug is required' }, { status: 400 });
  }

  try {
    const supabase = await createClient();
    let query = supabase
      .from('page_sections')
      .select('*')
      .order('order_index', { ascending: true });

    query = query.eq('page_slug', page);
    if (!includeHidden) query = query.eq('is_visible', true);

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: `Supabase query failed: ${error.message}` }, { status: 502 });
    }

    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown Supabase connection error';
    return NextResponse.json({ error: `Supabase connection failed: ${message}` }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const { supabaseAdmin } = await import('@/lib/supabase/admin');
  const body = await request.json();
  const { page_slug, type, label, props, order_index } = body;

  if (!page_slug || !type) {
    return NextResponse.json({ error: 'page_slug and type are required' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('page_sections')
    .insert({ page_slug, type, label: label || '', props: props || {}, order_index: order_index || 0 })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
