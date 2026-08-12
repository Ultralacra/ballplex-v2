import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("coaches")
    .select("*")
    .order("order_index", { ascending: true })
    .order("name", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ coaches: data || [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.name?.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("coaches")
    .insert({
      name: body.name.trim(),
      role: body.role?.trim() || "",
      bio: body.bio?.trim() || "",
      specialties: Array.isArray(body.specialties) ? body.specialties : [],
      quote: body.quote?.trim() || "",
      image_url: body.image_url?.trim() || "",
      instagram: body.instagram?.trim() || "",
      object_position: body.object_position?.trim() || null,
      order_index: Number(body.order_index) || 0,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ coach: data }, { status: 201 });
}
