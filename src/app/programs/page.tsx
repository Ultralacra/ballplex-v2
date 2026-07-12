"use client";

import { useState, useCallback } from "react";
import CTABanner from "@/components/CTABanner";
import CoachCard from "@/components/CoachCard";
import CoachModal from "@/components/CoachModal";
import ImageSlideshow from "@/components/ImageSlideshow";
import { coaches } from "@/data/coaches";
import { siteConfig } from "@/data/site";
import type { Coach } from "@/data/coaches";

const lessonsSlides = [
  { src: "/images-lessons/d577b0a5-d7c6-4fd8-a896-b72b3d522a96 2.JPG.jpeg", alt: "Training" },
  { src: "/images-lessons/DSC00748.JPG.jpeg", alt: "Training" },
  { src: "/images-lessons/DSC00828.JPG.jpeg", alt: "Training" },
];

const scSlides = [
  { src: "/SC/IMG_4119 2.jpg", alt: "Strength & Conditioning" },
  { src: "/SC/IMG_5973.jpg", alt: "Strength & Conditioning" },
];

const rentalsSlides = [
  { src: "/rentals/IMG_5967.jpg.jpeg", alt: "Cage Rental" },
  { src: "/rentals/e13429f3-b13b-4bc5-a54a-6173978d8248.JPG.jpeg", alt: "Cage Rental" },
];

export default function ProgramsPage() {
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const closeModal = useCallback(() => setSelectedCoach(null), []);

  return (
    <>
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container-page">
          <div className="text-center" data-reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
              Services
            </p>
            <h1 className="section-heading">
              Built for Athletes Development
            </h1>
            <p className="section-subtitle mx-auto">
              Technology to Track Your Progress, two Facilities and an Elite Coaching Team.
            </p>
          </div>
        </div>
      </section>

      <section id="lessons" className="bg-brand-dark py-20 md:py-28">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
                Private Lessons
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                1-on-1 &amp; Duo Instruction
              </h2>
              <p className="mt-4 text-brand-gray leading-relaxed">
                Whether your goal is to make the team, earn a starting spot, or get recruited by top college programs,
                our coaches are here to help you get there. HitTrax and Rapsodo technology are available for detailed
                performance tracking.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                  <h4 className="font-semibold text-white">Hitting</h4>
                  <p className="mt-1 text-sm text-brand-gray">Swing mechanics, approach, Rapsodo data</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                  <h4 className="font-semibold text-white">Pitching</h4>
                  <p className="mt-1 text-sm text-brand-gray">Mechanics, velocity, arm care, pitch design</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                  <h4 className="font-semibold text-white">Catching</h4>
                  <p className="mt-1 text-sm text-brand-gray">Receiving, blocking, throwing, game IQ</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                  <h4 className="font-semibold text-white">Fielding</h4>
                  <p className="mt-1 text-sm text-brand-gray">Footwork, glove work, arm strength</p>
                </div>
              </div>

              <div className="mt-8 overflow-hidden rounded-xl border border-white/5">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-3 font-semibold text-white">Type</th>
                      <th className="px-6 py-3 font-semibold text-white">1H Private</th>
                      <th className="px-6 py-3 font-semibold text-white">1H Duo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="px-6 py-3 text-white/60">Hitting / Fielding / Catching</td>
                      <td className="px-6 py-3 font-medium text-white">$80</td>
                      <td className="px-6 py-3 font-medium text-white">$100</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 text-white/60">Softball Pitching</td>
                      <td className="px-6 py-3 font-medium text-white">$80</td>
                      <td className="px-6 py-3 font-medium text-white">$100</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 text-white/60">Baseball Pitching</td>
                      <td className="px-6 py-3 font-medium text-white">$80</td>
                      <td className="px-6 py-3 font-medium text-white">$100</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <a
                href={siteConfig.bookNowUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-8 inline-flex"
              >
                <span>Book a Lesson</span>
              </a>
            </div>

            <ImageSlideshow slides={lessonsSlides} id="lessons-slideshow" />
          </div>
        </div>
      </section>

      <section id="memberships" className="relative overflow-hidden py-20 md:py-28 section-highlight">
        <div className="absolute inset-0 bg-grid-pattern"></div>

        <div className="container-page relative z-10">
          <div className="mb-16 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
              Memberships
            </p>
            <h2 className="section-heading">
              Three Tiers. One Goal.
            </h2>
            <p className="section-subtitle mx-auto">
              Plans designed for athletes who take their development seriously. Each plan adds real value with assessments, programming, and exclusive benefits.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-8 card-hover">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-teal">Pro</p>
              <p className="mt-2 text-4xl font-bold text-white">$95<span className="text-lg text-brand-gray">/mo</span></p>
              <ul className="mt-6 space-y-3 text-sm text-white/60">
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  Assessment Sessions
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  App Access + Programming
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  10% Off Store &amp; Events
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  S&amp;C from $240/mo
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  Lessons: $75 single / $45 duo
                </li>
              </ul>
              <a href={siteConfig.bookNowUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8 w-full">
                <span>Join Pro</span>
              </a>
            </div>

            <div className="rounded-2xl border border-brand-teal/20 bg-white/[0.05] p-8 relative card-hover shadow-lg shadow-brand-teal/5">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-teal px-4 py-1 text-xs font-semibold uppercase text-white">Popular</span>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-teal">All-Access</p>
              <p className="mt-2 text-4xl font-bold text-white">$175<span className="text-lg text-brand-gray">/mo</span></p>
              <ul className="mt-6 space-y-3 text-sm text-white/60">
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  Unlimited Open Cage (+1 Guest)
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  1 Monthly HitTrax Rental
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  Open Gym (16+)
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  15% Off Store &amp; Events
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  S&amp;C from $240/mo
                </li>
              </ul>
              <a href={siteConfig.bookNowUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8 w-full">
                <span>Join All-Access</span>
              </a>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-8 card-hover">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-teal">Elite</p>
              <p className="mt-2 text-4xl font-bold text-white">$295<span className="text-lg text-brand-gray">/mo</span></p>
              <ul className="mt-6 space-y-3 text-sm text-white/60">
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  Assessment + Programming
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  Unlimited Open Cage (+1 Guest)
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  Open Gym (16+)
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  20% Off Store &amp; Events
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  S&amp;C from $200/mo
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  Lessons: $65 single / $40 duo
                </li>
              </ul>
              <a href={siteConfig.bookNowUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8 w-full">
                <span>Join Elite</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="strength" className="bg-brand-dark py-20 md:py-28">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <ImageSlideshow slides={scSlides} id="sc-slideshow" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
                Strength &amp; Conditioning
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Stronger. Faster. Unstoppable.
              </h2>
              <p className="mt-4 text-brand-gray leading-relaxed">
                Sport-specific training for baseball and softball athletes. Fewer injuries. More power.
                Led by Coach Gianmarco Marcelletti, a former college player with ISSA certifications
                and over 5 years of experience training athletes up to the MLB level.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4 text-center">
                  <p className="text-2xl font-bold text-white">3:30-5:30PM</p>
                  <p className="mt-1 text-xs text-brand-gray">Ages 7-10</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4 text-center">
                  <p className="text-2xl font-bold text-white">5:30-7:30PM</p>
                  <p className="mt-1 text-xs text-brand-gray">Ages 11-14</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4 text-center">
                  <p className="text-2xl font-bold text-white">7:30-9:30PM</p>
                  <p className="mt-1 text-xs text-brand-gray">High School</p>
                </div>
              </div>

              <div className="mt-8 overflow-hidden rounded-xl border border-white/5">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-white">Sessions</th>
                      <th className="px-4 py-3 font-semibold text-white">Members</th>
                      <th className="px-4 py-3 font-semibold text-white">Non-Members</th>
                      <th className="px-4 py-3 font-semibold text-white">Drop-In</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="px-4 py-3 text-white/60">2 Days/Week</td>
                      <td className="px-4 py-3 text-white">$240</td>
                      <td className="px-4 py-3 text-white">$280</td>
                      <td className="px-4 py-3 text-brand-teal">$50</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-white/60">3 Days/Week</td>
                      <td className="px-4 py-3 text-white">$315</td>
                      <td className="px-4 py-3 text-white">$375</td>
                      <td className="px-4 py-3 text-brand-teal">$50</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-white/60">4 Days/Week</td>
                      <td className="px-4 py-3 text-white">$375</td>
                      <td className="px-4 py-3 text-white">$435</td>
                      <td className="px-4 py-3 text-brand-teal">$50</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <a href={siteConfig.bookNowUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8 inline-flex">
                <span>Book S&amp;C</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="rentals" className="relative overflow-hidden py-20 md:py-28 section-highlight">
        <div className="absolute inset-0 bg-grid-pattern"></div>

        <div className="container-page relative z-10">
          <div className="mb-16 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
              Cage Rentals
            </p>
            <h2 className="section-heading">
              5 Indoor Cages. Unlimited Possibilities.
            </h2>
            <p className="section-subtitle mx-auto">
              6,000 sqft of indoor cage space with 5 cages available for individual, duo or team rentals. Pitching machines and equipment options available.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 mb-10">
            <div className="overflow-hidden rounded-2xl h-[600px]">
              <video
                src="https://mediumorchid-pig-468212.hostingersite.com/wp-content/uploads/2026/07/IMG_6794.mov"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <ImageSlideshow slides={rentalsSlides} id="rentals-slideshow" className="h-[600px]" />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-white/5">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-3 font-semibold text-white">What&apos;s In</th>
                    <th className="px-6 py-3 font-semibold text-white">1 Lane 45ft</th>
                    <th className="px-6 py-3 font-semibold text-white">2 Lanes 45ft</th>
                    <th className="px-6 py-3 font-semibold text-white">1 Lane 70ft</th>
                    <th className="px-6 py-3 font-semibold text-white">2 Lanes 70ft</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="px-6 py-3 text-white/60">Just the Cage</td>
                    <td className="px-6 py-3 text-white">$40</td>
                    <td className="px-6 py-3 text-white">$75</td>
                    <td className="px-6 py-3 text-white">$55</td>
                    <td className="px-6 py-3 text-white">$95</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 text-white/60">Cage + Equipment</td>
                    <td className="px-6 py-3 text-white">$45</td>
                    <td className="px-6 py-3 text-white">$80</td>
                    <td className="px-6 py-3 text-white">$60</td>
                    <td className="px-6 py-3 text-white">$100</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 text-white/60">Cage + Machine + Equipment</td>
                    <td className="px-6 py-3 text-white">$50</td>
                    <td className="px-6 py-3 text-white">$85</td>
                    <td className="px-6 py-3 text-white">$65</td>
                    <td className="px-6 py-3 text-white">$105</td>
                  </tr>
                </tbody>
              </table>
              <p className="px-6 py-3 text-xs text-brand-gray">
                Rates for 1-hour rental. Special discounts for multiple hours and long-term rentals.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-8">
              <h3 className="text-lg font-semibold text-white">Team Rental Packs</h3>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between rounded-xl border border-white/5 p-4 hover:border-brand-teal/30 transition-all">
                  <div>
                    <p className="font-semibold text-white">Mint Pack</p>
                    <p className="text-xs text-brand-gray">2 Cages &middot; 4 Hours/Month &middot; Machine Included</p>
                  </div>
                  <p className="text-xl font-bold text-brand-teal">$275</p>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/5 p-4 hover:border-brand-teal/30 transition-all">
                  <div>
                    <p className="font-semibold text-white">Gold Pack</p>
                    <p className="text-xs text-brand-gray">2 Cages &middot; 8 Hours/Month &middot; Machine Included</p>
                  </div>
                  <p className="text-xl font-bold text-brand-teal">$475</p>
                </div>
              </div>
              <a href={siteConfig.bookNowUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 w-full">
                <span>Book Now</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="coaches" className="bg-brand-black py-20 md:py-28">
        <div className="container-page">
          <div className="mb-16 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
              Coaching Staff
            </p>
            <h2 className="section-heading">
              Meet the Team
            </h2>
            <p className="section-subtitle mx-auto">
              Former professional players with Division 1 experience and years coaching young athletes.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coaches.map((coach, i) => (
              <CoachCard key={coach.name} coach={coach} index={i} onSelect={setSelectedCoach} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner />

      <CoachModal coach={selectedCoach} onClose={closeModal} />
    </>
  );
}
