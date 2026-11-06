import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { requireRole } from '@/lib/auth/require-role';

export async function PUT(request: Request) {
  const { profile, response } = await requireRole('editor');
  if (!profile) return response;

  const { sections } = await request.json();

  if (!Array.isArray(sections)) {
    return NextResponse.json({ error: 'sections array is required' }, { status: 400 });
  }
  if (
    sections.some((id) => typeof id !== 'string') ||
    new Set(sections).size !== sections.length
  ) {
    return NextResponse.json({ error: 'Invalid section ids' }, { status: 400 });
  }

  const { data: existing, error: fetchError } = await supabaseAdmin
    .from('page_sections')
    .select('id, page_slug')
    .in('id', sections);
  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }
  if (
    !existing ||
    existing.length !== sections.length ||
    new Set(existing.map((section) => section.page_slug)).size !== 1
  ) {
    return NextResponse.json({ error: 'Sections do not belong to the same page' }, { status: 400 });
  }

  const errors: string[] = [];

  for (let i = 0; i < sections.length; i++) {
    const { error } = await supabaseAdmin
      .from('page_sections')
      .update({ order_index: i })
      .eq('id', sections[i]);

    if (error) errors.push(error.message);
  }

  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(', ') }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
