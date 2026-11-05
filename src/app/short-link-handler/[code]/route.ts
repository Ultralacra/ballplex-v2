import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const host = request.headers.get("host")?.split(":")[0].toLowerCase();
  if (host !== "go.theballplex.com") {
    return new NextResponse("Not found", { status: 404 });
  }

  const { code } = await params;
  const normalizedCode = decodeURIComponent(code).toLowerCase();
  const { data, error } = await supabaseAdmin
    .from("short_links")
    .select("id, destination_url, is_active")
    .eq("code", normalizedCode)
    .maybeSingle();

  if (error || !data || !data.is_active) {
    return new NextResponse("Enlace no encontrado", { status: 404 });
  }

  void supabaseAdmin.rpc("increment_short_link_click", { link_id: data.id });

  return NextResponse.redirect(data.destination_url, 302);
}
