import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  const { data, error } = await supabaseAdmin.from("testimonials").select("*").order("order_index", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ testimonials: data || [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.name?.trim() || !body.content?.trim()) {
    return NextResponse.json({ error: "Name and content are required" }, { status: 400 });
  }
  const { data, error } = await supabaseAdmin.from("testimonials").insert({
    name: body.name.trim(),
    relation: body.relation?.trim() || "",
    content: body.content.trim(),
    rating: Math.min(5, Math.max(1, Number(body.rating) || 5)),
    order_index: Number(body.order_index) || 0,
  }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ testimonial: data }, { status: 201 });
}