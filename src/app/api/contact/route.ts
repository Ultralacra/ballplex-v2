import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Name, email and message are required" }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("leads").insert({
    source: "contact",
    name,
    email,
    phone: typeof body.phone === "string" ? body.phone.trim() : null,
    payload: {
      interest: typeof body.interest === "string" ? body.interest.trim() : "",
      message,
    },
  });

  if (error) return NextResponse.json({ error: "Unable to save your inquiry" }, { status: 500 });
  return NextResponse.json({ success: true });
}