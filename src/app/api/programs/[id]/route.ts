import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  if (!body.title?.trim() || !body.slug?.trim()) {
    return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
  }
  const { data, error } = await supabaseAdmin.from("programs").update({
    slug: body.slug.trim(),
    title: body.title.trim(),
    subtitle: body.subtitle?.trim() || "",
    description: body.description?.trim() || "",
    features: Array.isArray(body.features) ? body.features : [],
    pricing: Array.isArray(body.pricing) ? body.pricing : [],
    schedule: Array.isArray(body.schedule) ? body.schedule : [],
    images: Array.isArray(body.images) ? body.images : [],
    order_index: Number(body.order_index) || 0,
    updated_at: new Date().toISOString(),
  }).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ program: data });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { error } = await supabaseAdmin.from("programs").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}