"use client";

import { useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import {
  Delete as DeleteIcon,
  VisibilityOff as HideIcon,
  DragHandle as DragIcon,
} from "@mui/icons-material";
import type { PageSection } from "@/lib/types/sections";
import DynamicSection from "./DynamicSection";

type SectionWrapperProps = {
  section: PageSection;
  selected: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  dragHandleProps?: Record<string, unknown>;
};

export default function SectionWrapper({
  section,
  selected,
  onSelect,
  onDelete,
  onToggleVisibility,
  dragHandleProps,
}: SectionWrapperProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(section.id)}
      sx={{
        position: "relative",
        cursor: "pointer",
        opacity: section.is_visible ? 1 : 0.35,
        outline: selected
          ? "2px solid #86C9B6"
          : hovered
            ? "2px solid rgba(134, 201, 182, 0.5)"
            : "2px solid transparent",
        outlineOffset: "-2px",
        transition: "opacity 0.2s, outline 0.2s",
        borderRadius: 0,
        "& [data-reveal]": {
          opacity: "1 !important",
          transform: "none !important",
          transition: "none !important",
        },
      }}
    >
      {hovered && (
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 100,
            display: "flex",
            gap: 0.5,
            backgroundColor: "rgba(24, 24, 27, 0.95)",
            borderRadius: 2,
            border: "1px solid rgba(255,255,255,0.1)",
            px: 0.5,
            py: 0.5,
          }}
        >
          <Tooltip title="Arrastrar" placement="top">
            <span {...dragHandleProps}>
              <IconButton
                size="small"
                sx={{ color: "text.secondary", cursor: "grab" }}
              >
                <DragIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip
            title={section.is_visible ? "Ocultar" : "Mostrar"}
            placement="top"
          >
            <IconButton
              size="small"
              onClick={(event) => {
                event.stopPropagation();
                onToggleVisibility(section.id);
              }}
              sx={{ color: "text.secondary" }}
            >
              <HideIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar" placement="top">
            <IconButton
              size="small"
              onClick={(event) => {
                event.stopPropagation();
                onDelete(section.id);
              }}
              sx={{ color: "#ef4444" }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      {hovered && (
        <Box
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            zIndex: 100,
            backgroundColor: "rgba(134, 201, 182, 0.9)",
            color: "#09090b",
            borderRadius: 1,
            px: 1.5,
            py: 0.3,
            fontSize: "0.7rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {section.label || section.type}
        </Box>
      )}

      <DynamicSection type={section.type as any} props={section.props as any} />
    </Box>
  );
}
