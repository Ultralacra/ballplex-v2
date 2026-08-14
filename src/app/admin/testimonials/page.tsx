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
  Rating,
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

type Testimonial = {
  id: string;
  name: string;
  relation: string | null;
  content: string;
  rating: number;
  order_index: number;
};
type FormState = Omit<Testimonial, "id">;
const emptyForm: FormState = {
  name: "",
  relation: "",
  content: "",
  rating: 5,
  order_index: 0,
};

export default function TestimonialsAdminPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/testimonials");
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "No se pudieron cargar los testimonios");
      setItems(data.testimonials || []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudieron cargar los testimonios",
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
          `${item.name} ${item.relation || ""} ${item.content}`
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
  const openEdit = (item: Testimonial) => {
    setEditing(item);
    setForm({
      name: item.name,
      relation: item.relation || "",
      content: item.content,
      rating: item.rating || 5,
      order_index: item.order_index || 0,
    });
    setOpen(true);
  };
  const update = (field: keyof FormState, value: string | number) =>
    setForm((current) => ({ ...current, [field]: value }));
  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const response = await fetch(
        editing ? `/api/testimonials/${editing.id}` : "/api/testimonials",
        {
          method: editing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "No se pudo guardar");
      setOpen(false);
      setMessage(editing ? "Testimonio actualizado" : "Testimonio creado");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar");
    } finally {
      setSaving(false);
    }
  };
  const remove = async (item: Testimonial) => {
    if (
      !window.confirm(
        `¿Eliminar el testimonio de ${item.name}? Esta acción no se puede deshacer.`,
      )
    )
      return;
    const response = await fetch(`/api/testimonials/${item.id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (!response.ok) setError(data.error || "No se pudo eliminar");
    else {
      setItems((current) => current.filter((entry) => entry.id !== item.id));
      setMessage("Testimonio eliminado");
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
            Testimonios
          </Typography>
          <Typography color="text.secondary">
            Edita historias, nombres, relaciones y calificaciones visibles en el
            sitio.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openCreate}
        >
          Nuevo testimonio
        </Button>
      </Stack>
      <TextField
        fullWidth
        placeholder="Buscar testimonios..."
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
              <Stack
                direction="row"
                spacing={2}
                sx={{ alignItems: "flex-start" }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontWeight: 700 }}>{item.name}</Typography>
                  <Typography
                    variant="body2"
                    color="primary.main"
                    sx={{ mb: 1 }}
                  >
                    {item.relation || "Sin relación"}
                  </Typography>
                  <Rating value={item.rating} readOnly size="small" />
                  <Typography color="text.secondary" sx={{ mt: 1 }}>
                    {item.content}
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
              No se encontraron testimonios.
            </Typography>
          )}
        </Stack>
      )}
      <Dialog
        open={open}
        onClose={() => !saving && setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editing ? "Editar testimonio" : "Nuevo testimonio"}
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
            <TextField
              required
              label="Nombre"
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
              fullWidth
            />
            <TextField
              label="Relación"
              helperText="Ejemplo: Parent of athlete"
              value={form.relation || ""}
              onChange={(event) => update("relation", event.target.value)}
              fullWidth
            />
            <TextField
              required
              label="Testimonio"
              multiline
              minRows={6}
              value={form.content}
              onChange={(event) => update("content", event.target.value)}
              fullWidth
            />
            <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Calificación
                </Typography>
                <Rating
                  value={form.rating}
                  onChange={(_event, value) => update("rating", value || 5)}
                />
              </Box>
              <TextField
                label="Orden"
                type="number"
                value={form.order_index}
                onChange={(event) =>
                  update("order_index", Number(event.target.value))
                }
                sx={{ width: 120 }}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={saving}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={save}
            disabled={saving || !form.name.trim() || !form.content.trim()}
          >
            {saving ? "Guardando..." : "Guardar testimonio"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
