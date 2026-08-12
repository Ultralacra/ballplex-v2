import { createClient } from "@/lib/supabase/server";
import { events as fallbackEvents } from "@/data/events";

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

function getUpcomingEvents<T extends { date?: string | null }>(events: T[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return [...events]
    .filter((event) => {
      const timestamp = event.date ? Date.parse(event.date) : Number.NaN;
      return Number.isFinite(timestamp) && timestamp >= today.getTime();
    })
    .sort((a, b) => {
      const dateA = a.date ? Date.parse(a.date) : Number.NaN;
      const dateB = b.date ? Date.parse(b.date) : Number.NaN;
      return dateA - dateB;
    });
}

export default async function EventsPage() {
  const [sections, events] = await Promise.all([getSections(), getEvents()]);
  const upcomingEvents = getUpcomingEvents(events);
  const eventGridSections = sections.filter(
    (section: any) => section.type === "events_grid",
  );
  const allEventsGrid =
    eventGridSections[1]?.props || eventGridSections[0]?.props || {};

  return (
    <>
      <section className="bg-brand-dark py-20 md:py-28">
        <div className="container-page">
          <div className="mb-14 text-center" data-reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
              {allEventsGrid.eyebrow || "Camps & Events"}
            </p>
            <h2 className="section-heading">
              {allEventsGrid.title || "Upcoming Schedule"}
            </h2>
            <p className="section-subtitle mx-auto">
              {allEventsGrid.subtitle ||
                "Browse all upcoming camps, clinics, tournaments, showcases, and community events."}
            </p>
          </div>
          <div className="grid gap-8">
            {upcomingEvents.map((event: any, i: number) => (
              <div key={event.id || i} data-reveal data-delay={String(i * 100)}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] card-hover grid gap-0 md:grid-cols-5">
                  <div className="md:col-span-2 aspect-[16/10] overflow-hidden bg-black/20 md:aspect-[4/3]">
                    {event.image_url || event.image ? (
                      <img
                        src={event.image_url || event.image}
                        alt={event.title}
                        className="h-full w-full object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-105"
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
                        Upcoming
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
                      {event.official_url && (
                        <a
                          href={event.official_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary ml-auto"
                        >
                          <span>View Event</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
