import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icons";
import type { Solution } from "@/content/solutions";

/** Card de frente de solução (fundo escuro). O card inteiro é o link. */
export function SolutionCard({ s }: { s: Solution }) {
  return (
    <Link
      href={`/solucoes/${s.slug}`}
      className="group relative flex h-full flex-col rounded-card border border-amber-line bg-amber-900/70 p-7 transition-[border-color,background-color,transform] duration-500 ease-spac hover:-translate-y-1 hover:border-gold hover:bg-amber-800 md:p-9"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="t-kicker text-champagne">{s.index}</span>
        <span className="t-kicker text-gray-500" title={s.cycleNote}>
          {s.letters}
        </span>
      </div>
      <h3 className="mt-10 text-[clamp(2rem,1.6rem+1.4vw,2.75rem)] leading-none font-extrabold tracking-[-0.03em] text-white">
        {s.name}
      </h3>
      <p className="mt-5 text-[1.0625rem] leading-relaxed text-gray-200">{s.tagline}</p>

      <ul className="mt-8 border-t border-amber-line">
        {s.services.map((sv) => (
          <li
            key={sv.name}
            className="border-b border-amber-line py-3 text-[0.9375rem] text-gray-300 transition-colors duration-300 group-hover:text-gray-200"
          >
            {sv.name}
          </li>
        ))}
      </ul>

      <p className="mt-8 text-sm text-gray-500">
        <span className="font-extrabold text-gray-300">Indicado para: </span>
        {s.bestFor}
      </p>

      <span className="mt-auto inline-flex items-center gap-2 pt-8 font-extrabold text-champagne">
        Explorar {s.name}
        <ArrowRight size={18} className="transition-transform duration-500 ease-spac group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
