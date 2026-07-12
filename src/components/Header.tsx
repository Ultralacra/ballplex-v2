"use client";

import { useState, useEffect } from "react";
import { navLinks, siteConfig } from "@/data/site";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-white/10 shadow-lg"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav
        id="site-nav"
        className={`container-page flex items-center justify-between transition-all duration-500 ${
          scrolled ? "h-20 md:h-24" : "h-24 md:h-32"
        }`}
      >
        <a href="/" className="flex items-center gap-3" aria-label="Ballplex Home">
          <img
            src="/LOGO.png"
            alt="Ballplex"
            id="header-logo"
            className={`w-auto transition-all duration-500 ${
              scrolled ? "h-16 md:h-24" : "h-20 md:h-28"
            }`}
          />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href} className={link.children ? "group relative" : ""}>
              <a
                href={link.href}
                className="link-underline rounded-lg px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
              >
                {link.label}
                {link.children && (
                  <svg
                    className="ml-1 inline-block h-3 w-3 transition-transform duration-200 group-hover:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                )}
              </a>
              {link.children && (
                <div className="invisible absolute top-full left-0 z-50 mt-1 min-w-[200px] translate-y-2 rounded-xl border border-white/10 bg-zinc-950/95 p-2 opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {link.children.map((child) => (
                    <a
                      key={child.href}
                      href={child.href}
                      className="block rounded-lg px-4 py-2.5 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <a
            href={siteConfig.bookNowUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden lg:inline-flex"
          >
            <span>Book Now</span>
          </a>

          <a
            href={siteConfig.bookNowUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-white/10 lg:hidden"
            aria-label="Book Now"
            style={{ background: "linear-gradient(135deg, #86C9B6, #5fa899)" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#09090b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </a>

          <button
            id="mobile-menu-btn"
            className="flex flex-col gap-1.5 p-2 lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}></span>
            <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}></span>
            <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}></span>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="border-t border-white/10 bg-black/95 backdrop-blur-xl lg:hidden"
        >
          <ul className="container-page flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-lg px-4 py-3 text-base font-medium text-white/60 transition-colors hover:text-white hover:bg-white/5"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
                {link.children && (
                  <ul className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-4">
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <a
                          href={child.href}
                          className="block rounded-lg px-4 py-2 text-sm font-medium text-white/40 transition-colors hover:text-white hover:bg-white/5"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
