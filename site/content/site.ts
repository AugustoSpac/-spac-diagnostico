/**
 * Configuração institucional do site.
 * Dados de contato e URLs sensíveis vêm de variáveis de ambiente (ver .env.example);
 * nada aqui deve ser inventado — campos sem confirmação ficam nulos.
 */
export const site = {
  name: "SPAC Gestão",
  legalName: "SPAC Gestão LTDA",
  /** Domínio inferido do e-mail corporativo — confirmar antes da publicação. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://spacgestao.com").replace(/\/$/, ""),
  locale: "pt_BR",
  tagline: "Estratégia que se transforma em resultado.",
  description:
    "Consultoria de gestão que combina experiência executiva, metodologias estruturadas e inteligência artificial para acelerar resultados de empresas de médio porte.",
  purpose: "Democratizar a transformação para todos que querem fazer a diferença.",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
  linkedinUrl: process.env.NEXT_PUBLIC_LINKEDIN_URL || null,
} as const;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Soluções", href: "/solucoes" },
  { label: "Metodologia", href: "/metodologia" },
  { label: "Cases", href: "/cases" },
  { label: "Conhecimento", href: "/conhecimento" },
  { label: "Sobre", href: "/sobre" },
];

export const ctaNav: NavItem = { label: "Iniciar conversa", href: "/contato" };
