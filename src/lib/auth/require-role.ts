import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export type AdminRole = "admin" | "editor";

export type AdminProfile = {
  id: string;
  auth_user_id: string | null;
  email: string;
  role: AdminRole;
};

export async function getCurrentAdminProfile(): Promise<AdminProfile | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return null;

  const { data: profile } = await supabaseAdmin
    .from("admin_users")
    .select("id, auth_user_id, email, role")
    .eq("auth_user_id", user.id)
    .maybeSingle();

  if (profile) return profile as AdminProfile;

  // Supports profiles created before auth_user_id was introduced.
  const { data: legacyProfile } = await supabaseAdmin
    .from("admin_users")
    .select("id, auth_user_id, email, role")
    .ilike("email", user.email)
    .maybeSingle();

  return (legacyProfile as AdminProfile | null) || null;
}

export async function requireRole(requiredRole: AdminRole) {
  const profile = await getCurrentAdminProfile();
  if (!profile) {
    return {
      profile: null,
      response: NextResponse.json({ error: "Authentication required" }, { status: 401 }),
    } as const;
  }

  if (requiredRole === "admin" && profile.role !== "admin") {
    return {
      profile: null,
      response: NextResponse.json({ error: "Admin role required" }, { status: 403 }),
    } as const;
  }

  return { profile, response: null } as const;
}