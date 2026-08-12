'use client';

import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Grid,
} from '@mui/material';
import {
  Home as HomeIcon,
  Event as EventIcon,
  School as SchoolIcon,
  ContactMail as ContactIcon,
  Groups as GroupsIcon,
} from '@mui/icons-material';

const PAGES = [
  { slug: 'home', label: 'Home', icon: <HomeIcon />, description: 'Hero, stats, facility, programs, coaches, testimonials, CTA' },
  { slug: 'programs', label: 'Programs', icon: <SchoolIcon />, description: 'Services, pricing tables, schedules, coaches' },
  { slug: 'events', label: 'Events', icon: <EventIcon />, description: 'Featured events, categories, events grid, CTA' },
  { slug: 'homeschool', label: 'Homeschool', icon: <GroupsIcon />, description: 'Hero, academics, schedule, stats, form' },
  { slug: 'contact', label: 'Contact', icon: <ContactIcon />, description: 'Contact info, map, form' },
];

export default function PagesListPage() {
  const router = useRouter();

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Page Builder
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Select a page to edit its sections visually. Hover over any section to edit, reorder, or delete it.
      </Typography>

      <Grid container spacing={3}>
        {PAGES.map((page) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={page.slug}>
            <Card
              sx={{
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: '#86C9B6',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <CardActionArea onClick={() => router.push(`/admin/pages/${page.slug}`)}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Box sx={{ color: '#86C9B6', display: 'flex' }}>
                      {page.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {page.label}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {page.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
