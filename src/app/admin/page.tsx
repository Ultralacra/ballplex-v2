import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import {
  People as PeopleIcon,
  Event as EventIcon,
  School as SchoolIcon,
  FormatQuote as FormatQuoteIcon,
} from '@mui/icons-material';

const stats = [
  { label: 'Coaches', value: '12', icon: <PeopleIcon />, href: '/admin/coaches' },
  { label: 'Events', value: '10', icon: <EventIcon />, href: '/admin/events' },
  { label: 'Programs', value: '6', icon: <SchoolIcon />, href: '/admin/programs' },
  { label: 'Testimonials', value: '3', icon: <FormatQuoteIcon />, href: '/admin/testimonials' },
];

export default function AdminDashboard() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stat.label}>
            <Card
              sx={{
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: '#86C9B6',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      backgroundColor: 'rgba(134, 201, 182, 0.10)',
                      color: '#86C9B6',
                      display: 'flex',
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, lineHeight: 1 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
