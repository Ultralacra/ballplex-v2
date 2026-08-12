"use client";

import { useState, useCallback, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import CTABanner from "@/components/CTABanner";
import CoachCard from "@/components/CoachCard";
import CoachModal from "@/components/CoachModal";
import ImageSlideshow from "@/components/ImageSlideshow";
import { coaches as fallbackCoaches } from "@/data/coaches";
import { siteConfig } from "@/data/site";
import type { Coach } from "@/data/coaches";

const lessonsSlides = [
  {
    src: "/images-lessons/d577b0a5-d7c6-4fd8-a896-b72b3d522a96 2.JPG.jpeg",
    alt: "Training",
  },
  { src: "/images-lessons/DSC00748.JPG.jpeg", alt: "Training" },
  { src: "/images-lessons/DSC00828.JPG.jpeg", alt: "Training" },
];

const scSlides = [
  { src: "/SC/IMG_4119 2.jpg", alt: "Strength & Conditioning" },
  { src: "/SC/IMG_5973.jpg", alt: "Strength & Conditioning" },
];

const rentalsSlides = [
  { src: "/rentals/IMG_5967.jpg.jpeg", alt: "Cage Rental" },
  {
    src: "/rentals/e13429f3-b13b-4bc5-a54a-6173978d8248.JPG.jpeg",
    alt: "Cage Rental",
  },
];

const productionDefaults = {
  hero: {
    location: "Services",
    tagline: "Built for Athletes Development",
    description:
      "Technology to Track Your Progress, two Facilities and an Elite Coaching Team.",
  },
  lessons: {
    eyebrow: "Private Lessons",
    title: "1-on-1 & Duo Instruction",
    description:
      "Whether your goal is to make the team, earn a starting spot, or get recruited by top college programs, our coaches are here to help you get there. HitTrax and Rapsodo technology are available for detailed performance tracking.",
    features: [
      {
        name: "Hitting",
        description: "Swing mechanics, approach, Rapsodo data",
      },
      {
        name: "Pitching",
        description: "Mechanics, velocity, arm care, pitch design",
      },
      {
        name: "Catching",
        description: "Receiving, blocking, throwing, game IQ",
      },
      { name: "Fielding", description: "Footwork, glove work, arm strength" },
    ],
    rapsodo: {
      title: "Rapsodo Pro 2.0 - Powered by Data",
      description:
        "See what the numbers say. Rapsodo Pro 2.0 provides detailed hitting and pitching metrics that help our certified coaches identify strengths, areas for improvement, and build a plan based on objective data. Book your session today.",
    },
    plans: [
      {
        name: "Hitting / Fielding / Catching",
        privatePrice: "$80",
        duoPrice: "$100",
      },
      { name: "Softball Pitching", privatePrice: "$80", duoPrice: "$100" },
      { name: "Baseball Pitching", privatePrice: "$80", duoPrice: "$100" },
    ],
  },
  memberships: {
    eyebrow: "Memberships",
    title: "Three Tiers. One Goal.",
    description:
      "Plans designed for athletes who take their development seriously. Each plan adds real value with assessments, programming, and exclusive benefits.",
    highlightedIndex: 1,
    plans: [
      {
        name: "Pro",
        price: "$95",
        duration: "/mo",
        benefits: [
          "Assessment Sessions",
          "App Access + Programming",
          "10% Off Store & Events",
          "S&C from $240/mo",
          "Lessons: $75 single / $45 duo",
        ],
      },
      {
        name: "All-Access",
        price: "$175",
        duration: "/mo",
        benefits: [
          "Unlimited Open Cage (+1 Guest)",
          "1 Monthly HitTrax Rental",
          "Open Gym (16+)",
          "15% Off Store & Events",
          "S&C from $240/mo",
        ],
      },
      {
        name: "Elite",
        price: "$295",
        duration: "/mo",
        benefits: [
          "Assessment + Programming",
          "Unlimited Open Cage (+1 Guest)",
          "Open Gym (16+)",
          "20% Off Store & Events",
          "S&C from $200/mo",
          "Lessons: $65 single / $40 duo",
        ],
      },
    ],
  },
  strength: {
    eyebrow: "Strength & Conditioning",
    title: "Stronger. Faster. Unstoppable.",
    description:
      "Sport-specific training for baseball and softball athletes. Fewer injuries. More power. Led by Coach Gianmarco Marcelletti, a former college player with ISSA certifications and over 5 years of experience training athletes up to the MLB level.",
    schedule: [
      { day: "3:30-5:30PM", time: "Ages 7-10" },
      { day: "5:30-7:30PM", time: "Ages 11-14" },
      { day: "7:30-9:30PM", time: "High School" },
    ],
    plans: [
      {
        name: "2 Days/Week",
        memberPrice: "$240",
        nonMemberPrice: "$280",
        dropInPrice: "$50",
      },
      {
        name: "3 Days/Week",
        memberPrice: "$315",
        nonMemberPrice: "$375",
        dropInPrice: "$50",
      },
      {
        name: "4 Days/Week",
        memberPrice: "$375",
        nonMemberPrice: "$435",
        dropInPrice: "$50",
      },
    ],
  },
  rentals: {
    eyebrow: "Cage Rentals",
    title: "5 Indoor Cages. Unlimited Possibilities.",
    description:
      "6,000 sqft of indoor cage space with 5 cages available for individual, duo or team rentals. Pitching machines and equipment options available.",
    note: "Rates for 1-hour rental. Special discounts for multiple hours and long-term rentals.",
    rates: [
      {
        name: "Just the Cage",
        lane45: "$40",
        lanes45: "$75",
        lane70: "$55",
        lanes70: "$95",
      },
      {
        name: "Cage + Equipment",
        lane45: "$45",
        lanes45: "$80",
        lane70: "$60",
        lanes70: "$100",
      },
      {
        name: "Cage + Machine + Equipment",
        lane45: "$50",
        lanes45: "$85",
        lane70: "$65",
        lanes70: "$105",
      },
    ],
    teamPacks: [
      {
        name: "Mint Pack",
        description: "2 Cages - 4 Hours/Month - Machine Included",
        price: "$275",
      },
      {
        name: "Gold Pack",
        description: "2 Cages - 8 Hours/Month - Machine Included",
        price: "$475",
      },
    ],
  },
  coaches: {
    eyebrow: "Coaching Staff",
    title: "Meet the Team",
    subtitle:
      "Former professional players with Division 1 experience and years coaching young athletes.",
  },
};

async function loadSections() {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("page_sections")
      .select("*")
      .eq("page_slug", "programs")
      .eq("is_visible", true)
      .order("order_index");
    return data || [];
  } catch {
    return [];
  }
}

async function loadCoaches() {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("coaches")
      .select("*")
      .order("order_index");
    if (!data?.length) return fallbackCoaches;

    return data.map((coach: any) => {
      const fallback = fallbackCoaches.find(
        (item) => item.name.trim() === coach.name?.trim(),
      );
      return fallback && (!coach.bio || coach.bio.length < fallback.bio.length)
        ? { ...fallback, ...coach, bio: fallback.bio }
        : coach;
    });
  } catch {
    return fallbackCoaches;
  }
}

export default function ProgramsPage() {
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const closeModal = useCallback(() => setSelectedCoach(null), []);

  const [sections, setSections] = useState<any[]>([]);
  const [coachesList, setCoachesList] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([loadSections(), loadCoaches()]).then(([secs, cos]) => {
      setSections(secs);
      setCoachesList(cos);
    });
  }, []);

  const getSection = (type: string) =>
    sections.find((s: any) => s.type === type);
  const getPricingSection = (anchor: string, legacyLabel: string) =>
    sections.find(
      (s: any) =>
        s.type === "pricing_table" &&
        (s.props?.anchor === anchor ||
          s.label?.toLowerCase().includes(legacyLabel.toLowerCase())),
    )?.props || {};
  const getScheduleSection = (anchor: string) =>
    sections.find(
      (s: any) => s.type === "schedule_table" && s.props?.anchor === anchor,
    )?.props || {};
  const coaches = coachesList.length > 0 ? coachesList : fallbackCoaches;
  const hero = getSection("hero")?.props || {};
  const lessons =
    getPricingSection("lessons", "private") ||
    getSection("pricing_table")?.props ||
    {};
  const memberships = getPricingSection("memberships", "membership");
  const strength = getPricingSection("strength", "strength");
  const strengthSchedule =
    getScheduleSection("strength") || getSection("schedule_table")?.props || {};
  const rentals = getPricingSection("rentals", "cage");
  const coachesSection = getSection("coaches_grid")?.props || {};
  const cta = getSection("cta_banner")?.props || {};
  const activeLessons = (lessons as any).anchor === "lessons" ? lessons : {};
  const activeMemberships =
    (memberships as any).anchor === "memberships" ? memberships : {};
  const activeStrength =
    (strength as any).anchor === "strength" ? strength : {};
  const activeRentals = (rentals as any).anchor === "rentals" ? rentals : {};
  const heroContent = {
    ...productionDefaults.hero,
    ...hero,
    description: (hero as any).description?.includes("two Facilities")
      ? (hero as any).description
      : productionDefaults.hero.description,
  };
  const lessonsContent = { ...productionDefaults.lessons, ...activeLessons };
  const lessonsFeatures = Array.isArray((activeLessons as any).features)
    ? (activeLessons as any).features
    : productionDefaults.lessons.features;
  const lessonPlans =
    Array.isArray((activeLessons as any).plans) &&
    (activeLessons as any).plans.every(
      (plan: any) => plan.privatePrice && plan.duoPrice,
    )
      ? (activeLessons as any).plans
      : productionDefaults.lessons.plans;
  const rapsodo = {
    ...productionDefaults.lessons.rapsodo,
    ...(activeLessons as any).rapsodo,
  };
  const membershipsContent = {
    ...productionDefaults.memberships,
    ...activeMemberships,
  };
  const membershipPlans =
    Array.isArray((activeMemberships as any).plans) &&
    (activeMemberships as any).plans.every((plan: any) =>
      Array.isArray(plan.benefits),
    )
      ? (activeMemberships as any).plans
      : productionDefaults.memberships.plans;
  const strengthContent = { ...productionDefaults.strength, ...activeStrength };
  const strengthPlans =
    Array.isArray((activeStrength as any).plans) &&
    (activeStrength as any).plans.every(
      (plan: any) => plan.memberPrice && plan.nonMemberPrice,
    )
      ? (activeStrength as any).plans
      : productionDefaults.strength.plans;
  const strengthScheduleItems =
    Array.isArray((strengthSchedule as any).items) &&
    (strengthSchedule as any).items.length > 0
      ? (strengthSchedule as any).items
      : productionDefaults.strength.schedule;
  const rentalsContent = { ...productionDefaults.rentals, ...activeRentals };
  const rentalRates = Array.isArray((activeRentals as any).rates)
    ? (activeRentals as any).rates
    : productionDefaults.rentals.rates;
  const rentalTeamPacks = Array.isArray((activeRentals as any).teamPacks)
    ? (activeRentals as any).teamPacks
    : productionDefaults.rentals.teamPacks;
  const coachesContent = { ...productionDefaults.coaches, ...coachesSection };

  return (
    <>
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container-page">
          <div className="text-center" data-reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
              {(heroContent as any).location}
            </p>
            <h1 className="section-heading">{(heroContent as any).tagline}</h1>
            <p className="section-subtitle mx-auto">
              {(heroContent as any).description}
            </p>
          </div>
        </div>
      </section>

      <section id="lessons" className="bg-brand-dark py-20 md:py-28">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
                {(lessonsContent as any).eyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                {(lessonsContent as any).title}
              </h2>
              <p className="mt-4 text-brand-gray leading-relaxed">
                {(lessonsContent as any).description}
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {lessonsFeatures.map((feature: any) => (
                  <div
                    key={feature.name}
                    className="rounded-xl border border-white/5 bg-white/[0.03] p-4"
                  >
                    <h4 className="font-semibold text-white">{feature.name}</h4>
                    <p className="mt-1 text-sm text-brand-gray">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8 border-l-2 border-brand-teal pl-5">
                <h3 className="text-lg font-semibold text-white">
                  {rapsodo.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-gray">
                  {rapsodo.description}
                </p>
              </div>
              <div className="mt-8 overflow-hidden rounded-xl border border-white/5">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-white">
                        Type
                      </th>
                      <th className="px-4 py-3 font-semibold text-white">
                        1H Private
                      </th>
                      <th className="px-4 py-3 font-semibold text-white">
                        1H Duo
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {lessonPlans.map((plan: any) => (
                      <tr key={plan.name}>
                        <td className="px-4 py-3 text-white/70">{plan.name}</td>
                        <td className="px-4 py-3 text-white">
                          {plan.privatePrice}
                        </td>
                        <td className="px-4 py-3 text-brand-teal">
                          {plan.duoPrice}
                        </td>
                      </tr>
                    ))}
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

      <section
        id="memberships"
        className="relative overflow-hidden py-20 md:py-28 section-highlight"
      >
        <div className="absolute inset-0 bg-grid-pattern"></div>
        <div className="container-page relative z-10">
          <div className="mb-16 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
              {(membershipsContent as any).eyebrow}
            </p>
            <h2 className="section-heading">
              {(membershipsContent as any).title}
            </h2>
            <p className="section-subtitle mx-auto">
              {(membershipsContent as any).description}
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {membershipPlans.map((plan: any, index: number) => (
              <div
                key={plan.name}
                className={`rounded-2xl border ${plan.popular || index === ((membershipsContent as any).highlighted_index ?? (membershipsContent as any).highlightedIndex) ? "border-brand-teal/20 bg-white/[0.05] shadow-lg shadow-brand-teal/5 relative" : "border-white/5 bg-white/[0.03]"} p-8 card-hover`}
              >
                {(plan.popular ||
                  index ===
                    ((membershipsContent as any).highlighted_index ??
                      (membershipsContent as any).highlightedIndex)) && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-teal px-4 py-1 text-xs font-semibold uppercase text-white">
                    Popular
                  </span>
                )}
                <p className="text-sm font-semibold uppercase tracking-wider text-brand-teal">
                  {plan.name}
                </p>
                <p className="mt-2 text-4xl font-bold text-white">
                  {plan.price}
                  <span className="text-lg text-brand-gray">
                    {plan.duration || "/mo"}
                  </span>
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/60">
                  {plan.benefits.map((benefit: string) => (
                    <li key={benefit} className="flex gap-2">
                      <span className="text-brand-teal">-</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={siteConfig.bookNowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-8 w-full"
                >
                  <span>Join {plan.name}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="strength" className="bg-brand-dark py-20 md:py-28">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <ImageSlideshow slides={scSlides} id="sc-slideshow" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
                {(strengthContent as any).eyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                {(strengthContent as any).title}
              </h2>
              <p className="mt-4 text-brand-gray leading-relaxed">
                {(strengthContent as any).description}
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {strengthScheduleItems.map((item: any) => (
                  <div
                    key={item.day}
                    className="rounded-xl border border-white/5 bg-white/[0.03] p-4 text-center"
                  >
                    <p className="font-semibold text-white">{item.day}</p>
                    <p className="mt-1 text-sm text-brand-teal">{item.time}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 overflow-hidden rounded-xl border border-white/5">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-white">
                        Sessions
                      </th>
                      <th className="px-4 py-3 font-semibold text-white">
                        Members
                      </th>
                      <th className="px-4 py-3 font-semibold text-white">
                        Non-Members
                      </th>
                      <th className="px-4 py-3 font-semibold text-white">
                        Drop-In
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {strengthPlans.map((plan: any) => (
                      <tr key={plan.name}>
                        <td className="px-4 py-3 text-white/60">{plan.name}</td>
                        <td className="px-4 py-3 text-white">
                          {plan.memberPrice}
                        </td>
                        <td className="px-4 py-3 text-white">
                          {plan.nonMemberPrice}
                        </td>
                        <td className="px-4 py-3 text-brand-teal">
                          {plan.dropInPrice}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <a
                href={siteConfig.bookNowUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-8 inline-flex"
              >
                <span>Book S&amp;C</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="rentals"
        className="relative overflow-hidden py-20 md:py-28 section-highlight"
      >
        <div className="absolute inset-0 bg-grid-pattern"></div>
        <div className="container-page relative z-10">
          <div className="mb-16 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
              {(rentalsContent as any).eyebrow}
            </p>
            <h2 className="section-heading">{(rentalsContent as any).title}</h2>
            <p className="section-subtitle mx-auto">
              {(rentalsContent as any).description}
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
            <ImageSlideshow
              slides={rentalsSlides}
              id="rentals-slideshow"
              className="h-[600px]"
            />
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-white/5">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-3 font-semibold text-white">
                      What&apos;s In
                    </th>
                    <th className="px-6 py-3 font-semibold text-white">
                      1 Lane 45ft
                    </th>
                    <th className="px-6 py-3 font-semibold text-white">
                      2 Lanes 45ft
                    </th>
                    <th className="px-6 py-3 font-semibold text-white">
                      1 Lane 70ft
                    </th>
                    <th className="px-6 py-3 font-semibold text-white">
                      2 Lanes 70ft
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {rentalRates.map((rate: any) => (
                    <tr key={rate.name}>
                      <td className="px-6 py-3 text-white/60">{rate.name}</td>
                      <td className="px-6 py-3 text-white">{rate.lane45}</td>
                      <td className="px-6 py-3 text-white">{rate.lanes45}</td>
                      <td className="px-6 py-3 text-white">{rate.lane70}</td>
                      <td className="px-6 py-3 text-white">{rate.lanes70}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="border-t border-white/5 px-6 py-3 text-sm text-brand-gray">
                {(rentalsContent as any).note}
              </p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-8">
              <h3 className="text-lg font-semibold text-white">
                Team Rental Packs
              </h3>
              <div className="mt-6 space-y-4">
                {rentalTeamPacks.map((pack: any) => (
                  <div
                    key={pack.name}
                    className="flex items-center justify-between rounded-xl border border-white/5 p-4 hover:border-brand-teal/30 transition-all"
                  >
                    <div>
                      <p className="font-semibold text-white">{pack.name}</p>
                      <p className="text-xs text-brand-gray">
                        {pack.description}
                      </p>
                    </div>
                    <p className="text-xl font-bold text-brand-teal">
                      {pack.price}
                    </p>
                  </div>
                ))}
              </div>
              <a
                href={siteConfig.bookNowUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6 w-full"
              >
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
              {(coachesContent as any).eyebrow}
            </p>
            <h2 className="section-heading">{(coachesContent as any).title}</h2>
            <p className="section-subtitle mx-auto">
              {(coachesContent as any).subtitle}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coaches.map((coach: any, i: number) => (
              <CoachCard
                key={coach.name || coach.id || i}
                coach={coach}
                index={i}
                onSelect={setSelectedCoach as any}
              />
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title={(cta as any).title}
        description={(cta as any).description}
        primaryCTA={(cta as any).primaryCTA}
        secondaryCTA={(cta as any).secondaryCTA}
      />

      <CoachModal coach={selectedCoach} onClose={closeModal} />
    </>
  );
}
