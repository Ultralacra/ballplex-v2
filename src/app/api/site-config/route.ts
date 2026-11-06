import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/require-role";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  const { profile, response } = await requireRole("editor");
  if (!profile) return response;
  const { data, error } = await supabaseAdmin.from("site_config").select("*").eq("id", 1).maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ config: data });
}

export async function PUT(request: Request) {
  const { profile, response } = await requireRole("editor");
  if (!profile) return response;
  const body = await request.json();
  const update = {
    name: typeof body.name === "string" ? body.name.trim() : "",
    tagline: typeof body.tagline === "string" ? body.tagline.trim() : "",
    description: typeof body.description === "string" ? body.description.trim() : "",
    phone: typeof body.phone === "string" ? body.phone.trim() : "",
    email: typeof body.email === "string" ? body.email.trim() : "",
    book_now_url: typeof body.book_now_url === "string" ? body.book_now_url.trim() : "",
    logo_url: typeof body.logo_url === "string" ? body.logo_url.trim() : "/LOGO.png",
    footer_tagline: typeof body.footer_tagline === "string" ? body.footer_tagline.trim() : "",
    copyright_text: typeof body.copyright_text === "string" ? body.copyright_text.trim() : "",
    addresses: Array.isArray(body.addresses) ? body.addresses : [],
    nav_links: Array.isArray(body.nav_links) ? body.nav_links : [],
    socials: body.socials && typeof body.socials === "object" ? body.socials : {},
    updated_at: new Date().toISOString(),
  };
  const { data, error } = await supabaseAdmin.from("site_config").upsert({ id: 1, ...update }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ config: data });
}
