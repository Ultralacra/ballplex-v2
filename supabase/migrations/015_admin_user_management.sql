-- Link dashboard profiles to Supabase Auth users for reliable authorization.
ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

UPDATE admin_users AS profiles
SET auth_user_id = auth.id,
    email = lower(auth.email)
FROM auth.users AS auth
WHERE profiles.auth_user_id IS NULL
  AND lower(profiles.email) = lower(auth.email);

CREATE UNIQUE INDEX IF NOT EXISTS admin_users_auth_user_id_idx
  ON admin_users(auth_user_id)
  WHERE auth_user_id IS NOT NULL;

CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE auth_user_id = auth.uid()
      AND role = 'admin'
  );
$$;

DROP POLICY IF EXISTS "Admin read admin_users" ON admin_users;
CREATE POLICY "Admin read admin_users" ON admin_users
  FOR SELECT USING (public.is_admin_user());

CREATE POLICY "Admin update admin_users" ON admin_users
  FOR UPDATE USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());