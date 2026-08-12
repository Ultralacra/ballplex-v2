import { createClient } from "@/lib/supabase/server";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Facility from "@/components/Facility";
import ProgramCard from "@/components/ProgramCard";
import CoachCard from "@/components/CoachCard";
import TestimonialCard from "@/components/TestimonialCard";
import CTABanner from "@/components/CTABanner";
import { programs as fallbackPrograms } from "@/data/programs";
import { coaches as fallbackCoaches } from "@/data/coaches";
import { testimonials as fallbackTestimonials } from "@/data/testimonials";
import { siteConfig as fallbackConfig } from "@/data/site";

async function getSections() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("page_sections")
      .select("*")
      .eq("page_slug", "home")
      .eq("is_visible", true)
      .order("order_index", { ascending: true });
    return data || [];
  } catch {
    return [];
  }
}

async function getPrograms() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("programs")
      .select("*")
      .order("order_index");
    return data || fallbackPrograms;
  } catch {
    return fallbackPrograms;
  }
}

async function getCoaches() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("coaches")
      .select("*")
      .order("order_index");
    return data || fallbackCoaches;
  } catch {
    return fallbackCoaches;
  }
}

async function getTestimonials() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("order_index");
    return data || fallbackTestimonials;
  } catch {
    return fallbackTestimonials;
  }
}

export default async function HomePage() {
  const [sections, programs, coaches, testimonials] = await Promise.all([
    getSections(),
    getPrograms(),
    getCoaches(),
    getTestimonials(),
  ]);

  const sectionMap: Record<string, { props: Record<string, unknown> }> = {};
  for (const s of sections) {
    sectionMap[s.type] = { props: s.props as Record<string, unknown> };
  }

  const adapterPrograms = programs.map((p: any) => ({
    id: p.slug || p.id,
    title: p.title,
    description: p.description,
    icon: p.icon || "user",
    link: p.slug ? `/programs#${p.slug}` : p.link || "/programs",
    pricing:
      Array.isArray(p.pricing) && p.pricing.length > 0
        ? p.pricing[0]?.price
        : p.pricing || "",
  }));

  const adapterCoaches = coaches.map((c: any) => ({
    ...c,
    specialties: Array.isArray(c.specialties)
      ? c.specialties.join(", ")
      : c.specialties || "",
    image: c.image_url || c.image,
  }));

  const adapterTestimonials = testimonials.map((t: any) => ({
    ...t,
    quote: t.content || t.quote,
    stars: t.rating || t.stars || 5,
  }));

  const heroProps = sectionMap["hero"]?.props as
    | Record<string, string | Record<string, string>>
    | undefined;
  const statsProps = sectionMap["stats"]?.props as
    | { stats?: Array<{ value: string; label: string }> }
    | undefined;
  const facilityProps = sectionMap["facility"]?.props as
    | {
        eyebrow?: string;
        galleryEyebrow?: string;
        title?: string;
        subtitle?: string;
        features?: Array<{ icon: string; title: string; description: string }>;
        images?: string[];
      }
    | undefined;
  const galleryProps = sectionMap["gallery"]?.props as
    | { eyebrow?: string; title?: string; images?: string[] }
    | undefined;
  const galleryLayouts = [
    "col-span-1 row-span-2 sm:col-span-2 sm:row-span-2",
    "col-span-1 row-span-1 sm:col-span-1",
    "col-span-1 row-span-1 sm:col-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
  ];
  const galleryImages = Array.isArray(galleryProps?.images)
    ? galleryProps.images.filter(Boolean).map((src, index) => ({
        src,
        alt: "Ballplex Facility",
        span: galleryLayouts[index] || "col-span-1",
      }))
    : [];
  const ctaProps = sectionMap["cta_banner"]?.props as
    | {
        title?: string;
        description?: string;
        primaryCTA?: { text: string; href: string };
        secondaryCTA?: { text: string; href: string };
      }
    | undefined;

  return (
    <>
      <Hero
        videoSrc={heroProps?.videoSrc as string}
        tagline={heroProps?.tagline as string}
        description={heroProps?.description as string}
        location={heroProps?.location as string}
        primaryCTA={heroProps?.primaryCTA as { text: string; href: string }}
        secondaryCTA={heroProps?.secondaryCTA as { text: string; href: string }}
      />

      <StatsBar stats={statsProps?.stats} />

      <section className="bg-brand-dark py-24 md:py-32">
        <div className="container-page">
          <div className="mb-16 text-center" data-reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
              {(sectionMap["programs_grid"]?.props as Record<string, string>)
                ?.eyebrow || "Services"}
            </p>
            <h2 className="section-heading">
              {(sectionMap["programs_grid"]?.props as Record<string, string>)
                ?.title || "Built for Athletes Development"}
            </h2>
            <p className="section-subtitle mx-auto text-zinc-400">
              Everything a serious baseball or softball athlete needs to improve
              their game.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {adapterPrograms.map((program: any, i: number) => (
              <div
                key={program.id || i}
                data-reveal
                data-delay={String(i * 80)}
              >
                <ProgramCard program={program} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Facility
        eyebrow={facilityProps?.eyebrow}
        title={facilityProps?.title}
        subtitle={facilityProps?.subtitle}
        features={facilityProps?.features}
        images={facilityProps?.images}
      />

      <section className="relative overflow-hidden py-24 md:py-32 section-highlight">
        <div className="absolute inset-0 bg-grid-pattern"></div>
        <div className="container-page relative z-10">
          <div className="mb-16 text-center" data-reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
              {galleryProps?.eyebrow ||
                facilityProps?.galleryEyebrow ||
                "Inside Ballplex"}
            </p>
            <h2 className="section-heading">
              {galleryProps?.title || "See our facilities"}
            </h2>
            <p className="section-subtitle mx-auto mt-5">
              10,500 sqft dedicated for player development. 6,000 sqft available
              for cage rentals.
            </p>
          </div>

          <div className="grid auto-rows-[200px] grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 md:auto-rows-[260px] md:grid-cols-4">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`img-zoom ${img.span}`}
                data-reveal="scale"
                data-delay={String(i * 80)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-black py-24 md:py-32">
        <div className="absolute inset-0 bg-grid-pattern"></div>
        <div className="container-page relative z-10">
          <div className="mb-16 text-center" data-reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
              {(sectionMap["coaches_grid"]?.props as Record<string, string>)
                ?.eyebrow || "Coaching Staff"}
            </p>
            <h2 className="section-heading">
              Led by Pros. Built for Development.
            </h2>
            <p className="section-subtitle mx-auto mt-5">
              Former professional players and elite coaches dedicated to
              developing the next generation of athletes.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {adapterCoaches.slice(0, 4).map((coach: any, i: number) => (
              <div
                key={coach.name || i}
                data-reveal
                data-delay={String(i * 100)}
              >
                <CoachCard coach={coach} index={i} />
              </div>
            ))}
          </div>

          <div className="mt-14 text-center" data-reveal data-delay="400">
            <a href="/programs#coaches" className="btn-outline">
              Meet All Coaches
            </a>
          </div>
        </div>
      </section>

      <section className="bg-brand-dark py-24 md:py-32">
        <div className="container-page">
          <div className="mb-16 text-center" data-reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
              {(
                sectionMap["testimonials_grid"]?.props as Record<string, string>
              )?.eyebrow || "Testimonials"}
            </p>
            <h2 className="section-heading">What Families Say</h2>
            <p className="section-subtitle mx-auto mt-5">
              Trusted by parents and athletes across Brevard County.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {adapterTestimonials.map((t: any, i: number) => (
              <div key={t.name || i} data-reveal data-delay={String(i * 150)}>
                <TestimonialCard testimonial={t} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title={ctaProps?.title}
        description={ctaProps?.description}
        primaryCTA={ctaProps?.primaryCTA}
        secondaryCTA={ctaProps?.secondaryCTA}
      />
    </>
  );
}
