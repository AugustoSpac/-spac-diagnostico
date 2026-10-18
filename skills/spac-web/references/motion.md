# Movimento e interação — SPAC Web

Biblioteca: **Motion** (`motion/react`), com `MotionConfig reducedMotion="user"` no layout. CSS puro para o hero.

## Princípios

1. Movimento **conta a narrativa** (a trajetória chega à estrela; o ciclo se completa). Nunca enfeite.
2. Sutil e lento: deslocamentos curtos (18–28 px), durações longas (0,8–1,2 s), curva única.
3. Leitura primeiro: nada se move enquanto o usuário lê; animação acontece na entrada e no hover.
4. Sem JS, nada fica invisível (hero em CSS; `<noscript>` neutraliza `opacity:0`).
5. `prefers-reduced-motion: reduce` → sem deslocamento, sem fixação de rolagem; conteúdo aparece direto.

## Curva e durações

| Token | Valor |
|---|---|
| `--ease-spac` / `EASE` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Entrada de bloco (`Reveal`) | 0,9 s, y 28 → 0, opacity 0 → 1, viewport −12% |
| Stagger de itens | 0,08 s entre itens, 0,8 s cada |
| Hover de card | 0,5 s (borda, fundo, translateY −4 px) |
| Zoom de capa | 1,2 s, scale 1,03–1,04 |
| Header (sólido/oculto) | 0,5 s |
| Troca de etapa da metodologia | 0,45 s (fade + blur 6 px na letra, fade + y no painel) |

## Padrões

- **Hero (CSS):** palavras sobem de dentro de uma máscara (`.word-mask`, atraso 70 ms por palavra); linhas da trajetória desenham com `stroke-dashoffset` (`.traj-draw`, 2,4 s, escalonadas); ponto focal aparece e pulsa a cada 4,5 s (`.traj-pulse`); lead e CTAs com `.rise`.
- **Seções:** `SectionHeader` já entra com `Reveal`. Grades usam `Stagger` + `StaggerItem`.
- **KPIs:** `CountUp` conta uma vez ao entrar na viewport (1,6 s).
- **Metodologia:** desktop com movimento → contêiner de `100 + 70×4 vh`, interior `sticky` em 100svh; `useScroll` define a etapa ativa e o arco (`pathLength` com `useSpring`). Clique em nó rola até a etapa. Mobile/reduzido → abas (`role=tablist`, setas do teclado).
- **Lista de desafios:** acordeão com `grid-template-rows 0fr → 1fr` (0,5 s), abre por hover, foco ou toque.
- **Links:** seta translada 0,3 em; sublinhado do menu cresce da esquerda.

## Proibido

Parallax agressivo, scroll-jacking fora da metodologia, carrossel automático, texto em movimento contínuo, animação em loop chamativa (o único loop é o pulso discreto do ponto focal), cursor customizado, efeitos de partículas/"IA" genéricos.
