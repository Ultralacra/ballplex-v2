"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  Close as CloseIcon,
  FiberManualRecord as LiveIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import { createClient } from "@/lib/supabase/client";

type LeadStatus = "new" | "contacted" | "qualified" | "closed";
type Lead = {
  id: string;
  source: "contact" | "homeschool";
  name: string;
  email: string;
  phone: string | null;
  status: LeadStatus;
  payload: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

const statusLabels: Record<LeadStatus, string> = {
  new: "Nuevo",
  contacted: "Contactado",
  qualified: "Cualificado",
  closed: "Cerrado",
};

const statusColors: Record<
  LeadStatus,
  "info" | "warning" | "success" | "default"
> = {
  new: "info",
  contacted: "warning",
  qualified: "success",
  closed: "default",
};

export default function LeadsAdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [realtime, setRealtime] = useState(false);
  const [error, setError] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const loadLeads = useCallback(async () => {
    try {
      const response = await fetch("/api/leads");
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "No se pudieron cargar los leads");
      setLeads(data.leads || []);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "No se pudieron cargar los leads",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLeads();
    const supabase = createClient();
    const channel = supabase
      .channel("admin-leads-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "leads" },
        (payload) => {
          setLeads((current) => [payload.new as Lead, ...current]);
        },
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "leads" },
        (payload) => {
          setLeads((current) =>
            current.map((lead) =>
              lead.id === payload.new.id ? (payload.new as Lead) : lead,
            ),
          );
        },
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "leads" },
        (payload) => {
          setLeads((current) =>
            current.filter((lead) => lead.id !== payload.old.id),
          );
        },
      )
      .subscribe((status) => setRealtime(status === "SUBSCRIBED"));

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadLeads]);

  const newCount = useMemo(
    () => leads.filter((lead) => lead.status === "new").length,
    [leads],
  );

  const updateStatus = async (lead: Lead, status: LeadStatus) => {
    const response = await fetch(`/api/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error || "No se pudo actualizar el lead");
      return;
    }
    setLeads((current) =>
      current.map((item) => (item.id === lead.id ? data.lead : item)),
    );
    setSelectedLead((current) =>
      current?.id === lead.id ? data.lead : current,
    );
  };

  const detailFields = selectedLead
    ? [
        { label: "Nombre de contacto", value: selectedLead.name },
        { label: "Email", value: selectedLead.email },
        { label: "Teléfono", value: selectedLead.phone },
        ...(selectedLead.source === "homeschool"
          ? [
              {
                label: "Nombre del atleta",
                value: selectedLead.payload.athleteFullName,
              },
              {
                label: "Nombre del padre/madre",
                value: selectedLead.payload.parentFullName,
              },
              {
                label: "Género del atleta",
                value: selectedLead.payload.athleteGender,
              },
              { label: "Deporte", value: selectedLead.payload.sport },
              {
                label: "Año de graduación",
                value: selectedLead.payload.gradYear,
              },
              {
                label: "Interesado en",
                value: selectedLead.payload.interestedIn,
              },
              { label: "GPA", value: selectedLead.payload.gpa },
              {
                label: "Equipo actual",
                value: selectedLead.payload.currentTeam,
              },
              {
                label: "Posición principal",
                value: selectedLead.payload.primaryFieldingPosition,
              },
            ]
          : [
              { label: "Interés", value: selectedLead.payload.interest },
              { label: "Mensaje", value: selectedLead.payload.message },
            ]),
      ]
    : [];

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
            Leads
          </Typography>
          <Typography color="text.secondary">
            Contactos de Contact y preinscripciones de Homeschool.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Chip
            icon={<LiveIcon sx={{ fontSize: 12 }} />}
            label={realtime ? "Tiempo real activo" : "Conectando..."}
            size="small"
            color={realtime ? "success" : "default"}
            variant="outlined"
          />
          <Chip label={`${newCount} nuevos`} size="small" color="info" />
        </Stack>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {loading ? (
        <Box sx={{ display: "grid", placeItems: "center", py: 8 }}>
          <CircularProgress sx={{ color: "#86C9B6" }} />
        </Box>
      ) : leads.length === 0 ? (
        <Alert severity="info">
          Todavía no hay leads. Los formularios nuevos aparecerán aquí
          automáticamente.
        </Alert>
      ) : (
        <TableContainer
          sx={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 2 }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Contacto</TableCell>
                <TableCell>Origen</TableCell>
                <TableCell>Detalle</TableCell>
                <TableCell>Recibido</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id} hover>
                  <TableCell>
                    <Typography sx={{ fontWeight: 600 }}>
                      {lead.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {lead.email}
                    </Typography>
                    {lead.phone && (
                      <Typography variant="body2" color="text.secondary">
                        {lead.phone}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={
                        lead.source === "homeschool" ? "Homeschool" : "Contacto"
                      }
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell sx={{ maxWidth: 300 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                    >
                      {lead.source === "homeschool"
                        ? `${lead.payload.athleteFullName || "Atleta"} · ${lead.payload.sport || "Sin deporte"} · ${lead.payload.interestedIn || ""}`
                        : String(lead.payload.message || "Sin mensaje")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(lead.created_at).toLocaleString("es-ES")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <FormControl size="small" sx={{ minWidth: 138 }}>
                      <InputLabel>Estado</InputLabel>
                      <Select
                        value={lead.status}
                        label="Estado"
                        onChange={(event) =>
                          updateStatus(lead, event.target.value as LeadStatus)
                        }
                      >
                        {(Object.keys(statusLabels) as LeadStatus[]).map(
                          (status) => (
                            <MenuItem key={status} value={status}>
                              {statusLabels[status]}
                            </MenuItem>
                          ),
                        )}
                      </Select>
                    </FormControl>
                    <Chip
                      label={statusLabels[lead.status]}
                      color={statusColors[lead.status]}
                      size="small"
                      sx={{ display: "none" }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      startIcon={<ViewIcon />}
                      onClick={() => setSelectedLead(lead)}
                    >
                      Ver detalle
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog
        open={Boolean(selectedLead)}
        onClose={() => setSelectedLead(null)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{ pr: 7 }}>
          <Typography variant="overline" color="primary">
            {selectedLead?.source === "homeschool"
              ? "Preinscripción Homeschool"
              : "Formulario de contacto"}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {selectedLead?.name}
          </Typography>
          <IconButton
            aria-label="Cerrar detalle"
            onClick={() => setSelectedLead(null)}
            sx={{ position: "absolute", right: 12, top: 12 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Chip
                label={selectedLead ? statusLabels[selectedLead.status] : ""}
                color={
                  selectedLead ? statusColors[selectedLead.status] : "default"
                }
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ alignSelf: "center" }}
              >
                Recibido:{" "}
                {selectedLead
                  ? new Date(selectedLead.created_at).toLocaleString("es-ES")
                  : ""}
              </Typography>
            </Stack>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, minmax(0, 1fr))",
                },
                gap: 2,
              }}
            >
              {detailFields.map((field) => (
                <Box
                  key={field.label}
                  sx={{
                    p: 1.5,
                    borderRadius: 1.5,
                    bgcolor: "rgba(255,255,255,0.04)",
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    {field.label}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 0.5,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {field.value === null ||
                    field.value === undefined ||
                    field.value === ""
                      ? "No indicado"
                      : String(field.value)}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between", px: 3, py: 2 }}>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Estado</InputLabel>
            <Select
              value={selectedLead?.status || "new"}
              label="Estado"
              onChange={(event) =>
                selectedLead &&
                updateStatus(selectedLead, event.target.value as LeadStatus)
              }
            >
              {(Object.keys(statusLabels) as LeadStatus[]).map((status) => (
                <MenuItem key={status} value={status}>
                  {statusLabels[status]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button onClick={() => setSelectedLead(null)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
