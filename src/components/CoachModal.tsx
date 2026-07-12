"use client";

import { useEffect } from "react";
import type { Coach } from "@/data/coaches";

interface Props {
  coach: Coach | null;
  onClose: () => void;
}

export default function CoachModal({ coach, onClose }: Props) {
  useEffect(() => {
    if (!coach) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [coach, onClose]);

  if (!coach) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 opacity-100"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
      <div
        className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl transform scale-100 transition-transform duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {coach.image && (
          <div className="relative overflow-hidden rounded-xl mb-5 aspect-[4/5]">
            <img
              src={coach.image}
              alt={coach.name}
              className="h-full w-full object-cover"
              style={coach.objectPosition ? { objectPosition: coach.objectPosition } : undefined}
            />
          </div>
        )}
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal mb-1">{coach.role}</p>
        <h2 className="text-2xl font-bold text-white mb-3">{coach.name}</h2>
        <p className="text-sm text-brand-gray leading-relaxed mb-4">{coach.bio}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {coach.specialties.split(", ").map((s) => (
            <span
              key={s}
              className="rounded-full border border-brand-teal/20 bg-brand-teal/5 px-2.5 py-0.5 text-[11px] text-brand-teal"
            >
              {s}
            </span>
          ))}
        </div>
        {coach.quote && (
          <div className="border-l-2 border-brand-teal pl-4 mb-4">
            <p className="text-sm italic text-white/70">&ldquo;{coach.quote}&rdquo;</p>
          </div>
        )}
        {coach.instagram && (
          <a
            href={`https://instagram.com/${coach.instagram.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            {coach.instagram}
          </a>
        )}
      </div>
    </div>
  );
}
