"use client";

import { useState, useEffect, useCallback } from "react";

interface Slide {
  src: string;
  alt: string;
}

interface Props {
  slides: Slide[];
  id: string;
  className?: string;
}

export default function ImageSlideshow({ slides, id, className = "" }: Props) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <div className={`relative overflow-hidden rounded-2xl h-full self-stretch group/slide ${className}`} id={id}>
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === current ? "opacity-100" : "opacity-0"}`}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      ))}
      <button
        onClick={prev}
        className="slide-prev absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white opacity-0 group-hover/slide:opacity-100 transition-opacity hover:bg-white/20"
        aria-label="Previous"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        onClick={next}
        className="slide-next absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white opacity-0 group-hover/slide:opacity-100 transition-opacity hover:bg-white/20"
        aria-label="Next"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}
