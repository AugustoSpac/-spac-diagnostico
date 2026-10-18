import { CaseCard, UpcomingCaseCard } from "@/components/cards/CaseCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Em, SectionHeader } from "@/components/ui/SectionHeader";
import { cases, portfolioResults, upcomingCases } from "@/content/cases";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cases",
  description:
    "Projetos da SPAC com contexto, desafio, solução e resultados apurados pelos próprios clientes.",
  path: "/cases",
});

export default function CasesPage() {
  return (
    <>
      <PageHero
        kicker="Cases"
        title={
          <>
            Resultados apurados <Em gold>pelos próprios clientes.</Em>
          </>
        }
        lead="Cada projeto parte de um desafio concreto e termina com a mudança implantada e o resultado medido."
      />

      <section className="section-y bg-paper">
        <div className="container-spac">
          <Reveal>
            <CaseCard item={cases[0]} size="wide" />
          </Reveal>
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cases.slice(1).map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.08}>
                <CaseCard item={c} />
              </Reveal>
            ))}
            {upcomingCases.map((u, i) => (
              <Reveal key={u.sector} delay={0.1 + i * 0.08}>
                <UpcomingCaseCard {...u} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y border-t border-gray-200 bg-white">
        <div className="container-spac grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              kicker="Portfólio"
              title={
                <>
                  Outros resultados <Em>da nossa trajetória.</Em>
                </>
              }
            />
          </div>
          <Stagger className="lg:col-span-7 lg:pt-24">
            {portfolioResults.map((r) => (
              <StaggerItem
                key={r}
                className="flex items-start gap-4 border-b border-gray-200 py-6 text-[1.125rem] text-graphite-900 first:border-t"
              >
                <span aria-hidden="true" className="mt-2.5 size-2 shrink-0 bg-gold" />
                {r}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
