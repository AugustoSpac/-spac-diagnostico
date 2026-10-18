import Link from "next/link";
import { ArticleFeature, ArticleRow } from "@/components/cards/ArticleCard";
import { CaseCard, UpcomingCaseCard } from "@/components/cards/CaseCard";
import { SolutionCard } from "@/components/cards/SolutionCard";
import { HeroTrajectory } from "@/components/graphics/HeroTrajectory";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Em, SectionHeader } from "@/components/ui/SectionHeader";
import { cases, portfolioResults, upcomingCases } from "@/content/cases";
import {
  credibilityStats,
  differentials,
  methodology,
  methodologyClosing,
  modelComparison,
  problems,
} from "@/content/institutional";
import { solutions } from "@/content/solutions";
import type { Article } from "@/lib/articles";
import { MethodologyCycle } from "./MethodologyCycle";
import { ProblemsList } from "./ProblemsList";

/* ------------------------------------------------------------------ 1 · Hero */
const HEADLINE = ["Estratégia", "que", "se", "transforma", "em"];

export function HomeHero() {
  return (
    <section className="bg-spac-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden text-white">
      <HeroTrajectory />
      <div className="container-spac relative flex flex-1 flex-col justify-end pt-[calc(var(--header-h)+5rem)] pb-10 md:pb-14">
        <p className="t-kicker rise text-gray-300">Consultoria de gestão empresarial</p>
        <h1 className="t-display mt-7 max-w-[13ch] md:mt-9">
          {HEADLINE.map((w, i) => (
            <span key={w} className="word-mask mr-[0.22em]">
              <span style={{ animationDelay: `${0.1 + i * 0.07}s` }}>{w}</span>
            </span>
          ))}
          <span className="word-mask">
            <span style={{ animationDelay: `${0.1 + HEADLINE.length * 0.07}s` }}>
              <strong className="font-extrabold text-champagne">resultado.</strong>
            </span>
          </span>
        </h1>

        <div className="mt-10 grid items-end gap-8 md:mt-14 md:grid-cols-12">
          <p
            className="t-lead rise max-w-[44ch] text-gray-200 md:col-span-7"
            style={{ animationDelay: "0.7s" }}
          >
            Consultoria de gestão que combina experiência executiva, metodologias estruturadas e
            inteligência artificial para acelerar resultados.
          </p>
          <div
            className="rise flex flex-wrap gap-3 md:col-span-5 md:justify-end"
            style={{ animationDelay: "0.85s" }}
          >
            <ButtonLink href="/contato">Iniciar uma conversa</ButtonLink>
            <ButtonLink href="/sobre" variant="outline-light" arrow={false}>
              Conhecer a SPAC
            </ButtonLink>
          </div>
        </div>

        <ul
          className="rise mt-14 grid gap-4 border-t border-amber-line pt-6 text-[0.9375rem] text-gray-300 sm:grid-cols-3 md:mt-20"
          style={{ animationDelay: "1s" }}
        >
          {[
            ["Método proprietário", "Sonhar, Planejar, Agir, Controlar"],
            ["Sêniores na linha de frente", "Quem desenha é quem conduz"],
            ["IA integrada à entrega", "Mais agilidade, estrutura enxuta"],
          ].map(([a, b]) => (
            <li key={a} className="flex flex-col">
              <span className="font-extrabold text-white">{a}</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- 2 · Credibilidade */
export function Credibility({ index = "01" }: { index?: string }) {
  return (
    <section className="section-y bg-paper">
      <div className="container-spac">
        <SectionHeader
          index={index}
          kicker="Credibilidade"
          title={
            <>
              Experiência executiva que <Em>já gerou resultado</Em> em grandes operações.
            </>
          }
          aside={<p className="text-sm text-gray-600">Resultados apurados pelos clientes.</p>}
        />
        <Stagger className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {credibilityStats.map((s) => (
            <StaggerItem key={s.label} className="border-l border-gray-200 pl-6">
              <p className={`t-number ${s.gold ? "text-gold-text" : "text-graphite-900"}`}>
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-5 max-w-[24ch] text-graphite-700">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-20 grid gap-8 border-t border-gray-200 pt-10 md:grid-cols-12">
          <p className="t-kicker text-gray-600 md:col-span-3">Experiência construída em</p>
          <div className="md:col-span-9">
            <p className="text-[clamp(1.375rem,1.1rem+1vw,2rem)] leading-snug font-extrabold tracking-[-0.02em] text-graphite-900">
              Varejo alimentar <span className="font-normal text-gray-500">·</span> Bebidas{" "}
              <span className="font-normal text-gray-500">·</span> Distribuição{" "}
              <span className="font-normal text-gray-500">·</span>{" "}
              <span className="font-normal text-graphite-700">
                liderança C-level em empresas de R$ 4 bi e R$ 5 bi de faturamento
              </span>
            </p>
            <TextLink href="/sobre#socios" className="mt-6 text-graphite-900 hover:text-gold-text">
              Conheça os sócios
            </TextLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- 3 · Problemas */
export function Problems({ index = "02" }: { index?: string }) {
  return (
    <section className="section-y border-t border-gray-200 bg-white">
      <div className="container-spac grid grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <SectionHeader
              index={index || undefined}
              kicker="O que resolvemos"
              title={
                <>
                  A empresa cresceu. <Em>A gestão precisa acompanhar.</Em>
                </>
              }
              lead="Reconhece algum destes sintomas? São os pontos onde a gestão costuma travar o resultado."
            />
          </div>
        </div>
        <Reveal className="lg:col-span-7 lg:pt-24" delay={0.1}>
          <ProblemsList items={problems} />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ 4 · Soluções */
export function Solutions({ index = "03" }: { index?: string }) {
  return (
    <section className="bg-spac-dark-corner section-y text-white">
      <div className="container-spac">
        <SectionHeader
          tone="dark"
          index={index}
          kicker="Soluções"
          title={
            <>
              Três frentes. <Em gold>Um compromisso com a implantação.</Em>
            </>
          }
          lead="Atuamos na frente que o momento da empresa pede, isoladamente ou em combinação."
          aside={
            <TextLink href="/solucoes" className="text-[0.9375rem] text-champagne">
              Visão geral das soluções
            </TextLink>
          }
        />
        <Stagger className="mt-16 grid gap-5 md:mt-20 lg:grid-cols-3">
          {solutions.map((s) => (
            <StaggerItem key={s.slug} className="h-full">
              <SolutionCard s={s} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- 5 · Cases */
export function CasesShowcase() {
  const [featured, ...rest] = cases;
  return (
    <section className="section-y bg-paper">
      <div className="container-spac">
        <SectionHeader
          index="04"
          kicker="Cases"
          title={
            <>
              Resultado medido, <Em>não promessa.</Em>
            </>
          }
          aside={
            <TextLink href="/cases" className="text-[0.9375rem] text-graphite-900 hover:text-gold-text">
              Todos os cases
            </TextLink>
          }
        />
        <div className="mt-16 grid gap-5 md:mt-20 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <CaseCard item={featured} size="feature" />
          </Reveal>
          <div className="grid gap-5 lg:col-span-5">
            {rest.map((c, i) => (
              <Reveal key={c.slug} delay={0.1 + i * 0.08}>
                <CaseCard item={c} />
              </Reveal>
            ))}
            <Reveal delay={0.1}>
              <div className="flex h-full flex-col rounded-card border border-gray-200 bg-white p-6 md:p-7">
                <p className="t-kicker text-gray-600">Outros resultados do portfólio</p>
                <ul className="mt-5 border-t border-gray-200">
                  {portfolioResults.map((r) => (
                    <li key={r} className="flex gap-3 border-b border-gray-200 py-3.5 text-[0.9875rem] text-graphite-900">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-gold" />
                      {r}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm text-gray-600">
                  Clientes não identificados por confidencialidade.
                </p>
                <TextLink
                  href="/cases"
                  className="mt-auto pt-8 text-[0.9375rem] text-graphite-900 hover:text-gold-text"
                >
                  Ver cases
                </TextLink>
              </div>
            </Reveal>
            {upcomingCases.slice(0, rest.length > 0 ? 1 : 0).map((u) => (
              <Reveal key={u.sector} delay={0.2}>
                <UpcomingCaseCard {...u} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- 6 · Diferenciais */
export function Differentials({ index = "05" }: { index?: string }) {
  return (
    <section className="section-y border-t border-gray-200 bg-white">
      <div className="container-spac">
        <SectionHeader
          index={index}
          kicker="Diferenciais"
          title={
            <>
              Qualidade de grande consultoria, <Em>com a proximidade que a média empresa precisa.</Em>
            </>
          }
        />
        <Stagger className="mt-16 grid gap-px overflow-hidden rounded-card border border-gray-200 bg-gray-200 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {differentials.map((d, i) => (
            <StaggerItem key={d.title} className="flex flex-col bg-white p-7 md:p-8">
              <span className="t-kicker text-gold-text">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="t-h4 mt-8 text-graphite-900">{d.title}</h3>
              <p className="mt-4 text-[0.9875rem] text-graphite-700">{d.description}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-20">
          <h3 className="t-kicker text-gray-600">Dois modelos de consultoria</h3>
          <div className="mt-6 overflow-hidden rounded-card border border-gray-200">
            <div className="hidden grid-cols-12 border-b border-gray-200 bg-gray-100 text-sm font-extrabold md:grid">
              <span className="col-span-3 px-6 py-4 text-gray-600">Dimensão</span>
              <span className="col-span-4 px-6 py-4 text-gray-600">Modelo convencional</span>
              <span className="col-span-5 border-l border-gold bg-gold-veil px-6 py-4 text-graphite-900">
                Modelo SPAC
              </span>
            </div>
            <dl>
              {modelComparison.map((row) => (
                <div
                  key={row.topic}
                  className="grid border-b border-gray-200 last:border-b-0 md:grid-cols-12"
                >
                  <dt className="px-6 pt-5 font-extrabold text-graphite-900 md:col-span-3 md:py-5">
                    {row.topic}
                  </dt>
                  <dd className="px-6 pt-2 text-gray-600 md:col-span-4 md:py-5">
                    <span className="sr-only md:hidden">Modelo convencional: </span>
                    <span className="md:hidden" aria-hidden="true">Convencional: </span>
                    {row.conventional}
                  </dd>
                  <dd className="mt-3 border-t border-gold/40 bg-gold-veil px-6 py-4 font-semibold text-graphite-900 md:col-span-5 md:mt-0 md:border-t-0 md:border-l md:border-l-gold md:py-5">
                    <span className="md:hidden">SPAC: </span>
                    {row.spac}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- 7 · Metodologia */
export function Methodology({
  index = "06",
  showLink = true,
}: {
  index?: string;
  showLink?: boolean;
}) {
  return (
    <section className="bg-spac-dark text-white" aria-labelledby="metodologia-titulo">
      <div className="container-spac pt-[clamp(5rem,3.5rem+6vw,9rem)] pb-10 lg:pb-0">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <p className="t-kicker text-gray-500">
              <span className="text-champagne">{index} — </span>Metodologia SPAC
            </p>
            {showLink && (
              <TextLink href="/metodologia" className="text-[0.9375rem] text-champagne">
                Como aplicamos o método
              </TextLink>
            )}
          </div>
          <div className="rule mt-5 text-amber-line" />
          <h2 id="metodologia-titulo" className="t-h2 mt-10 max-w-[20ch] md:mt-12">
            SPAC é o nome e o método: <Em gold>sonhar, planejar, agir e controlar.</Em>
          </h2>
          <p className="t-lead mt-6 max-w-[48ch] text-gray-300">
            Cada letra é uma etapa do ciclo. É assim que a visão de longo prazo vira rotina de
            gestão.
          </p>
        </Reveal>
      </div>
      <MethodologyCycle stages={methodology} closing={methodologyClosing} />
    </section>
  );
}

/* ------------------------------------------------------- 8 · Conhecimento */
export function Insights({ articles }: { articles: Article[] }) {
  const [first, ...others] = articles;
  if (!first) return null;
  return (
    <section className="section-y bg-paper">
      <div className="container-spac">
        <SectionHeader
          index="07"
          kicker="Conhecimento"
          title={
            <>
              Ideias práticas <Em>para quem decide.</Em>
            </>
          }
          aside={
            <TextLink
              href="/conhecimento"
              className="text-[0.9375rem] text-graphite-900 hover:text-gold-text"
            >
              Todos os conteúdos
            </TextLink>
          }
        />
        <div className="mt-16 grid gap-14 md:mt-20 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <ArticleFeature a={first} />
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.12}>
            {others.map((a) => (
              <ArticleRow key={a.slug} a={a} />
            ))}
            <Link
              href="/conhecimento"
              className="mt-8 inline-block text-sm text-gray-600 underline decoration-gray-300 underline-offset-4 hover:text-graphite-900"
            >
              Artigos, estudos e publicações da SPAC
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
