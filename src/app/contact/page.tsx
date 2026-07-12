import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/data/site";

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container-page">
          <div className="text-center" data-reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
              Contact
            </p>
            <h1 className="section-heading">
              Get in Touch
            </h1>
            <p className="section-subtitle mx-auto">
              Have questions? Want to book the facility or organize a special event? We&apos;ll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-brand-dark py-16 md:py-20">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Phone</h3>
                    <a href={`tel:${siteConfig.phone.replace(/\D/g, "")}`} className="text-brand-gray transition-colors hover:text-brand-teal">
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Email</h3>
                    <a href={`mailto:${siteConfig.email}`} className="text-brand-gray transition-colors hover:text-brand-teal">
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div className="space-y-4">
                    {siteConfig.addresses.map((addr) => (
                      <div key={addr.label}>
                        <h3 className="font-semibold text-white">{addr.label}</h3>
                        <p className="text-sm text-brand-gray">{addr.address}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 overflow-hidden rounded-2xl border border-white/5">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.5!2d-80.75!3d28.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88de0c5a2cf13d2b%3A0xf1f2c6c942a0b3c9!2s7255%20Waelti%20Dr%2C%20Melbourne%2C%20FL%2032940!5e0!3m2!1sen!2sus!4v1700000000000"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ballplex Location"
                  className="grayscale invert"
                />
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
