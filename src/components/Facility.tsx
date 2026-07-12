import { facilityFeatures } from "@/data/site";

export default function Facility() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 py-20 md:py-28">
      <div className="absolute inset-0 bg-grid-pattern"></div>

      <div className="container-page relative z-10">
        <div className="mb-16 text-center" data-reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
            Our Facility
          </p>
          <h2 className="section-heading mt-4 text-white">
            Why Athletes Choose Ballplex
          </h2>
          <p className="section-subtitle mx-auto text-zinc-400">
            Technology to Track Your Progress, two Facilities and an Elite Coaching Team.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {facilityFeatures.map((feature, i) => (
            <div
              key={feature.title}
              className="glow-on-hover glass-card group p-8 transition-all duration-500 hover:bg-white/10 hover:border-white/20"
              data-reveal
              data-delay={String(i * 80)}
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-teal/20 text-brand-teal transition-transform duration-500 group-hover:scale-110 group-hover:bg-brand-teal group-hover:text-brand-black">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-brand-teal">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-4 overflow-hidden rounded-3xl sm:grid-cols-2" data-reveal data-delay="400">
          <div className="img-zoom">
            <img
              src="https://theballplex.com/wp-content/uploads/brizy/imgs/IMG_4117-548x731x0x80x548x570x1758559312.webp"
              alt="Ballplex Facility"
              className="h-64 w-full object-cover sm:h-96"
              loading="lazy"
            />
          </div>
          <div className="img-zoom">
            <img
              src="https://theballplex.com/wp-content/uploads/brizy/imgs/IMG_4121-323x431x0x86x323x259x1758559372.webp"
              alt="Ballplex Training Area"
              className="h-64 w-full object-cover sm:h-96"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
