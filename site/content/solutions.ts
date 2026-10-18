export type Service = { name: string; description: string };

export type Solution = {
  slug: "estrategia" | "performance" | "transformacao";
  index: string;
  name: string;
  /** Etapas do ciclo SPAC em que a frente atua com mais força. */
  letters: string;
  cycleNote: string;
  tagline: string;
  summary: string;
  bestFor: string;
  questions: string[];
  services: Service[];
  deliverables: string[];
  relatedCases: string[];
};

export const solutions: Solution[] = [
  {
    slug: "estrategia",
    index: "01",
    name: "Estratégia",
    letters: "S · P",
    cycleNote: "Atua com mais força em Sonhar e Planejar",
    tagline: "Direção clara e um plano que a organização consegue executar.",
    summary:
      "Construímos com os sócios e a liderança a ambição para o próximo ciclo, as escolhas que a sustentam e o desdobramento em metas que chegam à rotina das áreas.",
    bestFor:
      "Empresas que cresceram, mudaram de patamar ou precisam alinhar sócios e liderança sobre o próximo ciclo.",
    questions: [
      "Onde queremos estar nos próximos anos?",
      "Quais escolhas sustentam essa ambição?",
      "Como a estratégia chega à rotina das áreas?",
    ],
    services: [
      {
        name: "Planejamento estratégico",
        description:
          "Visão, ambição e escolhas de onde atuar e como vencer, construídas com os sócios e a liderança.",
      },
      {
        name: "Modelo de negócio e proposta de valor",
        description:
          "Revisão de como a empresa gera, entrega e captura valor, e de onde está a vantagem competitiva.",
      },
      {
        name: "Objetivos, metas e indicadores",
        description:
          "Ambição traduzida em poucas metas mensuráveis, com indicadores que a liderança acompanha.",
      },
      {
        name: "Desdobramento e implantação da estratégia",
        description:
          "Metas desdobradas por área e responsável, com rituais que mantêm o plano vivo ao longo do ano.",
      },
    ],
    deliverables: [
      "Ambição e escolhas estratégicas para o ciclo",
      "Metas e indicadores desdobrados por área",
      "Portfólio de iniciativas priorizadas",
      "Calendário de rituais de acompanhamento",
    ],
    relatedCases: ["grupo-supernosso"],
  },
  {
    slug: "performance",
    index: "02",
    name: "Performance",
    letters: "A · C",
    cycleNote: "Atua com mais força em Agir e Controlar",
    tagline: "Resultado previsível, sustentado por rotina, processo e indicador.",
    summary:
      "Organizamos a gestão comercial, os indicadores e as rotinas que tornam o resultado previsível, e capturamos ganhos de eficiência com medição clara.",
    bestFor:
      "Empresas que crescem, mas sentem a margem, a produtividade ou a previsibilidade comercial escaparem.",
    questions: [
      "Onde estão as maiores perdas de margem e produtividade?",
      "Os indicadores que usamos são confiáveis?",
      "A rotina de gestão corrige desvios a tempo?",
    ],
    services: [
      {
        name: "Gestão comercial",
        description: "Funil, carteira, política comercial e rotina da força de vendas.",
      },
      {
        name: "Gestão por resultados e indicadores",
        description:
          "Painel de indicadores confiáveis, metas e reuniões de resultado com plano de ação.",
      },
      {
        name: "Eficiência operacional",
        description: "Identificação de perdas e desperdícios, com ganhos capturados e medidos.",
      },
      {
        name: "Processos e rotinas de gestão",
        description:
          "Padrões, responsáveis e rituais que fazem a operação funcionar sem depender de pessoas-chave.",
      },
      {
        name: "Diagnóstico de maturidade",
        description:
          "Leitura objetiva de onde a gestão está e de onde vem o maior potencial de ganho.",
      },
      {
        name: "Gestão financeira e desempenho econômico",
        description:
          "Orçamento, gestão de despesas e leitura econômica do negócio para decidir melhor.",
      },
    ],
    deliverables: [
      "Diagnóstico com potencial de ganho priorizado",
      "Painel de indicadores e rotina de reuniões de resultado",
      "Processos críticos redesenhados e padronizados",
      "Plano de captura de ganhos com acompanhamento",
    ],
    relatedCases: ["grupo-supernosso", "expand-bebidas"],
  },
  {
    slug: "transformacao",
    index: "03",
    name: "Transformação",
    letters: "S · P · A · C",
    cycleNote: "Percorre o ciclo completo",
    tagline: "Mudanças complexas conduzidas do desenho à implantação.",
    summary:
      "Estruturamos e conduzimos projetos estratégicos, redesenhamos processos e incorporamos inteligência artificial à gestão, com governança até a mudança se sustentar.",
    bestFor:
      "Empresas que precisam executar projetos críticos, reorganizar processos ou incorporar IA à gestão.",
    questions: [
      "Os projetos críticos estão andando no ritmo necessário?",
      "Quais processos travam a operação?",
      "Onde a inteligência artificial gera retorno real para a gestão?",
    ],
    services: [
      {
        name: "Implantação e gestão de projetos estratégicos",
        description: "Projetos críticos estruturados, priorizados e conduzidos até a entrega.",
      },
      {
        name: "PMO",
        description:
          "Escritório de projetos com governança, cadência e visibilidade para a liderança.",
      },
      {
        name: "Transformação de processos",
        description:
          "Mapeamento da situação atual e redesenho dos processos que travam a operação.",
      },
      {
        name: "Inteligência artificial aplicada à gestão",
        description:
          "Mapeamento de processos com potencial de IA e implantação de casos de uso com retorno claro.",
      },
      {
        name: "Apoio à implementação de mudanças organizacionais",
        description: "Estrutura, papéis e comunicação para que a mudança se sustente.",
      },
    ],
    deliverables: [
      "Portfólio de projetos e governança de PMO",
      "Processos mapeados e redesenhados",
      "Casos de uso de IA priorizados por retorno",
      "Plano de mudança com acompanhamento da implantação",
    ],
    relatedCases: ["grupo-supernosso"],
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
