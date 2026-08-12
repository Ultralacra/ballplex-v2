"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Snackbar,
  CircularProgress,
  Breadcrumbs,
  Link,
  Chip,
  Tooltip,
} from "@mui/material";
import {
  Upload as UploadIcon,
  Delete as DeleteIcon,
  ContentCopy as CopyIcon,
  Folder as FolderIcon,
  InsertDriveFile as FileIcon,
} from "@mui/icons-material";

type StorageItem = {
  name: string;
  path: string;
  url: string;
  size: number;
  mimetype: string;
  created_at: string;
  source?: "storage" | "coach";
};

type CoachImage = {
  id: string;
  name: string;
  image_url: string | null;
};

export default function ImagesAdminPage() {
  const [items, setItems] = useState<StorageItem[]>([]);
  const [folders, setFolders] = useState<string[]>([]);
  const [prefix, setPrefix] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [snackbar, setSnackbar] = useState("");

  const coachItems = useCallback(async (): Promise<StorageItem[]> => {
    const response = await fetch("/api/coaches");
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Unable to load coaches");
    return ((data.coaches as CoachImage[]) || [])
      .filter((coach) => coach.image_url)
      .map((coach) => ({
        name: coach.name,
        path: `coaches/${coach.id}`,
        url: coach.image_url as string,
        size: 0,
        mimetype: "image/*",
        created_at: "",
        source: "coach" as const,
      }));
  }, []);

  const fetchFiles = useCallback(
    async (p: string) => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/storage?prefix=${encodeURIComponent(p)}&recursive=${p === ""}`,
        );
        const data = await res.json();
        const storageItems: StorageItem[] = data.items || [];
        const coaches = p === "" ? await coachItems() : [];
        const knownUrls = new Set(storageItems.map((item) => item.url));
        setItems([
          ...storageItems,
          ...coaches.filter((item) => !knownUrls.has(item.url)),
        ]);
        setFolders(data.folders || []);
      } catch (error) {
        setSnackbar(
          error instanceof Error ? error.message : "Error loading files",
        );
      } finally {
        setLoading(false);
      }
    },
    [coachItems],
  );

  useEffect(() => {
    fetchFiles(prefix);
  }, [prefix, fetchFiles]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("path", prefix);

    try {
      const res = await fetch("/api/storage", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      setSnackbar("File uploaded");
      fetchFiles(prefix);
    } catch {
      setSnackbar("Upload error");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async (path: string) => {
    if (
      path.startsWith("coaches/") &&
      items.find((item) => item.path === path)?.source === "coach"
    ) {
      setSnackbar(
        "Esta imagen está referenciada por el coach y no es un archivo del bucket",
      );
      return;
    }
    try {
      const res = await fetch("/api/storage", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path }),
      });
      if (!res.ok) throw new Error();
      setSnackbar("File deleted");
      fetchFiles(prefix);
    } catch {
      setSnackbar("Delete error");
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setSnackbar("URL copied");
  };

  const isVideo = (mime: string, name: string) => {
    return mime?.startsWith("video") || /\.(mp4|mov|webm)$/i.test(name);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / 1048576).toFixed(1)}MB`;
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" gutterBottom sx={{ mb: 1 }}>
            Images
          </Typography>
          <Breadcrumbs
            sx={{ "& .MuiBreadcrumbs-separator": { color: "text.secondary" } }}
          >
            <Link
              component="button"
              onClick={() => setPrefix("")}
              sx={{
                color: prefix ? "#86C9B6" : "text.secondary",
                cursor: "pointer",
                fontSize: "0.85rem",
              }}
            >
              root
            </Link>
            {prefix
              .split("/")
              .filter(Boolean)
              .map((part, i, arr) => {
                const path = arr.slice(0, i + 1).join("/");
                const isLast = i === arr.length - 1;
                return (
                  <Link
                    key={path}
                    component="button"
                    onClick={() => setPrefix(path)}
                    sx={{
                      color: isLast ? "text.primary" : "#86C9B6",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                    }}
                  >
                    {part}
                  </Link>
                );
              })}
          </Breadcrumbs>
        </Box>

        <Button
          variant="contained"
          color="primary"
          component="label"
          startIcon={
            uploading ? (
              <CircularProgress size={16} sx={{ color: "#09090b" }} />
            ) : (
              <UploadIcon />
            )
          }
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
          <input type="file" hidden onChange={handleUpload} />
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <CircularProgress sx={{ color: "#86C9B6" }} />
        </Box>
      ) : (
        <>
          {folders.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Folders
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {folders.map((folder) => (
                  <Chip
                    key={folder}
                    icon={<FolderIcon />}
                    label={folder}
                    onClick={() =>
                      setPrefix(prefix ? `${prefix}/${folder}` : folder)
                    }
                    variant="outlined"
                    sx={{
                      borderColor: "rgba(255,255,255,0.15)",
                      color: "#86C9B6",
                      "&:hover": { borderColor: "#86C9B6" },
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {items.length === 0 ? (
            <Box
              sx={{
                textAlign: "center",
                py: 8,
                border: "2px dashed rgba(255,255,255,0.1)",
                borderRadius: 3,
              }}
            >
              <FileIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
              <Typography color="text.secondary">No files yet</Typography>
              <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
                Upload images or videos using the Upload button above
              </Typography>
            </Box>
          ) : (
            <ImageList cols={4} gap={12} sx={{ m: 0 }}>
              {items.map((item) => (
                <ImageListItem
                  key={item.path}
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backgroundColor: "rgba(255,255,255,0.02)",
                  }}
                >
                  {isVideo(item.mimetype, item.name) ? (
                    <Box
                      sx={{
                        aspectRatio: "16/9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#000",
                      }}
                    >
                      <video
                        src={item.url}
                        className="w-full h-full object-cover"
                        controls
                        preload="metadata"
                        playsInline
                      />
                    </Box>
                  ) : (
                    <img
                      src={item.url}
                      alt={item.name}
                      loading="lazy"
                      className="w-full aspect-[4/3] object-cover"
                    />
                  )}

                  <ImageListItemBar
                    position="bottom"
                    sx={{
                      background:
                        "linear-gradient(transparent, rgba(0,0,0,0.8))",
                      "& .MuiImageListItemBar-title": { fontSize: "0.75rem" },
                      "& .MuiImageListItemBar-subtitle": {
                        fontSize: "0.65rem",
                      },
                    }}
                    title={item.name}
                    subtitle={
                      item.source === "coach"
                        ? "Coach · imagen referenciada"
                        : formatSize(item.size)
                    }
                    actionIcon={
                      <Box sx={{ display: "flex", mr: 0.5 }}>
                        <Tooltip title="Copy URL">
                          <IconButton
                            size="small"
                            onClick={() => copyUrl(item.url)}
                            sx={{ color: "white" }}
                          >
                            <CopyIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          title={
                            item.source === "coach"
                              ? "Gestiona esta imagen desde Coaches"
                              : "Delete"
                          }
                        >
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(item.path)}
                            sx={{ color: "#ef4444" }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </>
      )}

      <Snackbar
        open={!!snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar("")}
        message={snackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
}
