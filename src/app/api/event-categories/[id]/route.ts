import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  if (!body.name?.trim() || !body.slug?.trim()) {
    return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
  }
  const { data, error } = await supabaseAdmin
    .from("event_categories")
    .update({
      name: body.name.trim(),
      slug: body.slug.trim().toLowerCase(),
      icon: body.icon?.trim() || "TrackChanges",
      description: body.description?.trim() || "",
      order_index: Number(body.order_index) || 0,
    })
    .eq("id", id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ category: data });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { error } = await supabaseAdmin.from("event_categories").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
