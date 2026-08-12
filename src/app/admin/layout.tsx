import AdminThemeProvider from '@/components/admin/AdminThemeProvider';
import AdminLayout from '@/components/admin/AdminLayout';

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminThemeProvider>
      <AdminLayout>{children}</AdminLayout>
    </AdminThemeProvider>
  );
}
