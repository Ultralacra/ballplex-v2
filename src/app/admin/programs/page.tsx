"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Add as AddIcon,
  CalendarMonth as CalendarIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIcon,
  Edit as EditIcon,
  ExpandMore as ExpandMoreIcon,
  Image as ImageIcon,
  Inventory2 as ProgramIcon,
  ListAlt as ListIcon,
  Payments as PaymentsIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

type FeatureRow = { name: string; description: string };
type PriceRow = {
  name: string;
  price: string;
  duration: string;
  description: string;
};
type ScheduleRow = { day: string; time: string };

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

type FormState = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  features: FeatureRow[];
  pricing: PriceRow[];
  schedule: ScheduleRow[];
  images: string[];
  order_index: number;
};

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

const blankFeature = (): FeatureRow => ({ name: "", description: "" });
const blankPrice = (): PriceRow => ({
  name: "",
  price: "",
  duration: "",
  description: "",
});
const blankSchedule = (): ScheduleRow => ({ day: "", time: "" });

function text(value: unknown) {
  return typeof value === "string" ? value : "";
}

function featureRows(value: unknown[] | null): FeatureRow[] {
  return (value || []).map((item) =>
    typeof item === "string"
      ? { name: item, description: "" }
      : {
          name: text((item as Record<string, unknown>)?.name),
          description: text((item as Record<string, unknown>)?.description),
        },
  );
}

function priceRows(value: unknown[] | null): PriceRow[] {
  return (value || []).map((item) => ({
    name: text((item as Record<string, unknown>)?.name),
    price: text((item as Record<string, unknown>)?.price),
    duration: text((item as Record<string, unknown>)?.duration),
    description: text((item as Record<string, unknown>)?.description),
  }));
}

function scheduleRows(value: unknown[] | null): ScheduleRow[] {
  return (value || []).map((item) => ({
    day: text((item as Record<string, unknown>)?.day),
    time: text((item as Record<string, unknown>)?.time),
  }));
}

function imageRows(value: string[] | null) {
  return (value || []).filter(Boolean);
}

function firstPrice(program: Program) {
  const first = program.pricing?.[0];
  if (typeof first === "string") return first;
  return text((first as Record<string, unknown>)?.price);
}

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
      if (!response.ok) {
        throw new Error(data.error || "No se pudieron cargar los programas");
      }
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
    if (!value) return items;
    return items.filter((item) =>
      `${item.title} ${item.slug} ${item.subtitle || ""}`
        .toLowerCase()
        .includes(value),
    );
  }, [items, query]);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm, order_index: items.length + 1 });
    setError("");
    setOpen(true);
  };

  const openEdit = (item: Program) => {
    setEditing(item);
    setForm({
      slug: item.slug,
      title: item.title,
      subtitle: item.subtitle || "",
      description: item.description || "",
      features: featureRows(item.features),
      pricing: priceRows(item.pricing),
      schedule: scheduleRows(item.schedule),
      images: imageRows(item.images),
      order_index: item.order_index || 0,
    });
    setError("");
    setOpen(true);
  };

  const update = <K extends keyof FormState>(field: K, value: FormState[K]) =>
    setForm((current) => ({ ...current, [field]: value }));

  const save = async () => {
    if (!form.title.trim() || !form.slug.trim()) {
      setError("Agrega un nombre y un identificador al programa.");
      return;
    }

    setSaving(true);
    setError("");
    try {
      const response = await fetch(
        editing ? `/api/programs/${editing.id}` : "/api/programs",
        {
          method: editing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            slug: form.slug.trim().toLowerCase().replace(/\s+/g, "-"),
            features: form.features.filter((item) => item.name.trim()),
            pricing: form.pricing.filter(
              (item) => item.name.trim() || item.price.trim(),
            ),
            schedule: form.schedule.filter(
              (item) => item.day.trim() || item.time.trim(),
            ),
            images: form.images.filter(Boolean),
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "No se pudo guardar");
      setOpen(false);
      setMessage(editing ? "Programa actualizado." : "Programa creado.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (item: Program) => {
    if (!window.confirm(`¿Eliminar ${item.title}? Esta acción no se puede deshacer.`)) {
      return;
    }
    const response = await fetch(`/api/programs/${item.id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (!response.ok) setError(data.error || "No se pudo eliminar");
    else {
      setItems((current) => current.filter((entry) => entry.id !== item.id));
      setMessage("Programa eliminado.");
    }
  };

  return (
    <Box sx={{ maxWidth: 1320, mx: "auto" }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ mb: 4, justifyContent: "space-between", alignItems: { md: "center" } }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: "-0.03em" }}>
            Programas
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            Organiza los servicios que aparecen en la página principal.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
          Nuevo programa
        </Button>
      </Stack>

      {message && (
        <Alert severity="success" onClose={() => setMessage("")} sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}
      {error && !open && (
        <Alert severity="error" onClose={() => setError("")} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        placeholder="Buscar por nombre o categoría..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        sx={{ mb: 3, maxWidth: 560 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
          },
        }}
      />

      {loading ? (
        <CircularProgress sx={{ color: "#86C9B6" }} />
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: 2,
          }}
        >
          {filtered.map((item, index) => (
            <Card
              key={item.id}
              sx={{
                border: "1px solid rgba(255,255,255,.09)",
                background:
                  "linear-gradient(145deg, rgba(134,201,182,.09), rgba(255,255,255,.025) 45%)",
                transition: "transform .2s ease, border-color .2s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  borderColor: "rgba(134,201,182,.35)",
                },
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "flex-start" }}>
                  <Box
                    sx={{
                      display: "grid",
                      width: 46,
                      height: 46,
                      flexShrink: 0,
                      placeItems: "center",
                      borderRadius: 2.5,
                      color: "#86C9B6",
                      backgroundColor: "rgba(134,201,182,.12)",
                    }}
                  >
                    <ProgramIcon />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="overline" color="text.secondary">
                      Programa {String(index + 1).padStart(2, "0")}
                    </Typography>
                    <Typography sx={{ fontWeight: 750, fontSize: "1.1rem" }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {item.subtitle || "Sin subtítulo"}
                    </Typography>
                  </Box>
                  <Tooltip title="Editar programa">
                    <IconButton onClick={() => openEdit(item)} color="primary">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    minHeight: 44,
                    mt: 2,
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                  }}
                >
                  {item.description || "Agrega una descripción para explicar este servicio."}
                </Typography>

                <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,.08)" }} />
                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                  <Typography variant="caption" color="text.secondary">
                    {item.pricing?.length || 0} precios
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.features?.length || 0} características
                  </Typography>
                  {firstPrice(item) && (
                    <Typography
                      variant="caption"
                      sx={{ ml: "auto", color: "#86C9B6", fontWeight: 700 }}
                    >
                      {firstPrice(item)}
                    </Typography>
                  )}
                </Stack>
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <Button
                    fullWidth
                    size="small"
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => openEdit(item)}
                  >
                    Editar contenido
                  </Button>
                  <Tooltip title="Eliminar programa">
                    <IconButton onClick={() => remove(item)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </CardContent>
            </Card>
          ))}
          {!filtered.length && (
            <Typography color="text.secondary" sx={{ gridColumn: "1 / -1", py: 4 }}>
              No se encontraron programas.
            </Typography>
          )}
        </Box>
      )}

      <Dialog
        open={open}
        onClose={() => !saving && setOpen(false)}
        fullWidth
        maxWidth="lg"
        fullScreen={false}
      >
        <DialogTitle sx={{ pb: 1.5 }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <Box
              sx={{
                display: "grid",
                width: 40,
                height: 40,
                placeItems: "center",
                borderRadius: 2,
                color: "#86C9B6",
                backgroundColor: "rgba(134,201,182,.12)",
              }}
            >
              <ProgramIcon />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                {editing ? "Editar programa" : "Crear programa"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Completa los bloques de contenido. No necesitas usar código.
              </Typography>
            </Box>
          </Stack>
          <IconButton
            onClick={() => setOpen(false)}
            disabled={saving}
            sx={{ position: "absolute", right: 12, top: 12 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: { xs: 2, md: 3 } }}>
          {error && (
            <Alert severity="error" onClose={() => setError("")} sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Stack spacing={1.5}>
            <Accordion defaultExpanded disableGutters>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                  <ProgramIcon color="primary" />
                  <Box>
                    <Typography sx={{ fontWeight: 700 }}>Información principal</Typography>
                    <Typography variant="caption" color="text.secondary">
                      El nombre y la descripción que verá el visitante
                    </Typography>
                  </Box>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    gap: 2,
                  }}
                >
                  <TextField
                    required
                    label="Nombre del programa"
                    placeholder="Private Lessons"
                    value={form.title}
                    onChange={(event) => update("title", event.target.value)}
                    autoFocus
                  />
                  <TextField
                    label="Frase corta"
                    placeholder="One-on-One Elite Training"
                    value={form.subtitle}
                    onChange={(event) => update("subtitle", event.target.value)}
                  />
                  <TextField
                    required
                    label="Categoría interna"
                    helperText="Se usa para conectar el programa con sus enlaces."
                    placeholder="lessons"
                    value={form.slug}
                    onChange={(event) => update("slug", event.target.value)}
                  />
                  <TextField
                    type="number"
                    label="Posición en la página"
                    helperText="Número menor = aparece primero."
                    value={form.order_index}
                    onChange={(event) =>
                      update("order_index", Number(event.target.value) || 0)
                    }
                  />
                  <TextField
                    label="Descripción"
                    placeholder="Explica en pocas palabras qué incluye este programa."
                    multiline
                    minRows={4}
                    value={form.description}
                    onChange={(event) => update("description", event.target.value)}
                    sx={{ gridColumn: { md: "1 / -1" } }}
                  />
                </Box>
              </AccordionDetails>
            </Accordion>

            <EditorSection
              icon={<ListIcon color="primary" />}
              title="Qué incluye"
              description="Beneficios o características que quieres destacar."
              count={form.features.length}
              onAdd={() => update("features", [...form.features, blankFeature()])}
            >
              <Stack spacing={1.5}>
                {form.features.map((item, index) => (
                  <RowCard key={`feature-${index}`}>
                    <DragIcon sx={{ color: "text.disabled" }} />
                    <TextField
                      label="Característica"
                      placeholder="Personalized development plan"
                      value={item.name}
                      onChange={(event) => {
                        const next = [...form.features];
                        next[index] = { ...item, name: event.target.value };
                        update("features", next);
                      }}
                      fullWidth
                    />
                    <TextField
                      label="Detalle opcional"
                      placeholder="Una breve explicación"
                      value={item.description}
                      onChange={(event) => {
                        const next = [...form.features];
                        next[index] = {
                          ...item,
                          description: event.target.value,
                        };
                        update("features", next);
                      }}
                      fullWidth
                    />
                    <IconButton
                      color="error"
                      onClick={() =>
                        update(
                          "features",
                          form.features.filter((_, rowIndex) => rowIndex !== index),
                        )
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </RowCard>
                ))}
                {!form.features.length && <EmptyRows text="Todavía no hay características." />}
              </Stack>
            </EditorSection>

            <EditorSection
              icon={<PaymentsIcon color="primary" />}
              title="Precios y planes"
              description="Agrega los planes, precios y la información que los acompaña."
              count={form.pricing.length}
              onAdd={() => update("pricing", [...form.pricing, blankPrice()])}
            >
              <Stack spacing={1.5}>
                {form.pricing.map((item, index) => (
                  <RowCard key={`price-${index}`} align="flex-start">
                    <DragIcon sx={{ mt: 1, color: "text.disabled" }} />
                    <Box
                      sx={{
                        flex: 1,
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1.2fr .8fr .8fr" },
                        gap: 1.5,
                      }}
                    >
                      <TextField
                        label="Nombre del plan"
                        placeholder="Single Lesson"
                        value={item.name}
                        onChange={(event) => {
                          const next = [...form.pricing];
                          next[index] = { ...item, name: event.target.value };
                          update("pricing", next);
                        }}
                      />
                      <TextField
                        label="Precio"
                        placeholder="From $80/hr"
                        value={item.price}
                        onChange={(event) => {
                          const next = [...form.pricing];
                          next[index] = { ...item, price: event.target.value };
                          update("pricing", next);
                        }}
                      />
                      <TextField
                        label="Duración"
                        placeholder="1 Hour"
                        value={item.duration}
                        onChange={(event) => {
                          const next = [...form.pricing];
                          next[index] = {
                            ...item,
                            duration: event.target.value,
                          };
                          update("pricing", next);
                        }}
                      />
                      <TextField
                        label="Descripción del plan"
                        placeholder="Perfect for targeted skill work."
                        value={item.description}
                        onChange={(event) => {
                          const next = [...form.pricing];
                          next[index] = {
                            ...item,
                            description: event.target.value,
                          };
                          update("pricing", next);
                        }}
                        sx={{ gridColumn: { md: "1 / -1" } }}
                      />
                    </Box>
                    <IconButton
                      color="error"
                      onClick={() =>
                        update(
                          "pricing",
                          form.pricing.filter((_, rowIndex) => rowIndex !== index),
                        )
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </RowCard>
                ))}
                {!form.pricing.length && <EmptyRows text="Todavía no hay precios o planes." />}
              </Stack>
            </EditorSection>

            <EditorSection
              icon={<CalendarIcon color="primary" />}
              title="Horarios"
              description="Indica los días y horarios disponibles para este programa."
              count={form.schedule.length}
              onAdd={() => update("schedule", [...form.schedule, blankSchedule()])}
            >
              <Stack spacing={1.5}>
                {form.schedule.map((item, index) => (
                  <RowCard key={`schedule-${index}`}>
                    <DragIcon sx={{ color: "text.disabled" }} />
                    <TextField
                      label="Día"
                      placeholder="Monday"
                      value={item.day}
                      onChange={(event) => {
                        const next = [...form.schedule];
                        next[index] = { ...item, day: event.target.value };
                        update("schedule", next);
                      }}
                      fullWidth
                    />
                    <TextField
                      label="Horario"
                      placeholder="3:30 PM - 7:30 PM"
                      value={item.time}
                      onChange={(event) => {
                        const next = [...form.schedule];
                        next[index] = { ...item, time: event.target.value };
                        update("schedule", next);
                      }}
                      fullWidth
                    />
                    <IconButton
                      color="error"
                      onClick={() =>
                        update(
                          "schedule",
                          form.schedule.filter((_, rowIndex) => rowIndex !== index),
                        )
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </RowCard>
                ))}
                {!form.schedule.length && <EmptyRows text="Este programa no tiene horarios agregados." />}
              </Stack>
            </EditorSection>

            <EditorSection
              icon={<ImageIcon color="primary" />}
              title="Imágenes"
              description="Agrega una URL por fila para las imágenes del programa."
              count={form.images.length}
              onAdd={() => update("images", [...form.images, ""])}
            >
              <Stack spacing={1.5}>
                {form.images.map((image, index) => (
                  <RowCard key={`image-${index}`}>
                    <ImageIcon sx={{ color: "text.disabled" }} />
                    <TextField
                      label={`Imagen ${index + 1}`}
                      placeholder="/images-lessons/lessons-1.jpg"
                      value={image}
                      onChange={(event) => {
                        const next = [...form.images];
                        next[index] = event.target.value;
                        update("images", next);
                      }}
                      fullWidth
                    />
                    <IconButton
                      color="error"
                      onClick={() =>
                        update(
                          "images",
                          form.images.filter((_, rowIndex) => rowIndex !== index),
                        )
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </RowCard>
                ))}
                {!form.images.length && <EmptyRows text="No hay imágenes agregadas." />}
              </Stack>
            </EditorSection>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
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

function EditorSection({
  icon,
  title,
  description,
  count,
  onAdd,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  count: number;
  onAdd: () => void;
  children: React.ReactNode;
}) {
  return (
    <Accordion disableGutters>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", width: "100%", pr: 1 }}>
          {icon}
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 700 }}>{title}</Typography>
            <Typography variant="caption" color="text.secondary">
              {description}
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            {count} {count === 1 ? "elemento" : "elementos"}
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        {children}
        <Button startIcon={<AddIcon />} onClick={onAdd} sx={{ mt: 2 }}>
          Agregar {title.toLowerCase().replace(" y planes", "")}
        </Button>
      </AccordionDetails>
    </Accordion>
  );
}

function RowCard({
  children,
  align = "center",
}: {
  children: React.ReactNode;
  align?: "center" | "flex-start";
}) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: align,
        p: 1.5,
        border: "1px solid rgba(255,255,255,.08)",
        borderRadius: 2,
        backgroundColor: "rgba(255,255,255,.025)",
        flexWrap: { xs: "wrap", md: "nowrap" },
      }}
    >
      {children}
    </Box>
  );
}

function EmptyRows({ text }: { text: string }) {
  return (
    <Box
      sx={{
        py: 3,
        px: 2,
        textAlign: "center",
        border: "1px dashed rgba(255,255,255,.16)",
        borderRadius: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
    </Box>
  );
}
