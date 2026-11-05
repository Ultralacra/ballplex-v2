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
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Link as LinkIcon,
} from "@mui/icons-material";

type ShortLink = {
  id: string;
  code: string;
  title: string;
  destination_url: string;
  is_active: boolean;
  click_count: number;
};

type FormState = Pick<
  ShortLink,
  "code" | "title" | "destination_url" | "is_active"
>;

const emptyForm: FormState = {
  code: "",
  title: "",
  destination_url: "",
  is_active: true,
};
const publicBaseUrl = "https://go.theballplex.com/";

function normalizeDestinationUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed || /^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export default function ShortLinksAdminPage() {
  const [items, setItems] = useState<ShortLink[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editing, setEditing] = useState<ShortLink | null>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/short-links");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "No se pudieron cargar");
      setItems(data.shortLinks || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudieron cargar");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    const value = query.toLowerCase().trim();
    if (!value) return items;
    return items.filter((item) =>
      `${item.code} ${item.title} ${item.destination_url}`
        .toLowerCase()
        .includes(value),
    );
  }, [items, query]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setError("");
    setOpen(true);
  };

  const openEdit = (item: ShortLink) => {
    setEditing(item);
    setForm({
      code: item.code,
      title: item.title,
      destination_url: item.destination_url,
      is_active: item.is_active,
    });
    setError("");
    setOpen(true);
  };

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const response = await fetch(
        editing ? `/api/short-links/${editing.id}` : "/api/short-links",
        {
          method: editing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            code: form.code.trim().toLowerCase(),
            destination_url: normalizeDestinationUrl(form.destination_url),
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "No se pudo guardar");
      setOpen(false);
      setMessage(editing ? "Enlace actualizado." : "Enlace creado.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (item: ShortLink) => {
    if (!window.confirm(`¿Eliminar /${item.code}?`)) return;
    const response = await fetch(`/api/short-links/${item.id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (!response.ok) setError(data.error || "No se pudo eliminar");
    else {
      setMessage("Enlace eliminado.");
      setItems((current) => current.filter((entry) => entry.id !== item.id));
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
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Enlaces cortos
          </Typography>
          <Typography color="text.secondary">
            Administra redirecciones de go.theballplex.com.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
          Nuevo enlace
        </Button>
      </Stack>

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

      <TextField
        fullWidth
        placeholder="Buscar por código, título o URL..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        sx={{ mb: 2, maxWidth: 680 }}
      />

      {loading ? (
        <CircularProgress sx={{ color: "#86C9B6" }} />
      ) : (
        <Box sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Enlace</TableCell>
                <TableCell>Destino</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="right">Clics</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Typography sx={{ fontWeight: 700 }}>
                      {item.title || item.code}
                    </Typography>
                    <Typography variant="body2" color="primary.main">
                      {publicBaseUrl}
                      {item.code}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 360 }}>
                    <Typography noWrap title={item.destination_url}>
                      {item.destination_url}
                    </Typography>
                  </TableCell>
                  <TableCell>{item.is_active ? "Activo" : "Inactivo"}</TableCell>
                  <TableCell align="right">{item.click_count || 0}</TableCell>
                  <TableCell align="right">
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {!filtered.length && (
            <Typography color="text.secondary" sx={{ p: 2 }}>
              No hay enlaces creados.
            </Typography>
          )}
        </Box>
      )}

      <Dialog
        open={open}
        onClose={() => !saving && setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{editing ? "Editar enlace" : "Nuevo enlace"}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="Código corto"
              required
              helperText="Ejemplo: camps — se convertirá en go.theballplex.com/camps"
              value={form.code}
              onChange={(event) =>
                setForm((current) => ({ ...current, code: event.target.value }))
              }
              fullWidth
            />
            <TextField
              label="Nombre interno"
              placeholder="Campamentos"
              value={form.title}
              onChange={(event) =>
                setForm((current) => ({ ...current, title: event.target.value }))
              }
              fullWidth
            />
            <TextField
              label="URL de destino"
              required
              helperText="Si escribes swift-booking.com, se agregará https:// automáticamente."
              placeholder="swift-booking.com/..."
              value={form.destination_url}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  destination_url: event.target.value,
                }))
              }
              onBlur={() =>
                setForm((current) => ({
                  ...current,
                  destination_url: normalizeDestinationUrl(
                    current.destination_url,
                  ),
                }))
              }
              fullWidth
            />
            <FormControlLabel
              control={
                <Switch
                  checked={form.is_active}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      is_active: event.target.checked,
                    }))
                  }
                />
              }
              label="Enlace activo"
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
            disabled={
              saving ||
              !form.code.trim() ||
              !form.destination_url.trim()
            }
            startIcon={saving ? undefined : <LinkIcon />}
          >
            {saving ? "Guardando..." : "Guardar enlace"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
