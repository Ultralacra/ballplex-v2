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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { profile, response } = await requireRole("editor");
  if (!profile) return response;

  const { id } = await params;
  const body = await request.json();
  const code = normalizeCode(body.code);
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const destinationUrl =
    typeof body.destination_url === "string"
      ? body.destination_url.trim()
      : "";

  if (!CODE_PATTERN.test(code)) {
    return NextResponse.json(
      { error: "El código del enlace no es válido." },
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
    .update({
      code,
      title,
      destination_url: destinationUrl,
      is_active: body.is_active !== false,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    const status = error.code === "23505" ? 409 : error.code === "PGRST116" ? 404 : 500;
    return NextResponse.json(
      {
        error:
          status === 409
            ? "Ya existe un enlace con ese código."
            : status === 404
              ? "El enlace no existe."
              : error.message,
      },
      { status },
    );
  }

  return NextResponse.json({ shortLink: data });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { profile, response } = await requireRole("editor");
  if (!profile) return response;

  const { id } = await params;
  const { error } = await supabaseAdmin
    .from("short_links")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
