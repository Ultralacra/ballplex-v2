"use client";

import { useCallback, useEffect, useState } from "react";
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
  IconButton,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  Add as AddIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  Group as UsersIcon,
} from "@mui/icons-material";

type UserRole = "admin" | "editor";
type ManagedUser = {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  invited_at: string | null;
  email_confirmed_at: string | null;
  profile_id: string | null;
  role: UserRole | null;
};

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  dateStyle: "medium",
  timeStyle: "short",
});

export default function AdminUsersPage() {
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "No se pudieron cargar los usuarios");
      setUsers(data.users || []);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "No se pudieron cargar los usuarios",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const inviteAdmin = async () => {
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "No se pudo invitar al usuario");
      setDialogOpen(false);
      setEmail("");
      setMessage("Invitación enviada. El usuario tendrá rol admin al aceptar.");
      await loadUsers();
    } catch (inviteError) {
      setError(
        inviteError instanceof Error
          ? inviteError.message
          : "No se pudo invitar al usuario",
      );
    } finally {
      setSaving(false);
    }
  };

  const updateRole = async (user: ManagedUser, role: UserRole) => {
    const response = await fetch(`/api/users/${user.profile_id || user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error || "No se pudo actualizar el rol");
      return;
    }
    setUsers((current) =>
      current.map((item) =>
        item.id === user.id ? { ...item, role: data.profile.role } : item,
      ),
    );
    setMessage("Rol actualizado");
  };

  const deleteUser = async (user: ManagedUser) => {
    const action = user.email_confirmed_at
      ? "eliminar"
      : "revocar la invitación de";
    if (
      !window.confirm(
        `¿Quieres ${action} ${user.email}? Esta acción no se puede deshacer.`,
      )
    )
      return;

    const response = await fetch(`/api/users/${user.profile_id || user.id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error || "No se pudo eliminar el usuario");
      return;
    }
    setUsers((current) => current.filter((item) => item.id !== user.id));
    setMessage(
      user.email_confirmed_at ? "Usuario eliminado" : "Invitación revocada",
    );
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
            Usuarios
          </Typography>
          <Typography color="text.secondary">
            Cuentas de Supabase Auth y acceso al panel administrativo.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setError("");
            setDialogOpen(true);
          }}
        >
          Invitar administrador
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
      {loading ? (
        <Box sx={{ display: "grid", placeItems: "center", py: 8 }}>
          <CircularProgress sx={{ color: "#86C9B6" }} />
        </Box>
      ) : (
        <TableContainer
          sx={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 2 }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Usuario</TableCell>
                <TableCell>Acceso</TableCell>
                <TableCell>Creado</TableCell>
                <TableCell>Último acceso</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Typography sx={{ fontWeight: 600 }}>
                      {user.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.email_confirmed_at
                        ? "Email confirmado"
                        : user.invited_at
                          ? "Invitación pendiente"
                          : "Email no confirmado"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.profile_id ? "Acceso al admin" : "Sin acceso"}
                      size="small"
                      color={user.profile_id ? "success" : "default"}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {dateFormatter.format(new Date(user.created_at))}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {user.last_sign_in_at
                        ? dateFormatter.format(new Date(user.last_sign_in_at))
                        : "Todavía no"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Select
                      size="small"
                      value={user.role || ""}
                      onChange={(event) => {
                        const role = event.target.value as UserRole;
                        if (role === "admin" || role === "editor")
                          updateRole(user, role);
                      }}
                    >
                      {!user.role && (
                        <MenuItem value="" disabled>
                          Sin rol
                        </MenuItem>
                      )}
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="editor">Editor</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell align="right">
                    {(user.profile_id || user.id) && (
                      <IconButton
                        aria-label={
                          user.email_confirmed_at
                            ? "Eliminar usuario"
                            : "Revocar invitación"
                        }
                        color="error"
                        onClick={() => deleteUser(user)}
                        title={
                          user.email_confirmed_at
                            ? "Eliminar usuario"
                            : "Revocar invitación"
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog
        open={dialogOpen}
        onClose={() => !saving && setDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ pr: 7 }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <UsersIcon sx={{ color: "#86C9B6" }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Invitar administrador
              </Typography>
              <Typography variant="body2" color="text.secondary">
                El usuario recibirá un email de Supabase para crear su acceso.
              </Typography>
            </Box>
          </Stack>
          <IconButton
            aria-label="Cerrar"
            onClick={() => setDialogOpen(false)}
            disabled={saving}
            sx={{ position: "absolute", right: 12, top: 12 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Email del nuevo administrador"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDialogOpen(false)} disabled={saving}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={inviteAdmin}
            disabled={saving || !email.trim()}
          >
            {saving ? "Enviando..." : "Enviar invitación"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
