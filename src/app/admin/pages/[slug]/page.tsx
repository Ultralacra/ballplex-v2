"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
} from "@mui/material";
import {
  ArrowBack as BackIcon,
  Add as AddIcon,
  Close as CloseIcon,
  KeyboardArrowUp as UpIcon,
  KeyboardArrowDown as DownIcon,
  OpenInNew as PreviewIcon,
  Computer as DesktopIcon,
  TabletMac as TabletIcon,
  Smartphone as MobileIcon,
  Visibility as ShowIcon,
  VisibilityOff as HideIcon,
} from "@mui/icons-material";
import type { PageSection, SectionType } from "@/lib/types/sections";
import { SECTION_LABELS, AVAILABLE_SECTION_TYPES } from "@/lib/types/sections";
import SectionWrapper from "@/components/admin/SectionWrapper";
import { EditorForm } from "@/components/admin/editors/EditorForms";

const PAGE_LABELS: Record<string, string> = {
  home: "Home",
  programs: "Programs",
  events: "Events",
  homeschool: "Homeschool",
  contact: "Contact",
};

export default function PageVisualEditor() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();

  const [sections, setSections] = useState<PageSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addType, setAddType] = useState<SectionType | "">("");
  const [adding, setAdding] = useState(false);
  const [snackbar, setSnackbar] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null,
  );
  const [draftProps, setDraftProps] = useState<Record<string, unknown>>({});
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewVersion, setPreviewVersion] = useState(0);
  const [previewDevice, setPreviewDevice] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");

  const fetchSections = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/sections?page=${slug}&includeHidden=1`);
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(
          body?.error || `Request failed with status ${res.status}`,
        );
      }
      const data = await res.json();
      setSections(data);
      setSelectedSectionId((current) =>
        current && data.some((section: PageSection) => section.id === current)
          ? current
          : data[0]?.id || null,
      );
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Error loading sections",
      );
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  const handleUpdate = async (id: string, data: Partial<PageSection>) => {
    try {
      const res = await fetch(`/api/sections/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setSections((prev) => prev.map((s) => (s.id === id ? updated : s)));
      if (data.props) {
        setDraftProps(data.props);
        setPreviewVersion((version) => version + 1);
      }
      setSnackbar("Section updated");
    } catch {
      setSnackbar("Error updating section");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/sections/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setSections((prev) => prev.filter((s) => s.id !== id));
      if (selectedSectionId === id) {
        setSelectedSectionId(null);
        setDraftProps({});
      }
      setSnackbar("Section deleted");
    } catch {
      setSnackbar("Error deleting section");
    }
  };

  const handleToggleVisibility = async (id: string) => {
    const section = sections.find((s) => s.id === id);
    if (!section) return;
    await handleUpdate(id, { is_visible: !section.is_visible });
  };

  const handleReorder = async (id: string, direction: "up" | "down") => {
    const index = sections.findIndex((s) => s.id === id);
    if (index === -1) return;
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= sections.length) return;

    const reordered = [...sections];
    [reordered[index], reordered[newIndex]] = [
      reordered[newIndex],
      reordered[index],
    ];

    const newOrder = reordered.map((s, i) => ({ ...s, order_index: i }));
    setSections(newOrder);

    try {
      await fetch("/api/sections/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sections: newOrder.map((s) => s.id) }),
      });
    } catch {
      setSnackbar("Error reordering");
      fetchSections();
    }
  };

  const handleAddSection = async () => {
    if (!addType) return;
    setAdding(true);
    try {
      const res = await fetch("/api/sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page_slug: slug,
          type: addType,
          label: SECTION_LABELS[addType],
          props: {},
          order_index: sections.length,
        }),
      });
      if (!res.ok) throw new Error();
      const newSection = await res.json();
      setSections((prev) => [...prev, newSection]);
      setSelectedSectionId(newSection.id);
      setDraftProps(newSection.props);
      setAddType("");
      setSnackbar("Section added");
    } catch {
      setSnackbar("Error adding section");
    } finally {
      setAdding(false);
    }
  };

  const selectedSection =
    sections.find((section) => section.id === selectedSectionId) || null;
  const previewPath = slug === "home" ? "/" : `/${slug}`;

  const selectSection = (id: string) => {
    const section = sections.find((item) => item.id === id);
    if (!section) return;
    setSelectedSectionId(id);
    setDraftProps(section.props);
  };

  const saveSelectedSection = () => {
    if (!selectedSection) return;
    handleUpdate(selectedSection.id, { props: draftProps });
  };

  return (
    <Box sx={{ maxWidth: "none" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <IconButton
          onClick={() => router.push("/admin/pages")}
          sx={{ color: "text.secondary" }}
        >
          <BackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: 700, flex: 1 }}>
          {PAGE_LABELS[slug] || slug}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<PreviewIcon />}
          onClick={() => setPreviewOpen(true)}
        >
          Ver página real
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <CircularProgress sx={{ color: "#86C9B6" }} />
        </Box>
      ) : error ? (
        <Alert
          severity="error"
          sx={{
            backgroundColor: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.2)",
          }}
        >
          {error}
        </Alert>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              lg: "220px minmax(0, 1fr) 360px",
            },
            gap: 3,
            alignItems: "start",
          }}
        >
          <Box sx={{ minWidth: 0, display: "none" }}>
            {sections.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  No sections yet. Add your first section below.
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {sections.map((section, index) => (
                  <Box key={section.id} sx={{ position: "relative" }}>
                    <Box
                      sx={{
                        position: "absolute",
                        left: -48,
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 50,
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                        opacity: 0.6,
                        "&:hover": { opacity: 1 },
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => handleReorder(section.id, "up")}
                        disabled={index === 0}
                        sx={{ color: "text.secondary", p: 0.3 }}
                      >
                        <UpIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleReorder(section.id, "down")}
                        disabled={index === sections.length - 1}
                        sx={{ color: "text.secondary", p: 0.3 }}
                      >
                        <DownIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    <SectionWrapper
                      section={
                        section.id === selectedSectionId
                          ? { ...section, props: draftProps }
                          : section
                      }
                      selected={section.id === selectedSectionId}
                      onSelect={selectSection}
                      onDelete={handleDelete}
                      onToggleVisibility={handleToggleVisibility}
                    />
                  </Box>
                ))}
              </Box>
            )}

            <Box
              sx={{
                mt: 4,
                p: 3,
                border: "2px dashed rgba(255,255,255,0.15)",
                borderRadius: 3,
                textAlign: "center",
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Add New Section
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <InputLabel>Section Type</InputLabel>
                  <Select
                    value={addType}
                    label="Section Type"
                    onChange={(e) => setAddType(e.target.value as SectionType)}
                  >
                    {AVAILABLE_SECTION_TYPES.map((t) => (
                      <MenuItem key={t} value={t}>
                        {SECTION_LABELS[t]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handleAddSection}
                  disabled={!addType || adding}
                >
                  {adding ? "Adding..." : "Add Section"}
                </Button>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              position: { lg: "sticky" },
              top: { lg: 88 },
              alignSelf: "start",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 1,
              backgroundColor: "#18181b",
            }}
          >
            <Box
              sx={{
                px: 2,
                py: 1.75,
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Typography
                sx={{
                  color: "#86C9B6",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Bloques
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Selecciona una sección para editarla
              </Typography>
            </Box>
            <Box sx={{ p: 1 }}>
              {sections.map((section, index) => {
                const isSelected = section.id === selectedSectionId;
                return (
                  <Stack key={section.id} direction="row" spacing={0.25} sx={{ mb: 0.5 }}>
                    <Button
                      fullWidth
                      onClick={() => selectSection(section.id)}
                      sx={{
                        justifyContent: "flex-start",
                        gap: 1,
                        px: 1.25,
                        py: 1.1,
                        textAlign: "left",
                        color: isSelected ? "#fafafa" : "text.secondary",
                        opacity: section.is_visible ? 1 : 0.45,
                        backgroundColor: isSelected
                          ? "rgba(134,201,182,.12)"
                          : "transparent",
                        borderLeft: isSelected
                          ? "2px solid #86C9B6"
                          : "2px solid transparent",
                        "&:hover": {
                          backgroundColor: "rgba(134,201,182,.08)",
                        },
                      }}
                    >
                      <Typography component="span" sx={{ minWidth: 20, color: isSelected ? "#86C9B6" : "text.disabled", fontSize: 11, fontWeight: 700 }}>
                        {String(index + 1).padStart(2, "0")}
                      </Typography>
                      <Typography component="span" sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: 12, fontWeight: isSelected ? 700 : 500 }}>
                        {section.label || SECTION_LABELS[section.type] || section.type}
                      </Typography>
                    </Button>
                    <IconButton
                      size="small"
                      aria-label={section.is_visible ? "Ocultar sección" : "Mostrar sección"}
                      onClick={() => handleToggleVisibility(section.id)}
                    >
                      {section.is_visible ? <HideIcon fontSize="small" /> : <ShowIcon fontSize="small" />}
                    </IconButton>
                    <Stack>
                      <IconButton size="small" disabled={index === 0} onClick={() => handleReorder(section.id, "up")}><UpIcon fontSize="small" /></IconButton>
                      <IconButton size="small" disabled={index === sections.length - 1} onClick={() => handleReorder(section.id, "down")}><DownIcon fontSize="small" /></IconButton>
                    </Stack>
                  </Stack>
                );
              })}
            </Box>
          </Box>

          <Box
            sx={{
              minWidth: 0,
              position: { lg: "sticky" },
              top: { lg: 88 },
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 1,
              backgroundColor: "#09090b",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: { xs: "flex-start", sm: "center" },
                justifyContent: "space-between",
                gap: 1,
                flexWrap: "wrap",
                px: 2,
                py: 1.5,
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Typography
                sx={{
                  color: "#86C9B6",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Frontend real
              </Typography>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <ToggleButtonGroup
                  size="small"
                  exclusive
                  value={previewDevice}
                  onChange={(_, value) => value && setPreviewDevice(value)}
                  aria-label="Tamaño de vista previa"
                >
                  <ToggleButton value="desktop" aria-label="Vista de escritorio">
                    <DesktopIcon fontSize="small" />
                  </ToggleButton>
                  <ToggleButton value="tablet" aria-label="Vista de tablet">
                    <TabletIcon fontSize="small" />
                  </ToggleButton>
                  <ToggleButton value="mobile" aria-label="Vista de móvil">
                    <MobileIcon fontSize="small" />
                  </ToggleButton>
                </ToggleButtonGroup>
                <Button
                  size="small"
                  startIcon={<PreviewIcon />}
                  onClick={() => setPreviewOpen(true)}
                >
                  Pantalla completa
                </Button>
              </Stack>
            </Box>
            <Box
              sx={{
                height: { xs: 520, lg: "calc(100vh - 170px)" },
                overflow: "auto",
                background:
                  "radial-gradient(rgba(255,255,255,.06) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
                p: { xs: 0, md: 2 },
              }}
            >
              <Box
                sx={{
                  width:
                    previewDevice === "mobile"
                      ? 390
                      : previewDevice === "tablet"
                        ? 768
                        : "100%",
                  maxWidth: "100%",
                  height: "100%",
                  mx: "auto",
                  overflow: "hidden",
                  border:
                    previewDevice === "desktop"
                      ? "0"
                      : "1px solid rgba(255,255,255,.14)",
                  borderRadius: previewDevice === "desktop" ? 0 : 2,
                  backgroundColor: "#09090b",
                  transition: "width .2s ease",
                }}
              >
                <iframe
                  key={previewVersion}
                  title={`Frontend real de ${PAGE_LABELS[slug] || slug}`}
                src={`${previewPath}?adminPreview=${previewVersion}`}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    border: 0,
                    backgroundColor: "#09090b",
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              position: { lg: "sticky" },
              top: { lg: 88 },
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 1,
              backgroundColor: "#18181b",
            }}
          >
            <Box
              sx={{
                p: 2,
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <FormControl fullWidth size="small">
                <InputLabel>Bloque a editar</InputLabel>
                <Select
                  value={selectedSectionId || ""}
                  label="Bloque a editar"
                  onChange={(event) => selectSection(event.target.value)}
                >
                  {sections.map((section) => (
                    <MenuItem key={section.id} value={section.id}>
                      {section.label || SECTION_LABELS[section.type] || section.type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {selectedSection ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 2,
                    p: 2.5,
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        color: "#86C9B6",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.13em",
                        textTransform: "uppercase",
                      }}
                    >
                      Editing block
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ mt: 0.5, fontWeight: 700 }}
                    >
                      {selectedSection.label || selectedSection.type}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Changes update the canvas instantly
                    </Typography>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setSelectedSectionId(null);
                      setDraftProps({});
                    }}
                    sx={{ color: "text.secondary" }}
                    aria-label="Close inspector"
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    maxHeight: { xs: "none", lg: "calc(100vh - 250px)" },
                    overflowY: "auto",
                    p: 2.5,
                  }}
                >
                  <EditorForm
                    type={selectedSection.type}
                    props={draftProps}
                    onChange={setDraftProps}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    p: 2,
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <Button
                    fullWidth
                    onClick={() => selectSection(selectedSection.id)}
                    sx={{ color: "text.secondary" }}
                  >
                    Restablecer
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={saveSelectedSection}
                  >
                    Guardar
                  </Button>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  p: 3,
                  minHeight: 180,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#86C9B6",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.13em",
                    textTransform: "uppercase",
                  }}
                >
                  Inspector
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 700 }}>
                  Select a block
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.75 }}
                >
                  Click any section on the canvas to edit its content here.
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      )}

      <Snackbar
        open={!!snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar("")}
        message={snackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />

      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} fullScreen>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Typography sx={{ flex: 1, fontWeight: 700 }}>
            Vista previa real — {PAGE_LABELS[slug] || slug}
          </Typography>
          <Button onClick={() => setPreviewOpen(false)}>
            Volver al editor
          </Button>
        </DialogTitle>
        <DialogContent sx={{ p: 0, backgroundColor: "#09090b" }}>
          <iframe
            key={previewVersion}
            title={`Vista previa de ${PAGE_LABELS[slug] || slug}`}
                  src={`${previewPath}?adminPreview=${previewVersion}`}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              border: 0,
              backgroundColor: "#09090b",
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
