"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useParallax } from "@/hooks/useParallax";

export default function AnimationProvider({ children }: { children: React.ReactNode }) {
  useScrollReveal();
  useParallax();

  return <>{children}</>;
}
