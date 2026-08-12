import { facilityFeatures as defaultFeatures } from "@/data/site";
import EventCategoryIcon from "@/components/EventCategoryIcon";

type Feature = { icon: string; title: string; description: string };
type FacilityImage = { src: string; alt: string };

export default function Facility({
  title,
  subtitle,
  features,
  images,
  eyebrow,
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  features?: Feature[];
  images?: string[];
} = {}) {
  const feat = features || defaultFeatures;
  const ttl = title || "Why Athletes Choose Ballplex";
  const sub =
    subtitle ||
    "Technology to Track Your Progress, two Facilities and an Elite Coaching Team.";
  const facilityImages: FacilityImage[] = (
    images?.length
      ? images
      : [
          "https://theballplex.com/wp-content/uploads/brizy/imgs/IMG_4117-548x731x0x80x548x570x1758559312.webp",
          "https://theballplex.com/wp-content/uploads/brizy/imgs/IMG_4121-323x431x0x86x323x259x1758559372.webp",
        ]
  ).map((src, index) => ({
    src,
    alt: index === 0 ? "Ballplex Facility" : "Ballplex Training Area",
  }));

  return (
    <section className="relative overflow-hidden bg-zinc-950 py-20 md:py-28">
      <div className="absolute inset-0 bg-grid-pattern"></div>

      <div className="container-page relative z-10">
        <div className="mb-16 text-center" data-reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
            {eyebrow || "Our Facility"}
          </p>
          <h2 className="section-heading mt-4 text-white">{ttl}</h2>
          <p className="section-subtitle mx-auto text-zinc-400">{sub}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {feat.map((feature, i) => (
            <div
              key={feature.title}
              className="glow-on-hover glass-card group p-8 transition-all duration-500 hover:bg-white/10 hover:border-white/20"
              data-reveal
              data-delay={String(i * 80)}
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-teal/20 text-brand-teal transition-transform duration-500 group-hover:scale-110 group-hover:bg-brand-teal group-hover:text-brand-black">
                <EventCategoryIcon name={feature.icon} />
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

        <div
          className="mt-16 grid gap-4 overflow-hidden rounded-3xl sm:grid-cols-2"
          data-reveal
          data-delay="400"
        >
          {facilityImages.slice(0, 2).map((image) => (
            <div className="overflow-hidden rounded-2xl" key={image.src}>
              <img
                src={image.src}
                alt={image.alt}
                className="block h-auto w-full"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
