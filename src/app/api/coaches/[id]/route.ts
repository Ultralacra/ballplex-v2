import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  if (!body.name?.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("coaches")
    .update({
      name: body.name.trim(),
      role: body.role?.trim() || "",
      bio: body.bio?.trim() || "",
      specialties: Array.isArray(body.specialties) ? body.specialties : [],
      quote: body.quote?.trim() || "",
      image_url: body.image_url?.trim() || "",
      instagram: body.instagram?.trim() || "",
      object_position: body.object_position?.trim() || null,
      order_index: Number(body.order_index) || 0,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ coach: data });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { error } = await supabaseAdmin.from("coaches").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
