import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/require-role";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const access = await requireRole("admin");
  if (access.response) return access.response;

  const { id } = await params;
  const body = await request.json();
  const role = body.role;
  if (role !== "admin" && role !== "editor") {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  const { data: profileTarget } = await supabaseAdmin
    .from("admin_users")
    .select("id, auth_user_id, email, role")
    .eq("id", id)
    .maybeSingle();

  let target = profileTarget;
  if (!target) {
    const { data: authTarget, error: authTargetError } = await supabaseAdmin.auth.admin.getUserById(id);
    if (authTargetError || !authTarget.user?.email) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (id === access.profile.auth_user_id && role !== "admin") {
      return NextResponse.json({ error: "You cannot remove your own admin role" }, { status: 400 });
    }

    const { data: createdProfile, error: createError } = await supabaseAdmin
      .from("admin_users")
      .insert({ auth_user_id: id, email: authTarget.user.email.toLowerCase(), role })
      .select("id, auth_user_id, email, role")
      .single();
    if (createError) return NextResponse.json({ error: createError.message }, { status: 500 });
    return NextResponse.json({ profile: createdProfile });
  }

  if (target.auth_user_id === access.profile.auth_user_id && role !== "admin") {
    return NextResponse.json({ error: "You cannot remove your own admin role" }, { status: 400 });
  }

  if (target.role === "admin" && role !== "admin") {
    const { count, error: countError } = await supabaseAdmin
      .from("admin_users")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if (countError) return NextResponse.json({ error: countError.message }, { status: 500 });
    if ((count || 0) <= 1) return NextResponse.json({ error: "At least one admin must remain" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("admin_users")
    .update({ role })
    .eq("id", id)
    .select("id, auth_user_id, email, role")
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ profile: data });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const access = await requireRole("admin");
  if (access.response) return access.response;

  const { id } = await params;
  const { data: profileTarget } = await supabaseAdmin
    .from("admin_users")
    .select("id, auth_user_id, email, role")
    .eq("id", id)
    .maybeSingle();

  let targetAuthId = profileTarget?.auth_user_id || id;
  if (targetAuthId === access.profile.auth_user_id) {
    return NextResponse.json({ error: "You cannot remove your own account" }, { status: 400 });
  }

  let authUser = (await supabaseAdmin.auth.admin.getUserById(targetAuthId)).data.user;
  if (!authUser && profileTarget?.email) {
    const { data: authUsers, error: authUsersError } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 });
    if (authUsersError) return NextResponse.json({ error: authUsersError.message }, { status: 500 });
    authUser = authUsers.users.find((user) => user.email?.toLowerCase() === profileTarget.email.toLowerCase()) || null;
    if (authUser) targetAuthId = authUser.id;
  }

  if (targetAuthId === access.profile.auth_user_id) {
    return NextResponse.json({ error: "You cannot remove your own account" }, { status: 400 });
  }

  if (!authUser) {
    if (!profileTarget) return NextResponse.json({ error: "User profile not found" }, { status: 404 });
    const { error: profileDeleteError } = await supabaseAdmin.from("admin_users").delete().eq("id", profileTarget.id);
    if (profileDeleteError) return NextResponse.json({ error: profileDeleteError.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  if (profileTarget?.role === "admin") {
    const { count, error: countError } = await supabaseAdmin
      .from("admin_users")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if (countError) return NextResponse.json({ error: countError.message }, { status: 500 });
    if ((count || 0) <= 1) {
      return NextResponse.json({ error: "At least one admin must remain" }, { status: 400 });
    }
  }

  const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(targetAuthId);
  if (deleteError) return NextResponse.json({ error: deleteError.message }, { status: 500 });
  return NextResponse.json({ success: true });
}