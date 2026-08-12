import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function PUT(request: Request) {
  const { sections } = await request.json();

  if (!Array.isArray(sections)) {
    return NextResponse.json({ error: 'sections array is required' }, { status: 400 });
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
