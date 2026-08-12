import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("event_categories")
    .select("*")
    .order("order_index", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ categories: data || [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.name?.trim() || !body.slug?.trim()) {
    return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
  }
  const { data, error } = await supabaseAdmin
    .from("event_categories")
    .insert({
      name: body.name.trim(),
      slug: body.slug.trim().toLowerCase(),
      icon: body.icon?.trim() || "TrackChanges",
      description: body.description?.trim() || "",
      order_index: Number(body.order_index) || 0,
    })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ category: data }, { status: 201 });
}
