# Acessibilidade e QA — SPAC Web

Meta: **WCAG 2.2 AA** e Lighthouse Acessibilidade 100 (resultado da v1).

## Regras

- **Contraste:** texto ≥ 4,5:1 (≥ 3:1 a partir de 24 px ou 18,66 px bold). Em fundo claro, ouro de texto só `gold-text`; `gray-500` não é texto pequeno. Em fundo escuro, corpo em `gray-200`/`gray-300`.
- **Semântica:** um `h1` por página (no hero); seções com `h2` via `SectionHeader`; listas reais (`ul/ol`); tabelas comparativas como `dl` responsivo.
- **Teclado:** tudo acessível por Tab; foco visível (`outline` 2 px `gold`, offset 3 px); "Pular para o conteúdo" é o primeiro foco; menu mobile com `Esc`, foco inicial e conteúdo de trás `inert`.
- **Componentes interativos:** acordeão com `button[aria-expanded]` + `aria-controls`; metodologia com `role=tablist/tab/tabpanel`, `aria-selected`, setas do teclado e `aria-live="polite"`.
- **Imagens:** logo com `alt="SPAC Gestão"`; artes de trajetória e SVGs decorativos com `aria-hidden`; retratos com `alt` do nome (placeholder com `alt=""`).
- **Números animados:** `CountUp` expõe o valor final para leitores de tela (`sr-only`).
- **Formulário:** `label` explícito, obrigatórios sinalizados, erro por campo com `aria-invalid` e `aria-describedby`, foco no primeiro erro, status com `role=status`/`alert`.
- **Movimento:** respeitar `prefers-reduced-motion` (Motion + CSS). Nenhuma informação depende de animação.
- **Toque:** alvos ≥ 44 px (botões têm 48 px).

## Checklist de entrega (rodar a cada mudança)

1. `npm run lint` e `npx tsc --noEmit` sem erros.
2. `npm run build` sem erros de prerender.
3. Capturas em **390 / 768 / 1440 px** de cada página alterada; sem estouro horizontal (`scrollWidth - innerWidth = 0`).
4. Console sem erros; todos os links internos respondem 200; rota inexistente responde 404.
5. Lighthouse (mobile): Acessibilidade 100, Boas práticas 100, Performance ≥ 90, SEO 100 com `NEXT_PUBLIC_ALLOW_INDEXING=true`.
6. Teste com `reducedMotion: "reduce"`: metodologia em abas, conteúdo visível.
7. Conteúdo: nenhum dado sem fonte; placeholders com `PendingBadge`; títulos-conclusão.
8. Marca: só Nunito, ouro como bisturi, logo correto para o fundo, fundo escuro âmbar.
