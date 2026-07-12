"use client";

import { useEffect } from "react";

export function useCountUp() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll("[data-counter]");
            counters.forEach((counter) => {
              const el = counter as HTMLElement;
              const target = parseInt(el.dataset.counter || "0", 10);
              const suffix = el.dataset.suffix || "";
              const duration = 2000;
              const start = performance.now();

              function update(now: number) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(eased * target);
                el.textContent = current + suffix;
                if (progress < 1) {
                  requestAnimationFrame(update);
                }
              }

              requestAnimationFrame(update);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    const counterSection = document.getElementById("stats-section");
    if (counterSection) observer.observe(counterSection);

    return () => observer.disconnect();
  }, []);
}
