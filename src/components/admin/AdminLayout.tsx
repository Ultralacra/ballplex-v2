'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Divider,
  Avatar,
  Tooltip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Event as EventIcon,
  School as SchoolIcon,
  FormatQuote as FormatQuoteIcon,
  Settings as SettingsIcon,
  Image as ImageIcon,
  Logout as LogoutIcon,
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  Web as WebIcon,
} from '@mui/icons-material';
import { createClient } from '@/lib/supabase/client';

const DRAWER_WIDTH = 260;

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: <DashboardIcon /> },
  { label: 'Page Builder', href: '/admin/pages', icon: <WebIcon /> },
  { label: 'Coaches', href: '/admin/coaches', icon: <PeopleIcon /> },
  { label: 'Events', href: '/admin/events', icon: <EventIcon /> },
  { label: 'Programs', href: '/admin/programs', icon: <SchoolIcon /> },
  { label: 'Testimonials', href: '/admin/testimonials', icon: <FormatQuoteIcon /> },
  { label: 'Site Config', href: '/admin/site', icon: <SettingsIcon /> },
  { label: 'Images', href: '/admin/images', icon: <ImageIcon /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar
          src="/LOGO.png"
          alt="Ballplex"
          variant="rounded"
          sx={{ width: 36, height: 36 }}
        />
        <Typography variant="h6" sx={{ color: '#86C9B6', fontWeight: 700 }}>
          Ballplex Admin
        </Typography>
      </Box>

      <Divider />

      <List sx={{ flex: 1, px: 1, py: 1 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = item.href === '/admin'
            ? pathname === '/admin'
            : pathname.startsWith(item.href);

          return (
            <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => {
                  router.push(item.href);
                  setMobileOpen(false);
                }}
                sx={{
                  borderRadius: 2,
                  backgroundColor: isActive ? 'rgba(134, 201, 182, 0.10)' : 'transparent',
                  '&:hover': {
                    backgroundColor: isActive
                      ? 'rgba(134, 201, 182, 0.15)'
                      : 'rgba(255,255,255,0.04)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? '#86C9B6' : 'text.secondary',
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? '#fafafa' : 'text.secondary',
                      fontSize: '0.9rem',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      <Box sx={{ p: 1 }}>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Cerrar Sesión"
              sx={{ '& .MuiListItemText-primary': { fontSize: '0.9rem' } }}
            />
          </ListItemButton>
        </ListItem>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flex: 1, fontWeight: 600 }}>
            {NAV_ITEMS.find((item) =>
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href)
            )?.label || 'Admin'}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { width: DRAWER_WIDTH },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { width: DRAWER_WIDTH },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flex: 1,
          p: 3,
          mt: 8,
          minHeight: 'calc(100vh - 64px)',
          backgroundColor: 'background.default',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
