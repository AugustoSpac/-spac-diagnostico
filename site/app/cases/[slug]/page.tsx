import Link from "next/link";
import { notFound } from "next/navigation";
import { TrajectoryArt } from "@/components/graphics/TrajectoryArt";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowRight } from "@/components/ui/Icons";
import { PendingBadge } from "@/components/ui/Pending";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Em } from "@/components/ui/SectionHeader";
import { cases, getCase } from "@/content/cases";
import { getSolution } from "@/content/solutions";
import { breadcrumbLd, JsonLd, pageMetadata } from "@/lib/seo";

export const instant = false;

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/cases/[slug]">) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  return pageMetadata({
    title: `${c.client}: ${c.title}`,
    description: `Case ${c.client} (${c.sector}). ${c.headline.value} ${c.headline.label}.`,
    path: `/cases/${c.slug}`,
  });
}

function Block({
  index,
  title,
  pending,
  children,
}: {
  index: string;
  title: string;
  pending?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="border-t-2 border-graphite-900 pt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="t-kicker text-gray-600">
          <span className="text-gold-text">{index} — </span>
          {title}
        </h2>
        {pending && <PendingBadge />}
      </div>
      <div className="mt-6">{children}</div>
    </Reveal>
  );
}

export default async function CasePage({ params }: PageProps<"/cases/[slug]">) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  const idx = cases.findIndex((x) => x.slug === c.slug);
  const next = cases[(idx + 1) % cases.length];

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Início", path: "/" },
          { name: "Cases", path: "/cases" },
          { name: c.client, path: `/cases/${c.slug}` },
        ])}
      />
      <PageHero
        crumbs={[{ label: "Início", href: "/" }, { label: "Cases", href: "/cases" }, { label: c.client }]}
        kicker={`Case · ${c.sector}`}
        title={c.title}
        lead={c.client}
      >
        {c.needsClientApproval && (
          <PendingBadge tone="dark">Publicação sujeita à autorização do cliente</PendingBadge>
        )}
      </PageHero>

      <section className="bg-white">
        <div className="container-spac grid gap-14 py-20 md:py-28 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <TrajectoryArt seed={c.artSeed} className="aspect-[4/3] rounded-card" />
              <dl className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-1">
                <div>
                  <dt className="t-kicker text-gray-600">Cliente</dt>
                  <dd className="mt-2 font-extrabold text-graphite-900">{c.client}</dd>
                </div>
                <div>
                  <dt className="t-kicker text-gray-600">Setor</dt>
                  <dd className="mt-2 font-extrabold text-graphite-900">{c.sector}</dd>
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <dt className="t-kicker text-gray-600">Frentes</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {c.fronts.map((f) => {
                      const s = getSolution(f);
                      return s ? (
                        <Link
                          key={f}
                          href={`/solucoes/${s.slug}`}
                          className="rounded-card border border-gray-200 bg-gray-100 px-3 py-1.5 text-sm font-semibold text-graphite-900 transition-colors hover:border-gold"
                        >
                          {s.name}
                        </Link>
                      ) : null;
                    })}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>

          <div className="space-y-16 lg:col-span-8">
            <Block index="01" title="Contexto" pending={c.context.pending}>
              <p className="t-lead text-graphite-900">{c.context.text}</p>
            </Block>
            <Block index="02" title="Desafio" pending={c.challenge.pending}>
              <p className="t-lead text-graphite-900">{c.challenge.text}</p>
            </Block>
            <Block index="03" title="Solução" pending={c.solution.pending}>
              <ul className="border-t border-gray-200">
                {c.solution.items.map((it) => (
                  <li key={it} className="flex gap-4 border-b border-gray-200 py-4 text-graphite-900">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 bg-gold" />
                    {it}
                  </li>
                ))}
              </ul>
            </Block>
            <Block index="04" title="Resultados">
              <Stagger className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
                {c.results.map((r, i) => (
                  <StaggerItem key={r.label} className="border-l border-gray-200 pl-6">
                    <p className={`t-number ${i === 0 ? "text-gold-text" : "text-graphite-900"}`}>{r.value}</p>
                    <p className="t-kicker mt-4 text-gray-600">{r.label}</p>
                    {r.context && <p className="mt-2 text-graphite-700">{r.context}</p>}
                  </StaggerItem>
                ))}
              </Stagger>
              {c.source && <p className="mt-10 text-sm text-gray-600">{c.source}</p>}
            </Block>
          </div>
        </div>
      </section>

      {next && next.slug !== c.slug && (
        <nav aria-label="Próximo case" className="border-t border-gray-200 bg-paper">
          <Link href={`/cases/${next.slug}`} className="group container-spac flex items-center justify-between gap-6 py-14 md:py-20">
            <div>
              <p className="t-kicker text-gray-600">Próximo case · {next.sector}</p>
              <p className="t-h3 mt-3 max-w-[28ch] text-graphite-900">{next.title}</p>
            </div>
            <ArrowRight size={30} className="shrink-0 transition-transform duration-500 ease-spac group-hover:translate-x-1.5" />
          </Link>
        </nav>
      )}

      <CtaBand
        title={
          <>
            Quer resultados assim <Em gold>na sua empresa?</Em>
          </>
        }
      />
    </>
  );
}
