import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  if (!body.name?.trim() || !body.content?.trim()) {
    return NextResponse.json({ error: "Name and content are required" }, { status: 400 });
  }
  const { data, error } = await supabaseAdmin.from("testimonials").update({
    name: body.name.trim(),
    relation: body.relation?.trim() || "",
    content: body.content.trim(),
    rating: Math.min(5, Math.max(1, Number(body.rating) || 5)),
    order_index: Number(body.order_index) || 0,
  }).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ testimonial: data });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { error } = await supabaseAdmin.from("testimonials").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}