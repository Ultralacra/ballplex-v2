"use client";

import { useState, type FormEvent } from "react";
import CTABanner from "@/components/CTABanner";
import { siteConfig } from "@/data/site";

export default function HomeschoolPage() {
  return (
    <>
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container-page">
          <div className="text-center" data-reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
              Homeschool Program
            </p>
            <h1 className="section-heading">
              Built for Advanced Athletes
            </h1>
            <p className="section-subtitle mx-auto">
              A complete academic and athletic program for competitive baseball and softball student-athletes. Daily training with our coaches combined with a nationally recognized curriculum led by our certified teachers.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl">
            <p className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
              See the Program in Action
            </p>
            <video
              className="w-full rounded-2xl ring-1 ring-white/10"
              src="https://mediumorchid-pig-468212.hostingersite.com/wp-content/uploads/2026/07/Ball-Plex-HS-Program.mp4"
              controls
              playsInline
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      <section className="bg-brand-dark py-20 md:py-28">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Academics + Athletics. Every Day.
              </h2>
              <p className="mt-4 text-brand-gray leading-relaxed">
                The Ballplex Homeschool Program is designed for competitive baseball and softball
                student-athletes who want to maximize their athletic development while maintaining
                a structured academic path.
              </p>
              <p className="mt-4 text-brand-gray leading-relaxed">
                Students follow a nationally recognized curriculum powered by Edmentum, supported
                by certified educators who monitor academic progress and ensure educational standards
                are met.
              </p>
              <p className="mt-4 text-brand-gray leading-relaxed">
                Training takes place in our 10,500 sq. ft. facility, where athletes work daily
                with an experienced coaching staff led by <strong className="text-white">Coach Leo Rojas</strong>,
                former professional players and high-level coaches.
              </p>
            </div>

            <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-8">
              <h3 className="text-lg font-semibold text-white">Daily Schedule</h3>
              <p className="mt-1 text-sm text-brand-gray">Monday &ndash; Thursday, aligned with Brevard County school calendar</p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-teal/10 text-brand-teal font-bold text-sm">
                    8AM
                  </div>
                  <div>
                    <p className="font-semibold text-white">Academics</p>
                    <p className="text-sm text-brand-gray">Powered by Edmentum. Certified educators monitor progress.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-teal/10 text-brand-teal font-bold text-sm">
                    11AM
                  </div>
                  <div>
                    <p className="font-semibold text-white">Training</p>
                    <p className="text-sm text-brand-gray">Hitting, defense, pitching, and strength &amp; conditioning until 3PM.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href={siteConfig.bookNowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center"
                >
                  <span>Apply Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 md:py-28 section-highlight">
        <div className="absolute inset-0 bg-grid-pattern"></div>

        <div className="container-page relative z-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 text-center glow-on-hover">
              <p className="text-3xl font-bold text-white">10,500</p>
              <p className="mt-1 text-sm text-brand-gray">sqft Facility</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 text-center glow-on-hover">
              <p className="text-3xl font-bold text-white">12</p>
              <p className="mt-1 text-sm text-brand-gray">Pro Coaches</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 text-center glow-on-hover">
              <p className="text-3xl font-bold text-white">4</p>
              <p className="mt-1 text-sm text-brand-gray">Days/Week</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 text-center glow-on-hover">
              <p className="text-3xl font-bold text-white">6th+</p>
              <p className="mt-1 text-sm text-brand-gray">Grade Entry</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-dark py-20 md:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-center text-3xl font-bold tracking-tight text-white">
              Pre-Register for 2026&ndash;2027
            </h2>
            <p className="mt-4 text-center text-brand-gray">
              Spots are limited to ensure a focused and high-quality training environment.
              Open to baseball and softball players from 6th grade and up with prior team or travel ball experience.
            </p>

            <form className="mt-8 rounded-2xl border border-white/5 bg-white/[0.03] p-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-white/60">Name</label>
                  <input type="text" id="name" name="name" required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/60">Email</label>
                  <input type="email" id="email" name="email" required className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20" placeholder="you@email.com" />
                </div>
              </div>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-white/60">Phone</label>
                  <input type="tel" id="phone" name="phone" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20" placeholder="(321) 555-0000" />
                </div>
                <div>
                  <label htmlFor="gender" className="mb-2 block text-sm font-medium text-white/60">Gender</label>
                  <select id="gender" name="gender" className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/60 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20">
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn-primary mt-8 w-full">
                <span>Send</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
