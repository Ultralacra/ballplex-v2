import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("programs")
    .select("*")
    .order("order_index", { ascending: true })
    .order("title", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ programs: data || [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.title?.trim() || !body.slug?.trim()) {
    return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
  }
  const { data, error } = await supabaseAdmin.from("programs").insert({
    slug: body.slug.trim(),
    title: body.title.trim(),
    subtitle: body.subtitle?.trim() || "",
    description: body.description?.trim() || "",
    features: Array.isArray(body.features) ? body.features : [],
    pricing: Array.isArray(body.pricing) ? body.pricing : [],
    schedule: Array.isArray(body.schedule) ? body.schedule : [],
    images: Array.isArray(body.images) ? body.images : [],
    order_index: Number(body.order_index) || 0,
  }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ program: data }, { status: 201 });
}