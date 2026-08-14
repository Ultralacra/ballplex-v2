import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { requireRole } from "@/lib/auth/require-role";

const statuses = new Set(["new", "contacted", "qualified", "closed"]);

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const access = await requireRole("admin");
  if (access.response) return access.response;

  const { id } = await params;
  const body = await request.json();

  if (typeof body.status !== "string" || !statuses.has(body.status)) {
    return NextResponse.json({ error: "Invalid lead status" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("leads")
    .update({ status: body.status })
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ lead: data });
}