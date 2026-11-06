import type { SectionType } from "@/lib/types/sections";

export const SECTION_DEFAULTS: Record<SectionType, Record<string, unknown>> = {
  hero: {
    videoSrc: "/ballplex-video.mp4",
    location: "Viera, Florida",
    tagline: "Learn. Develop. Perform.",
    description: "",
    primaryCTA: { text: "Get Started", href: "/contact" },
    secondaryCTA: { text: "Explore Programs", href: "/programs" },
  },
  stats: { stats: [] },
  facility: { eyebrow: "Our Facility", title: "", subtitle: "", features: [], images: [] },
  cta_banner: {
    title: "",
    description: "",
    primaryCTA: { text: "Get Started", href: "/contact" },
    secondaryCTA: { text: "Explore Programs", href: "/programs" },
  },
  programs_grid: { eyebrow: "Services", title: "", subtitle: "" },
  coaches_grid: { eyebrow: "Coaching Staff", title: "", subtitle: "" },
  events_grid: { eyebrow: "Events", title: "", subtitle: "" },
  testimonials_grid: { eyebrow: "Testimonials", title: "", subtitle: "" },
  pricing_table: { eyebrow: "Pricing", title: "", subtitle: "", description: "", plans: [] },
  schedule_table: { eyebrow: "", title: "Schedule", subtitle: "", items: [] },
  gallery: { eyebrow: "Inside Ballplex", title: "", images: [] },
  contact_info: { eyebrow: "Contact", phone: "", email: "", addresses: [], socials: {} },
  contact_hero: {
    eyebrow: "Contact",
    title: "Get in Touch",
    description: "Have questions? Want to book the facility or organize a special event? We'll get back to you as soon as possible.",
  },
  contact_form: {},
  homeschool_hero: {
    title: "",
    subtitle: "Homeschool Program",
    description: "",
    cta: { text: "Apply Now", href: "#pre-register" },
  },
  homeschool_academics: { title: "", description: "", features: [] },
  map_embed: { title: "Our Location", address: "", embedUrl: "" },
  rich_text: { title: "", content: "" },
  event_categories_grid: { eyebrow: "Browse by Category", title: "", subtitle: "" },
};

export function getSectionDefaults(type: SectionType) {
  return structuredClone(SECTION_DEFAULTS[type]);
}
