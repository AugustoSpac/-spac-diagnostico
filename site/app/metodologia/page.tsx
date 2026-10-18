import Link from "next/link";
import { CtaBand } from "@/components/sections/CtaBand";
import { Methodology } from "@/components/sections/home";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowRight } from "@/components/ui/Icons";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Em, SectionHeader } from "@/components/ui/SectionHeader";
import { methodology } from "@/content/institutional";
import { solutions } from "@/content/solutions";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Metodologia SPAC",
  description:
    "Sonhar, Planejar, Agir e Controlar: o método proprietário da SPAC que transforma visão de longo prazo em rotina de gestão e resultado medido.",
  path: "/metodologia",
});

const coverage: Record<string, string[]> = {
  estrategia: ["S", "P"],
  performance: ["A", "C"],
  transformacao: ["S", "P", "A", "C"],
};

const principles = [
  {
    title: "Começar pela ambição",
    text: "Antes de discutir ferramentas, alinhamos onde a empresa quer chegar e o que precisa ser verdade para isso.",
  },
  {
    title: "Poucas metas, bem desdobradas",
    text: "Cada meta tem responsável, indicador e rotina de acompanhamento. O que não tem dono não acontece.",
  },
  {
    title: "Execução acompanhada de perto",
    text: "Ficamos ao lado do time na implantação. O plano só vale quando vira prática.",
  },
  {
    title: "Controle que realimenta o plano",
    text: "Os rituais de gestão corrigem a rota e alimentam o próximo ciclo de decisões.",
  },
];

export default function MetodologiaPage() {
  return (
    <>
      <PageHero
        kicker="Metodologia SPAC"
        title={
          <>
            Um ciclo que transforma visão <Em gold>em rotina de gestão.</Em>
          </>
        }
        lead="SPAC é o nosso nome e o nosso método. Quatro etapas, um ciclo contínuo: da ambição ao resultado medido, e de volta à próxima ambição."
      />
      <Methodology index="01" showLink={false} />

      <section className="section-y bg-paper">
        <div className="container-spac">
          <SectionHeader
            index="02"
            kicker="O método nas três frentes"
            title={
              <>
                Cada frente de solução <Em>atua em uma parte do ciclo.</Em>
              </>
            }
          />
          <Stagger className="mt-16 border-t border-gray-200 md:mt-20">
            {solutions.map((s) => (
              <StaggerItem key={s.slug}>
                <Link
                  href={`/solucoes/${s.slug}`}
                  className="group grid items-center gap-6 border-b border-gray-200 py-8 md:grid-cols-12 md:py-10"
                >
                  <div className="md:col-span-4">
                    <p className="t-kicker text-gold-text">{s.index}</p>
                    <h3 className="t-h3 mt-3 text-graphite-900">{s.name}</h3>
                  </div>
                  <div className="flex gap-2 md:col-span-4" aria-label={s.cycleNote}>
                    {methodology.map((m) => {
                      const on = coverage[s.slug].includes(m.letter);
                      return (
                        <span
                          key={m.letter}
                          aria-hidden="true"
                          className={`flex size-12 items-center justify-center rounded-full border text-lg font-extrabold transition-colors md:size-14 ${on ? "border-gold bg-gold text-ink" : "border-gray-200 bg-white text-gray-500"}`}
                        >
                          {m.letter}
                        </span>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between gap-6 md:col-span-4">
                    <p className="text-graphite-700">{s.cycleNote}.</p>
                    <ArrowRight
                      size={22}
                      className="shrink-0 text-graphite-900 transition-transform duration-500 ease-spac group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-y border-t border-gray-200 bg-white">
        <div className="container-spac">
          <SectionHeader
            index="03"
            kicker="Princípios"
            title={
              <>
                O método é simples. <Em>A disciplina é o diferencial.</Em>
              </>
            }
          />
          <Stagger className="mt-16 grid gap-x-10 gap-y-12 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <StaggerItem key={p.title} className="border-t-2 border-graphite-900 pt-6">
                <span className="t-kicker text-gold-text">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-h4 mt-5 text-graphite-900">{p.title}</h3>
                <p className="mt-3 text-graphite-700">{p.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-16 max-w-3xl border-l-4 border-gold bg-gold-veil px-6 py-5">
            <p className="text-graphite-900">
              O ciclo não termina em Controlar: <strong className="font-extrabold">o que se aprende no controle realimenta o próximo sonho.</strong>
            </p>
          </Reveal>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
