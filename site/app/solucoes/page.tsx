import { CtaBand } from "@/components/sections/CtaBand";
import { Problems } from "@/components/sections/home";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Em } from "@/components/ui/SectionHeader";
import { solutions } from "@/content/solutions";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Soluções",
  description:
    "Estratégia, Performance e Transformação: as três frentes de atuação da SPAC para levar empresas de médio porte do plano ao resultado.",
  path: "/solucoes",
});

export default function SolucoesPage() {
  return (
    <>
      <PageHero
        kicker="Soluções"
        title={
          <>
            Três frentes para levar a empresa <Em gold>do plano ao resultado.</Em>
          </>
        }
        lead="Atuamos na frente que o momento da empresa pede, isoladamente ou em combinação. Em todas, o trabalho só termina com a mudança implantada."
      />

      {solutions.map((s, i) => (
        <section
          key={s.slug}
          aria-labelledby={`sol-${s.slug}`}
          className={`section-y ${i % 2 === 0 ? "bg-paper" : "border-t border-gray-200 bg-white"}`}
        >
          <div className="container-spac grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="t-kicker text-gray-600">
                <span className="text-gold-text">{s.index} — </span>
                {s.letters}
              </p>
              <div className="rule mt-5 text-graphite-900" />
              <h2
                id={`sol-${s.slug}`}
                className="mt-10 text-[clamp(2.75rem,2rem+3vw,4.75rem)] leading-none font-extrabold tracking-[-0.035em] text-graphite-900"
              >
                {s.name}
              </h2>
              <p className="t-lead mt-6 max-w-[30ch] text-graphite-900">{s.tagline}</p>
              <p className="mt-5 max-w-[46ch] text-graphite-700">{s.summary}</p>
              <ButtonLink href={`/solucoes/${s.slug}`} variant="dark" className="mt-10">
                Explorar {s.name}
              </ButtonLink>
            </Reveal>
            <Reveal className="lg:col-span-7 lg:pt-16" delay={0.1}>
              <p className="t-kicker text-gray-600">O que fazemos</p>
              <ul className="mt-6 grid border-t border-gray-200 sm:grid-cols-2 sm:gap-x-10">
                {s.services.map((sv) => (
                  <li key={sv.name} className="border-b border-gray-200 py-5">
                    <h3 className="font-extrabold text-graphite-900">{sv.name}</h3>
                    <p className="mt-1.5 text-[0.9375rem] text-graphite-700">{sv.description}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[0.9375rem] text-gray-600">
                <span className="font-extrabold text-graphite-900">Indicado para: </span>
                {s.bestFor}
              </p>
            </Reveal>
          </div>
        </section>
      ))}

      <Problems index="" />
      <CtaBand
        title={
          <>
            Não sabe por onde começar? <Em gold>Comece por um diagnóstico.</Em>
          </>
        }
        lead="Uma leitura objetiva da maturidade de gestão da empresa mostra onde está o maior potencial de resultado e qual frente deve vir primeiro."
      />
    </>
  );
}
