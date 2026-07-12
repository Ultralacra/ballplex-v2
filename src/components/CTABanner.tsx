import { siteConfig } from "@/data/site";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 py-24 md:py-32">
      <div className="absolute inset-0 bg-grid-pattern"></div>
      <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-brand-teal/10 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-brand-teal/5 blur-3xl"></div>

      <div className="container-page relative z-10 text-center">
        <h2 className="section-heading text-white" data-reveal>
          Ready to Take Your Game<br />to the Next Level?
        </h2>
        <p className="section-subtitle mx-auto mt-6 text-zinc-400" data-reveal data-delay="100">
          Join the most complete baseball and softball development center in Brevard County. Everything you need — coaching, technology, training, and community — all under one roof.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center" data-reveal data-delay="200">
          <a
            href={siteConfig.bookNowUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base px-10 py-5"
          >
            <span>Get Started Today</span>
          </a>
          <a href="/contact" className="btn-outline-light text-base px-10 py-5">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
