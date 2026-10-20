import Link from "next/link";
import { TrajectoryArt } from "@/components/graphics/TrajectoryArt";
import { ArrowUpRight } from "@/components/ui/Icons";
import type { CaseStudy } from "@/content/cases";

/** Card de case: arte de capa + cliente/setor + título-conclusão + métrica principal. */
export function CaseCard({
  item,
  size = "default",
}: {
  item: CaseStudy;
  size?: "default" | "feature" | "wide";
}) {
  const feature = size !== "default";
  const aspect =
    size === "wide"
      ? "aspect-[4/3] md:aspect-[21/8]"
      : size === "feature"
        ? "aspect-[4/3] lg:absolute lg:inset-0 lg:aspect-auto"
        : "aspect-[16/9]";
  return (
    <Link
      href={`/cases/${item.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-gray-200 bg-white transition-colors duration-500 ease-spac hover:border-gold"
    >
      {/* No destaque (desktop), a arte ocupa a altura que sobra, acompanhando a coluna ao lado. */}
      <div className={`relative overflow-hidden ${size === "feature" ? "lg:min-h-[22rem] lg:flex-1" : ""}`}>
        <TrajectoryArt
          seed={item.artSeed}
          className={`transition-transform duration-[1.2s] ease-spac group-hover:scale-[1.04] ${aspect}`}
        />
        <div className="absolute inset-x-0 top-0 flex flex-wrap items-center gap-2 p-5 md:p-6">
          <span className="rounded-[3px] bg-ink/55 px-2.5 py-1 text-[0.6875rem] font-extrabold tracking-[0.14em] text-champagne uppercase backdrop-blur-sm">
            {item.sector}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 p-5 md:p-7">
          <p
            className={`leading-none font-extrabold tracking-[-0.04em] text-white ${feature ? "text-[clamp(3rem,2rem+4vw,5.5rem)]" : "text-[clamp(2.5rem,2rem+2vw,3.5rem)]"}`}
          >
            {item.headline.value}
          </p>
          <p className="t-kicker mt-3 text-gray-300">{item.headline.label}</p>
        </div>
      </div>
      <div className={`flex flex-col gap-3 p-6 md:p-7 ${size === "feature" ? "flex-1 lg:flex-none" : "flex-1"}`}>
        <p className="t-kicker text-gray-600">{item.client}</p>
        <h3 className={`${feature ? "t-h3" : "t-h4"} text-graphite-900`}>{item.title}</h3>
        <span className="mt-auto inline-flex items-center gap-2 pt-3 text-[0.9375rem] font-extrabold text-graphite-900 transition-colors group-hover:text-gold-text">
          Ler o case
          <ArrowUpRight
            size={18}
            className="transition-transform duration-500 ease-spac group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}

/** Espaço reservado para case futuro — sem link, claramente identificado. */
export function UpcomingCaseCard({ sector, note }: { sector: string; note: string }) {
  return (
    <div className="flex h-full min-h-48 flex-col justify-between rounded-card border border-dashed border-gray-300 bg-paper p-6 md:p-7">
      <p className="t-kicker text-gray-600">{sector}</p>
      <div>
        <p className="t-h4 text-graphite-700">{note}</p>
        <p className="mt-2 text-[0.9375rem] text-gray-600">
          Publicado após aprovação do cliente.
        </p>
      </div>
    </div>
  );
}
