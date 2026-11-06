import { siteConfig, navLinks } from "@/data/site";
import { createClient } from "@/lib/supabase/server";

export default async function Footer() {
  let config = {
    ...siteConfig,
    logo_url: "/LOGO.png",
    footer_tagline: "",
    copyright_text: "",
  };
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("site_config").select("*").limit(1).maybeSingle();
    if (data) {
      config = {
        ...siteConfig,
        ...data,
        addresses: Array.isArray(data.addresses) ? data.addresses : siteConfig.addresses,
      };
    }
  } catch {
    // Keep the local defaults available during outages and static builds.
  }

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="container-page py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <img src={config.logo_url || "/LOGO.png"} alt={config.name || "Ballplex"} className="h-16 w-auto" />
            <p className="mt-5 text-sm leading-relaxed text-zinc-400">
            {config.description}
            </p>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors duration-300 hover:text-brand-teal"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Services
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="/programs#lessons" className="text-sm text-zinc-400 transition-colors duration-300 hover:text-brand-teal">
                  Private Lessons
                </a>
              </li>
              <li>
                <a href="/programs#memberships" className="text-sm text-zinc-400 transition-colors duration-300 hover:text-brand-teal">
                  Memberships
                </a>
              </li>
              <li>
                <a href="/programs#strength" className="text-sm text-zinc-400 transition-colors duration-300 hover:text-brand-teal">
                  Strength & Conditioning
                </a>
              </li>
              <li>
                <a href="/programs#rentals" className="text-sm text-zinc-400 transition-colors duration-300 hover:text-brand-teal">
                  Cage Rentals
                </a>
              </li>
              <li>
                <a href="/homeschool" className="text-sm text-zinc-400 transition-colors duration-300 hover:text-brand-teal">
                  Homeschool Program
                </a>
              </li>
              <li>
                <a href="/programs#coaches" className="text-sm text-zinc-400 transition-colors duration-300 hover:text-brand-teal">
                  Coaches
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li>
                <a
                  href={`tel:${config.phone.replace(/\D/g, "")}`}
                  className="transition-colors duration-300 hover:text-brand-teal"
                >
                  {config.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${config.email}`}
                  className="transition-colors duration-300 hover:text-brand-teal"
                >
                  {config.email}
                </a>
              </li>
              {config.addresses.map((addr) => (
                <li key={addr.label} className="mt-3">
                  <span className="text-xs uppercase tracking-wider text-zinc-500">
                    {addr.label}
                  </span>
                  <p className="text-sm text-zinc-500">{addr.address}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 md:flex-row">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} {config.copyright_text || "Ballplex Sports Academy & Facility. All Rights Reserved."}
          </p>
          <p className="text-xs text-zinc-700">
            {config.footer_tagline || "Elite Baseball & Softball Development — Viera, Florida"}
          </p>
        </div>
      </div>
    </footer>
  );
}
