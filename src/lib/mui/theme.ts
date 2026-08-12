'use client';

import { createTheme } from '@mui/material/styles';

const ballplexTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#86C9B6',
      dark: '#5fa899',
      light: '#a3dfd0',
      contrastText: '#09090b',
    },
    secondary: {
      main: '#a1a1aa',
    },
    background: {
      default: '#09090b',
      paper: '#18181b',
    },
    text: {
      primary: '#fafafa',
      secondary: '#a1a1aa',
      disabled: '#71717a',
    },
    divider: 'rgba(255,255,255,0.10)',
  },
  typography: {
    fontFamily: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    button: {
      textTransform: 'uppercase',
      fontWeight: 600,
      letterSpacing: '0.05em',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid rgba(255,255,255,0.06)',
          backgroundColor: '#18181b',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#18181b',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(255,255,255,0.10)',
          backgroundImage: 'none',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          border: '1px solid rgba(255,255,255,0.10)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(255,255,255,0.15)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(134, 201, 182, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#86C9B6',
            },
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(134, 201, 182, 0.04)',
          },
        },
      },
    },
  },
});

export default ballplexTheme;
