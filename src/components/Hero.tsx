import { siteConfig } from "@/data/site";

export default function Hero() {
  const lines = siteConfig.tagline.replace(/\.\s*$/, "").split(". ");
  const taglineParts = lines.map((line, i) => (
    <span key={i}>
      {line}.{i < lines.length - 1 && <br />}
    </span>
  ));

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0" id="hero-bg">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/ballplex-promo.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-brand-black"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
      </div>

      <div className="container-page relative z-10 flex flex-col items-center py-32 text-center">
        <p
          className="mb-6 text-sm font-semibold uppercase tracking-[0.35em] text-brand-teal"
          data-reveal
        >
          Viera, Florida
        </p>
        <h1
          className="max-w-6xl text-5xl font-extrabold leading-none tracking-tight text-white md:text-7xl lg:text-8xl"
          data-reveal
          data-delay="100"
        >
          {taglineParts}
        </h1>
        <p
          className="mt-8 max-w-2xl text-lg leading-relaxed text-white/50 md:text-xl"
          data-reveal
          data-delay="200"
        >
          {siteConfig.description}
        </p>
        <div
          className="mt-12 flex flex-col gap-4 sm:flex-row"
          data-reveal
          data-delay="300"
        >
          <a
            href={siteConfig.bookNowUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base px-10 py-5"
          >
            <span>Get Started</span>
          </a>
          <a href="/programs" className="btn-outline-light text-base px-10 py-5">
            Explore Programs
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <svg className="h-6 w-6 text-white/30" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </section>
  );
}
