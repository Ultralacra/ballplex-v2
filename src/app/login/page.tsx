"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(
        authError.message === "Invalid login credentials"
          ? "Credenciales inválidas"
          : "Error al iniciar sesión",
      );
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "minmax(360px, 0.9fr) minmax(440px, 1.1fr)",
        },
        backgroundColor: "#0a0f0e",
        color: "#f5f7f3",
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          position: "relative",
          overflow: "hidden",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "100vh",
          p: { md: 6, lg: 8 },
          borderRight: "1px solid rgba(245,247,243,0.12)",
          backgroundColor: "#111a17",
          backgroundImage: `
            linear-gradient(115deg, transparent 0 48%, rgba(134,201,182,0.10) 48.2% 48.5%, transparent 48.7%),
            repeating-linear-gradient(90deg, transparent 0 78px, rgba(245,247,243,0.035) 79px 80px),
            repeating-linear-gradient(0deg, transparent 0 78px, rgba(245,247,243,0.035) 79px 80px)
          `,
          "&::after": {
            content: '""',
            position: "absolute",
            width: 420,
            height: 420,
            right: -190,
            bottom: -170,
            border: "1px solid rgba(232,117,92,0.55)",
            borderRadius: "50%",
            boxShadow:
              "0 0 0 28px rgba(232,117,92,0.04), 0 0 0 56px rgba(232,117,92,0.025)",
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Box
            component="img"
            src="/LOGO.png"
            alt="Ballplex"
            sx={{ width: 58, height: 58, objectFit: "contain", mb: 8 }}
          />
          <Typography
            component="p"
            sx={{
              mb: 2,
              color: "#86c9b6",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Ballplex / Control room
          </Typography>
          <Typography
            component="h1"
            sx={{
              maxWidth: 430,
              fontSize: { md: 48, lg: 64 },
              fontWeight: 700,
              letterSpacing: "-0.045em",
              lineHeight: 0.98,
            }}
          >
            Keep the
            <br />
            <Box component="span" sx={{ color: "#e8755c" }}>
              game
            </Box>{" "}
            moving.
          </Typography>
        </Box>

        <Box sx={{ position: "relative", zIndex: 1, maxWidth: 340 }}>
          <Box
            sx={{ width: 38, height: 3, mb: 2, backgroundColor: "#e8755c" }}
          />
          <Typography
            sx={{
              color: "rgba(245,247,243,0.68)",
              fontSize: 15,
              lineHeight: 1.65,
            }}
          >
            Administra programas, eventos y cada detalle que convierte una
            práctica en progreso.
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          px: { xs: 3, sm: 6, md: 8, lg: 12 },
          py: 6,
          backgroundColor: "#0a0f0e",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 430 }}>
          <Box sx={{ display: { xs: "block", md: "none" }, mb: 7 }}>
            <Box
              component="img"
              src="/LOGO.png"
              alt="Ballplex"
              sx={{ width: 52, height: 52, objectFit: "contain" }}
            />
          </Box>

          <Box sx={{ mb: 5 }}>
            <Typography
              component="p"
              sx={{
                mb: 1.5,
                color: "#86c9b6",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              Private access
            </Typography>
            <Typography
              component="h2"
              sx={{
                mb: 1,
                fontSize: { xs: 36, sm: 42 },
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              Welcome back.
            </Typography>
            <Typography sx={{ color: "rgba(245,247,243,0.58)", fontSize: 15 }}>
              Inicia sesión para administrar Ballplex.
            </Typography>
          </Box>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                border: "1px solid rgba(232,117,92,0.35)",
                borderRadius: 1,
                backgroundColor: "rgba(232,117,92,0.08)",
                color: "#f5b5a7",
                "& .MuiAlert-icon": { color: "#e8755c" },
              }}
            >
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleLogin} noValidate>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              autoComplete="email"
              autoFocus
              sx={{
                mb: 2.5,
                "& .MuiInputLabel-root": { color: "rgba(245,247,243,0.55)" },
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(245,247,243,0.035)",
                },
              }}
            />

            <TextField
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              autoComplete="current-password"
              sx={{
                mb: 3.5,
                "& .MuiInputLabel-root": { color: "rgba(245,247,243,0.55)" },
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(245,247,243,0.035)",
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{
                minHeight: 54,
                borderRadius: 1,
                backgroundColor: "#86c9b6",
                color: "#0a0f0e",
                fontSize: 12,
                letterSpacing: "0.14em",
                "&:hover": { backgroundColor: "#a3dfd0" },
                "&.Mui-disabled": {
                  backgroundColor: "rgba(134,201,182,0.35)",
                  color: "rgba(10,15,14,0.7)",
                },
              }}
            >
              {loading ? "Iniciando sesión..." : "Entrar al panel"}
            </Button>
          </Box>

          <Typography
            sx={{
              mt: 5,
              color: "rgba(245,247,243,0.36)",
              fontSize: 12,
              lineHeight: 1.6,
            }}
          >
            Acceso reservado para el equipo de Ballplex.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
