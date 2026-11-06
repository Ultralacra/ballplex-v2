import type { SectionType } from "@/lib/types/sections";
import { canUseSection } from "./registry";

export function validateSectionPayload(
  pageSlug: unknown,
  type: unknown,
  props: unknown,
) {
  if (typeof pageSlug !== "string" || !/^[a-z-]+$/.test(pageSlug)) {
    return "Invalid page slug";
  }
  if (typeof type !== "string" || !canUseSection(pageSlug, type as SectionType)) {
    return "This section type is not available on this page";
  }
  if (!props || typeof props !== "object" || Array.isArray(props)) {
    return "Section props must be an object";
  }
  return null;
}

export function sanitizeSectionUpdate(body: Record<string, unknown>) {
  const allowed = ["label", "props", "order_index", "is_visible"];
  return Object.fromEntries(
    Object.entries(body).filter(([key]) => allowed.includes(key)),
  );
}
