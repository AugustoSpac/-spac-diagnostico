import { PageHero } from "@/components/sections/PageHero";
import { PendingBadge } from "@/components/ui/Pending";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Política de privacidade",
  description: "Como a SPAC Gestão trata os dados pessoais recebidos pelo site.",
  path: "/privacidade",
});

export default function PrivacidadePage() {
  return (
    <>
      <PageHero compact kicker="Privacidade" title="Política de privacidade">
        <PendingBadge tone="dark">Texto-base · revisão jurídica pendente</PendingBadge>
      </PageHero>
      <article className="bg-white">
        <div className="container-spac py-16 md:py-24">
          <div className="prose-spac mx-auto">
            <p>
              Esta política descreve como a {site.legalName} trata os dados pessoais recebidos por
              meio deste site, em conformidade com a Lei Geral de Proteção de Dados (Lei nº
              13.709/2018).
            </p>
            <h2>Quais dados coletamos</h2>
            <p>
              Apenas os dados informados voluntariamente no formulário de contato: nome, e-mail,
              empresa, cargo, telefone, faixa de faturamento, tema de interesse e a mensagem
              enviada.
            </p>
            <h2>Para que usamos</h2>
            <p>
              Exclusivamente para responder ao contato e conduzir a conversa comercial solicitada.
              Não vendemos nem compartilhamos esses dados com terceiros para fins de marketing.
            </p>
            <h2>Base legal e armazenamento</h2>
            <p>
              O tratamento se baseia no consentimento registrado no envio do formulário. Os dados
              são mantidos pelo tempo necessário ao relacionamento comercial e protegidos por
              medidas técnicas e administrativas adequadas.
            </p>
            <h2>Seus direitos</h2>
            <p>
              Você pode solicitar a qualquer momento acesso, correção ou exclusão dos seus dados, ou
              revogar o consentimento, pelo canal de contato indicado neste site.
            </p>
            <h2>Cookies</h2>
            <p>
              Este site não utiliza cookies de rastreamento ou publicidade. Caso ferramentas de
              análise sejam adotadas, esta política será atualizada.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
