import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("events")
    .select("*, event_categories(*)")
    .order("date", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ events: data || [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.title?.trim() || !body.slug?.trim()) {
    return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("events")
    .insert({
      title: body.title.trim(),
      slug: body.slug.trim().toLowerCase(),
      description: body.description?.trim() || "",
      short_description: body.short_description?.trim() || "",
      date: body.date || null,
      end_date: body.end_date || null,
      price: body.price?.trim() || "",
      age_group: body.age_group?.trim() || "",
      location: body.location?.trim() || "",
      image_url: body.image_url?.trim() || "",
      highlights: Array.isArray(body.highlights) ? body.highlights : [],
      category_id: body.category_id || null,
      featured: Boolean(body.featured),
      order_index: Number(body.order_index) || 0,
    })
    .select("*, event_categories(*)")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ event: data }, { status: 201 });
}