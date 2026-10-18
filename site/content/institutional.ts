/**
 * Conteúdo institucional — extraído de spac-decks/scripts/spac-institucional.js
 * (método, propósito, valores, sócios). Não reescrever sem aprovação da SPAC.
 */

export type Stage = {
  letter: "S" | "P" | "A" | "C";
  name: string;
  subtitle: string;
  question: string;
  description: string;
  outputs: string[];
};

export const methodology: Stage[] = [
  {
    letter: "S",
    name: "Sonhar",
    subtitle: "Visão estratégica",
    question: "Onde queremos chegar?",
    description:
      "Definimos com os sócios e a liderança a ambição para o ciclo: onde atuar, como vencer e o que precisa ser verdade para chegar lá.",
    outputs: ["Visão e ambição", "Escolhas estratégicas", "Prioridades do ciclo"],
  },
  {
    letter: "P",
    name: "Planejar",
    subtitle: "Objetivos tangíveis",
    question: "Como vamos alcançar?",
    description:
      "Transformamos a ambição em metas, indicadores e um portfólio de iniciativas com responsáveis, prazos e recursos.",
    outputs: ["Metas e indicadores", "Iniciativas priorizadas", "Orçamento e responsáveis"],
  },
  {
    letter: "A",
    name: "Agir",
    subtitle: "Execução do plano",
    question: "Quem faz o quê, até quando?",
    description:
      "Conduzimos a implantação ao lado do time: projetos andando, processos redesenhados e decisões tomadas no ritmo certo.",
    outputs: ["Projetos em execução", "Processos e rotinas implantados", "Ganhos capturados"],
  },
  {
    letter: "C",
    name: "Controlar",
    subtitle: "Rituais de gestão",
    question: "Estamos no rumo certo?",
    description:
      "Instalamos a rotina que mantém o plano vivo: reuniões de resultado, análise de desvios e plano de ação.",
    outputs: ["Painel de indicadores", "Reuniões de resultado", "Correção de rota"],
  },
];

export const methodologyClosing =
  "O ciclo não termina em Controlar: o que se aprende no controle realimenta o próximo sonho.";

export const values = [
  {
    title: "Foco total no cliente",
    description:
      "Priorizamos a necessidade do cliente, com conhecimento profundo e soluções de alto impacto.",
  },
  {
    title: "Alta performance como padrão",
    description:
      "Excelência em tudo, com resultados inegociáveis e alinhamento entre teoria e prática.",
  },
  {
    title: "Pensamento de longo prazo",
    description:
      "Visão sustentável que combina inovação e controle para crescer com gestão eficaz.",
  },
  {
    title: "Mentalidade empreendedora",
    description:
      "Agimos como donos: buscamos oportunidade, assumimos risco calculado e inovamos.",
  },
  {
    title: "Ambiente positivo e colaborativo",
    description:
      "Valorizamos relação, energia positiva e desenvolvimento contínuo de quem está ao redor.",
  },
];

export type Partner = {
  name: string;
  role: string;
  highlights: string[];
  /** Caminho da foto em /public. Nulo = moldura neutra com aviso de foto pendente. */
  photo: string | null;
};

export const partners: Partner[] = [
  {
    name: "Vinícius Aroeira",
    role: "Sócio · Estratégia, Finanças e Tecnologia",
    highlights: [
      "C-level (CFO e CTO) em empresa de faturamento superior a R$ 5 bi",
      "Mais de R$ 1,2 bi em ganhos financeiros e operacionais gerados",
      "Liderança em M&A com forte geração de valor",
      "Expansão digital multiplicando receita em mais de 30×",
      "Projetos no Brasil, EUA, México e Peru",
    ],
    photo: null,
  },
  {
    name: "Augusto Teixeira",
    role: "Sócio · Comercial, Digital e CRM",
    highlights: [
      "Mais de 10 anos em gestão comercial, orçamentária e CRM",
      "Mais de R$ 600 mi em valor gerado por ganhos de gestão",
      "Crescimento de 30× nas vendas digitais",
      "Orçamento anual de R$ 30 mi em marketing (empresa de R$ 4 bi)",
      "Aumento de 300% na base de clientes ativos via CRM",
    ],
    photo: null,
  },
];

/** Indicadores institucionais exibidos na seção de credibilidade. */
export const credibilityStats = [
  { value: 500, prefix: "R$ ", suffix: " mi", label: "em ganhos de gestão no Grupo Supernosso", gold: true },
  { value: 30, prefix: "", suffix: "×", label: "crescimento das vendas digitais, com três e-commerces" },
  { value: 30, prefix: "", suffix: " anos", label: "de experiência executiva somada entre os sócios" },
  { value: 4, prefix: "", suffix: " países", label: "com projetos: Brasil, EUA, México e Peru" },
];

export const problems = [
  {
    title: "Crescimento sem controle",
    symptom: "A empresa vende mais, mas margem, caixa e estrutura não acompanham o ritmo.",
    answer: "Metas, orçamento e rotinas de resultado que reequilibram crescimento e rentabilidade.",
    solution: "performance",
  },
  {
    title: "Estratégia que não vira execução",
    symptom: "O plano existe, mas não chega à rotina das áreas nem às decisões do dia a dia.",
    answer: "Desdobramento de metas e rituais de gestão que conectam o plano à operação.",
    solution: "estrategia",
  },
  {
    title: "Baixa produtividade",
    symptom: "Esforço alto, retrabalho e decisões lentas consomem a capacidade do time.",
    answer: "Eficiência operacional e redesenho de processos, com ganho medido.",
    solution: "performance",
  },
  {
    title: "Indicadores pouco confiáveis",
    symptom: "Cada área tem um número, e as reuniões discutem o dado em vez da decisão.",
    answer: "Um painel único de indicadores, com fonte, responsável e rotina de análise.",
    solution: "performance",
  },
  {
    title: "Processos pouco estruturados",
    symptom: "A operação depende de pessoas-chave, e não de padrões claros.",
    answer: "Mapeamento e padronização dos processos críticos, com IA onde houver ganho real.",
    solution: "transformacao",
  },
  {
    title: "Gestão difícil de profissionalizar",
    symptom: "Os sócios concentram as decisões, e a empresa não ganha autonomia para crescer.",
    answer: "Governança, papéis e rotinas que distribuem a decisão sem perder o controle.",
    solution: "estrategia",
  },
] as const;

export const differentials = [
  {
    title: "Senioridade na linha de frente",
    description:
      "Quem desenha o projeto é quem conduz. Profissionais com experiência executiva real, presentes nas decisões.",
  },
  {
    title: "Método proprietário",
    description:
      "O ciclo SPAC (Sonhar, Planejar, Agir e Controlar) organiza cada projeto, do diagnóstico à rotina.",
  },
  {
    title: "IA integrada à entrega",
    description:
      "Usamos inteligência artificial em análise, documentação e acompanhamento. A eficiência vira agilidade e preço competitivo.",
  },
  {
    title: "Foco na implantação",
    description:
      "O trabalho termina com a mudança funcionando e o resultado medido, não com um relatório.",
  },
];

export const modelComparison = [
  {
    topic: "Quem conduz",
    conventional: "Equipes extensas, com sêniores distantes do dia a dia",
    spac: "Sócios e profissionais sêniores na linha de frente",
  },
  {
    topic: "O que se entrega",
    conventional: "Diagnóstico e recomendações",
    spac: "Plano implantado e rotina de gestão funcionando",
  },
  {
    topic: "Estrutura",
    conventional: "Pirâmide grande, custo alto",
    spac: "Estrutura enxuta, potencializada por inteligência artificial",
  },
  {
    topic: "Relação",
    conventional: "Distância entre quem vende e quem executa",
    spac: "Proximidade com a liderança do início ao fim",
  },
];

export const sectors = ["Varejo", "Distribuição", "Indústria", "Serviços", "Construção"];
