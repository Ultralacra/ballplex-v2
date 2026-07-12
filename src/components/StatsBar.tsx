"use client";

import { useEffect, useRef } from "react";
import { stats } from "@/data/site";
import { useCountUp } from "@/hooks/useCountUp";

export default function StatsBar() {
  useCountUp();

  return (
    <section id="stats-section" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-grid-pattern"></div>
      <div className="absolute -top-40 right-0 h-60 w-60 rounded-full bg-brand-teal/10 blur-3xl"></div>
      <div className="absolute -bottom-40 left-0 h-60 w-60 rounded-full bg-brand-teal/5 blur-3xl"></div>

      <div className="container-page relative z-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {stats.map((stat, i) => {
            const num = parseInt(stat.value.replace(/\D/g, ""), 10);
            const suffix = stat.value.includes("+") ? "+" : "";
            return (
              <div key={stat.label} className="text-center" data-reveal data-delay={String(i * 100)}>
                <p className="text-5xl font-extrabold text-brand-teal md:text-6xl lg:text-7xl">
                  <span data-counter={String(num)} data-suffix={suffix}>{stat.value}</span>
                </p>
                <p className="mt-3 text-sm font-medium uppercase tracking-wider text-brand-muted">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
