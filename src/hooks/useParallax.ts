"use client";

import { useEffect } from "react";

export function useParallax() {
  useEffect(() => {
    const heroBg = document.getElementById("hero-bg");
    if (!heroBg) return;

    const onScroll = () => {
      const scroll = window.scrollY;
      if (scroll < window.innerHeight) {
        heroBg.style.transform = `translateY(${scroll * 0.4}px)`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}
