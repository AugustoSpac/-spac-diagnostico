import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseCard } from "@/components/cards/CaseCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, Check } from "@/components/ui/Icons";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Em, SectionHeader } from "@/components/ui/SectionHeader";
import { getCase } from "@/content/cases";
import { getSolution, solutions } from "@/content/solutions";
import { breadcrumbLd, JsonLd, pageMetadata } from "@/lib/seo";

// Slugs conhecidos são pré-renderizados; os demais respondem 404 real.
export const instant = false;

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/solucoes/[slug]">) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) return {};
  return pageMetadata({
    title: `${s.name} | Soluções`,
    description: `${s.tagline} ${s.summary}`,
    path: `/solucoes/${s.slug}`,
  });
}

export default async function SolucaoPage({ params }: PageProps<"/solucoes/[slug]">) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) notFound();

  const related = s.relatedCases.map(getCase).filter((c) => c !== undefined);
  const others = solutions.filter((o) => o.slug !== s.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Início", path: "/" },
          { name: "Soluções", path: "/solucoes" },
          { name: s.name, path: `/solucoes/${s.slug}` },
        ])}
      />
      <PageHero
        crumbs={[{ label: "Início", href: "/" }, { label: "Soluções", href: "/solucoes" }, { label: s.name }]}
        kicker={`Solução ${s.index} · ${s.letters}`}
        title={
          <>
            {s.name}. <Em gold>{s.tagline}</Em>
          </>
        }
        lead={s.summary}
      >
        <p className="max-w-[60ch] border-l-2 border-gold pl-5 text-[0.9375rem] text-gray-300">
          <span className="font-extrabold text-white">Indicado para: </span>
          {s.bestFor}
        </p>
      </PageHero>

      <section className="section-y bg-paper">
        <div className="container-spac grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              index="01"
              kicker="Perguntas que respondemos"
              title={
                <>
                  O ponto de partida <Em>é sempre uma decisão.</Em>
                </>
              }
            />
          </div>
          <Stagger className="lg:col-span-7 lg:pt-24">
            {s.questions.map((q, i) => (
              <StaggerItem
                key={q}
                className="flex items-baseline gap-6 border-b border-gray-200 py-7 first:border-t"
              >
                <span className="t-kicker text-gold-text">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-[clamp(1.375rem,1.15rem+0.9vw,1.875rem)] leading-snug font-extrabold tracking-[-0.018em] text-graphite-900">
                  {q}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-y border-t border-gray-200 bg-white">
        <div className="container-spac">
          <SectionHeader
            index="02"
            kicker="O que fazemos"
            title={
              <>
                {s.services.length} serviços, <Em>uma mesma lógica de implantação.</Em>
              </>
            }
          />
          <Stagger className="mt-16 grid gap-px overflow-hidden rounded-card border border-gray-200 bg-gray-200 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
            {s.services.map((sv, i) => (
              <StaggerItem key={sv.name} className="flex flex-col bg-white p-7 md:p-8">
                <span className="t-kicker text-gold-text">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-h4 mt-6 text-graphite-900">{sv.name}</h3>
                <p className="mt-3 text-graphite-700">{sv.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-spac-dark-corner section-y text-white">
        <div className="container-spac grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              tone="dark"
              index="03"
              kicker="O que fica pronto"
              title={
                <>
                  Entregáveis que <Em gold>permanecem na empresa.</Em>
                </>
              }
              lead={`${s.cycleNote} do método SPAC.`}
            />
          </div>
          <Reveal className="lg:col-span-7 lg:pt-24" delay={0.1}>
            <ul className="border-t border-amber-line">
              {s.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-4 border-b border-amber-line py-5 text-[1.125rem] text-gray-200">
                  <Check size={22} className="mt-0.5 shrink-0 text-gold" />
                  {d}
                </li>
              ))}
            </ul>
            <ButtonLink href="/metodologia" variant="outline-light" className="mt-10">
              Conhecer a metodologia SPAC
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-y bg-paper">
          <div className="container-spac">
            <SectionHeader
              index="04"
              kicker="Cases relacionados"
              title={
                <>
                  Onde essa frente <Em>já gerou resultado.</Em>
                </>
              }
            />
            <div className="mt-16 grid gap-5 md:mt-20 md:grid-cols-2">
              {related.map((c) => (
                <Reveal key={c.slug}>
                  <CaseCard item={c} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <nav aria-label="Outras soluções" className="border-t border-gray-200 bg-white">
        <div className="container-spac grid md:grid-cols-2">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/solucoes/${o.slug}`}
              className="group flex items-center justify-between gap-6 border-b border-gray-200 py-10 md:border-b-0 md:py-14 md:odd:border-r md:odd:pr-10 md:even:pl-10"
            >
              <div>
                <p className="t-kicker text-gray-600">Outra frente · {o.index}</p>
                <p className="t-h3 mt-3 text-graphite-900">{o.name}</p>
                <p className="mt-2 text-graphite-700">{o.tagline}</p>
              </div>
              <ArrowRight
                size={26}
                className="shrink-0 text-graphite-900 transition-transform duration-500 ease-spac group-hover:translate-x-1.5"
              />
            </Link>
          ))}
        </div>
      </nav>

      <CtaBand />
    </>
  );
}
