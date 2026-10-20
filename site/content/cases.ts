/**
 * Cases.
 * Regra: nunca inventar resultados. Métricas vêm do material institucional oficial (spac-decks)
 * ou de informação fornecida diretamente pela SPAC.
 * Clientes são apresentados de forma anônima (por setor) até haver autorização formal para citar o nome.
 * Campos ainda não validados podem receber `pending: true` (selo visível só em pré-visualização).
 */
export type CaseMetric = { value: string; label: string; context?: string };

export type CaseField = { text: string; pending?: boolean };

/** Frente de trabalho do projeto (título + entregas/atividades). */
export type CaseStream = { title: string; items: string[] };

export type CaseStudy = {
  slug: string;
  /** Identificação pública do cliente (anônima, por setor, sem autorização para citar o nome). */
  client: string;
  sector: string;
  fronts: Array<"estrategia" | "performance" | "transformacao">;
  title: string;
  /** Destaque numérico do card. */
  headline: CaseMetric;
  context?: CaseField;
  challenge: { paragraphs: string[]; pending?: boolean };
  /** "Nossa atuação": lista simples (items) ou frentes de trabalho (streams), com abertura opcional. */
  solution: { intro?: string; items?: string[]; streams?: CaseStream[]; pending?: boolean };
  results: CaseMetric[];
  /** Texto que interpreta os resultados. */
  resultsSummary?: string;
  /** Fechamento: o que a SPAC fez de diferente neste projeto. */
  differential?: string;
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
      paragraphs: [
        "Crescer com ganho de margem e eficiência enquanto o grupo expandia canais digitais, relacionamento com clientes e operações de M&A.",
      ],
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
  {
    slug: "industria-bens-de-consumo",
    client: "Indústria nacional de bens de consumo não duráveis",
    sector: "Indústria de bens de consumo",
    fronts: ["estrategia", "performance"],
    title: "Reestruturação da estratégia comercial e de marketing para retomada do crescimento",
    headline: { value: "+20%", label: "de crescimento sobre o ano anterior" },
    challenge: {
      paragraphs: [
        "Uma indústria nacional de bens de consumo não duráveis, com presença em diferentes canais de distribuição, enfrentava uma desaceleração do crescimento e uma perda de competitividade em determinadas categorias.",
        "Apesar de contar com um portfólio consolidado e oportunidades relevantes de expansão, a empresa apresentava desafios na eficiência do modelo de distribuição, na execução comercial nos pontos de venda e na estruturação das iniciativas de marketing.",
        "Era necessário revisar as alavancas de crescimento, fortalecer a conexão entre estratégia comercial e marketing e estabelecer prioridades claras para a organização.",
      ],
    },
    solution: {
      intro:
        "A SPAC conduziu um projeto de revisão estratégica comercial e de marketing, combinando análises internas, inteligência de mercado e construção conjunta de soluções com a liderança executiva e o conselho. O trabalho foi estruturado em quatro frentes.",
      streams: [
        {
          title: "Diagnóstico de performance comercial",
          items: [
            "Análise histórica de faturamento, volumes, clientes e canais",
            "Avaliação do modelo de distribuição e execução nos pontos de venda",
            "Identificação dos principais gargalos de crescimento",
          ],
        },
        {
          title: "Análise estratégica e de mercado",
          items: [
            "Avaliação das tendências de consumo, concorrência e posicionamento da marca",
            "Construção da matriz SWOT e cruzamento de oportunidades e riscos",
            "Identificação das principais alavancas de expansão",
          ],
        },
        {
          title: "Redefinição das prioridades comerciais e de marketing",
          items: [
            "Revisão do modelo de distribuição e dos mecanismos de incentivo",
            "Diretrizes para fortalecimento da liderança comercial e da estrutura de marketing",
            "Priorização de iniciativas de execução no ponto de venda, posicionamento da marca e expansão de canais",
          ],
        },
        {
          title: "Plano de ação e governança",
          items: [
            "Desdobramento das prioridades estratégicas em iniciativas práticas",
            "Definição de responsáveis, prazos e direcionadores de execução",
            "Alinhamento das decisões entre conselho e gestão executiva",
          ],
        },
      ],
    },
    results: [
      { value: "+20%", label: "de crescimento", context: "Em relação ao ano anterior" },
    ],
    resultsSummary:
      "O trabalho estabeleceu um direcionamento estratégico para a retomada do crescimento, com prioridades comerciais e de marketing mais claras e um plano de ação estruturado para sustentar a evolução do negócio.",
    differential:
      "Mais do que formular recomendações estratégicas, a SPAC conectou diagnóstico, decisões executivas e planejamento da execução, traduzindo desafios complexos de mercado em prioridades e ações objetivas para o negócio.",
    source: "Cliente não identificado por confidencialidade.",
    artSeed: 41,
    needsClientApproval: false,
  },
];

/** Espaços reservados para novos cases — exibidos como "em preparação", sem link. */
export const upcomingCases = [{ sector: "Distribuição", note: "Case em preparação" }];

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
