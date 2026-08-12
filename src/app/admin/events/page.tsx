"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Snackbar,
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
  Upload as UploadIcon,
} from "@mui/icons-material";

type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
  order_index: number;
};
type EventItem = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  date: string | null;
  end_date: string | null;
  price: string | null;
  age_group: string | null;
  location: string | null;
  image_url: string | null;
  official_url: string | null;
  highlights: string[] | null;
  category_id: string | null;
  featured: boolean;
  order_index: number;
  event_categories?: Category;
};
type EventForm = Omit<EventItem, "id" | "event_categories">;

function sortEventsUpcomingFirst(items: EventItem[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTimestamp = today.getTime();

  return [...items].sort((a, b) => {
    const dateA = a.date ? Date.parse(a.date) : Number.NaN;
    const dateB = b.date ? Date.parse(b.date) : Number.NaN;
    const hasDateA = Number.isFinite(dateA);
    const hasDateB = Number.isFinite(dateB);
    const upcomingA = hasDateA && dateA >= todayTimestamp;
    const upcomingB = hasDateB && dateB >= todayTimestamp;

    if (upcomingA !== upcomingB) return upcomingA ? -1 : 1;
    if (!hasDateA || !hasDateB) return hasDateA ? -1 : hasDateB ? 1 : 0;
    return dateA - dateB;
  });
}

const emptyForm: EventForm = {
  title: "",
  slug: "",
  description: "",
  short_description: "",
  date: "",
  end_date: "",
  price: "",
  age_group: "",
  location: "",
  image_url: "",
  official_url: "",
  highlights: [],
  category_id: "",
  featured: false,
  order_index: 0,
};

export default function EventsAdminPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [form, setForm] = useState<EventForm>(emptyForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [eventsResponse, categoriesResponse] = await Promise.all([
        fetch("/api/events"),
        fetch("/api/event-categories"),
      ]);
      const eventsData = await eventsResponse.json();
      const categoriesData = await categoriesResponse.json();
      if (!eventsResponse.ok)
        throw new Error(eventsData.error || "Unable to load events");
      if (!categoriesResponse.ok)
        throw new Error(categoriesData.error || "Unable to load categories");
      setEvents(eventsData.events || []);
      setCategories(categoriesData.categories || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load events");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);
  const filtered = useMemo(() => {
    const value = query.toLowerCase().trim();
    const matching = value
      ? events.filter((item) =>
          `${item.title} ${item.slug} ${item.location || ""}`
            .toLowerCase()
            .includes(value),
        )
      : events;
    return sortEventsUpcomingFirst(matching);
  }, [events, query]);
  const setField = (
    field: keyof EventForm,
    value: string | number | boolean | string[],
  ) => setForm((current) => ({ ...current, [field]: value }));
  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm, order_index: events.length + 1 });
    setDialogOpen(true);
  };
  const openEdit = (item: EventItem) => {
    setEditing(item);
    setForm({
      title: item.title,
      slug: item.slug,
      description: item.description || "",
      short_description: item.short_description || "",
      date: item.date || "",
      end_date: item.end_date || "",
      price: item.price || "",
      age_group: item.age_group || "",
      location: item.location || "",
      image_url: item.image_url || "",
      official_url: item.official_url || "",
      highlights: item.highlights || [],
      category_id: item.category_id || "",
      featured: item.featured,
      order_index: item.order_index || 0,
    });
    setDialogOpen(true);
  };
  const uploadImage = async (file: File) => {
    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("path", "events");
      const response = await fetch("/api/storage", { method: "POST", body });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Upload failed");
      setField("image_url", data.url);
      setMessage("Imagen subida");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };
  const save = async () => {
    setSaving(true);
    try {
      const response = await fetch(
        editing ? `/api/events/${editing.id}` : "/api/events",
        {
          method: editing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Save failed");
      setDialogOpen(false);
      setMessage(editing ? "Evento actualizado" : "Evento creado");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };
  const remove = async (item: EventItem) => {
    if (!window.confirm(`¿Eliminar ${item.title}?`)) return;
    const response = await fetch(`/api/events/${item.id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (!response.ok) setError(data.error || "Delete failed");
    else {
      setEvents((current) => current.filter((event) => event.id !== item.id));
      setMessage("Evento eliminado");
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
          <Typography variant="h4" gutterBottom sx={{ mb: 0.5 }}>
            Events
          </Typography>
          <Typography color="text.secondary">
            Edita eventos, fechas, textos, categorías, precios e imágenes.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openCreate}
        >
          Nuevo evento
        </Button>
      </Stack>
      <TextField
        fullWidth
        placeholder="Buscar eventos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 3, maxWidth: 620 }}
        slotProps={{
          input: {
            startAdornment: (
              <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
            ),
          },
        }}
      />
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
            <Paper
              key={item.id}
              sx={{
                p: 2,
                display: "flex",
                gap: 2,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Box
                sx={{
                  width: 180,
                  height: 105,
                  borderRadius: 1,
                  overflow: "hidden",
                  bgcolor: "rgba(255,255,255,.06)",
                }}
              >
                {item.image_url ? (
                  <Box
                    component="img"
                    src={item.image_url}
                    alt={item.title}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <Typography sx={{ p: 4 }} variant="caption">
                    Sin imagen
                  </Typography>
                )}
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.event_categories?.name || "Sin categoría"} ·{" "}
                  {item.date || "Sin fecha"}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3,
                    overflow: "hidden",
                    overflowWrap: "anywhere",
                  }}
                >
                  {item.short_description ||
                    item.description ||
                    "Sin descripción"}
                </Typography>
              </Box>
              <Stack direction="row">
                <Tooltip title="Editar">
                  <IconButton color="primary" onClick={() => openEdit(item)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar">
                  <IconButton color="error" onClick={() => remove(item)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Paper>
          ))}
          {!filtered.length && (
            <Typography color="text.secondary">
              No se encontraron eventos.
            </Typography>
          )}
        </Stack>
      )}
      <Dialog
        open={dialogOpen}
        onClose={() => !saving && setDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {editing ? "Editar evento" : "Nuevo evento"}
          <IconButton onClick={() => setDialogOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Título"
                required
                fullWidth
                value={form.title}
                onChange={(e) => setField("title", e.target.value)}
              />
              <TextField
                label="Slug"
                required
                fullWidth
                value={form.slug}
                onChange={(e) => setField("slug", e.target.value)}
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Fecha"
                type="date"
                fullWidth
                value={form.date || ""}
                onChange={(e) => setField("date", e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                label="Fecha final"
                type="date"
                fullWidth
                value={form.end_date || ""}
                onChange={(e) => setField("end_date", e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                label="Orden"
                type="number"
                value={form.order_index}
                onChange={(e) =>
                  setField("order_index", Number(e.target.value))
                }
                sx={{ width: 120 }}
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                select
                label="Categoría"
                fullWidth
                value={form.category_id || ""}
                onChange={(e) => setField("category_id", e.target.value)}
              >
                <MenuItem value="">Sin categoría</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Precio"
                fullWidth
                value={form.price || ""}
                onChange={(e) => setField("price", e.target.value)}
              />
              <TextField
                label="Edades"
                fullWidth
                value={form.age_group || ""}
                onChange={(e) => setField("age_group", e.target.value)}
              />
            </Stack>
            <TextField
              label="Ubicación"
              fullWidth
              value={form.location || ""}
              onChange={(e) => setField("location", e.target.value)}
            />
            <TextField
              label="Página oficial del evento"
              type="url"
              fullWidth
              value={form.official_url || ""}
              onChange={(e) => setField("official_url", e.target.value)}
              placeholder="https://example.com/event"
              helperText="Enlace que se abrirá al pulsar el botón del evento."
            />
            <TextField
              label="Descripción corta"
              fullWidth
              value={form.short_description || ""}
              onChange={(e) => setField("short_description", e.target.value)}
            />
            <TextField
              label="Descripción completa"
              multiline
              minRows={5}
              fullWidth
              value={form.description || ""}
              onChange={(e) => setField("description", e.target.value)}
            />
            <TextField
              label="Highlights"
              helperText="Separados por comas"
              fullWidth
              value={(form.highlights || []).join(", ")}
              onChange={(e) =>
                setField(
                  "highlights",
                  e.target.value
                    .split(",")
                    .map((value) => value.trim())
                    .filter(Boolean),
                )
              }
            />
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ alignItems: "center" }}
            >
              <TextField
                label="Imagen URL"
                fullWidth
                value={form.image_url || ""}
                onChange={(e) => setField("image_url", e.target.value)}
              />
              <Button
                component="label"
                variant="outlined"
                startIcon={
                  uploading ? <CircularProgress size={16} /> : <UploadIcon />
                }
                disabled={uploading}
              >
                {uploading ? "Subiendo..." : "Subir imagen"}
                <input
                  hidden
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadImage(file);
                    e.target.value = "";
                  }}
                />
              </Button>
            </Stack>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.featured}
                  onChange={(e) => setField("featured", e.target.checked)}
                />
              }
              label="Evento destacado"
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button
            variant="contained"
            disabled={
              saving || uploading || !form.title.trim() || !form.slug.trim()
            }
            onClick={save}
          >
            {saving ? "Guardando..." : "Guardar evento"}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={Boolean(message)}
        autoHideDuration={4000}
        onClose={() => setMessage("")}
        message={message}
      />
    </Box>
  );
}
