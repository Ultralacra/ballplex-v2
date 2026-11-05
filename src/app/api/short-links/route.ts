import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/require-role";
import { supabaseAdmin } from "@/lib/supabase/admin";

const CODE_PATTERN = /^[a-z0-9][a-z0-9_-]*$/;

function normalizeCode(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function isValidDestination(value: unknown): value is string {
  if (typeof value !== "string" || !value.trim()) return false;
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export async function GET() {
  const { profile, response } = await requireRole("editor");
  if (!profile) return response;

  const { data, error } = await supabaseAdmin
    .from("short_links")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ shortLinks: data || [] });
}

export async function POST(request: Request) {
  const { profile, response } = await requireRole("editor");
  if (!profile) return response;

  const body = await request.json();
  const code = normalizeCode(body.code);
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const destinationUrl =
    typeof body.destination_url === "string"
      ? body.destination_url.trim()
      : "";

  if (!CODE_PATTERN.test(code)) {
    return NextResponse.json(
      {
        error:
          "El código solo puede contener letras minúsculas, números, guiones y guiones bajos.",
      },
      { status: 400 },
    );
  }

  if (!isValidDestination(destinationUrl)) {
    return NextResponse.json(
      { error: "La URL de destino debe comenzar con http:// o https://." },
      { status: 400 },
    );
  }

  const { data, error } = await supabaseAdmin
    .from("short_links")
    .insert({
      code,
      title,
      destination_url: destinationUrl,
      is_active: body.is_active !== false,
      created_by: profile.auth_user_id,
    })
    .select()
    .single();

  if (error) {
    const status = error.code === "23505" ? 409 : 500;
    return NextResponse.json(
      {
        error:
          status === 409
            ? "Ya existe un enlace con ese código."
            : error.message,
      },
      { status },
    );
  }

  return NextResponse.json({ shortLink: data }, { status: 201 });
}
