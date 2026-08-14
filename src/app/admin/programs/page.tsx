"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Add as AddIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

type Program = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  features: unknown[] | null;
  pricing: unknown[] | null;
  schedule: unknown[] | null;
  images: string[] | null;
  order_index: number;
};
type FormState = Omit<Program, "id">;
const emptyForm: FormState = {
  slug: "",
  title: "",
  subtitle: "",
  description: "",
  features: [],
  pricing: [],
  schedule: [],
  images: [],
  order_index: 0,
};
const jsonText = (value: unknown) => JSON.stringify(value || [], null, 2);

export default function ProgramsAdminPage() {
  const [items, setItems] = useState<Program[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Program | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/programs");
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "No se pudieron cargar los programas");
      setItems(data.programs || []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudieron cargar los programas",
      );
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    load();
  }, [load]);
  const filtered = useMemo(() => {
    const value = query.toLowerCase().trim();
    return value
      ? items.filter((item) =>
          `${item.title} ${item.slug} ${item.subtitle || ""}`
            .toLowerCase()
            .includes(value),
        )
      : items;
  }, [items, query]);
  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm, order_index: items.length + 1 });
    setOpen(true);
  };
  const openEdit = (item: Program) => {
    setEditing(item);
    setForm({
      slug: item.slug,
      title: item.title,
      subtitle: item.subtitle || "",
      description: item.description || "",
      features: item.features || [],
      pricing: item.pricing || [],
      schedule: item.schedule || [],
      images: item.images || [],
      order_index: item.order_index || 0,
    });
    setOpen(true);
  };
  const update = (field: keyof FormState, value: string | number | unknown[]) =>
    setForm((current) => ({ ...current, [field]: value }));
  const updateJson = (field: keyof FormState, value: string) => {
    try {
      update(field, JSON.parse(value || "[]"));
    } catch {
      setError(
        "Features, precios, horarios e imágenes deben tener JSON válido.",
      );
    }
  };
  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const response = await fetch(
        editing ? `/api/programs/${editing.id}` : "/api/programs",
        {
          method: editing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "No se pudo guardar");
      setOpen(false);
      setMessage(editing ? "Programa actualizado" : "Programa creado");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar");
    } finally {
      setSaving(false);
    }
  };
  const remove = async (item: Program) => {
    if (
      !window.confirm(
        `¿Eliminar ${item.title}? Esta acción no se puede deshacer.`,
      )
    )
      return;
    const response = await fetch(`/api/programs/${item.id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (!response.ok) setError(data.error || "No se pudo eliminar");
    else {
      setItems((current) => current.filter((entry) => entry.id !== item.id));
      setMessage("Programa eliminado");
    }
  };

  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          mb: 3,
          justifyContent: "space-between",
          alignItems: { sm: "center" },
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ mb: 0.5, fontWeight: 700 }}>
            Programas
          </Typography>
          <Typography color="text.secondary">
            Edita títulos, contenido, precios, horarios e imágenes.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openCreate}
        >
          Nuevo programa
        </Button>
      </Stack>
      <TextField
        fullWidth
        placeholder="Buscar programas..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        sx={{ mb: 3, maxWidth: 620 }}
        slotProps={{
          input: {
            startAdornment: (
              <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
            ),
          },
        }}
      />
      {message && (
        <Alert severity="success" onClose={() => setMessage("")} sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}
      {error && (
        <Alert severity="error" onClose={() => setError("")} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {loading ? (
        <CircularProgress sx={{ color: "#86C9B6" }} />
      ) : (
        <Stack spacing={2}>
          {filtered.map((item) => (
            <Box
              key={item.id}
              sx={{
                p: 2,
                border: "1px solid rgba(255,255,255,.1)",
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,.025)",
              }}
            >
              <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 700 }}>{item.title}</Typography>
                  <Typography variant="body2" color="primary.main">
                    /{item.slug}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {item.description || "Sin descripción"}
                  </Typography>
                </Box>
                <Tooltip title="Editar">
                  <IconButton onClick={() => openEdit(item)} color="primary">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar">
                  <IconButton onClick={() => remove(item)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>
          ))}
          {!filtered.length && (
            <Typography color="text.secondary">
              No se encontraron programas.
            </Typography>
          )}
        </Stack>
      )}
      <Dialog
        open={open}
        onClose={() => !saving && setOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {editing ? "Editar programa" : "Nuevo programa"}
          <IconButton
            onClick={() => setOpen(false)}
            disabled={saving}
            sx={{ position: "absolute", right: 12, top: 12 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                required
                label="Título"
                value={form.title}
                onChange={(event) => update("title", event.target.value)}
                fullWidth
              />
              <TextField
                required
                label="Slug"
                helperText="Ejemplo: lessons"
                value={form.slug}
                onChange={(event) => update("slug", event.target.value)}
                fullWidth
              />
            </Stack>
            <TextField
              label="Subtítulo"
              value={form.subtitle || ""}
              onChange={(event) => update("subtitle", event.target.value)}
              fullWidth
            />
            <TextField
              label="Descripción"
              multiline
              minRows={5}
              value={form.description || ""}
              onChange={(event) => update("description", event.target.value)}
              fullWidth
            />
            <TextField
              label="Features (JSON)"
              multiline
              minRows={4}
              helperText='Ejemplo: ["Hitting", "Pitching"]'
              value={jsonText(form.features)}
              onChange={(event) => updateJson("features", event.target.value)}
              fullWidth
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Pricing (JSON)"
                multiline
                minRows={4}
                helperText='Ejemplo: [{"label":"Mensualidad","price":"$95"}]'
                value={jsonText(form.pricing)}
                onChange={(event) => updateJson("pricing", event.target.value)}
                fullWidth
              />
              <TextField
                label="Schedule (JSON)"
                multiline
                minRows={4}
                helperText='Ejemplo: [{"day":"Lunes","time":"4 PM"}]'
                value={jsonText(form.schedule)}
                onChange={(event) => updateJson("schedule", event.target.value)}
                fullWidth
              />
            </Stack>
            <TextField
              label="Imágenes (JSON)"
              multiline
              minRows={3}
              helperText='Ejemplo: ["/images-lessons/foto.jpg"]'
              value={jsonText(form.images)}
              onChange={(event) => updateJson("images", event.target.value)}
              fullWidth
            />
            <TextField
              label="Orden"
              type="number"
              value={form.order_index}
              onChange={(event) =>
                update("order_index", Number(event.target.value))
              }
              sx={{ maxWidth: 150 }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={saving}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={save}
            disabled={saving || !form.title.trim() || !form.slug.trim()}
          >
            {saving ? "Guardando..." : "Guardar programa"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
