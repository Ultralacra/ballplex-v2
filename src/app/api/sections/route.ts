import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { requireRole } from '@/lib/auth/require-role';
import { createSectionProps } from '@/lib/sections/registry';
import { validateSectionPayload } from '@/lib/sections/validation';

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
  const { profile, response } = await requireRole('editor');
  if (!profile) return response;

  const body = await request.json();
  const { page_slug, type, label, props, order_index } = body;

  const validationError = validateSectionPayload(page_slug, type, props || {});
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('page_sections')
    .insert({
      page_slug,
      type,
      label: label || '',
      props: createSectionProps(type, props),
      order_index: Number.isFinite(order_index) ? order_index : 0,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
