export default function StorePage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="container-page text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
          Store
        </p>
        <h1 className="section-heading">
          Coming Soon
        </h1>
        <p className="section-subtitle mx-auto">
          Our online store is currently under construction. For now, visit us in person or contact us for merchandise inquiries.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a href="/contact" className="btn-primary"><span>Contact Us</span></a>
          <a href="/programs" className="btn-outline">View Programs</a>
        </div>
      </div>
    </section>
  );
}
