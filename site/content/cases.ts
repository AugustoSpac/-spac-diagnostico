/**
 * Cases.
 * Regra: nunca inventar resultados. Métricas vêm do material institucional oficial (spac-decks).
 * Clientes são apresentados de forma anônima (por setor) até haver autorização formal para citar o nome.
 * Campos ainda não validados podem receber `pending: true` (selo visível só em pré-visualização).
 */
export type CaseMetric = { value: string; label: string; context?: string };

export type CaseField = { text: string; pending?: boolean };

export type CaseStudy = {
  slug: string;
  /** Identificação pública do cliente (anônima, por setor, sem autorização para citar o nome). */
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
  source?: string;
  /** Semente da arte de capa (TrajectoryArt). */
  artSeed: number;
  /** true = cita o nome do cliente; exige autorização formal antes de publicar. */
  needsClientApproval: boolean;
};

export const cases: CaseStudy[] = [
  {
    slug: "varejo-alimentar",
    client: "Rede varejista do setor alimentar",
    sector: "Varejo alimentar",
    fronts: ["performance", "transformacao", "estrategia"],
    title: "R$ 500 milhões em ganhos de gestão no varejo alimentar",
    headline: { value: "R$ 500 mi", label: "em ganhos de gestão" },
    context: {
      text: "Grupo varejista do setor alimentar, com operação em múltiplos canais e frentes simultâneas de crescimento.",
    },
    challenge: {
      text: "Crescer com ganho de margem e eficiência enquanto o grupo expandia canais digitais, relacionamento com clientes e operações de M&A.",
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
    source:
      "Fonte: apuração do cliente. Ganhos acumulados em vendas, margem, despesas e perdas. Cliente não identificado por confidencialidade.",
    artSeed: 7,
    needsClientApproval: false,
  },
];

/** Espaços reservados para novos cases — exibidos como "em preparação", sem link. */
export const upcomingCases = [
  { sector: "Indústria", note: "Case em preparação" },
  { sector: "Distribuição", note: "Case em preparação" },
];

/** Resultados adicionais do portfólio (material institucional oficial), sem identificar clientes. */
export const portfolioResults = [
  "Aumento de 1000% na arrecadação de verbas de fornecedores",
  "Mais de R$ 600 mi em valor gerado por ganhos de gestão",
  "Aumento de 300% na base de clientes ativos via CRM",
  "Gestão transformada em 6 meses em uma empresa do setor de bebidas",
];

export function getCase(slug: string) {
  return cases.find((c) => c.slug === slug);
}
