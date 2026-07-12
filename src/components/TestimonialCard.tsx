import type { Testimonial } from "@/data/testimonials";

interface Props {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: Props) {
  return (
    <blockquote className="card-hover group rounded-2xl border border-white/5 bg-white/[0.03] p-8 transition-all duration-500 hover:border-brand-teal/20 hover:shadow-xl hover:shadow-brand-teal/5">
      <div className="mb-5 flex gap-1">
        {Array.from({ length: testimonial.stars }, (_, i) => (
          <svg key={i} className="h-5 w-5 text-brand-teal" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-base leading-relaxed text-white/60 italic transition-colors duration-300 group-hover:text-white/80">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <footer className="mt-6 border-t border-white/5 pt-5">
        <p className="text-sm font-semibold text-white">{testimonial.name}</p>
        <p className="text-xs text-brand-gray">{testimonial.relation}</p>
      </footer>
    </blockquote>
  );
}
