"use client";

import { useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import type { PageSection, SectionType } from "@/lib/types/sections";
import { EditorForm } from "./EditorForms";
import DynamicSection from "../DynamicSection";

type SectionEditorProps = {
  section: PageSection;
  onSave: (data: Partial<PageSection>) => void;
  onClose: () => void;
};

export default function SectionEditor({
  section,
  onSave,
  onClose,
}: SectionEditorProps) {
  const [props, setProps] = useState<Record<string, unknown>>({
    ...section.props,
  });

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="xl"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            width: "min(1500px, calc(100vw - 32px))",
            height: "min(900px, calc(100vh - 32px))",
            maxHeight: "none",
            overflow: "hidden",
            backgroundColor: "#18181b",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          px: { xs: 2, md: 3 },
          py: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#86C9B6",
              boxShadow: "0 0 0 5px rgba(134,201,182,0.12)",
            }}
          />
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, lineHeight: 1.2 }}
            >
              {section.label || section.type}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {section.type} · Live preview
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{ p: 0, borderColor: "rgba(255,255,255,0.1)", overflow: "hidden" }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              lg: "minmax(330px, 0.38fr) minmax(0, 0.62fr)",
            },
            height: "100%",
            minHeight: 0,
          }}
        >
          <Box
            sx={{
              overflowY: "auto",
              p: { xs: 2, md: 3 },
              borderRight: { lg: "1px solid rgba(255,255,255,0.1)" },
              maxHeight: { xs: 360, lg: "none" },
            }}
          >
            <Typography
              sx={{
                mb: 2,
                color: "#86C9B6",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Edit block
            </Typography>
            <EditorForm
              type={section.type as SectionType}
              props={props}
              onChange={setProps}
            />
          </Box>

          <Box
            sx={{
              minWidth: 0,
              minHeight: 0,
              overflow: "auto",
              backgroundColor: "#09090b",
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
              p: { xs: 1, md: 3 },
            }}
          >
            <Box
              sx={{
                mb: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 1,
              }}
            >
              <Typography
                sx={{
                  color: "rgba(250,250,250,0.55)",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Preview
              </Typography>
              <Typography
                sx={{ color: "rgba(250,250,250,0.35)", fontSize: 11 }}
              >
                Changes appear instantly
              </Typography>
            </Box>
            <Box
              sx={{
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 1,
                backgroundColor: "#09090b",
                boxShadow: "0 20px 70px rgba(0,0,0,0.35)",
                pointerEvents: "none",
              }}
            >
              <DynamicSection type={section.type as any} props={props as any} />
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          px: { xs: 2, md: 3 },
          py: 1.5,
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Button onClick={onClose} sx={{ color: "text.secondary" }}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onSave({ props })}
        >
          Guardar cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
}
