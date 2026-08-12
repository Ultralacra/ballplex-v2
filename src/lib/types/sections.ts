export type SectionType =
  | 'hero'
  | 'stats'
  | 'facility'
  | 'cta_banner'
  | 'programs_grid'
  | 'coaches_grid'
  | 'events_grid'
  | 'testimonials_grid'
  | 'pricing_table'
  | 'schedule_table'
  | 'gallery'
  | 'contact_info'
  | 'contact_form'
  | 'homeschool_hero'
  | 'homeschool_academics'
  | 'map_embed'
  | 'rich_text'
  | 'event_categories_grid';

export interface PageSection {
  id: string;
  page_slug: string;
  type: SectionType;
  label: string;
  props: Record<string, unknown>;
  order_index: number;
  is_visible: boolean;
}

export interface CTALink {
  text: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface FacilityFeature {
  icon: string;
  title: string;
  description: string;
}

export interface PricingPlan {
  name: string;
  price?: string;
  duration?: string;
  description?: string;
  benefits?: string[];
  privatePrice?: string;
  duoPrice?: string;
  memberPrice?: string;
  nonMemberPrice?: string;
  dropInPrice?: string;
  lane45?: string;
  lanes45?: string;
  lane70?: string;
  lanes70?: string;
  highlighted?: boolean;
}

export interface ScheduleItem {
  day: string;
  time: string;
}

export interface ContactAddress {
  label: string;
  address: string;
}

export interface HeroProps {
  videoSrc: string;
  tagline: string;
  description: string;
  location: string;
  primaryCTA: CTALink;
  secondaryCTA: CTALink;
}

export interface StatsProps {
  stats: StatItem[];
}

export interface FacilityProps {
  title: string;
  subtitle: string;
  features: FacilityFeature[];
  images: string[];
}

export interface CTABannerProps {
  title: string;
  description: string;
  primaryCTA: CTALink;
  secondaryCTA: CTALink;
}

export interface ProgramsGridProps {
  title: string;
  subtitle: string;
}

export interface CoachesGridProps {
  title: string;
  subtitle: string;
}

export interface EventsGridProps {
  title: string;
  subtitle: string;
}

export interface TestimonialsGridProps {
  title: string;
  subtitle: string;
}

export interface PricingTableProps {
  title: string;
  subtitle?: string;
  description: string;
  anchor?: string;
  eyebrow?: string;
  features?: Array<{ name: string; description: string }>;
  rapsodo?: { title: string; description: string };
  note?: string;
  rates?: PricingPlan[];
  teamPacks?: Array<{ name: string; description: string; price: string }>;
  plans: PricingPlan[];
  highlighted_index?: number;
}

export interface ScheduleTableProps {
  title: string;
  subtitle?: string;
  anchor?: string;
  items: ScheduleItem[];
}

export interface GalleryProps {
  title: string;
  images: string[];
}

export interface ContactInfoProps {
  phone: string;
  email: string;
  addresses: ContactAddress[];
  socials: Record<string, string>;
}

export interface HomeschoolHeroProps {
  title: string;
  subtitle: string;
  description: string;
  cta: CTALink;
}

export interface HomeschoolAcademicsProps {
  title: string;
  description: string;
  features: string[];
}

export interface MapEmbedProps {
  title: string;
  address: string;
  embedUrl: string;
}

export interface RichTextProps {
  title: string;
  content: string;
}

export interface EventCategoriesGridProps {
  title: string;
  subtitle: string;
}

export type SectionPropsMap = {
  hero: HeroProps;
  stats: StatsProps;
  facility: FacilityProps;
  cta_banner: CTABannerProps;
  programs_grid: ProgramsGridProps;
  coaches_grid: CoachesGridProps;
  events_grid: EventsGridProps;
  testimonials_grid: TestimonialsGridProps;
  pricing_table: PricingTableProps;
  schedule_table: ScheduleTableProps;
  gallery: GalleryProps;
  contact_info: ContactInfoProps;
  contact_form: Record<string, never>;
  homeschool_hero: HomeschoolHeroProps;
  homeschool_academics: HomeschoolAcademicsProps;
  map_embed: MapEmbedProps;
  rich_text: RichTextProps;
  event_categories_grid: EventCategoriesGridProps;
};

export const SECTION_LABELS: Record<SectionType, string> = {
  hero: 'Hero',
  stats: 'Stats Bar',
  facility: 'Facility Features',
  cta_banner: 'CTA Banner',
  programs_grid: 'Programs Grid',
  coaches_grid: 'Coaches Grid',
  events_grid: 'Events Grid',
  testimonials_grid: 'Testimonials Grid',
  pricing_table: 'Pricing Table',
  schedule_table: 'Schedule Table',
  gallery: 'Image Gallery',
  contact_info: 'Contact Info',
  contact_form: 'Contact Form',
  homeschool_hero: 'Homeschool Hero',
  homeschool_academics: 'Academics & Training',
  map_embed: 'Google Maps',
  rich_text: 'Rich Text',
  event_categories_grid: 'Event Categories Grid',
};

export const AVAILABLE_SECTION_TYPES: SectionType[] = [
  'hero', 'stats', 'facility', 'cta_banner',
  'programs_grid', 'coaches_grid', 'events_grid',
  'event_categories_grid', 'testimonials_grid',
  'pricing_table', 'schedule_table', 'gallery',
  'contact_info', 'contact_form', 'homeschool_hero',
  'homeschool_academics', 'map_embed', 'rich_text',
];
