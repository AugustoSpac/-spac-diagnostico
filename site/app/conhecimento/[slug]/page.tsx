import { notFound } from "next/navigation";
import { ArticleRow } from "@/components/cards/ArticleCard";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { PendingBadge } from "@/components/ui/Pending";
import { site } from "@/content/site";
import { formatDate, getArticle, getArticles } from "@/lib/articles";
import { breadcrumbLd, JsonLd, pageMetadata } from "@/lib/seo";

export const instant = false;

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/conhecimento/[slug]">) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return pageMetadata({
    title: a.title,
    description: a.excerpt,
    path: `/conhecimento/${a.slug}`,
    type: "article",
  });
}

export default async function ArtigoPage({ params }: PageProps<"/conhecimento/[slug]">) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const related = getArticles().filter((x) => x.slug !== a.slug).slice(0, 2);

  return (
    <>
      <ReadingProgress />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.excerpt,
          datePublished: a.date,
          author: { "@type": "Organization", name: a.author },
          publisher: { "@type": "Organization", name: site.legalName },
          mainEntityOfPage: `${site.url}/conhecimento/${a.slug}`,
        }}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Início", path: "/" },
          { name: "Conhecimento", path: "/conhecimento" },
          { name: a.title, path: `/conhecimento/${a.slug}` },
        ])}
      />
      <PageHero
        compact
        crumbs={[
          { label: "Início", href: "/" },
          { label: "Conhecimento", href: "/conhecimento" },
          { label: a.category },
        ]}
        kicker={a.category}
        title={a.title}
        lead={a.excerpt}
      >
        <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-300">
          <span className="font-extrabold text-white">{a.author}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={a.date}>{formatDate(a.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{a.readingMinutes} min de leitura</span>
          {a.status === "rascunho" && (
            <span className="ml-2">
              <PendingBadge tone="dark">Rascunho editorial</PendingBadge>
            </span>
          )}
        </p>
      </PageHero>

      <article className="bg-white">
        <div className="container-spac py-16 md:py-24">
          <div
            className="prose-spac mx-auto"
            // Conteúdo vem de arquivos Markdown versionados no repositório (fonte confiável).
            dangerouslySetInnerHTML={{ __html: a.html }}
          />
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-gray-200 bg-paper py-20 md:py-24">
          <div className="container-spac">
            <p className="t-kicker text-gray-600">Continue lendo</p>
            <div className="mt-10 grid gap-x-12 md:grid-cols-2">
              {related.map((r) => (
                <ArticleRow key={r.slug} a={r} />
              ))}
            </div>
          </div>
        </section>
      )}
      <CtaBand />
    </>
  );
}
