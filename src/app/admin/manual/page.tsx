import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import {
  ArrowForward as ArrowIcon,
  CheckCircle as CheckIcon,
  Edit as EditIcon,
  Image as ImageIcon,
  MenuBook as ManualIcon,
  Publish as PublishIcon,
  Visibility as VisibilityIcon,
  WarningAmber as WarningIcon,
} from "@mui/icons-material";

const areas = [
  {
    id: "paginas",
    title: "Páginas públicas",
    subtitle: "Home, Programs, Events, Homeschool y Contact",
    icon: <EditIcon />,
    accent: "#86C9B6",
    steps: [
      "Entra en Page Builder y selecciona la página que quieres modificar.",
      "Haz clic en una sección de la vista previa. El formulario de la derecha muestra sus campos editables.",
      "Pulsa Save Changes para guardar. Usa las flechas para cambiar el orden y el icono de visibilidad para ocultar una sección sin borrarla.",
    ],
    note: "Eliminar una sección es permanente. Ocúltala primero si solo quieres retirarla temporalmente.",
  },
  {
    id: "coaches",
    title: "Coaches",
    subtitle: "Perfiles, fotos, especialidades y biografías",
    icon: <ManualIcon />,
    accent: "#F2B880",
    steps: [
      "Abre Coaches y selecciona un perfil existente o crea uno nuevo.",
      "Completa nombre, cargo, bio y especialidades. Mantén la biografía breve para que se lea bien en móvil.",
      "Guarda el perfil y comprueba la tarjeta en la página pública. Las fotos de coaches también aparecen en Images como referencia.",
    ],
    note: "No borres una imagen desde Images si todavía está vinculada a un coach.",
  },
  {
    id: "eventos",
    title: "Events",
    subtitle: "Calendario, categorías, precios y enlaces oficiales",
    icon: <PublishIcon />,
    accent: "#B8A7F2",
    steps: [
      "Entra en Events para editar un evento o crear una nueva actividad.",
      "Revisa fecha, hora, categoría, descripción, precio e imagen antes de guardar.",
      "Si el evento tiene una página externa de inscripción, añade el enlace oficial y verifica que abre en una pestaña nueva.",
    ],
    note: "Comprueba las fechas y la zona horaria antes de publicar: son los datos que más afectan a la confianza del visitante.",
  },
  {
    id: "programas",
    title: "Programs",
    subtitle: "Oferta, precios, horarios y coaches asociados",
    icon: <CheckIcon />,
    accent: "#E89B9B",
    steps: [
      "Abre Programs y elige el programa que quieres revisar.",
      "Edita título, descripción, precio, horarios y coach. Usa textos cortos y específicos.",
      "Guarda y revisa la sección Programs en la página pública para confirmar que las tablas y tarjetas siguen encajando.",
    ],
    note: "Si cambias un precio, revisa también el texto de la descripción para evitar importes contradictorios.",
  },
  {
    id: "testimonios",
    title: "Testimonials",
    subtitle: "Opiniones que aparecen en la web",
    icon: <VisibilityIcon />,
    accent: "#7EB5D6",
    steps: [
      "Abre Testimonials y selecciona la opinión que quieres editar.",
      "Conserva el sentido original del testimonio y revisa nombre, rol y visibilidad.",
      "Guarda los cambios y comprueba el carrusel o la sección de testimonios en la Home.",
    ],
    note: "Usa el control de visibilidad para retirar una opinión sin perderla del sistema.",
  },
];

function StepList({ steps }: { steps: string[] }) {
  return (
    <List disablePadding sx={{ mt: 1 }}>
      {steps.map((step, index) => (
        <ListItem
          key={step}
          disableGutters
          sx={{ alignItems: "flex-start", py: 1 }}
        >
          <ListItemIcon sx={{ minWidth: 34, pt: 0.2 }}>
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                bgcolor: "rgba(255,255,255,0.08)",
                color: "text.secondary",
                display: "grid",
                placeItems: "center",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {index + 1}
            </Box>
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.65 }}
              >
                {step}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}

export default function AdminManualPage() {
  return (
    <Box sx={{ maxWidth: 1180, mx: "auto", pb: 6 }}>
      <Box
        sx={{
          mb: 5,
          p: { xs: 3, md: 5 },
          border: "1px solid rgba(134, 201, 182, 0.25)",
          borderRadius: 3,
          background:
            "linear-gradient(135deg, rgba(134, 201, 182, 0.13), rgba(134, 201, 182, 0.03) 55%, rgba(255,255,255,0.02))",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          sx={{ alignItems: { md: "center" }, justifyContent: "space-between" }}
        >
          <Box>
            <Chip
              label="GUÍA INTERNA"
              size="small"
              sx={{
                mb: 2,
                bgcolor: "rgba(134, 201, 182, 0.16)",
                color: "#86C9B6",
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            />
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, letterSpacing: "-0.02em", mb: 1 }}
            >
              Manual de uso
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ maxWidth: 680, lineHeight: 1.7 }}
            >
              La referencia rápida para mantener Ballplex actualizado: qué
              tocar, dónde guardarlo y qué revisar antes de dar un cambio por
              terminado.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              placeItems: "center",
              width: 92,
              height: 92,
              borderRadius: 3,
              color: "#86C9B6",
              border: "1px solid rgba(134, 201, 182, 0.35)",
              bgcolor: "rgba(9, 9, 11, 0.22)",
            }}
          >
            <ManualIcon sx={{ fontSize: 44 }} />
          </Box>
        </Stack>
      </Box>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            Antes de editar
          </Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.7, mb: 2 }}>
            Trabaja siempre sobre una sola cosa cada vez. Guarda, abre la web
            pública y revisa el resultado en escritorio y móvil antes de
            continuar.
          </Typography>
          <Alert
            severity="info"
            icon={<CheckIcon />}
            sx={{
              bgcolor: "rgba(126, 181, 214, 0.1)",
              border: "1px solid rgba(126, 181, 214, 0.25)",
              color: "text.primary",
            }}
          >
            Los cambios se guardan al pulsar el botón de guardado del editor. Si
            no aparece una confirmación, vuelve a cargar la sección para
            verificarlo.
          </Alert>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Card sx={{ height: "100%", bgcolor: "rgba(255,255,255,0.025)" }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
                Acceso rápido
              </Typography>
              <Stack spacing={1}>
                {areas.map((area) => (
                  <Link
                    key={area.id}
                    href={`#${area.id}`}
                    underline="hover"
                    color="text.secondary"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      fontSize: 14,
                    }}
                  >
                    <ArrowIcon sx={{ fontSize: 16, color: area.accent }} />
                    {area.title}
                  </Link>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Stack spacing={3}>
        {areas.map((area) => (
          <Card
            key={area.id}
            id={area.id}
            sx={{
              scrollMarginTop: 88,
              bgcolor: "rgba(255,255,255,0.025)",
              overflow: "visible",
            }}
          >
            <CardContent
              sx={{
                p: { xs: 2.5, md: 3.5 },
                "&:last-child": { pb: { xs: 2.5, md: 3.5 } },
              }}
            >
              <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                <Box sx={{ minWidth: { md: 235 } }}>
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      display: "grid",
                      placeItems: "center",
                      color: area.accent,
                      bgcolor: `${area.accent}18`,
                      borderRadius: 2,
                      mb: 2,
                    }}
                  >
                    {area.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {area.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5, lineHeight: 1.5 }}
                  >
                    {area.subtitle}
                  </Typography>
                </Box>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ display: { xs: "none", md: "block" } }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: area.accent,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Cómo editar
                  </Typography>
                  <StepList steps={area.steps} />
                  <Alert
                    severity="warning"
                    icon={<WarningIcon />}
                    sx={{
                      mt: 1,
                      bgcolor: "rgba(242, 184, 128, 0.08)",
                      border: "1px solid rgba(242, 184, 128, 0.2)",
                      color: "text.secondary",
                      "& .MuiAlert-icon": { color: "#F2B880" },
                    }}
                  >
                    {area.note}
                  </Alert>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Box
        id="imagenes"
        sx={{
          mt: 6,
          p: { xs: 2.5, md: 3.5 },
          borderTop: "1px solid rgba(255,255,255,0.12)",
          scrollMarginTop: 88,
        }}
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: "center", mb: 1 }}>
          <ImageIcon sx={{ color: "#86C9B6" }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Images y mantenimiento
          </Typography>
        </Stack>
        <Typography
          color="text.secondary"
          sx={{ lineHeight: 1.7, maxWidth: 760 }}
        >
          Usa Images para subir archivos y copiar sus URL. Antes de borrar una
          imagen, busca si está usada en una página, evento, programa o perfil.
          Los formularios de Contact y Homeschool aparecen en Leads en tiempo
          real. Site Config todavía es un espacio reservado: sus opciones se
          conectarán en una próxima actualización.
        </Typography>
      </Box>

      <Alert
        severity="warning"
        icon={<WarningIcon />}
        sx={{
          mt: 2,
          bgcolor: "rgba(242, 184, 128, 0.08)",
          border: "1px solid rgba(242, 184, 128, 0.2)",
          color: "text.secondary",
          "& .MuiAlert-icon": { color: "#F2B880" },
        }}
      >
        Los envíos de Contact y Homeschool se guardan en la base de datos y
        aparecen automáticamente en Admin &gt; Leads. Cambia allí su estado a
        Contactado, Cualificado o Cerrado.
      </Alert>
    </Box>
  );
}
