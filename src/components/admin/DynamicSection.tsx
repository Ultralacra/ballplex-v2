"use client";

import { useEffect, useState } from "react";
import type { SectionType, SectionPropsMap } from "@/lib/types/sections";
import { createClient } from "@/lib/supabase/client";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Facility from "@/components/Facility";
import CTABanner from "@/components/CTABanner";
import ProgramCard from "@/components/ProgramCard";
import CoachCard from "@/components/CoachCard";
import EventCard from "@/components/EventCard";
import TestimonialCard from "@/components/TestimonialCard";
import ContactForm from "@/components/ContactForm";
import EventCategoryIcon from "@/components/EventCategoryIcon";
import { programs as fallbackPrograms } from "@/data/programs";
import { coaches as fallbackCoaches } from "@/data/coaches";
import {
  events as fallbackEvents,
  eventCategories as fallbackCategories,
} from "@/data/events";
import { testimonials as fallbackTestimonials } from "@/data/testimonials";

type DynamicSectionProps<T extends SectionType> = {
  type: T;
  props: SectionPropsMap[T];
};

export default function DynamicSection<T extends SectionType>({
  type,
  props,
}: DynamicSectionProps<T>) {
  switch (type) {
    case "hero":
      return <DynamicHero overrideProps={props as SectionPropsMap["hero"]} />;
    case "stats":
      return <DynamicStats overrideProps={props as SectionPropsMap["stats"]} />;
    case "facility":
      return (
        <DynamicFacility overrideProps={props as SectionPropsMap["facility"]} />
      );
    case "cta_banner":
      return <CTASection {...(props as SectionPropsMap["cta_banner"])} />;
    case "programs_grid":
      return (
        <ProgramsGridSection {...(props as SectionPropsMap["programs_grid"])} />
      );
    case "coaches_grid":
      return (
        <CoachesGridSection {...(props as SectionPropsMap["coaches_grid"])} />
      );
    case "events_grid":
      return (
        <EventsGridSection {...(props as SectionPropsMap["events_grid"])} />
      );
    case "testimonials_grid":
      return (
        <TestimonialsGridSection
          {...(props as SectionPropsMap["testimonials_grid"])}
        />
      );
    case "pricing_table":
      return (
        <PricingTableSection {...(props as SectionPropsMap["pricing_table"])} />
      );
    case "schedule_table":
      return (
        <ScheduleSection {...(props as SectionPropsMap["schedule_table"])} />
      );
    case "gallery":
      return <GallerySection {...(props as SectionPropsMap["gallery"])} />;
    case "contact_info":
      return (
        <ContactInfoSection {...(props as SectionPropsMap["contact_info"])} />
      );
    case "contact_form":
      return <ContactFormSection />;
    case "homeschool_hero":
      return (
        <HomeschoolHeroSection
          {...(props as SectionPropsMap["homeschool_hero"])}
        />
      );
    case "homeschool_academics":
      return (
        <AcademicsSection
          {...(props as SectionPropsMap["homeschool_academics"])}
        />
      );
    case "map_embed":
      return <MapSection {...(props as SectionPropsMap["map_embed"])} />;
    case "rich_text":
      return <RichTextSection {...(props as SectionPropsMap["rich_text"])} />;
    case "event_categories_grid":
      return (
        <EventCategoriesGridSection
          {...(props as SectionPropsMap["event_categories_grid"])}
        />
      );
    default:
      return (
        <div className="p-8 text-center text-zinc-500">
          Unknown section type
        </div>
      );
  }
}

// ====== REAL DATA SECTIONS (fetch from Supabase same as public pages) ======

function DynamicHero({
  overrideProps,
}: {
  overrideProps: SectionPropsMap["hero"];
}) {
  const [config, setConfig] = useState<any>(null);
  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("site_config")
      .select("*")
      .limit(1)
      .then(({ data }) => {
        if (data?.[0]) setConfig(data[0]);
      });
  }, []);

  const tagline =
    overrideProps.tagline || config?.tagline || "Learn. Develop. Perform.";
  const description = overrideProps.description || config?.description || "";
  const location = overrideProps.location || "Viera, Florida";
  const videoSrc = overrideProps.videoSrc || "/ballplex-promo.mp4";
  const primaryCTA = overrideProps.primaryCTA || {
    text: "Get Started",
    href: config?.book_now_url || "#",
  };
  const secondaryCTA = overrideProps.secondaryCTA || {
    text: "Explore Programs",
    href: "/programs",
  };

  return (
    <Hero
      videoSrc={videoSrc}
      tagline={tagline}
      description={description}
      location={location}
      primaryCTA={primaryCTA}
      secondaryCTA={secondaryCTA}
    />
  );
}

function DynamicStats({
  overrideProps,
}: {
  overrideProps: SectionPropsMap["stats"];
}) {
  const [stats, setStats] = useState<any[] | null>(null);
  useEffect(() => {
    if (overrideProps.stats?.length) {
      setStats(overrideProps.stats);
      return;
    }
    const supabase = createClient();
    supabase
      .from("site_config")
      .select("stats")
      .limit(1)
      .then(({ data }) => {
        if (data?.[0]?.stats) setStats(data[0].stats);
      });
  }, [overrideProps]);

  return <StatsBar stats={stats || undefined} />;
}

function DynamicFacility({
  overrideProps,
}: {
  overrideProps: SectionPropsMap["facility"];
}) {
  const [features, setFeatures] = useState<any[] | null>(null);
  const [config, setConfig] = useState<any>(null);
  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("site_config")
      .select("*")
      .limit(1)
      .then(({ data }) => {
        if (data?.[0]) {
          setConfig(data[0]);
          if (!overrideProps.features?.length)
            setFeatures(data[0].facility_features);
        }
      });
  }, [overrideProps]);

  const feat = overrideProps.features?.length
    ? overrideProps.features
    : features || undefined;
  const title = overrideProps.title || "Why Athletes Choose Ballplex";
  const subtitle =
    overrideProps.subtitle ||
    (config ? undefined : "Technology to Track Your Progress");

  return (
    <Facility
      eyebrow={overrideProps.eyebrow}
      title={title}
      subtitle={subtitle}
      features={feat}
      images={overrideProps.images}
    />
  );
}

function CTASection(p: SectionPropsMap["cta_banner"]) {
  const [config, setConfig] = useState<any>(null);
  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("site_config")
      .select("book_now_url")
      .limit(1)
      .then(({ data }) => {
        if (data?.[0]) setConfig(data[0]);
      });
  }, []);

  const title = p.title || "Ready to Take Your Game\nto the Next Level?";
  const description =
    p.description ||
    "Join the most complete baseball and softball development center in Brevard County.";
  const primaryCTA = p.primaryCTA || {
    text: "Get Started Today",
    href: config?.book_now_url || "#",
  };
  const secondaryCTA = p.secondaryCTA || {
    text: "Contact Us",
    href: "/contact",
  };

  return (
    <CTABanner
      title={title}
      description={description}
      primaryCTA={primaryCTA}
      secondaryCTA={secondaryCTA}
    />
  );
}

// ====== TABLE-DRIVEN SECTIONS (fetch real data from programs/coaches/events/testimonials) ======

function ProgramsGridSection({
  eyebrow,
  title,
  subtitle,
}: SectionPropsMap["programs_grid"]) {
  const [programs, setPrograms] = useState<any[]>([]);
  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("programs")
      .select("*")
      .order("order_index")
      .then(({ data }) => setPrograms(data?.length ? data : fallbackPrograms));
  }, []);
  const items = (programs.length ? programs : fallbackPrograms).map(
    (p: any) => ({
      id: p.slug,
      title: p.title,
      description: p.description,
      icon: "user",
      link: `/programs#${p.slug}`,
      pricing:
        Array.isArray(p.pricing) && p.pricing[0]?.price
          ? p.pricing[0].price
          : "",
    }),
  );
  return (
    <section className="bg-brand-dark py-24">
      <div className="container-page">
        <div className="mb-16 text-center" data-reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
            {eyebrow || "Services"}
          </p>
          <h2 className="section-heading">
            {title || "Built for Athletes Development"}
          </h2>
          <p className="section-subtitle mx-auto text-zinc-400">
            {subtitle || ""}
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <div key={p.id || i}>
              <ProgramCard program={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoachesGridSection({
  eyebrow,
  title,
  subtitle,
}: SectionPropsMap["coaches_grid"]) {
  const [coaches, setCoaches] = useState<any[]>([]);
  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("coaches")
      .select("*")
      .order("order_index")
      .then(({ data }) => setCoaches(data?.length ? data : fallbackCoaches));
  }, []);
  return (
    <section className="bg-brand-black py-24">
      <div className="container-page">
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
            {eyebrow || "Coaching Staff"}
          </p>
          <h2 className="section-heading">
            {title || "Led by Pros. Built for Development."}
          </h2>
          <p className="section-subtitle mx-auto">{subtitle || ""}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(coaches.length ? coaches : fallbackCoaches)
            .slice(0, 4)
            .map((c, i) => (
              <CoachCard
                key={c.id || i}
                coach={{
                  ...c,
                  image: c.image_url || c.image,
                  specialties: Array.isArray(c.specialties)
                    ? c.specialties.join(", ")
                    : c.specialties || "",
                }}
                index={i}
              />
            ))}
        </div>
        <div className="mt-14 text-center">
          <a href="/programs#coaches" className="btn-outline">
            Meet All Coaches
          </a>
        </div>
      </div>
    </section>
  );
}

function EventsGridSection({
  eyebrow,
  title,
  subtitle,
}: SectionPropsMap["events_grid"]) {
  const [events, setEvents] = useState<any[]>([]);
  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("events")
      .select("*")
      .order("date")
      .then(({ data }) => setEvents(data?.length ? data : fallbackEvents));
  }, []);
  return (
    <section className="bg-brand-dark py-24">
      <div className="container-page">
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
            {eyebrow || "Events"}
          </p>
          <h2 className="section-heading">{title || "Upcoming Schedule"}</h2>
          <p className="section-subtitle mx-auto">{subtitle || ""}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(events.length ? events : fallbackEvents).map((e, i) => (
            <EventCard key={e.id || i} event={e} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsGridSection({
  eyebrow,
  title,
  subtitle,
}: SectionPropsMap["testimonials_grid"]) {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("testimonials")
      .select("*")
      .order("order_index")
      .then(({ data }) =>
        setTestimonials(data?.length ? data : fallbackTestimonials),
      );
  }, []);
  return (
    <section className="bg-brand-dark py-24">
      <div className="container-page">
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
            {eyebrow || "Testimonials"}
          </p>
          <h2 className="section-heading">{title || "What Families Say"}</h2>
          <p className="section-subtitle mx-auto">{subtitle || ""}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {(testimonials.length ? testimonials : fallbackTestimonials).map(
            (t, i) => (
              <TestimonialCard
                key={t.id || i}
                testimonial={{
                  ...t,
                  quote: t.content || t.quote || "",
                  stars: t.rating || t.stars || 5,
                }}
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
}

// ====== STATIC PREVIEW SECTIONS (use page_sections.props) ======

function EventCategoriesGridSection({
  eyebrow,
  title,
  subtitle,
}: SectionPropsMap["event_categories_grid"]) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 section-highlight">
      <div className="absolute inset-0 bg-grid-pattern" />
      <div className="container-page relative z-10">
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
            {eyebrow || "Browse by Category"}
          </p>
          <h2 className="section-heading">{title || "Find the Right Event"}</h2>
          <p className="section-subtitle mx-auto">
            {subtitle ||
              "Camps, tournaments, clinics, showcases, and community events — there's something for everyone."}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {fallbackCategories.map((category: any) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="group flex flex-col items-center rounded-2xl border border-white/5 bg-white/[0.03] p-6 text-center card-hover hover:border-brand-teal/30 hover:bg-brand-teal/5"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-teal/10 text-brand-teal group-hover:bg-brand-teal group-hover:text-black">
                <span className="text-3xl">
                  <EventCategoryIcon name={category.icon} />
                </span>
              </div>
              <h3 className="mt-4 text-base font-semibold text-white group-hover:text-brand-teal">
                {category.label || category.name}
              </h3>
              <p className="mt-2 text-sm text-brand-gray leading-relaxed">
                {category.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingTableSection({
  eyebrow,
  title,
  subtitle,
  description,
  plans,
}: SectionPropsMap["pricing_table"]) {
  const p = Array.isArray(plans) ? plans : [];
  return (
    <section className="py-16 bg-zinc-950">
      <div className="container-page">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
            {eyebrow || "Pricing"}
          </p>
          <h2 className="section-heading">{title || "Pricing"}</h2>
          <p className="section-subtitle mx-auto mt-2">{subtitle || ""}</p>
          {description && <p className="mt-4 text-zinc-400">{description}</p>}
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {p.map((plan) => (
            <div key={plan.name} className="glass-card p-8 text-center">
              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              <p className="mt-4 text-3xl font-bold text-brand-teal">
                {plan.price}
              </p>
              <p className="text-sm text-zinc-500">{plan.duration}</p>
              <p className="mt-4 text-sm text-zinc-400">{plan.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScheduleSection({
  eyebrow,
  title,
  items,
}: SectionPropsMap["schedule_table"]) {
  const i = Array.isArray(items) ? items : [];
  return (
    <section className="py-12 bg-brand-black">
      <div className="container-page">
        {eyebrow && (
          <p className="mb-2 text-center text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
            {eyebrow}
          </p>
        )}
        <h3 className="text-xl font-bold text-white text-center mb-6">
          {title || "Schedule"}
        </h3>
        <div className="max-w-md mx-auto space-y-3">
          {i.map((s) => (
            <div
              key={s.day}
              className="flex justify-between glass-card px-6 py-3"
            >
              <span className="text-white font-medium">{s.day}</span>
              <span className="text-brand-teal">{s.time}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection({
  eyebrow,
  title,
  images,
}: SectionPropsMap["gallery"]) {
  const imgs = Array.isArray(images) ? images : [];
  return (
    <section className="py-16 bg-zinc-950">
      <div className="container-page">
        {eyebrow && (
          <p className="mb-2 text-center text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
            {eyebrow}
          </p>
        )}
        <h2 className="section-heading text-center mb-8">
          {title || "Gallery"}
        </h2>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {imgs.filter(Boolean).map((img, i) => (
            <img
              key={`${img}-${i}`}
              src={img}
              alt=""
              className="rounded-2xl h-40 object-cover"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactInfoSection({
  phone,
  email,
  addresses,
  socials,
}: SectionPropsMap["contact_info"]) {
  const addrs = Array.isArray(addresses) ? addresses : [];
  return (
    <section className="py-16 bg-brand-black">
      <div className="container-page">
        <div className="max-w-lg mx-auto space-y-6 text-center">
          <div>
            <p className="text-sm text-zinc-500">Phone</p>
            <p className="text-white">{phone || ""}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Email</p>
            <p className="text-white">{email || ""}</p>
          </div>
          {addrs.map((a) => (
            <div key={a.label}>
              <p className="text-sm text-zinc-500">{a.label}</p>
              <p className="text-white">{a.address}</p>
            </div>
          ))}
          {socials && Object.keys(socials).length > 0 && (
            <div>
              <p className="text-sm text-zinc-500">Social</p>
              <div className="flex justify-center gap-4">
                {Object.entries(socials).map(([name, url]) => (
                  <a
                    key={name}
                    href={url}
                    className="text-brand-teal hover:text-white"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ContactFormSection() {
  return (
    <section className="bg-brand-dark py-16 md:py-20">
      <div className="container-page">
        <ContactForm />
      </div>
    </section>
  );
}

function HomeschoolHeroSection({
  title,
  subtitle,
  description,
  cta,
}: SectionPropsMap["homeschool_hero"]) {
  const c = cta || { text: "Apply Now", href: "#" };
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center bg-brand-black py-20">
      <div className="container-page text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-teal">
          {subtitle || ""}
        </p>
        <h1 className="section-heading mt-4">{title || "Title"}</h1>
        <p className="section-subtitle mx-auto mt-4">{description || ""}</p>
        <div className="mt-8">
          <a href={c.href} className="btn-primary">
            <span>{c.text}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function AcademicsSection({
  title,
  description,
  features,
}: SectionPropsMap["homeschool_academics"]) {
  const feat = Array.isArray(features) ? features : [];
  return (
    <section className="py-16 bg-zinc-950">
      <div className="container-page">
        <h2 className="section-heading">{title || "Academics"}</h2>
        <p className="section-subtitle mt-2">{description || ""}</p>
        {feat.length > 0 && (
          <ul className="mt-6 space-y-2">
            {feat.map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-zinc-300">
                <span className="text-brand-teal">&#10003;</span> {f}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function MapSection({
  title,
  address,
  embedUrl,
}: SectionPropsMap["map_embed"]) {
  return (
    <section className="py-16 bg-brand-black">
      <div className="container-page">
        <div className="mb-8 text-center">
          <h2 className="section-heading">{title || "Our Location"}</h2>
          <p className="text-zinc-400 mt-2">{address || ""}</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/5">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={title || "Ballplex Location"}
              width="100%"
              height="300"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale invert"
            />
          ) : (
            <div className="flex h-[300px] items-center justify-center bg-white/[0.03] text-zinc-500">
              Map embed URL required
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function RichTextSection({ title, content }: SectionPropsMap["rich_text"]) {
  return (
    <section className="py-16 bg-zinc-950">
      <div className="container-page">
        <h2 className="section-heading">{title || ""}</h2>
        <div className="mt-4 text-zinc-300 leading-relaxed whitespace-pre-line">
          {content || ""}
        </div>
      </div>
    </section>
  );
}
