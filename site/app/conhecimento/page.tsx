import { ArticleFeature, ArticleRow } from "@/components/cards/ArticleCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Em } from "@/components/ui/SectionHeader";
import { getArticles } from "@/lib/articles";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Conhecimento",
  description:
    "Artigos, estudos e publicações da SPAC sobre estratégia, performance, transformação e inteligência artificial aplicada à gestão.",
  path: "/conhecimento",
});

export default function ConhecimentoPage() {
  const [first, ...rest] = getArticles();
  return (
    <>
      <PageHero
        kicker="Conhecimento"
        title={
          <>
            Ideias práticas <Em gold>para quem decide.</Em>
          </>
        }
        lead="Artigos, estudos e publicações sobre estratégia, performance e transformação, escritos a partir da experiência em projetos."
      />
      <section className="section-y bg-paper">
        <div className="container-spac grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {first && (
            <Reveal className="lg:col-span-7">
              <ArticleFeature a={first} />
            </Reveal>
          )}
          <Reveal className="lg:col-span-5" delay={0.1}>
            <p className="t-kicker mb-8 text-gray-600">Mais recentes</p>
            {rest.map((a) => (
              <ArticleRow key={a.slug} a={a} />
            ))}
          </Reveal>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
