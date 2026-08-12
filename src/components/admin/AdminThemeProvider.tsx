'use client';

import { ThemeProvider } from '@mui/material';
import ballplexTheme from '@/lib/mui/theme';

export default function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={ballplexTheme}>
      {children}
    </ThemeProvider>
  );
}
