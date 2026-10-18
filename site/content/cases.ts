/**
 * Cases.
 * Regra: nunca inventar resultados. Métricas vêm do material institucional oficial (spac-decks).
 * Campos ainda não validados ficam com `pending: true` e aparecem sinalizados no site.
 */
export type CaseMetric = { value: string; label: string; context?: string };

export type CaseField = { text: string; pending?: boolean };

export type CaseStudy = {
  slug: string;
  client: string;
  sector: string;
  fronts: Array<"estrategia" | "performance" | "transformacao">;
  title: string;
  /** Destaque numérico do card. */
  headline: CaseMetric;
  context: CaseField;
  challenge: CaseField;
  solution: { items: string[]; pending?: boolean };
  results: CaseMetric[];
  otherResults?: string[];
  source?: string;
  /** Semente da arte de capa (TrajectoryArt). */
  artSeed: number;
  /** Publicação depende de autorização formal do cliente. */
  needsClientApproval: boolean;
};

export const cases: CaseStudy[] = [
  {
    slug: "grupo-supernosso",
    client: "Grupo Supernosso",
    sector: "Varejo alimentar",
    fronts: ["performance", "transformacao", "estrategia"],
    title: "R$ 500 milhões em ganhos de gestão no varejo alimentar",
    headline: { value: "R$ 500 mi", label: "em ganhos de gestão" },
    context: {
      text: "Grupo varejista do setor alimentar, com operação em múltiplos canais e frentes simultâneas de crescimento.",
      pending: true,
    },
    challenge: {
      text: "Crescer com ganho de margem e eficiência enquanto o grupo expandia canais digitais, relacionamento com clientes e operações de M&A.",
      pending: true,
    },
    solution: {
      items: [
        "Gestão de vendas, margem, despesas e perdas com metas e rituais de acompanhamento",
        "Estruturação de três operações de e-commerce",
        "CRM e programa de assinatura para ampliar a base de clientes ativos",
        "Condução de três operações de M&A",
      ],
    },
    results: [
      {
        value: "R$ 500 mi",
        label: "em ganhos de gestão",
        context: "Vendas, margem, despesas e perdas",
      },
      { value: "30×", label: "crescimento no digital", context: "Com 3 e-commerces estruturados" },
      {
        value: "3×",
        label: "base de clientes ativos",
        context: "Via CRM e programa de assinatura",
      },
      { value: "10×", label: "crescimento em M&A", context: "3 operações concluídas" },
    ],
    source: "Fonte: apuração do cliente. Ganhos acumulados em vendas, margem, despesas e perdas.",
    artSeed: 7,
    needsClientApproval: true,
  },
  {
    slug: "expand-bebidas",
    client: "Expand Bebidas",
    sector: "Bebidas",
    fronts: ["performance"],
    title: "Gestão transformada em seis meses",
    headline: { value: "6 meses", label: "para transformar a gestão" },
    context: { text: "Contexto do cliente a ser fornecido pela SPAC.", pending: true },
    challenge: { text: "Desafio do projeto a ser fornecido pela SPAC.", pending: true },
    solution: {
      items: ["Escopo e frentes do trabalho a serem fornecidos pela SPAC."],
      pending: true,
    },
    results: [{ value: "6 meses", label: "para transformar a gestão" }],
    source: "Fonte: material institucional SPAC.",
    artSeed: 23,
    needsClientApproval: true,
  },
];

/** Espaços reservados para novos cases — exibidos como "em preparação", sem link. */
export const upcomingCases = [
  { sector: "Indústria", note: "Case em preparação" },
  { sector: "Distribuição", note: "Case em preparação" },
];

/** Resultados adicionais do portfólio (material institucional oficial). */
export const portfolioResults = [
  "Aumento de 1000% na arrecadação de verbas de fornecedores",
  "Mais de R$ 600 mi em valor gerado por ganhos de gestão",
  "Aumento de 300% na base de clientes ativos via CRM",
  "Gestão transformada em 6 meses na Expand Bebidas",
];

export function getCase(slug: string) {
  return cases.find((c) => c.slug === slug);
}
