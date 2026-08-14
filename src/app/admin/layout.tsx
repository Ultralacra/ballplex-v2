import AdminThemeProvider from "@/components/admin/AdminThemeProvider";
import AdminLayout from "@/components/admin/AdminLayout";
import { getCurrentAdminProfile } from "@/lib/auth/require-role";
import { redirect } from "next/navigation";

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentAdminProfile();
  if (!profile) redirect("/login");

  return (
    <AdminThemeProvider>
      <AdminLayout role={profile.role}>{children}</AdminLayout>
    </AdminThemeProvider>
  );
}
