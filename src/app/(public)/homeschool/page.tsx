"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import CTABanner from "@/components/CTABanner";
import { siteConfig } from "@/data/site";

type HomeschoolForm = {
  athleteFullName: string;
  parentFullName: string;
  email: string;
  phone: string;
  athleteGender: string;
  sport: string;
  gradYear: string;
  interestedIn: string;
  gpa: string;
  currentTeam: string;
  primaryFieldingPosition: string;
};

const initialForm: HomeschoolForm = {
  athleteFullName: "",
  parentFullName: "",
  email: "",
  phone: "",
  athleteGender: "",
  sport: "",
  gradYear: "",
  interestedIn: "",
  gpa: "",
  currentTeam: "",
  primaryFieldingPosition: "",
};

async function loadSections() {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("page_sections")
      .select("*")
      .eq("page_slug", "homeschool")
      .eq("is_visible", true)
      .order("order_index");
    return data || [];
  } catch {
    return [];
  }
}

export default function HomeschoolPage() {
  const [sections, setSections] = useState<any[]>([]);
  const [form, setForm] = useState<HomeschoolForm>(initialForm);
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    loadSections().then(setSections);
  }, []);

  const getSection = (type: string) =>
    sections.find((s: any) => s.type === type)?.props || {};
  const hero = getSection("homeschool_hero");
  const academics = getSection("homeschool_academics");
  const stats = getSection("stats");
  const cta = getSection("cta_banner");
  const academicFeatures = Array.isArray((academics as any).features)
    ? (academics as any).features
    : [];

  const updateForm = (field: keyof HomeschoolForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("submitting");
    setFormMessage("");

    try {
      const response = await fetch("/api/homeschool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Unable to send your information.");
      setForm(initialForm);
      setFormStatus("success");
      setFormMessage(
        "Thank you. We received your pre-registration information.",
      );
    } catch (error) {
      setFormStatus("error");
      setFormMessage(
        error instanceof Error
          ? error.message
          : "Unable to send your information.",
      );
    }
  };

  return (
    <>
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container-page">
          <div className="text-center" data-reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
              {(hero as any).subtitle || "Homeschool Program"}
            </p>
            <h1 className="section-heading">
              {(hero as any).title || "Built for Advanced Athletes"}
            </h1>
            <p className="section-subtitle mx-auto">
              {(hero as any).description ||
                "A complete academic and athletic program for competitive baseball and softball student-athletes."}
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
                {(academics as any).title ||
                  "Academics + Athletics. Every Day."}
              </h2>
              <p className="mt-4 text-brand-gray leading-relaxed">
                {(academics as any).description ||
                  "The Ballplex Homeschool Program is designed for competitive baseball and softball student-athletes."}
              </p>
              {academicFeatures.length > 0 && (
                <ul className="mt-6 space-y-2 text-sm text-brand-gray">
                  {academicFeatures.map((feature: string) => (
                    <li key={feature} className="flex gap-2">
                      <span className="text-brand-teal">+</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-8">
              <h3 className="text-lg font-semibold text-white">
                Daily Schedule
              </h3>
              <p className="mt-1 text-sm text-brand-gray">
                Monday &ndash; Thursday, aligned with Brevard County school
                calendar
              </p>
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-teal/10 text-brand-teal font-bold text-sm">
                    8AM
                  </div>
                  <div>
                    <p className="font-semibold text-white">Academics</p>
                    <p className="text-sm text-brand-gray">
                      Powered by Edmentum. Certified educators monitor progress.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-teal/10 text-brand-teal font-bold text-sm">
                    11AM
                  </div>
                  <div>
                    <p className="font-semibold text-white">Training</p>
                    <p className="text-sm text-brand-gray">
                      Hitting, defense, pitching, and strength &amp;
                      conditioning until 3PM.
                    </p>
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
            {(
              (stats as any).stats || [
                { value: "10,500", label: "sqft Facility" },
                { value: "12", label: "Pro Coaches" },
                { value: "4", label: "Days/Week" },
                { value: "6th+", label: "Grade Entry" },
              ]
            ).map((s: any) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 text-center glow-on-hover"
              >
                <p className="text-3xl font-bold text-white">{s.value}</p>
                <p className="mt-1 text-sm text-brand-gray">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-dark py-20 md:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-center text-3xl font-bold tracking-tight text-white">
              Pre-Register for 2027-2028
            </h2>
            <p className="mt-4 text-center text-brand-gray">
              Spots are limited to ensure a focused and high-quality training
              environment.
            </p>
            <form
              className="mt-8 rounded-2xl border border-white/5 bg-white/[0.03] p-8"
              onSubmit={submitForm}
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="athleteFullName"
                    className="mb-2 block text-sm font-medium text-white/60"
                  >
                    Athlete Full Name
                  </label>
                  <input
                    type="text"
                    id="athleteFullName"
                    name="athleteFullName"
                    required
                    value={form.athleteFullName}
                    onChange={(event) =>
                      updateForm("athleteFullName", event.target.value)
                    }
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
                    placeholder="Athlete name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="parentFullName"
                    className="mb-2 block text-sm font-medium text-white/60"
                  >
                    Parent Full Name
                  </label>
                  <input
                    type="text"
                    id="parentFullName"
                    name="parentFullName"
                    required
                    value={form.parentFullName}
                    onChange={(event) =>
                      updateForm("parentFullName", event.target.value)
                    }
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
                    placeholder="Parent name"
                  />
                </div>
              </div>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-white/60"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={(event) =>
                      updateForm("email", event.target.value)
                    }
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-white/60"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={(event) =>
                      updateForm("phone", event.target.value)
                    }
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
                    placeholder="(321) 555-0000"
                  />
                </div>
              </div>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="athleteGender"
                    className="mb-2 block text-sm font-medium text-white/60"
                  >
                    Athlete Gender
                  </label>
                  <select
                    id="athleteGender"
                    name="athleteGender"
                    value={form.athleteGender}
                    onChange={(event) =>
                      updateForm("athleteGender", event.target.value)
                    }
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/60 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="sport"
                    className="mb-2 block text-sm font-medium text-white/60"
                  >
                    Sport
                  </label>
                  <select
                    id="sport"
                    name="sport"
                    required
                    value={form.sport}
                    onChange={(event) =>
                      updateForm("sport", event.target.value)
                    }
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/60 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
                  >
                    <option value="">Select</option>
                    <option value="Softball">Softball</option>
                    <option value="Baseball">Baseball</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="gradYear"
                    className="mb-2 block text-sm font-medium text-white/60"
                  >
                    Grad Year
                  </label>
                  <input
                    type="number"
                    id="gradYear"
                    name="gradYear"
                    min="2027"
                    max="2040"
                    value={form.gradYear}
                    onChange={(event) =>
                      updateForm("gradYear", event.target.value)
                    }
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
                    placeholder="2030"
                  />
                </div>
                <div>
                  <label
                    htmlFor="interestedIn"
                    className="mb-2 block text-sm font-medium text-white/60"
                  >
                    Interested in
                  </label>
                  <select
                    id="interestedIn"
                    name="interestedIn"
                    required
                    value={form.interestedIn}
                    onChange={(event) =>
                      updateForm("interestedIn", event.target.value)
                    }
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/60 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
                  >
                    <option value="">Select</option>
                    <option value="Training + Academics">
                      Training + Academics
                    </option>
                    <option value="Training only">Training only</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="gpa"
                    className="mb-2 block text-sm font-medium text-white/60"
                  >
                    GPA
                  </label>
                  <input
                    type="text"
                    id="gpa"
                    name="gpa"
                    value={form.gpa}
                    onChange={(event) => updateForm("gpa", event.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
                    placeholder="3.5"
                  />
                </div>
                <div>
                  <label
                    htmlFor="currentTeam"
                    className="mb-2 block text-sm font-medium text-white/60"
                  >
                    Current team
                  </label>
                  <input
                    type="text"
                    id="currentTeam"
                    name="currentTeam"
                    value={form.currentTeam}
                    onChange={(event) =>
                      updateForm("currentTeam", event.target.value)
                    }
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
                    placeholder="Team name"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label
                  htmlFor="primaryFieldingPosition"
                  className="mb-2 block text-sm font-medium text-white/60"
                >
                  Primary fielding position
                </label>
                <input
                  type="text"
                  id="primaryFieldingPosition"
                  name="primaryFieldingPosition"
                  value={form.primaryFieldingPosition}
                  onChange={(event) =>
                    updateForm("primaryFieldingPosition", event.target.value)
                  }
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
                  placeholder="Shortstop, pitcher, catcher..."
                />
              </div>
              {formMessage && (
                <p
                  className={`mt-6 text-sm ${formStatus === "error" ? "text-red-300" : "text-brand-teal"}`}
                  role="status"
                >
                  {formMessage}
                </p>
              )}
              <button
                type="submit"
                className="btn-primary mt-8 w-full"
                disabled={formStatus === "submitting"}
              >
                <span>
                  {formStatus === "submitting" ? "Sending..." : "Send"}
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <CTABanner
        title={(cta as any).title}
        description={(cta as any).description}
        primaryCTA={(cta as any).primaryCTA}
        secondaryCTA={(cta as any).secondaryCTA}
      />
    </>
  );
}
