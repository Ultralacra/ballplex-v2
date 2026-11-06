import type { SectionType } from "@/lib/types/sections";
import { getSectionDefaults } from "./defaults";

export const SECTION_REGISTRY: Record<
  SectionType,
  { label: string; pages: string[] }
> = {
  hero: { label: "Hero", pages: ["home", "programs"] },
  stats: { label: "Stats Bar", pages: ["home", "homeschool"] },
  facility: { label: "Facility Features", pages: ["home"] },
  cta_banner: { label: "CTA Banner", pages: ["home", "programs", "events", "homeschool"] },
  programs_grid: { label: "Programs Grid", pages: ["home"] },
  coaches_grid: { label: "Coaches Grid", pages: ["home", "programs"] },
  events_grid: { label: "Events Grid", pages: ["events"] },
  testimonials_grid: { label: "Testimonials Grid", pages: ["home"] },
  pricing_table: { label: "Pricing Table", pages: ["programs"] },
  schedule_table: { label: "Schedule Table", pages: ["programs"] },
  gallery: { label: "Image Gallery", pages: ["home", "programs"] },
  contact_info: { label: "Contact Info", pages: ["contact"] },
  contact_hero: { label: "Contact Hero", pages: ["contact"] },
  contact_form: { label: "Contact Form", pages: ["contact"] },
  homeschool_hero: { label: "Homeschool Hero", pages: ["homeschool"] },
  homeschool_academics: { label: "Academics & Training", pages: ["homeschool"] },
  map_embed: { label: "Google Maps", pages: ["contact"] },
  rich_text: { label: "Rich Text", pages: ["home", "programs", "events", "homeschool", "contact"] },
  event_categories_grid: { label: "Event Categories Grid", pages: ["events"] },
};

export function canUseSection(page: string, type: SectionType) {
  return SECTION_REGISTRY[type]?.pages.includes(page) ?? false;
}

export function createSectionProps(type: SectionType, props?: Record<string, unknown>) {
  return { ...getSectionDefaults(type), ...(props || {}) };
}
