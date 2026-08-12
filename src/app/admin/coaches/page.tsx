"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
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
  Image as ImageIcon,
  Search as SearchIcon,
  Upload as UploadIcon,
} from "@mui/icons-material";

type Coach = {
  id: string;
  name: string;
  role: string | null;
  bio: string | null;
  specialties: string[] | null;
  quote: string | null;
  image_url: string | null;
  instagram: string | null;
  object_position: string | null;
  order_index: number;
};

type FormState = Omit<Coach, "id">;

const emptyForm: FormState = {
  name: "",
  role: "",
  bio: "",
  specialties: [],
  quote: "",
  image_url: "",
  instagram: "",
  object_position: "",
  order_index: 0,
};

export default function CoachesAdminPage() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Coach | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadCoaches = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/coaches");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to load coaches");
      setCoaches(data.coaches || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load coaches");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCoaches();
  }, [loadCoaches]);

  const filteredCoaches = useMemo(() => {
    const value = query.toLowerCase().trim();
    if (!value) return coaches;
    return coaches.filter((coach) =>
      [coach.name, coach.role, ...(coach.specialties || [])]
        .join(" ")
        .toLowerCase()
        .includes(value),
    );
  }, [coaches, query]);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm, order_index: coaches.length + 1 });
    setDialogOpen(true);
  };

  const openEdit = (coach: Coach) => {
    setEditing(coach);
    setForm({
      name: coach.name,
      role: coach.role || "",
      bio: coach.bio || "",
      specialties: coach.specialties || [],
      quote: coach.quote || "",
      image_url: coach.image_url || "",
      instagram: coach.instagram || "",
      object_position: coach.object_position || "",
      order_index: coach.order_index || 0,
    });
    setDialogOpen(true);
  };

  const updateField = (
    field: keyof FormState,
    value: string | number | string[],
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const uploadImage = async (file: File) => {
    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("path", "coaches");
      const response = await fetch("/api/storage", { method: "POST", body });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Upload failed");
      updateField("image_url", data.url);
      setMessage("Imagen subida correctamente");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const saveCoach = async () => {
    setSaving(true);
    try {
      const response = await fetch(
        editing ? `/api/coaches/${editing.id}` : "/api/coaches",
        {
          method: editing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Save failed");
      setDialogOpen(false);
      setMessage(editing ? "Coach actualizado" : "Coach creado");
      await loadCoaches();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const deleteCoach = async (coach: Coach) => {
    if (
      !window.confirm(
        `¿Eliminar a ${coach.name}? Esta acción no se puede deshacer.`,
      )
    )
      return;
    try {
      const response = await fetch(`/api/coaches/${coach.id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Delete failed");
      setCoaches((current) => current.filter((item) => item.id !== coach.id));
      setMessage("Coach eliminado");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
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
            Coaches
          </Typography>
          <Typography color="text.secondary">
            Gestiona el roster, bios, fotos y especialidades del equipo.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openCreate}
        >
          Nuevo coach
        </Button>
      </Stack>

      <TextField
        fullWidth
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Buscar por nombre, rol o especialidad..."
        sx={{ mb: 3, maxWidth: 620 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
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
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 2,
          }}
        >
          {filteredCoaches.map((coach) => (
            <Box
              key={coach.id}
              sx={{
                p: 2,
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: 3,
                bgcolor: "rgba(255,255,255,0.025)",
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ alignItems: "center" }}
              >
                <Avatar
                  src={coach.image_url || undefined}
                  alt={coach.name}
                  sx={{
                    width: 62,
                    height: 62,
                    bgcolor: "rgba(134,201,182,0.15)",
                  }}
                >
                  <ImageIcon />
                </Avatar>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography noWrap sx={{ fontWeight: 700 }}>
                    {coach.name}
                  </Typography>
                  <Typography variant="body2" color="primary.main" noWrap>
                    {coach.role || "Sin rol"}
                  </Typography>
                </Box>
              </Stack>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  minHeight: 42,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {coach.bio || "Sin biografía"}
              </Typography>
              <Stack
                direction="row"
                spacing={0.75}
                sx={{ minHeight: 26, flexWrap: "wrap", gap: 0.75 }}
              >
                {(coach.specialties || []).slice(0, 3).map((specialty) => (
                  <Typography
                    key={specialty}
                    variant="caption"
                    sx={{
                      border: "1px solid rgba(134,201,182,0.3)",
                      color: "#86C9B6",
                      borderRadius: 1,
                      px: 0.75,
                      py: 0.25,
                    }}
                  >
                    {specialty}
                  </Typography>
                ))}
              </Stack>
              <Stack
                direction="row"
                spacing={0.5}
                sx={{
                  justifyContent: "flex-end",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  pt: 1,
                }}
              >
                <Tooltip title="Editar">
                  <IconButton color="primary" onClick={() => openEdit(coach)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar">
                  <IconButton color="error" onClick={() => deleteCoach(coach)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>
          ))}
          {!filteredCoaches.length && (
            <Typography color="text.secondary">
              No se encontraron coaches.
            </Typography>
          )}
        </Box>
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
          {editing ? "Editar coach" : "Nuevo coach"}
          <IconButton onClick={() => setDialogOpen(false)} disabled={saving}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Nombre"
                required
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                fullWidth
              />
              <TextField
                label="Rol"
                value={form.role || ""}
                onChange={(e) => updateField("role", e.target.value)}
                fullWidth
              />
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ alignItems: "center" }}
            >
              <TextField
                label="Imagen URL"
                value={form.image_url || ""}
                onChange={(e) => updateField("image_url", e.target.value)}
                fullWidth
              />
              <Button
                component="label"
                variant="outlined"
                startIcon={
                  uploading ? <CircularProgress size={16} /> : <UploadIcon />
                }
                disabled={uploading}
                sx={{ minWidth: 170 }}
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
            <TextField
              label="Biografía completa"
              multiline
              minRows={7}
              value={form.bio || ""}
              onChange={(e) => updateField("bio", e.target.value)}
              fullWidth
            />
            <TextField
              label="Especialidades"
              helperText="Separadas por comas"
              value={(form.specialties || []).join(", ")}
              onChange={(e) =>
                updateField(
                  "specialties",
                  e.target.value
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),
                )
              }
              fullWidth
            />
            <TextField
              label="Quote"
              multiline
              minRows={2}
              value={form.quote || ""}
              onChange={(e) => updateField("quote", e.target.value)}
              fullWidth
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Instagram"
                placeholder="@usuario"
                value={form.instagram || ""}
                onChange={(e) => updateField("instagram", e.target.value)}
                fullWidth
              />
              <TextField
                label="Posición de imagen"
                placeholder="50% 30%"
                value={form.object_position || ""}
                onChange={(e) => updateField("object_position", e.target.value)}
                fullWidth
              />
              <TextField
                label="Orden"
                type="number"
                value={form.order_index}
                onChange={(e) =>
                  updateField("order_index", Number(e.target.value))
                }
                sx={{ width: 120 }}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDialogOpen(false)} disabled={saving}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={saveCoach}
            disabled={saving || uploading || !form.name.trim()}
          >
            {saving ? "Guardando..." : "Guardar coach"}
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
