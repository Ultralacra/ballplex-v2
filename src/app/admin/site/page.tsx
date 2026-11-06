"use client";

import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";

type Address = { label: string; address: string };
type NavLink = { label: string; href: string };
type Config = {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  book_now_url: string;
  logo_url: string;
  footer_tagline: string;
  copyright_text: string;
  addresses: Address[];
  nav_links: NavLink[];
};

const empty: Config = {
  name: "",
  tagline: "",
  description: "",
  phone: "",
  email: "",
  book_now_url: "",
  logo_url: "/LOGO.png",
  footer_tagline: "",
  copyright_text: "",
  addresses: [],
  nav_links: [],
};

export default function SiteConfigAdminPage() {
  const [form, setForm] = useState<Config>(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/site-config")
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "No se pudo cargar");
        setForm({ ...empty, ...(data.config || {}) });
      })
      .catch((err) => setError(err instanceof Error ? err.message : "No se pudo cargar"))
      .finally(() => setLoading(false));
  }, []);

  const update = <K extends keyof Config>(field: K, value: Config[K]) =>
    setForm((current) => ({ ...current, [field]: value }));

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/site-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "No se pudo guardar");
      setForm({ ...empty, ...(data.config || {}) });
      setMessage("Configuración guardada. Los cambios ya aparecen en el frontend.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <CircularProgress sx={{ color: "#86C9B6" }} />;

  return (
    <Box sx={{ maxWidth: 900 }}>
      <Typography variant="h4" sx={{ fontWeight: 800 }}>
        Configuración global
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 0.5, mb: 3 }}>
        Edita el contenido compartido por el header, footer y botones del sitio.
      </Typography>
      {message && <Alert severity="success" onClose={() => setMessage("")} sx={{ mb: 2 }}>{message}</Alert>}
      {error && <Alert severity="error" onClose={() => setError("")} sx={{ mb: 2 }}>{error}</Alert>}

      <Stack spacing={2}>
        <TextField label="Nombre del sitio" value={form.name} onChange={(e) => update("name", e.target.value)} />
        <TextField label="Tagline" value={form.tagline} onChange={(e) => update("tagline", e.target.value)} />
        <TextField label="Descripción del footer" multiline minRows={3} value={form.description} onChange={(e) => update("description", e.target.value)} />
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <TextField fullWidth label="Teléfono" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
          <TextField fullWidth label="Email" value={form.email} onChange={(e) => update("email", e.target.value)} />
        </Stack>
        <TextField label="URL del botón Book Now" value={form.book_now_url} onChange={(e) => update("book_now_url", e.target.value)} />
        <TextField label="URL del logo" value={form.logo_url} onChange={(e) => update("logo_url", e.target.value)} />
        <TextField label="Texto del footer" value={form.footer_tagline} onChange={(e) => update("footer_tagline", e.target.value)} />
        <TextField label="Copyright" value={form.copyright_text} onChange={(e) => update("copyright_text", e.target.value)} />

        <Typography variant="h6" sx={{ pt: 2 }}>Navegación</Typography>
        {form.nav_links.map((link, index) => (
          <Stack key={index} direction="row" spacing={1}>
            <TextField fullWidth label="Texto" value={link.label} onChange={(e) => {
              const next = [...form.nav_links]; next[index] = { ...link, label: e.target.value }; update("nav_links", next);
            }} />
            <TextField fullWidth label="Enlace" value={link.href} onChange={(e) => {
              const next = [...form.nav_links]; next[index] = { ...link, href: e.target.value }; update("nav_links", next);
            }} />
            <IconButton color="error" onClick={() => update("nav_links", form.nav_links.filter((_, i) => i !== index))}><DeleteIcon /></IconButton>
          </Stack>
        ))}
        <Button startIcon={<AddIcon />} onClick={() => update("nav_links", [...form.nav_links, { label: "", href: "/" }])}>Agregar enlace</Button>

        <Typography variant="h6" sx={{ pt: 2 }}>Direcciones</Typography>
        {form.addresses.map((address, index) => (
          <Stack key={index} direction={{ xs: "column", md: "row" }} spacing={1}>
            <TextField fullWidth label="Etiqueta" value={address.label} onChange={(e) => {
              const next = [...form.addresses]; next[index] = { ...address, label: e.target.value }; update("addresses", next);
            }} />
            <TextField fullWidth label="Dirección" value={address.address} onChange={(e) => {
              const next = [...form.addresses]; next[index] = { ...address, address: e.target.value }; update("addresses", next);
            }} />
            <IconButton color="error" onClick={() => update("addresses", form.addresses.filter((_, i) => i !== index))}><DeleteIcon /></IconButton>
          </Stack>
        ))}
        <Button startIcon={<AddIcon />} onClick={() => update("addresses", [...form.addresses, { label: "", address: "" }])}>Agregar dirección</Button>

        <Box sx={{ pt: 2 }}>
          <Button variant="contained" onClick={save} disabled={saving}>
            {saving ? "Guardando..." : "Guardar configuración"}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
