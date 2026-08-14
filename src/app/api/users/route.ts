import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/require-role";
import { supabaseAdmin } from "@/lib/supabase/admin";

const inviteRedirectUrl = `${(process.env.PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "")}/auth/invite`;

export async function GET() {
  const access = await requireRole("admin");
  if (access.response) return access.response;

  const [{ data: authData, error: authError }, { data: profiles, error: profileError }] =
    await Promise.all([
      supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 }),
      supabaseAdmin.from("admin_users").select("id, auth_user_id, email, role"),
    ]);

  if (authError || profileError) {
    return NextResponse.json(
      { error: authError?.message || profileError?.message || "Unable to load users" },
      { status: 500 },
    );
  }

  const profileByAuthId = new Map(
    (profiles || []).filter((profile) => profile.auth_user_id).map((profile) => [profile.auth_user_id, profile]),
  );
  const profileByEmail = new Map((profiles || []).map((profile) => [profile.email.toLowerCase(), profile]));

  return NextResponse.json({
    users: (authData.users || []).map((user) => {
      const profile = profileByAuthId.get(user.id) || (user.email ? profileByEmail.get(user.email.toLowerCase()) : null);
      return {
        id: user.id,
        email: user.email || "",
        created_at: user.created_at,
        last_sign_in_at: user.last_sign_in_at,
        invited_at: user.invited_at,
        email_confirmed_at: user.email_confirmed_at,
        profile_id: profile?.id || null,
        role: profile?.role || null,
      };
    }),
  });
}

export async function POST(request: Request) {
  const access = await requireRole("admin");
  if (access.response) return access.response;

  let body: { email?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }

  const { data: authUsers, error: usersError } = await supabaseAdmin.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });
  if (usersError) {
    return NextResponse.json({ error: usersError.message }, { status: 500 });
  }

  const existingUser = authUsers.users.find((user) => user.email?.toLowerCase() === email);
  if (existingUser) {
    return NextResponse.json(
      {
        error: existingUser.email_confirmed_at
          ? "Este correo ya tiene una cuenta. Asígnale el rol desde la tabla de usuarios."
          : "Este correo ya tiene una invitación pendiente. Revisa el correo recibido o revoca la invitación antes de intentarlo de nuevo.",
      },
      { status: 409 },
    );
  }

  const { data: invited, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
    redirectTo: inviteRedirectUrl,
  });
  if (inviteError || !invited.user) {
    const inviteMessage = inviteError?.message || "Unable to invite user";
    const isRateLimited = /rate limit|too many requests/i.test(inviteMessage);
    return NextResponse.json(
      {
        error: isRateLimited
          ? "Supabase bloqueó temporalmente el envío de correos por límite de emails. Espera unos minutos o configura un SMTP personalizado en Supabase Auth."
          : inviteMessage,
      },
      { status: isRateLimited ? 429 : 400 },
    );
  }

  const { data: profile, error: profileError } = await supabaseAdmin
    .from("admin_users")
    .upsert({ auth_user_id: invited.user.id, email, role: "admin" }, { onConflict: "auth_user_id" })
    .select("id, auth_user_id, email, role")
    .single();

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  return NextResponse.json({ profile }, { status: 201 });
}