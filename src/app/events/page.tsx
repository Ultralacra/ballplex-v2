import EventCard from "@/components/EventCard";
import CTABanner from "@/components/CTABanner";
import { events, eventCategories, getFeaturedEvents } from "@/data/events";
import { siteConfig } from "@/data/site";

const featuredEvents = getFeaturedEvents();

export default function EventsPage() {
  return (
    <>
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-50"></div>
        <div className="container-page relative z-10">
          <div className="text-center" data-reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
              Camps & Events
            </p>
            <h1 className="section-heading">
              Train. Compete. Connect.
            </h1>
            <p className="section-subtitle mx-auto">
              Year-round camps, tournaments, clinics, and community events for athletes of all ages and skill levels.
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
              Can&apos;t Miss Events
            </h2>
            <p className="section-subtitle mx-auto">
              Our marquee events. Early registration is strongly recommended &mdash; spots fill fast.
            </p>
          </div>

          <div className="grid gap-8">
            {featuredEvents.map((event, i) => (
              <div key={event.id} data-reveal data-delay={String(i * 100)}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] card-hover grid gap-0 md:grid-cols-5">
                  <div className="md:col-span-2 aspect-[16/10] md:aspect-auto overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="md:col-span-3 p-8 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="rounded-full bg-brand-teal/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-black">
                        {event.category}
                      </span>
                      <span className="rounded-full bg-amber-500/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-black">
                        Featured
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-brand-teal md:text-3xl">
                      {event.title}
                    </h3>
                    <p className="mt-3 text-brand-gray leading-relaxed">
                      {event.description}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-white/80">
                        <svg className="h-4 w-4 text-brand-teal" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                        {event.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-white/80">
                        <svg className="h-4 w-4 text-brand-teal" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {event.time}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-white/80">
                        <svg className="h-4 w-4 text-brand-teal" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        Ages {event.ageGroup}
                      </span>
                    </div>

                    {event.highlights && event.highlights.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {event.highlights.map((h) => (
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
                      <span className="text-3xl font-bold text-brand-teal">{event.price}</span>
                      <span className="text-sm text-brand-muted">{event.spots}</span>
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
              Find the Right Event
            </h2>
            <p className="section-subtitle mx-auto">
              Camps, tournaments, clinics, showcases, and community events &mdash; there&apos;s something for everyone.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {eventCategories.map((cat, i) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                data-reveal
                data-delay={String(i * 80)}
                className="group flex flex-col items-center rounded-2xl border border-white/5 bg-white/[0.03] p-6 text-center card-hover transition-all duration-500 hover:border-brand-teal/30 hover:bg-brand-teal/5"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-teal/10 text-brand-teal transition-all duration-500 group-hover:bg-brand-teal group-hover:text-black group-hover:scale-110">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    {cat.icon === "flame" && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                    )}
                    {cat.icon === "trophy" && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.77.774 6 6 0 01-2.77-.774m0 0a6 6 0 01-.939-.446" />
                    )}
                    {cat.icon === "target" && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                    )}
                    {cat.icon === "star" && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    )}
                    {cat.icon === "users" && (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    )}
                  </svg>
                </div>
                <h3 className="mt-4 text-base font-semibold text-white transition-colors duration-300 group-hover:text-brand-teal">
                  {cat.label}
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
              Upcoming Schedule
            </h2>
            <p className="section-subtitle mx-auto">
              Browse all upcoming camps, clinics, tournaments, showcases, and community events.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, i) => (
              <div key={event.id} data-reveal data-delay={String(i * 60)}>
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
              The Ballplex Difference
            </h2>
            <p className="section-subtitle mx-auto">
              Our events are more than just games &mdash; they&apos;re opportunities to grow, get seen, and get better.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 card-hover" data-reveal data-delay="0">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813-2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Pro-Level Tech</h3>
              <p className="mt-2 text-sm text-brand-gray leading-relaxed">
                HitTrax and Rapsodo at every camp and clinic. Real data, real results, real development.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 card-hover" data-reveal data-delay="100">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Expert Coaching</h3>
              <p className="mt-2 text-sm text-brand-gray leading-relaxed">
                Every event is staffed by former pros, D1 players, and certified coaches who care about development.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 card-hover" data-reveal data-delay="200">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Recruiting Exposure</h3>
              <p className="mt-2 text-sm text-brand-gray leading-relaxed">
                Showcases with verified metrics and video packages sent directly to college programs.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 card-hover" data-reveal data-delay="300">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Community</h3>
              <p className="mt-2 text-sm text-brand-gray leading-relaxed">
                Our family events and open play nights create a welcoming environment where everyone belongs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
