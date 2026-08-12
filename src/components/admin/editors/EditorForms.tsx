"use client";

import {
  Stack,
  TextField,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import type { SectionType, SectionPropsMap } from "@/lib/types/sections";

type EditorFormProps = {
  type: SectionType;
  props: Record<string, unknown>;
  onChange: (props: Record<string, unknown>) => void;
};

type FieldProps<T> = {
  label?: string;
  value: T;
  onChange: (val: T) => void;
};

function Text({ label, value, onChange }: FieldProps<string>) {
  return (
    <TextField
      label={label}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      size="small"
    />
  );
}

function MultiText({ label, value, onChange }: FieldProps<string[]>) {
  const arr = Array.isArray(value) ? value : [];
  return (
    <Stack spacing={1}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      {arr.map((item, i) => (
        <Stack
          key={i}
          direction="row"
          spacing={1}
          sx={{ alignItems: "center" }}
        >
          <TextField
            value={item}
            onChange={(e) => {
              const next = [...arr];
              next[i] = e.target.value;
              onChange(next);
            }}
            fullWidth
            size="small"
          />
          <IconButton
            size="small"
            onClick={() => onChange(arr.filter((_, j) => j !== i))}
            sx={{ color: "#ef4444" }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      ))}
      <Button
        startIcon={<AddIcon />}
        size="small"
        onClick={() => onChange([...arr, ""])}
        sx={{ alignSelf: "flex-start", color: "#86C9B6" }}
      >
        Add {label}
      </Button>
    </Stack>
  );
}

function CTALinkEditor({
  label,
  value,
  onChange,
}: FieldProps<{ text: string; href: string }>) {
  const val = value || { text: "", href: "" };
  return (
    <Stack spacing={1}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Stack direction="row" spacing={1}>
        <TextField
          label="Text"
          value={val.text}
          onChange={(e) => onChange({ ...val, text: e.target.value })}
          size="small"
          sx={{ flex: 1 }}
        />
        <TextField
          label="Link"
          value={val.href}
          onChange={(e) => onChange({ ...val, href: e.target.value })}
          size="small"
          sx={{ flex: 1 }}
        />
      </Stack>
    </Stack>
  );
}

function StatItemsEditor({
  value,
  onChange,
}: FieldProps<Array<{ value: string; label: string }>>) {
  const arr = Array.isArray(value) ? value : [];
  return (
    <Stack spacing={1}>
      <Typography variant="caption" color="text.secondary">
        Stats
      </Typography>
      {arr.map((item, i) => (
        <Stack
          key={i}
          direction="row"
          spacing={1}
          sx={{ alignItems: "center" }}
        >
          <TextField
            label="Value"
            value={item.value}
            onChange={(e) => {
              const next = [...arr];
              next[i] = { ...next[i], value: e.target.value };
              onChange(next);
            }}
            size="small"
            sx={{ flex: 1 }}
          />
          <TextField
            label="Label"
            value={item.label}
            onChange={(e) => {
              const next = [...arr];
              next[i] = { ...next[i], label: e.target.value };
              onChange(next);
            }}
            size="small"
            sx={{ flex: 2 }}
          />
          <IconButton
            size="small"
            onClick={() => onChange(arr.filter((_, j) => j !== i))}
            sx={{ color: "#ef4444" }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      ))}
      <Button
        startIcon={<AddIcon />}
        size="small"
        onClick={() => onChange([...arr, { value: "", label: "" }])}
        sx={{ alignSelf: "flex-start", color: "#86C9B6" }}
      >
        Add Stat
      </Button>
    </Stack>
  );
}

function FeaturesEditor({
  value,
  onChange,
}: FieldProps<Array<{ icon: string; title: string; description: string }>>) {
  const arr = Array.isArray(value) ? value : [];
  return (
    <Stack spacing={2}>
      <Typography variant="caption" color="text.secondary">
        Features
      </Typography>
      {arr.map((item, i) => (
        <Stack
          key={i}
          spacing={1}
          sx={{
            p: 2,
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 2,
          }}
        >
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography variant="caption">Feature {i + 1}</Typography>
            <IconButton
              size="small"
              onClick={() => onChange(arr.filter((_, j) => j !== i))}
              sx={{ color: "#ef4444" }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
          <TextField
            label="Title"
            value={item.title || ""}
            onChange={(e) => {
              const next = [...arr];
              next[i] = { ...next[i], title: e.target.value };
              onChange(next);
            }}
            size="small"
          />
          <TextField
            label="Description"
            value={item.description || ""}
            onChange={(e) => {
              const next = [...arr];
              next[i] = { ...next[i], description: e.target.value };
              onChange(next);
            }}
            size="small"
            multiline
            rows={2}
          />
        </Stack>
      ))}
      <Button
        startIcon={<AddIcon />}
        size="small"
        onClick={() =>
          onChange([...arr, { icon: "", title: "", description: "" }])
        }
        sx={{ alignSelf: "flex-start", color: "#86C9B6" }}
      >
        Add Feature
      </Button>
    </Stack>
  );
}

function PricingPlansEditor({
  value,
  onChange,
}: FieldProps<Array<Record<string, unknown>>>) {
  const arr = Array.isArray(value) ? value : [];
  return (
    <Stack spacing={2}>
      <Typography variant="caption" color="text.secondary">
        Pricing Plans
      </Typography>
      {arr.map((item, i) => (
        <Stack
          key={i}
          spacing={1}
          sx={{
            p: 2,
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 2,
          }}
        >
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Typography variant="caption">Plan {i + 1}</Typography>
            <IconButton
              size="small"
              onClick={() => onChange(arr.filter((_, j) => j !== i))}
              sx={{ color: "#ef4444" }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
          <Stack direction="row" spacing={1}>
            <TextField
              label="Name"
              value={(item.name as string) || ""}
              onChange={(e) => {
                const n = [...arr];
                n[i] = { ...n[i], name: e.target.value };
                onChange(n);
              }}
              size="small"
              sx={{ flex: 1 }}
            />
            <TextField
              label="Price"
              value={(item.price as string) || ""}
              onChange={(e) => {
                const n = [...arr];
                n[i] = { ...n[i], price: e.target.value };
                onChange(n);
              }}
              size="small"
              sx={{ flex: 1 }}
            />
            <TextField
              label="Duration"
              value={(item.duration as string) || ""}
              onChange={(e) => {
                const n = [...arr];
                n[i] = { ...n[i], duration: e.target.value };
                onChange(n);
              }}
              size="small"
              sx={{ flex: 1 }}
            />
          </Stack>
          <Stack direction="row" spacing={1}>
            <TextField
              label="Private"
              value={(item.privatePrice as string) || ""}
              onChange={(e) => {
                const n = [...arr];
                n[i] = { ...n[i], privatePrice: e.target.value };
                onChange(n);
              }}
              size="small"
              sx={{ flex: 1 }}
            />
            <TextField
              label="Duo"
              value={(item.duoPrice as string) || ""}
              onChange={(e) => {
                const n = [...arr];
                n[i] = { ...n[i], duoPrice: e.target.value };
                onChange(n);
              }}
              size="small"
              sx={{ flex: 1 }}
            />
            <TextField
              label="Member"
              value={(item.memberPrice as string) || ""}
              onChange={(e) => {
                const n = [...arr];
                n[i] = { ...n[i], memberPrice: e.target.value };
                onChange(n);
              }}
              size="small"
              sx={{ flex: 1 }}
            />
            <TextField
              label="Non-member"
              value={(item.nonMemberPrice as string) || ""}
              onChange={(e) => {
                const n = [...arr];
                n[i] = { ...n[i], nonMemberPrice: e.target.value };
                onChange(n);
              }}
              size="small"
              sx={{ flex: 1 }}
            />
          </Stack>
          <TextField
            label="Description"
            value={(item.description as string) || ""}
            onChange={(e) => {
              const n = [...arr];
              n[i] = { ...n[i], description: e.target.value };
              onChange(n);
            }}
            size="small"
            multiline
            rows={2}
          />
          <TextField
            label="Benefits (one per line)"
            value={
              Array.isArray(item.benefits)
                ? (item.benefits as string[]).join("\n")
                : ""
            }
            onChange={(e) => {
              const n = [...arr];
              n[i] = {
                ...n[i],
                benefits: e.target.value.split("\n").filter(Boolean),
              };
              onChange(n);
            }}
            size="small"
            multiline
            rows={3}
          />
        </Stack>
      ))}
      <Button
        startIcon={<AddIcon />}
        size="small"
        onClick={() =>
          onChange([
            ...arr,
            {
              name: "",
              price: "",
              duration: "",
              description: "",
              benefits: [],
            },
          ])
        }
        sx={{ alignSelf: "flex-start", color: "#86C9B6" }}
      >
        Add Plan
      </Button>
    </Stack>
  );
}

function ProgramFeaturesEditor({
  value,
  onChange,
}: FieldProps<Array<{ name: string; description: string }>>) {
  const arr = Array.isArray(value) ? value : [];
  return (
    <Stack spacing={1}>
      <Typography variant="caption" color="text.secondary">
        Program Features
      </Typography>
      {arr.map((item, i) => (
        <Stack
          key={i}
          direction="row"
          spacing={1}
          sx={{ alignItems: "center" }}
        >
          <TextField
            label="Name"
            value={item.name || ""}
            onChange={(e) => {
              const n = [...arr];
              n[i] = { ...n[i], name: e.target.value };
              onChange(n);
            }}
            size="small"
            sx={{ flex: 1 }}
          />
          <TextField
            label="Description"
            value={item.description || ""}
            onChange={(e) => {
              const n = [...arr];
              n[i] = { ...n[i], description: e.target.value };
              onChange(n);
            }}
            size="small"
            sx={{ flex: 2 }}
          />
          <IconButton
            size="small"
            onClick={() => onChange(arr.filter((_, j) => j !== i))}
            sx={{ color: "#ef4444" }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      ))}
      <Button
        startIcon={<AddIcon />}
        size="small"
        onClick={() => onChange([...arr, { name: "", description: "" }])}
        sx={{ alignSelf: "flex-start", color: "#86C9B6" }}
      >
        Add Feature
      </Button>
    </Stack>
  );
}

function TeamPacksEditor({
  value,
  onChange,
}: FieldProps<Array<{ name: string; description: string; price: string }>>) {
  const arr = Array.isArray(value) ? value : [];
  return (
    <Stack spacing={1}>
      <Typography variant="caption" color="text.secondary">
        Team Rental Packs
      </Typography>
      {arr.map((item, i) => (
        <Stack
          key={i}
          direction="row"
          spacing={1}
          sx={{ alignItems: "center" }}
        >
          <TextField
            label="Name"
            value={item.name || ""}
            onChange={(e) => {
              const n = [...arr];
              n[i] = { ...n[i], name: e.target.value };
              onChange(n);
            }}
            size="small"
            sx={{ flex: 1 }}
          />
          <TextField
            label="Description"
            value={item.description || ""}
            onChange={(e) => {
              const n = [...arr];
              n[i] = { ...n[i], description: e.target.value };
              onChange(n);
            }}
            size="small"
            sx={{ flex: 2 }}
          />
          <TextField
            label="Price"
            value={item.price || ""}
            onChange={(e) => {
              const n = [...arr];
              n[i] = { ...n[i], price: e.target.value };
              onChange(n);
            }}
            size="small"
            sx={{ flex: 1 }}
          />
          <IconButton
            size="small"
            onClick={() => onChange(arr.filter((_, j) => j !== i))}
            sx={{ color: "#ef4444" }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      ))}
      <Button
        startIcon={<AddIcon />}
        size="small"
        onClick={() =>
          onChange([...arr, { name: "", description: "", price: "" }])
        }
        sx={{ alignSelf: "flex-start", color: "#86C9B6" }}
      >
        Add Pack
      </Button>
    </Stack>
  );
}

function ScheduleItemsEditor({
  value,
  onChange,
}: FieldProps<Array<{ day: string; time: string }>>) {
  const arr = Array.isArray(value) ? value : [];
  return (
    <Stack spacing={1}>
      <Typography variant="caption" color="text.secondary">
        Schedule
      </Typography>
      {arr.map((item, i) => (
        <Stack
          key={i}
          direction="row"
          spacing={1}
          sx={{ alignItems: "center" }}
        >
          <TextField
            label="Day"
            value={item.day || ""}
            onChange={(e) => {
              const n = [...arr];
              n[i] = { ...n[i], day: e.target.value };
              onChange(n);
            }}
            size="small"
            sx={{ flex: 1 }}
          />
          <TextField
            label="Time"
            value={item.time || ""}
            onChange={(e) => {
              const n = [...arr];
              n[i] = { ...n[i], time: e.target.value };
              onChange(n);
            }}
            size="small"
            sx={{ flex: 1 }}
          />
          <IconButton
            size="small"
            onClick={() => onChange(arr.filter((_, j) => j !== i))}
            sx={{ color: "#ef4444" }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      ))}
      <Button
        startIcon={<AddIcon />}
        size="small"
        onClick={() => onChange([...arr, { day: "", time: "" }])}
        sx={{ alignSelf: "flex-start", color: "#86C9B6" }}
      >
        Add Day
      </Button>
    </Stack>
  );
}

function AddressesEditor({
  value,
  onChange,
}: FieldProps<Array<{ label: string; address: string }>>) {
  const arr = Array.isArray(value) ? value : [];
  return (
    <Stack spacing={1}>
      <Typography variant="caption" color="text.secondary">
        Addresses
      </Typography>
      {arr.map((item, i) => (
        <Stack
          key={i}
          direction="row"
          spacing={1}
          sx={{ alignItems: "center" }}
        >
          <TextField
            label="Label"
            value={item.label || ""}
            onChange={(e) => {
              const n = [...arr];
              n[i] = { ...n[i], label: e.target.value };
              onChange(n);
            }}
            size="small"
            sx={{ flex: 1 }}
          />
          <TextField
            label="Address"
            value={item.address || ""}
            onChange={(e) => {
              const n = [...arr];
              n[i] = { ...n[i], address: e.target.value };
              onChange(n);
            }}
            size="small"
            sx={{ flex: 2 }}
          />
          <IconButton
            size="small"
            onClick={() => onChange(arr.filter((_, j) => j !== i))}
            sx={{ color: "#ef4444" }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      ))}
      <Button
        startIcon={<AddIcon />}
        size="small"
        onClick={() => onChange([...arr, { label: "", address: "" }])}
        sx={{ alignSelf: "flex-start", color: "#86C9B6" }}
      >
        Add Address
      </Button>
    </Stack>
  );
}

function ImagesEditor({ label, value, onChange }: FieldProps<string[]>) {
  const arr = Array.isArray(value) ? value : [];
  return (
    <Stack spacing={1}>
      <Typography variant="caption" color="text.secondary">
        {label || "Images"}
      </Typography>
      {arr.map((item, i) => (
        <Stack
          key={i}
          direction="row"
          spacing={1}
          sx={{ alignItems: "center" }}
        >
          <TextField
            value={item}
            onChange={(e) => {
              const next = [...arr];
              next[i] = e.target.value;
              onChange(next);
            }}
            fullWidth
            size="small"
            placeholder="Image URL"
          />
          <IconButton
            size="small"
            onClick={() => onChange(arr.filter((_, j) => j !== i))}
            sx={{ color: "#ef4444" }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      ))}
      <Button
        startIcon={<AddIcon />}
        size="small"
        onClick={() => onChange([...arr, ""])}
        sx={{ alignSelf: "flex-start", color: "#86C9B6" }}
      >
        Add Image URL
      </Button>
    </Stack>
  );
}

function SocialsEditor({
  value,
  onChange,
}: FieldProps<Record<string, string>>) {
  const obj = value || {};
  const keys = Object.keys(obj);
  return (
    <Stack spacing={1}>
      <Typography variant="caption" color="text.secondary">
        Social Links
      </Typography>
      {keys.map((key) => (
        <Stack
          key={key}
          direction="row"
          spacing={1}
          sx={{ alignItems: "center" }}
        >
          <TextField
            label={key}
            value={obj[key]}
            onChange={(e) => onChange({ ...obj, [key]: e.target.value })}
            size="small"
            sx={{ flex: 1 }}
          />
          <IconButton
            size="small"
            onClick={() => {
              const next = { ...obj };
              delete next[key];
              onChange(next);
            }}
            sx={{ color: "#ef4444" }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      ))}
      <Button
        startIcon={<AddIcon />}
        size="small"
        onClick={() => onChange({ ...obj, "": "" })}
        sx={{ alignSelf: "flex-start", color: "#86C9B6" }}
      >
        Add Social
      </Button>
    </Stack>
  );
}

function ImagesListEditor({ value, onChange }: FieldProps<string[]>) {
  return <ImagesEditor label="Images" value={value} onChange={onChange} />;
}

export function EditorForm({ type, props, onChange }: EditorFormProps) {
  const P = (key: string, defaultValue?: unknown) =>
    props[key] !== undefined ? props[key] : defaultValue;
  const eyebrowDefaults: Partial<Record<SectionType, string>> = {
    facility: "Our Facility",
    programs_grid: "Services",
    coaches_grid: "Coaching Staff",
    events_grid: "Events",
    testimonials_grid: "Testimonials",
    event_categories_grid: "Browse by Category",
    pricing_table: "Pricing",
    gallery: "Inside Ballplex",
    contact_info: "Contact",
  };

  switch (type) {
    case "hero":
      return (
        <Stack spacing={2}>
          <Text
            label="Video URL"
            value={P("videoSrc", "") as string}
            onChange={(v) => onChange({ ...props, videoSrc: v })}
          />
          <Text
            label="Tagline"
            value={P("tagline", "") as string}
            onChange={(v) => onChange({ ...props, tagline: v })}
          />
          <TextField
            label="Description"
            value={P("description", "") as string}
            onChange={(e) =>
              onChange({ ...props, description: e.target.value })
            }
            fullWidth
            multiline
            rows={3}
            size="small"
          />
          <Text
            label="Eyebrow / Small heading"
            value={P("location", "") as string}
            onChange={(v) => onChange({ ...props, location: v })}
          />
          <CTALinkEditor
            label="Primary CTA"
            value={
              P("primaryCTA", { text: "", href: "" }) as {
                text: string;
                href: string;
              }
            }
            onChange={(v) => onChange({ ...props, primaryCTA: v })}
          />
          <CTALinkEditor
            label="Secondary CTA"
            value={
              P("secondaryCTA", { text: "", href: "" }) as {
                text: string;
                href: string;
              }
            }
            onChange={(v) => onChange({ ...props, secondaryCTA: v })}
          />
        </Stack>
      );

    case "stats":
      return (
        <Stack spacing={2}>
          <StatItemsEditor
            value={P("stats", []) as Array<{ value: string; label: string }>}
            onChange={(v) => onChange({ ...props, stats: v })}
          />
        </Stack>
      );

    case "facility":
      return (
        <Stack spacing={2}>
          <Text
            label="Eyebrow / Small heading"
            value={P("eyebrow", eyebrowDefaults.facility) as string}
            onChange={(v) => onChange({ ...props, eyebrow: v })}
          />
          <Text
            label="Home gallery eyebrow"
            value={P("galleryEyebrow", eyebrowDefaults.gallery) as string}
            onChange={(v) => onChange({ ...props, galleryEyebrow: v })}
          />
          <Text
            label="Title"
            value={P("title", "") as string}
            onChange={(v) => onChange({ ...props, title: v })}
          />
          <Text
            label="Subtitle"
            value={P("subtitle", "") as string}
            onChange={(v) => onChange({ ...props, subtitle: v })}
          />
          <FeaturesEditor
            value={
              P("features", []) as Array<{
                icon: string;
                title: string;
                description: string;
              }>
            }
            onChange={(v) => onChange({ ...props, features: v })}
          />
          <ImagesListEditor
            value={P("images", []) as string[]}
            onChange={(v) => onChange({ ...props, images: v })}
          />
        </Stack>
      );

    case "cta_banner":
      return (
        <Stack spacing={2}>
          <Text
            label="Title"
            value={P("title", "") as string}
            onChange={(v) => onChange({ ...props, title: v })}
          />
          <TextField
            label="Description"
            value={P("description", "") as string}
            onChange={(e) =>
              onChange({ ...props, description: e.target.value })
            }
            fullWidth
            multiline
            rows={3}
            size="small"
          />
          <CTALinkEditor
            label="Primary CTA"
            value={
              P("primaryCTA", { text: "", href: "" }) as {
                text: string;
                href: string;
              }
            }
            onChange={(v) => onChange({ ...props, primaryCTA: v })}
          />
          <CTALinkEditor
            label="Secondary CTA"
            value={
              P("secondaryCTA", { text: "", href: "" }) as {
                text: string;
                href: string;
              }
            }
            onChange={(v) => onChange({ ...props, secondaryCTA: v })}
          />
        </Stack>
      );

    case "programs_grid":
    case "coaches_grid":
    case "events_grid":
    case "testimonials_grid":
    case "event_categories_grid":
      return (
        <Stack spacing={2}>
          <Text
            label="Eyebrow / Small heading"
            value={P("eyebrow", eyebrowDefaults[type] || "") as string}
            onChange={(v) => onChange({ ...props, eyebrow: v })}
          />
          <Text
            label="Title"
            value={P("title", "") as string}
            onChange={(v) => onChange({ ...props, title: v })}
          />
          <Text
            label="Subtitle"
            value={P("subtitle", "") as string}
            onChange={(v) => onChange({ ...props, subtitle: v })}
          />
          <Typography variant="caption" color="text.secondary">
            This section displays data from the respective CRUD table.
          </Typography>
        </Stack>
      );

    case "pricing_table":
      return (
        <Stack spacing={2}>
          <Text
            label="Anchor"
            value={P("anchor", "") as string}
            onChange={(v) => onChange({ ...props, anchor: v })}
          />
          <Text
            label="Eyebrow / Small heading"
            value={P("eyebrow", eyebrowDefaults.pricing_table) as string}
            onChange={(v) => onChange({ ...props, eyebrow: v })}
          />
          <Text
            label="Title"
            value={P("title", "") as string}
            onChange={(v) => onChange({ ...props, title: v })}
          />
          <Text
            label="Subtitle"
            value={P("subtitle", "") as string}
            onChange={(v) => onChange({ ...props, subtitle: v })}
          />
          <TextField
            label="Description"
            value={P("description", "") as string}
            onChange={(e) =>
              onChange({ ...props, description: e.target.value })
            }
            fullWidth
            multiline
            rows={2}
            size="small"
          />
          <ProgramFeaturesEditor
            value={
              P("features", []) as Array<{ name: string; description: string }>
            }
            onChange={(v) => onChange({ ...props, features: v })}
          />
          <Text
            label="Rapsodo Title"
            value={(P("rapsodo", {}) as { title?: string }).title || ""}
            onChange={(v) =>
              onChange({
                ...props,
                rapsodo: { ...(P("rapsodo", {}) as object), title: v },
              })
            }
          />
          <TextField
            label="Rapsodo Description"
            value={
              (P("rapsodo", {}) as { description?: string }).description || ""
            }
            onChange={(e) =>
              onChange({
                ...props,
                rapsodo: {
                  ...(P("rapsodo", {}) as object),
                  description: e.target.value,
                },
              })
            }
            fullWidth
            multiline
            rows={3}
            size="small"
          />
          <PricingPlansEditor
            value={P("plans", []) as Array<Record<string, unknown>>}
            onChange={(v) => onChange({ ...props, plans: v })}
          />
          <TextField
            label="Rates Note"
            value={P("note", "") as string}
            onChange={(e) => onChange({ ...props, note: e.target.value })}
            fullWidth
            multiline
            rows={2}
            size="small"
          />
          <PricingPlansEditor
            value={P("rates", []) as Array<Record<string, unknown>>}
            onChange={(v) => onChange({ ...props, rates: v })}
          />
          <TeamPacksEditor
            value={
              P("teamPacks", []) as Array<{
                name: string;
                description: string;
                price: string;
              }>
            }
            onChange={(v) => onChange({ ...props, teamPacks: v })}
          />
        </Stack>
      );

    case "schedule_table":
      return (
        <Stack spacing={2}>
          <Text
            label="Eyebrow / Small heading"
            value={P("eyebrow", "") as string}
            onChange={(v) => onChange({ ...props, eyebrow: v })}
          />
          <Text
            label="Anchor"
            value={P("anchor", "") as string}
            onChange={(v) => onChange({ ...props, anchor: v })}
          />
          <Text
            label="Title"
            value={P("title", "") as string}
            onChange={(v) => onChange({ ...props, title: v })}
          />
          <Text
            label="Subtitle"
            value={P("subtitle", "") as string}
            onChange={(v) => onChange({ ...props, subtitle: v })}
          />
          <ScheduleItemsEditor
            value={P("items", []) as Array<{ day: string; time: string }>}
            onChange={(v) => onChange({ ...props, items: v })}
          />
        </Stack>
      );

    case "gallery":
      return (
        <Stack spacing={2}>
          <Text
            label="Eyebrow / Small heading"
            value={P("eyebrow", eyebrowDefaults.gallery) as string}
            onChange={(v) => onChange({ ...props, eyebrow: v })}
          />
          <Text
            label="Title"
            value={P("title", "") as string}
            onChange={(v) => onChange({ ...props, title: v })}
          />
          <ImagesListEditor
            value={P("images", []) as string[]}
            onChange={(v) => onChange({ ...props, images: v })}
          />
        </Stack>
      );

    case "contact_info":
      return (
        <Stack spacing={2}>
          <Text
            label="Eyebrow / Small heading"
            value={P("eyebrow", eyebrowDefaults.contact_info) as string}
            onChange={(v) => onChange({ ...props, eyebrow: v })}
          />
          <Text
            label="Phone"
            value={P("phone", "") as string}
            onChange={(v) => onChange({ ...props, phone: v })}
          />
          <Text
            label="Email"
            value={P("email", "") as string}
            onChange={(v) => onChange({ ...props, email: v })}
          />
          <AddressesEditor
            value={
              P("addresses", []) as Array<{ label: string; address: string }>
            }
            onChange={(v) => onChange({ ...props, addresses: v })}
          />
          <SocialsEditor
            value={P("socials", {}) as Record<string, string>}
            onChange={(v) => onChange({ ...props, socials: v })}
          />
        </Stack>
      );

    case "contact_form":
      return (
        <Typography variant="body2" color="text.secondary">
          This section renders the contact form. No configuration needed.
        </Typography>
      );

    case "homeschool_hero":
      return (
        <Stack spacing={2}>
          <Text
            label="Title"
            value={P("title", "") as string}
            onChange={(v) => onChange({ ...props, title: v })}
          />
          <Text
            label="Subtitle"
            value={P("subtitle", "") as string}
            onChange={(v) => onChange({ ...props, subtitle: v })}
          />
          <TextField
            label="Description"
            value={P("description", "") as string}
            onChange={(e) =>
              onChange({ ...props, description: e.target.value })
            }
            fullWidth
            multiline
            rows={3}
            size="small"
          />
          <CTALinkEditor
            label="CTA Button"
            value={
              P("cta", { text: "", href: "" }) as { text: string; href: string }
            }
            onChange={(v) => onChange({ ...props, cta: v })}
          />
        </Stack>
      );

    case "homeschool_academics":
      return (
        <Stack spacing={2}>
          <Text
            label="Title"
            value={P("title", "") as string}
            onChange={(v) => onChange({ ...props, title: v })}
          />
          <TextField
            label="Description"
            value={P("description", "") as string}
            onChange={(e) =>
              onChange({ ...props, description: e.target.value })
            }
            fullWidth
            multiline
            rows={3}
            size="small"
          />
          <MultiText
            label="Features"
            value={P("features", []) as string[]}
            onChange={(v) => onChange({ ...props, features: v })}
          />
        </Stack>
      );

    case "map_embed":
      return (
        <Stack spacing={2}>
          <Text
            label="Title"
            value={P("title", "") as string}
            onChange={(v) => onChange({ ...props, title: v })}
          />
          <Text
            label="Address"
            value={P("address", "") as string}
            onChange={(v) => onChange({ ...props, address: v })}
          />
          <Text
            label="Embed URL"
            value={P("embedUrl", "") as string}
            onChange={(v) => onChange({ ...props, embedUrl: v })}
          />
        </Stack>
      );

    case "rich_text":
      return (
        <Stack spacing={2}>
          <Text
            label="Title"
            value={P("title", "") as string}
            onChange={(v) => onChange({ ...props, title: v })}
          />
          <TextField
            label="Content"
            value={P("content", "") as string}
            onChange={(e) => onChange({ ...props, content: e.target.value })}
            fullWidth
            multiline
            rows={8}
            size="small"
          />
        </Stack>
      );

    default:
      return (
        <Typography variant="body2" color="text.secondary">
          No editor available for: {type}
        </Typography>
      );
  }
}
