import type { Event } from "@/data/events";

interface Props {
  event: Event;
}

export default function EventCard({ event }: Props) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/30 hover:border-brand-teal/30">
      <div className="aspect-[16/10] overflow-hidden relative">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-brand-teal/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-black">
            {event.category}
          </span>
          {event.featured && (
            <span className="rounded-full bg-amber-500/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-black">
              Featured
            </span>
          )}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <span className="rounded-full bg-black/60 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white/80">
            {event.date} &middot; {event.time}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-brand-teal">
          {event.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-brand-gray line-clamp-2">
          {event.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-brand-muted">
          <span className="inline-flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            Ages {event.ageGroup}
          </span>
          <span className="inline-flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {event.duration}
          </span>
          <span className="inline-flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
            {event.spots}
          </span>
        </div>

        {event.highlights && event.highlights.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {event.highlights.map((h) => (
              <span
                key={h}
                className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-zinc-400 transition-colors duration-300 group-hover:border-brand-teal/30 group-hover:text-zinc-300"
              >
                {h}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
          <span className="text-xl font-bold text-brand-teal">{event.price}</span>
          <span className="rounded-lg bg-brand-teal/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-brand-teal transition-all duration-300 group-hover:bg-brand-teal group-hover:text-black">
            Register
          </span>
        </div>
      </div>
    </div>
  );
}
