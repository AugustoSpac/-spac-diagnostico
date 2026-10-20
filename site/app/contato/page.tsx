import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Em } from "@/components/ui/SectionHeader";
import { site } from "@/content/site";
import { isContactConfigured } from "@/lib/contact-server";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contato",
  description:
    "Converse com um sócio da SPAC sobre o momento da sua empresa e onde está o maior potencial de resultado.",
  path: "/contato",
});

const steps = [
  {
    title: "Você conta o contexto",
    text: "Em poucas linhas, o momento da empresa e o que gostaria de resolver.",
  },
  {
    title: "Uma conversa executiva",
    text: "Um sócio da SPAC retorna para entender o cenário com profundidade.",
  },
  {
    title: "Uma proposta objetiva",
    text: "Se fizer sentido, apresentamos escopo, cronograma e entregáveis claros.",
  },
];

export default function ContatoPage() {
  const enabled = isContactConfigured();
  return (
    <>
      <PageHero
        compact
        kicker="Contato"
        title={
          <>
            Vamos conversar sobre <Em gold>o momento da sua empresa.</Em>
          </>
        }
        lead="Sem roteiro de vendas: uma conversa direta para entender o contexto e onde está o maior potencial de resultado."
      />
      <section className="bg-paper py-20 md:py-28">
        <div className="container-spac grid grid-cols-1 gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="t-kicker text-gray-600">Como funciona</p>
            <ol className="mt-8 border-t-2 border-graphite-900">
              {steps.map((s, i) => (
                <li key={s.title} className="border-b border-gray-200 py-6">
                  <p className="t-kicker text-gold-text">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="t-h4 mt-3 text-graphite-900">{s.title}</h2>
                  <p className="mt-2 text-graphite-700">{s.text}</p>
                </li>
              ))}
            </ol>
            {site.contactEmail && (
              <div className="mt-10">
                <p className="t-kicker text-gray-600">E-mail</p>
                <a
                  href={`mailto:${site.contactEmail}`}
                  className="mt-3 inline-block text-lg font-extrabold text-graphite-900 underline decoration-gold decoration-2 underline-offset-4"
                >
                  {site.contactEmail}
                </a>
              </div>
            )}
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.1}>
            <ContactForm enabled={enabled} fallbackEmail={site.contactEmail} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
