import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { requireRole } from '@/lib/auth/require-role';
import { validateSectionPayload, sanitizeSectionUpdate } from '@/lib/sections/validation';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { profile, response } = await requireRole('editor');
  if (!profile) return response;

  const { id } = await params;
  const body = await request.json();
  const { data: current, error: currentError } = await supabaseAdmin
    .from('page_sections')
    .select('page_slug, type, props')
    .eq('id', id)
    .single();

  if (currentError || !current) {
    return NextResponse.json({ error: 'Section not found' }, { status: 404 });
  }

  const nextProps = body.props ?? current.props;
  const validationError = validateSectionPayload(
    current.page_slug,
    current.type,
    nextProps,
  );
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('page_sections')
    .update(sanitizeSectionUpdate({ ...body, props: nextProps }))
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { profile, response } = await requireRole('editor');
  if (!profile) return response;

  const { id } = await params;

  const { error } = await supabaseAdmin
    .from('page_sections')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
