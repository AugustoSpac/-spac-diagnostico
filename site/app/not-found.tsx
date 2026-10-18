import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Em } from "@/components/ui/SectionHeader";

export default function NotFound() {
  return (
    <PageHero
      kicker="Erro 404"
      title={
        <>
          Esta página <Em gold>não foi encontrada.</Em>
        </>
      }
      lead="O endereço pode ter mudado ou não existir mais. Siga por um dos caminhos abaixo."
    >
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/">Ir para o início</ButtonLink>
        <ButtonLink href="/solucoes" variant="outline-light" arrow={false}>
          Ver soluções
        </ButtonLink>
        <ButtonLink href="/contato" variant="outline-light" arrow={false}>
          Falar com a SPAC
        </ButtonLink>
      </div>
    </PageHero>
  );
}
