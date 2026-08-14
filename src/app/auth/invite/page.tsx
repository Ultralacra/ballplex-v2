"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { createClient } from "@/lib/supabase/client";

export default function InvitePage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (sessionError || !data.session) {
        setError(
          "La invitación no es válida o ya expiró. Solicita una nueva invitación.",
        );
      } else {
        setEmail(data.session.user.email || "");
      }
      setReady(true);
    });
  }, []);

  const completeInvite = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setSaving(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      setError(updateError.message);
      setSaving(false);
      return;
    }
    router.replace("/admin");
    router.refresh();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        p: 3,
        bgcolor: "#0a0f0e",
        color: "#f5f7f3",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 460,
          p: { xs: 3, sm: 5 },
          border: "1px solid rgba(134,201,182,0.25)",
          borderRadius: 2,
          bgcolor: "rgba(255,255,255,0.03)",
        }}
      >
        <Typography
          sx={{
            mb: 1,
            color: "#86c9b6",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          Ballplex Admin
        </Typography>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
          Completa tu acceso
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Define una contraseña para activar tu cuenta administrativa.
        </Typography>

        {!ready ? (
          <Box sx={{ display: "grid", placeItems: "center", py: 4 }}>
            <CircularProgress sx={{ color: "#86c9b6" }} />
          </Box>
        ) : error && !email ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Box component="form" onSubmit={completeInvite}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <TextField
              fullWidth
              label="Email"
              value={email}
              disabled
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              required
              type="password"
              label="Nueva contraseña"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              required
              type="password"
              label="Confirmar contraseña"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              autoComplete="new-password"
              sx={{ mb: 3 }}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={saving}
              sx={{ minHeight: 50, bgcolor: "#86c9b6", color: "#0a0f0e" }}
            >
              {saving ? "Guardando..." : "Activar cuenta"}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
