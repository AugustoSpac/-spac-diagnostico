import Image from "next/image";
import { Fragment } from "react";
import { ArrowRight } from "@/components/ui/Icons";
import { PendingBadge } from "@/components/ui/Pending";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Em, SectionHeader } from "@/components/ui/SectionHeader";
import { partners, positioningCycle, values, type Partner } from "@/content/institutional";
import { site } from "@/content/site";

/**
 * Posicionamento: a SPAC atua em todo o ciclo — Sonhar, Planejar, Agir e Controlar —,
 * com as quatro etapas no mesmo nível e o retorno do Controlar para o Sonhar.
 */
export function PositioningSection({ index = "01" }: { index?: string }) {
  return (
    <section className="section-y bg-paper">
      <div className="container-spac">
        <SectionHeader
          index={index}
          kicker="Posicionamento"
          title={
            <>
              Da visão de futuro <Em>à geração de resultados.</Em>
            </>
          }
          lead="A SPAC atua em todo o ciclo de gestão empresarial: da definição da ambição e das escolhas estratégicas ao planejamento, à execução e ao acompanhamento dos resultados. Conectamos visão de longo prazo, planos estruturados, execução disciplinada e controle contínuo."
        />

        <Stagger
          className="mt-16 grid grid-cols-1 gap-3 md:mt-20 lg:grid-cols-[minmax(0,1fr)_2.25rem_minmax(0,1fr)_2.25rem_minmax(0,1fr)_2.25rem_minmax(0,1fr)] lg:gap-0"
          aria-label="Ciclo SPAC: Sonhar, Planejar, Agir e Controlar"
        >
          {positioningCycle.map((st, i) => (
            <Fragment key={st.letter}>
              <StaggerItem className="h-full">
                <article className="group flex h-full flex-col rounded-card border border-gray-200 bg-white p-6 transition-colors duration-500 ease-spac hover:border-gold md:p-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <span
                      aria-hidden="true"
                      className="text-[3.5rem] leading-none font-extrabold tracking-[-0.04em] text-gold-text"
                    >
                      {st.letter}
                    </span>
                    <span className="t-kicker text-gray-500">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="t-kicker mt-6 text-graphite-900">{st.name}</h3>
                  <p className="t-h4 mt-3 text-graphite-900">{st.headline}</p>
                  <p className="mt-3 text-[0.9375rem] text-graphite-700">{st.description}</p>
                </article>
              </StaggerItem>
              {i < positioningCycle.length - 1 && (
                <div aria-hidden="true" className="flex items-center justify-center py-1 lg:py-0">
                  <ArrowRight size={22} className="rotate-90 text-gold-deep lg:rotate-0" />
                </div>
              )}
            </Fragment>
          ))}
        </Stagger>

        {/* Retorno do ciclo: o controle realimenta a visão e o planejamento */}
        <Reveal delay={0.15}>
          {/* Desktop: arco que liga Controlar de volta a Sonhar */}
          <div className="relative mx-[12.5%] hidden h-14 lg:block" aria-hidden="true">
            <div className="absolute inset-0 rounded-b-[14px] border-2 border-t-0 border-dashed border-gold-deep/70" />
            <span className="absolute top-[-7px] left-[-7px] size-0 border-x-[7px] border-b-[9px] border-x-transparent border-b-gold-deep" />
          </div>
          <p className="mt-4 flex items-center gap-3 text-[0.9375rem] text-graphite-700 lg:justify-center">
            <svg
              viewBox="0 0 24 24"
              className="size-5 shrink-0 text-gold-text"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 12a8 8 0 1 1-2.34-5.66M20 4v4h-4" />
            </svg>
            <span>
              O que se aprende no <strong className="font-extrabold text-graphite-900">Controlar</strong>{" "}
              realimenta a visão e o planejamento: um ciclo contínuo de gestão.
            </span>
          </p>
        </Reveal>

        <Reveal className="mt-14 flex max-w-3xl border-l-4 border-gold bg-gold-veil px-6 py-5">
          <p className="text-graphite-900">
            A SPAC conecta todas as etapas da gestão para transformar{" "}
            <strong className="font-extrabold">ambição em resultado sustentável</strong>. Podemos
            atuar em uma necessidade específica ou conduzir o ciclo completo, conforme os desafios de
            cada empresa.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function StorySection({ index = "02" }: { index?: string }) {
  return (
    <section className="section-y border-t border-gray-200 bg-white">
      <div className="container-spac grid grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeader
            index={index}
            kicker="Nossa história"
            title={
              <>
                Da gestão de grandes operações <Em>para a média empresa.</Em>
              </>
            }
          />
        </div>
        <Reveal className="space-y-6 text-[1.125rem] leading-relaxed text-graphite-700 lg:col-span-7 lg:pt-24" delay={0.1}>
          <p>
            A SPAC foi criada por executivos que lideraram estratégia, finanças, tecnologia,
            comercial e CRM em empresas de bilhões de reais de faturamento, com projetos no Brasil,
            nos Estados Unidos, no México e no Peru.
          </p>
          <p>
            Dessa experiência veio uma convicção: empresas de médio porte merecem o mesmo nível de
            gestão das grandes, com mais proximidade, mais agilidade e um custo compatível com a sua
            realidade.
          </p>
          <p>
            Por isso combinamos três elementos: <strong className="font-extrabold text-graphite-900">profissionais sêniores</strong> na linha
            de frente, um <strong className="font-extrabold text-graphite-900">método proprietário</strong> e{" "}
            <strong className="font-extrabold text-graphite-900">inteligência artificial</strong> integrada à forma como
            trabalhamos.
          </p>
          <div className="pt-2">
            <PendingBadge>Ano de fundação e marcos a fornecer</PendingBadge>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function PurposeValues({ index = "03" }: { index?: string }) {
  return (
    <section className="bg-spac-dark-corner section-y text-white">
      <div className="container-spac">
        <Reveal>
          <p className="t-kicker text-gray-500">
            <span className="text-champagne">{index} — </span>Propósito
          </p>
          <div className="rule mt-5 text-amber-line" />
          <p className="t-display-s mt-12 max-w-[20ch]">
            Democratizar a transformação <Em gold>para todos que querem fazer a diferença.</Em>
          </p>
        </Reveal>
        <div className="mt-20">
          <p className="t-kicker text-gray-500">Valores</p>
          <Stagger className="mt-8 grid gap-px overflow-hidden rounded-card border border-amber-line bg-amber-line sm:grid-cols-2 lg:grid-cols-5">
            {values.map((v, i) => (
              <StaggerItem key={v.title} className="flex flex-col bg-amber-950 p-7">
                <span className="t-kicker text-champagne">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-h4 mt-8 text-white">{v.title}</h3>
                <p className="mt-4 text-[0.9375rem] text-gray-300">{v.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

function PartnerCard({ p }: { p: Partner }) {
  return (
    <article className="flex h-full flex-col rounded-card border border-gray-200 bg-white p-7 md:p-9">
      <div className="flex items-center gap-6">
        <div className="relative size-24 shrink-0 rounded-full p-[3px] ring-[1.25px] ring-gold md:size-28">
          {p.photo ? (
            <Image
              src={p.photo}
              alt={`Foto de ${p.name}`}
              width={224}
              height={224}
              className="size-full rounded-full object-cover"
            />
          ) : (
            // Sem foto: monograma com as iniciais, no padrão da marca
            <span
              aria-hidden="true"
              className="bg-spac-dark flex size-full items-center justify-center rounded-full text-[1.75rem] font-extrabold tracking-[-0.02em] text-champagne md:text-[2rem]"
            >
              {p.name
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")}
            </span>
          )}
        </div>
        <div>
          <h3 className="t-h3 text-graphite-900">{p.name}</h3>
          <p className="mt-2 text-graphite-700">{p.role}</p>
        </div>
      </div>
      {!p.photo && (
        <div className="mt-5">
          <PendingBadge>Foto a fornecer</PendingBadge>
        </div>
      )}
      <ul className="mt-8 border-t border-gray-200 pt-6">
        {p.highlights.map((h) => (
          <li key={h} className="relative py-1.5 pl-6 text-graphite-700">
            <span aria-hidden="true" className="absolute top-[0.85em] left-0 size-1.5 bg-gold" />
            {h}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function PartnersSection({ index = "04" }: { index?: string }) {
  return (
    <section id="socios" className="section-y scroll-mt-[var(--header-h)] bg-paper">
      <div className="container-spac">
        <SectionHeader
          index={index}
          kicker="Quem conduz"
          title={
            <>
              Dois sócios com <Em>30 anos somados</Em> em gestão, estratégia e transformação.
            </>
          }
          lead="Os sócios participam diretamente dos projetos. É isso que garante a senioridade na linha de frente."
        />
        <Stagger className="mt-16 grid gap-5 md:mt-20 lg:grid-cols-2">
          {partners.map((p) => (
            <StaggerItem key={p.name}>
              <PartnerCard p={p} />
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-6 text-sm text-gray-600">
          Trajetória executiva dos sócios em empresas anteriores à {site.name}.
        </p>
      </div>
    </section>
  );
}
