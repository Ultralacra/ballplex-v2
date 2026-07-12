import type { Program } from "@/data/programs";

interface Props {
  program: Program;
}

export default function ProgramCard({ program }: Props) {
  return (
    <a
      href={program.link}
      className="card-hover glow-on-hover group flex flex-col rounded-2xl border border-white/5 bg-white/[0.03] p-8 hover:border-white/10"
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-teal/10 text-brand-teal transition-all duration-500 group-hover:bg-brand-teal group-hover:text-white group-hover:scale-110">
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-white transition-colors duration-300 group-hover:text-brand-teal">
        {program.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-gray">
        {program.description}
      </p>
      <div className="mt-6 flex items-center justify-between">
        {program.pricing ? (
          <span className="text-sm font-bold uppercase tracking-wider text-brand-teal">
            {program.pricing}
          </span>
        ) : (
          <span />
        )}
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-300 group-hover:border-brand-teal group-hover:bg-brand-teal group-hover:text-white">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </div>
    </a>
  );
}
