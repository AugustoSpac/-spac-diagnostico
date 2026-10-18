# Componentes — SPAC Web

Todos em `site/components/`. Reutilize antes de criar.

## Primitivos (`components/ui`)

| Componente | Props principais | Regras |
|---|---|---|
| `ButtonLink` | `href`, `variant: gold \| dark \| outline-light \| outline-dark`, `arrow` | `gold` só em fundo escuro (texto `ink`); `dark` é o primário em fundo claro. Altura mínima 48 px. Máx. 2 botões lado a lado; o secundário é `outline-*` sem seta |
| `TextLink` | `href` | Link editorial com seta que avança no hover. Para "ver todos", "conheça os sócios" |
| `SectionHeader` | `index`, `kicker`, `title`, `lead`, `tone`, `aside`, `as` | Obrigatório em toda seção. `index` numera as seções da página (01, 02…). `aside` recebe o link "ver todos" |
| `Em` | `gold` | Trecho em ExtraBold do título. `gold` só em fundo escuro (vira champagne) |
| `Reveal` / `Stagger` / `StaggerItem` | `delay`, `stagger` | Entrada ao rolar. Não usar no hero (hero anima por CSS) |
| `CountUp` | `value`, `prefix`, `suffix` | KPIs; HTML do servidor já traz o valor final |
| `PendingBadge` | `children`, `tone` | Sinaliza conteúdo não validado. Obrigatório em todo placeholder |
| `Icons` | `ArrowRight`, `ArrowUpRight`, `ArrowLeft`, `MenuIcon`, `CloseIcon`, `Check` | Linha 1,75 px, cantos arredondados. Ícone só quando substitui uma palavra |
| `ReadingProgress` | — | Barra dourada de leitura (artigos) |

## Cards (`components/cards`)

| Card | Onde | Anatomia | Interação |
|---|---|---|---|
| `SolutionCard` | Fundo escuro | índice + letras do ciclo → nome → promessa → serviços (hairlines) → "Indicado para" → "Explorar" | Card inteiro clicável; hover: sobe 4 px, borda `gold`, fundo `amber-800`, seta avança |
| `CaseCard` (`default`/`feature`/`wide`) | Fundo claro | capa `TrajectoryArt` com setor + métrica sobreposta → cliente (kicker) → título-conclusão → "Ler o case" | Hover: arte com zoom 1,04 (1,2 s), borda `gold` |
| `UpcomingCaseCard` | Fundo claro | setor + "Case em preparação" | Sem link, borda tracejada |
| `ArticleFeature` / `ArticleRow` | Fundo claro | (capa clara) categoria · data · leitura → título → resumo → selo de rascunho | Hover: sublinhado dourado no título |

Não criar card com barra colorida no topo. Não repetir o mesmo card em 3 seções seguidas — alternar com listas editoriais (hairlines) e grades sem cards.

## Seções (`components/sections`)

| Seção | Uso |
|---|---|
| `HomeHero` | Só na home. Título em máscara palavra a palavra + `HeroTrajectory` + 2 CTAs + faixa de 3 provas |
| `PageHero` | Topo de toda página interna (escuro). Aceita `crumbs`, `children` (CTA, selos), `compact` |
| `Credibility` | KPIs (`CountUp`) + "experiência construída em" |
| `Problems` + `ProblemsList` | Lista editorial interativa (acordeão: hover/foco/toque) |
| `Solutions` | Grade de 3 `SolutionCard` |
| `CasesShowcase` | Destaque 7 col + lista 5 col |
| `Differentials` | Grade 4 col sem cards + tabela "Modelo convencional × Modelo SPAC" |
| `Methodology` + `MethodologyCycle` | Órbita S·P·A·C. Desktop: fixada e guiada pela rolagem. Mobile/movimento reduzido: abas |
| `Insights` | Artigo destaque + lista |
| `GapSection`, `StorySection`, `PurposeValues`, `PartnersSection` | Página Sobre |
| `CtaBand` | Fecha toda página. Título e lead customizáveis |

## Navegação

- **Header** (`components/layout/Header.tsx`): transparente sobre o hero escuro, sólido off-white com blur após 24 px de rolagem, esconde ao rolar para baixo (> 360 px) e volta ao rolar para cima. Link ativo com sublinhado; CTA "Iniciar conversa" sempre visível no desktop.
- **Menu mobile**: tela cheia âmbar, links grandes com seta, foco no primeiro link, `Esc` fecha e devolve o foco, conteúdo de trás fica `inert`, rolagem travada.
- **Footer**: logo `dark-bg`, posicionamento, colunas Soluções / Empresa / Contato, privacidade. E-mail e LinkedIn só aparecem se configurados.
- Ordem do menu: Soluções · Metodologia · Cases · Conhecimento · Sobre · [Iniciar conversa].

## Gráfico de assinatura: trajetória

`TrajectoryArt seed={n}` gera um feixe de curvas convergindo para um ponto focal (a estrela do logo). Determinístico por `seed` — use um `seed` diferente por case/artigo. `tone="light"` para capas em fundo claro (artigos). Não usar como enfeite em seção analítica; é capa, fundo de hero e de CTA.

## Formulário

`ContactForm` recebe `enabled` do servidor (`isContactConfigured()`). Campos: nome*, e-mail*, empresa*, cargo, telefone, faturamento, tema, contexto*, consentimento LGPD*, honeypot. Validação compartilhada em `lib/contact.ts` (cliente e API). Erros por campo com `aria-invalid` + `aria-describedby`; foco vai ao primeiro erro.
