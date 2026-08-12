import { createClient } from "@/lib/supabase/server";
import EventCard from "@/components/EventCard";
import CTABanner from "@/components/CTABanner";
import EventCategoryIcon from "@/components/EventCategoryIcon";
import {
  events as fallbackEvents,
  eventCategories as fallbackCategories,
  getFeaturedEvents,
} from "@/data/events";
import { siteConfig } from "@/data/site";

async function getSections() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("page_sections")
      .select("*")
      .eq("page_slug", "events")
      .eq("is_visible", true)
      .order("order_index");
    return data || [];
  } catch {
    return [];
  }
}

async function getEvents() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("events")
      .select("*, event_categories(*)")
      .order("date");
    return data || fallbackEvents;
  } catch {
    return fallbackEvents;
  }
}

async function getCategories() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("event_categories")
      .select("*")
      .order("order_index");
    return data?.length ? data : fallbackCategories;
  } catch {
    return fallbackCategories;
  }
}

export default async function EventsPage() {
  const [sections, events, categoriesList] = await Promise.all([
    getSections(),
    getEvents(),
    getCategories(),
  ]);
  const sectionMap: Record<string, any> = {};
  for (const s of sections) sectionMap[s.type] = s.props;

  const featuredEvents = events.filter((e: any) => e.featured).slice(0, 3);
  const cta = sectionMap["cta_banner"] || {};
  const hero = sectionMap["hero"] || {};
  const eventGridSections = sections.filter(
    (section: any) => section.type === "events_grid",
  );
  const featuredGrid = eventGridSections[0]?.props || {};
  const allEventsGrid = eventGridSections[1]?.props || {};
  const categories =
    sections.find((section: any) => section.type === "event_categories_grid")
      ?.props || {};
  const whyAttend = sectionMap["facility"] || {
    title: "The Ballplex Difference",
    subtitle:
      "Our events are more than just games — they're opportunities to grow, get seen, and get better.",
    features: [
      {
        icon: "TipsAndUpdates",
        title: "Pro-Level Tech",
        description:
          "HitTrax and Rapsodo at every camp and clinic. Real data, real results, real development.",
      },
      {
        icon: "School",
        title: "Expert Coaching",
        description:
          "Every event is staffed by former pros, D1 players, and certified coaches who care about development.",
      },
      {
        icon: "VisibilityIcon",
        title: "Recruiting Exposure",
        description:
          "Showcases with verified metrics and video packages sent directly to college programs.",
      },
      {
        icon: "Groups",
        title: "Community",
        description:
          "Our family events and open play nights create a welcoming environment where everyone belongs.",
      },
    ],
  };

  return (
    <>
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-50"></div>
        <div className="container-page relative z-10">
          <div className="text-center" data-reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
              {hero.location || "Camps & Events"}
            </p>
            <h1 className="section-heading">
              {hero.tagline || "Train. Compete. Connect."}
            </h1>
            <p className="section-subtitle mx-auto">
              {hero.description ||
                "Year-round camps, tournaments, clinics, and community events for athletes of all ages and skill levels."}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-brand-dark py-20 md:py-28">
        <div className="container-page">
          <div className="mb-14 text-center" data-reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
              Featured
            </p>
            <h2 className="section-heading">
              {featuredGrid.title || "Can't Miss Events"}
            </h2>
            <p className="section-subtitle mx-auto">
              {featuredGrid.subtitle ||
                "Our marquee events. Early registration is strongly recommended — spots fill fast."}
            </p>
          </div>
          <div className="grid gap-8">
            {featuredEvents.map((event: any, i: number) => (
              <div key={event.id || i} data-reveal data-delay={String(i * 100)}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] card-hover grid gap-0 md:grid-cols-5">
                  <div className="md:col-span-2 aspect-[16/10] md:aspect-auto overflow-hidden">
                    {event.image_url || event.image ? (
                      <img
                        src={event.image_url || event.image}
                        alt={event.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-white/10 to-transparent" />
                    )}
                  </div>
                  <div className="md:col-span-3 p-8 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="rounded-full bg-brand-teal/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-black">
                        {event.category ||
                          event.event_categories?.name ||
                          "Event"}
                      </span>
                      <span className="rounded-full bg-amber-500/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-black">
                        Featured
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-brand-teal md:text-3xl">
                      {event.title}
                    </h3>
                    <p className="mt-3 text-brand-gray leading-relaxed">
                      {event.description || event.short_description}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-white/80">
                        {event.date}{" "}
                        {event.end_date ? `- ${event.end_date}` : ""}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-white/80">
                        <svg
                          className="h-4 w-4 text-brand-teal"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Ages {event.age_group || event.ageGroup}
                      </span>
                    </div>
                    {event.highlights && event.highlights.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {event.highlights.map((h: string) => (
                          <span
                            key={h}
                            className="rounded-full border border-brand-teal/20 bg-brand-teal/5 px-3 py-1 text-xs text-brand-teal/80"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      <span className="text-3xl font-bold text-brand-teal">
                        {event.price}
                      </span>
                      <a
                        href={siteConfig.bookNowUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary ml-auto"
                      >
                        <span>Register Now</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 md:py-28 section-highlight">
        <div className="absolute inset-0 bg-grid-pattern"></div>
        <div className="container-page relative z-10">
          <div className="mb-14 text-center" data-reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
              Browse by Category
            </p>
            <h2 className="section-heading">
              {categories.title || "Find the Right Event"}
            </h2>
            <p className="section-subtitle mx-auto">
              {categories.subtitle ||
                "Camps, tournaments, clinics, showcases, and community events — there's something for everyone."}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categoriesList.map((cat: any, i: number) => (
              <a
                key={cat.id}
                href={`#${cat.slug || cat.id}`}
                data-reveal
                data-delay={String(i * 80)}
                className="group flex flex-col items-center rounded-2xl border border-white/5 bg-white/[0.03] p-6 text-center card-hover transition-all duration-500 hover:border-brand-teal/30 hover:bg-brand-teal/5"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-teal/10 text-brand-teal transition-all duration-500 group-hover:bg-brand-teal group-hover:text-black group-hover:scale-110">
                  <EventCategoryIcon name={cat.icon} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white transition-colors duration-300 group-hover:text-brand-teal">
                  {cat.label || cat.name}
                </h3>
                <p className="mt-2 text-sm text-brand-gray leading-relaxed">
                  {cat.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-dark py-20 md:py-28">
        <div className="container-page">
          <div className="mb-14 text-center" data-reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
              All Events
            </p>
            <h2 className="section-heading">
              {allEventsGrid.title || "Upcoming Schedule"}
            </h2>
            <p className="section-subtitle mx-auto">
              {allEventsGrid.subtitle ||
                "Browse all upcoming camps, clinics, tournaments, showcases, and community events."}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event: any, i: number) => (
              <div key={event.id || i} data-reveal data-delay={String(i * 60)}>
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 md:py-28 section-highlight">
        <div className="absolute inset-0 bg-grid-pattern"></div>
        <div className="container-page relative z-10">
          <div className="mb-14 text-center" data-reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
              Why Attend
            </p>
            <h2 className="section-heading">
              {whyAttend.title || "The Ballplex Difference"}
            </h2>
            <p className="section-subtitle mx-auto">
              {whyAttend.subtitle ||
                "Our events are more than just games — they're opportunities to grow, get seen, and get better."}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(whyAttend.features || []).map((item: any) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 card-hover"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-teal/10 text-3xl text-brand-teal">
                  <EventCategoryIcon name={item.icon} />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-brand-gray leading-relaxed">
                  {item.description || item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title={(cta as any).title}
        description={(cta as any).description}
        primaryCTA={(cta as any).primaryCTA}
        secondaryCTA={(cta as any).secondaryCTA}
      />
    </>
  );
}
