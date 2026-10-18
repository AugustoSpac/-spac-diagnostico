---
name: spac-web
description: "Sistema de design e diretrizes do site institucional da SPAC Gestão (Next.js + Tailwind + Motion). Use sempre que o pedido envolver o site da SPAC: criar ou alterar páginas, seções, componentes, cases, artigos, landing pages, formulários, animações, SEO ou publicação na Vercel; também para revisar, auditar ou padronizar qualquer peça web da SPAC (e-mail marketing em HTML, landing de evento, página de diagnóstico). Complementa o spac-decks (identidade oficial) e nunca o substitui."
---

# SPAC Web — Sistema do site institucional

Você é ao mesmo tempo diretor de criação e engenheiro front-end do site da SPAC. Este skill garante que toda evolução do site preserve a identidade oficial (spac-decks), o posicionamento e o nível de acabamento da versão 1.

Princípio-mestre: **uma seção = uma mensagem = um título que já entrega a conclusão**, com o trecho-chave em ExtraBold.

## Relação com o spac-decks

| Camada | Dono | Regra |
|---|---|---|
| Logos, cores de marca, família tipográfica | **spac-decks** (oficial) | Nunca alterar aqui |
| Adaptação para web: escala fluida, motion, grid responsivo, componentes | **spac-web** | Este skill |
| Conflito entre os dois | spac-decks vence | Registre o conflito e pergunte |

Se o spac-decks estiver disponível, carregue `references/design-system.md` dele quando houver dúvida de marca. Não altere o spac-decks.

## Onde está o código

```
site/                      Next.js 16 (App Router, cacheComponents) + Tailwind v4 + Motion
  app/                     Rotas (uma pasta por página; [slug] para cases, soluções e artigos)
  app/globals.css          TOKENS — fonte única de cores, tipografia fluida, utilitários
  components/ui            Primitivos: Button, SectionHeader/Em, Reveal/Stagger, CountUp, Pending, Icons
  components/cards         CaseCard, ArticleFeature/ArticleRow, SolutionCard
  components/sections      Seções compostas (home.tsx, about.tsx, PageHero, CtaBand, MethodologyCycle)
  components/graphics      TrajectoryArt (capas), HeroTrajectory (hero animado)
  content/                 CMS em arquivos: site.ts, solutions.ts, cases.ts, institutional.ts
  content/conhecimento/    Artigos em Markdown com frontmatter
```

## Fluxo obrigatório para qualquer mudança

1. **Enquadrar:** qual página, qual mensagem, qual ação esperada do visitante.
2. **Conteúdo primeiro:** altere `content/` (nunca texto solto em componente quando for conteúdo editorial).
3. **Reusar componentes:** procure em `components/` antes de criar. Componente novo só se o padrão aparecer 2+ vezes.
4. **Aplicar tokens:** só classes do tema (`bg-paper`, `text-gold-text`, `t-h2`…). Nenhum HEX solto em componente, exceto SVG decorativo.
5. **Testar:** `npm run lint && npx tsc --noEmit && npm run build`, depois capturas em 390 / 768 / 1440 px (ver `references/tech.md`).
6. **QA:** checklist em `references/accessibility.md` e `references/content.md`.

## Regras inegociáveis (violar = refazer)

1. **Tipografia só Nunito** (400 e 800; 600 para UI). Fallback Arial. Nenhuma outra família.
2. **Ouro nunca é texto sobre fundo claro**, exceto `gold-text` (#8A6A05). Champagne (#F3D7A6) só em fundo escuro.
3. **Sobre preenchimento dourado, texto preto** `ink` (#030405). Nunca branco.
4. **Logo oficial, sem distorção**: versão `dark-bg` (branco+ouro) em fundo escuro, `principal` em fundo claro; largura mínima 72 px.
5. **Fundo escuro é âmbar** (`bg-spac-dark` / `bg-spac-dark-corner`), nunca preto chapado.
6. **Título-conclusão em peso misto**: regular + `<Em>` (ExtraBold). Máx. 3 linhas no desktop.
7. **Régua**: todo cabeçalho de seção usa `SectionHeader` (kicker numerado + régua de linha única).
8. **Ouro é bisturi (~5%)**: um destaque dourado por bloco. Card em destaque = borda gold + fundo gold-veil, sem barra de topo.
9. **Nunca inventar dados**: números, clientes, depoimentos e logos só com fonte. Clientes anônimos por padrão. Placeholder só na pré-visualização (`PendingBadge`); no site publicado, omitir.
10. **Nenhum link ou botão falso**: todo link leva a uma rota existente; o formulário só se apresenta como funcional com a integração configurada.
11. **Movimento respeita `prefers-reduced-motion`** e nunca esconde conteúdo sem JS (hero anima por CSS; seções usam `Reveal`).
12. **Sem emojis, sem gradientes decorativos, sem sombras pesadas, sem ícones genéricos por seção.** A assinatura gráfica é a **trajetória** (o traço da estrela do logo).
13. **Alternância de fundos**: escuro → claro → branco → escuro… Nunca duas seções escuras seguidas, exceto metodologia + CTA quando intencional.

## Decisões automáticas

- **Página nova:** `PageHero` (escuro) → 2–4 seções alternando `bg-paper`/`bg-white`/escuro → `CtaBand`. Registrar a rota em `app/sitemap.ts` e, se for de menu, em `content/site.ts`.
- **Case novo:** adicionar objeto em `content/cases.ts` (contexto, desafio, solução, resultados, fonte, `artSeed` único, `needsClientApproval`). A página e o card são gerados.
- **Artigo novo:** rascunho em `content/rascunhos/`; para publicar, `status: "publicado"` e mover para `content/conhecimento/`. Só artigos publicados aparecem no site.
- **Foto pendente:** monograma com as iniciais em círculo âmbar com anel dourado (automático quando `photo` é nulo), nunca retângulo vazio.
- **Imagem de capa sem foto real:** `TrajectoryArt` com `seed` novo. Fotos reais: cor natural, sem filtro dourado, overlay `ink` 55–70% quando houver texto por cima.

## Referências (carregue sob demanda)

| Arquivo | Quando ler |
|---|---|
| `references/tokens.md` | Sempre antes de estilizar — cores, tipografia fluida, espaçamento, raios, breakpoints |
| `references/components.md` | Ao criar/alterar seções, cards, botões, navegação |
| `references/motion.md` | Ao adicionar animação ou interação |
| `references/content.md` | Ao escrever texto, títulos, cases, artigos; tom de voz e pendências |
| `references/accessibility.md` | Antes de entregar — contraste, teclado, leitores de tela, checklist de QA |
| `references/tech.md` | Next.js 16 / cacheComponents, SEO, formulário, deploy na Vercel, testes |
| `assets/logos/` | Logos web recortados (principal e fundo escuro) |

## Hierarquia de conflitos

1. Identidade oficial (spac-decks: logos, cores de marca, Nunito)
2. Regras deste skill
3. Acessibilidade (WCAG 2.2 AA)
4. Boas práticas de web premium (referências: Disruptive Edge, Pentagram, BCG, McKinsey, Eden McCallum) — **inspiração de estrutura, nunca de marca**
