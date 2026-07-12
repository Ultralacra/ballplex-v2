import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Facility from "@/components/Facility";
import ProgramCard from "@/components/ProgramCard";
import CoachCard from "@/components/CoachCard";
import TestimonialCard from "@/components/TestimonialCard";
import CTABanner from "@/components/CTABanner";
import { programs } from "@/data/programs";
import { coaches } from "@/data/coaches";
import { testimonials } from "@/data/testimonials";

const featuredCoaches = coaches.slice(0, 4);

const galleryImages = [
  {
    src: "/images-lessons/d577b0a5-d7c6-4fd8-a896-b72b3d522a96 2.JPG.jpeg",
    alt: "Ballplex Training",
    span: "col-span-1 row-span-2 sm:col-span-2 sm:row-span-2",
  },
  {
    src: "/images-lessons/DSC00748.JPG.jpeg",
    alt: "Ballplex Training",
    span: "col-span-1 row-span-1 sm:col-span-1",
  },
  {
    src: "/images-lessons/DSC00828.JPG.jpeg",
    alt: "Ballplex Training",
    span: "col-span-1 row-span-1 sm:col-span-1",
  },
  {
    src: "/SC/IMG_4119 2.jpg",
    alt: "Ballplex Strength & Conditioning",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/SC/IMG_5973.jpg",
    alt: "Ballplex Strength & Conditioning",
    span: "col-span-2 sm:col-span-2",
  },
  {
    src: "/rentals/IMG_5967.jpg.jpeg",
    alt: "Ballplex Cage Rentals",
    span: "col-span-1",
  },
  {
    src: "/rentals/e13429f3-b13b-4bc5-a54a-6173978d8248.JPG.jpeg",
    alt: "Ballplex Cage Rentals",
    span: "col-span-1",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />

      <section className="bg-brand-dark py-24 md:py-32">
        <div className="container-page">
          <div className="mb-16 text-center" data-reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
              Services
            </p>
            <h2 className="section-heading">
              Built for Athletes Development
            </h2>
            <p className="section-subtitle mx-auto text-zinc-400">
              Everything a serious baseball or softball athlete needs to improve their game.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, i) => (
              <div key={program.id} data-reveal data-delay={String(i * 80)}>
                <ProgramCard program={program} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Facility />

      <section className="relative overflow-hidden py-24 md:py-32 section-highlight">
        <div className="absolute inset-0 bg-grid-pattern"></div>

        <div className="container-page relative z-10">
          <div className="mb-16 text-center" data-reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
              Inside Ballplex
            </p>
            <h2 className="section-heading">
              See the Facility
            </h2>
            <p className="section-subtitle mx-auto mt-5">
              Take a look inside Brevard County&apos;s premier baseball and softball training destination.
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
              Coaching Staff
            </p>
            <h2 className="section-heading">
              Led by Pros. Built for Development.
            </h2>
            <p className="section-subtitle mx-auto mt-5">
              Former professional players and elite coaches dedicated to developing the next generation of athletes.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCoaches.map((coach, i) => (
              <div key={coach.name} data-reveal data-delay={String(i * 100)}>
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
              Testimonials
            </p>
            <h2 className="section-heading">
              What Families Say
            </h2>
            <p className="section-subtitle mx-auto mt-5">
              Trusted by parents and athletes across Brevard County.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={t.name} data-reveal data-delay={String(i * 150)}>
                <TestimonialCard testimonial={t} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
