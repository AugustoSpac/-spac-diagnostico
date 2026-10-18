# Tokens de design — SPAC Web

Fonte única: `site/app/globals.css` (`@theme` do Tailwind v4). Status: **[OFICIAL]** spac-decks · **[OBSERVADO]** deck institucional · **[DERIVADO]** complemento técnico.

## 1. Cores

### Marca
| Token Tailwind | HEX | Status | Uso na web |
|---|---|---|---|
| `ink` | #030405 | OFICIAL | Texto sobre ouro; fundo de selo sobre foto. **Nunca fundo de seção** |
| `champagne` | #F3D7A6 | OFICIAL | Destaque de título e links em fundo escuro |
| `gold` | #E3AE0C | OBSERVADO | Botão primário em fundo escuro, régua ativa, marcadores, foco |
| `gold-deep` | #B78908 | OBSERVADO | Linhas da trajetória, bordas de apoio |
| `gold-text` | #8A6A05 | DERIVADO | **Único ouro de texto em fundo claro** (5,07:1) |
| `gold-veil` | #FBF3E3 | DERIVADO | Fundo de destaque claro, linha ativa, card destacado |

### Fundo escuro (âmbar)
| Token | HEX | Uso |
|---|---|---|
| `amber-950` | #100C04 | Base das seções escuras e rodapé |
| `amber-900` | #1A1206 | Card em fundo escuro |
| `amber-800` | #241906 | Card em hover / estado ativo |
| `amber-line` | #4A3A16 | Hairlines e bordas em fundo escuro |
| `bg-spac-dark` | utilitário | Âmbar + brilho dourado na base (equivalente web de `spac-bg-escuro.png`) |
| `bg-spac-dark-corner` | utilitário | Variante com brilho no canto inferior direito |

### Neutros
| Token | HEX | Uso |
|---|---|---|
| `graphite-900` | #1C1F22 | Títulos e texto forte em fundo claro; botão `dark` |
| `graphite-700` | #3A3F44 | Corpo de texto |
| `gray-600` | #5A6068 | Kicker, legenda, texto secundário (6,35:1) |
| `gray-500` | #8B9199 | Só ≥ 18 px bold ou elementos não-texto em fundo claro; kicker em fundo escuro |
| `gray-300` | #C9CDD2 | Corpo secundário em fundo escuro; bordas tracejadas |
| `gray-200` | #E4E7EA | Hairlines e bordas de card (claro); texto em fundo escuro |
| `gray-100` | #F5F6F7 | Card neutro |
| `paper` | #FAF9F7 | Fundo padrão claro |
| `white` | #FFFFFF | Seções alternadas, cards |

### Semânticas
`positive` #2E7D4F · `negative` #B3261E (erros de formulário e `PendingBadge`). Atenção: **não usar amarelo** (conflita com o ouro).

### Combinações proibidas
Champagne/ouro como texto sobre claro · branco sobre `gold` · `gray-500` em texto pequeno sobre claro · ouro sobre ouro · mais de 2 tons de ouro no mesmo bloco.

## 2. Tipografia

Família única: **Nunito** via `next/font/google` (variável `--font-nunito`), fallback Arial.

| Utilitário | Tamanho (fluido) | Peso | Uso |
|---|---|---|---|
| `t-display` | 44 → 128 px | 400 + `<Em>` 800 | Hero da home |
| `t-display-s` | 40 → 92 px | 400 + 800 | Hero de páginas internas, CTA, propósito |
| `t-h2` | 32 → 56 px | 400 + 800 | Título-conclusão de seção (máx. 26ch) |
| `t-h3` | 24 → 36 px | 800 | Título de card destacado, nome de sócio |
| `t-h4` | 19 → 24 px | 800 | Título de card, item de lista |
| `t-lead` | 18 → 22 px | 400 | Subtítulo, abertura de seção |
| corpo | 17 px / 1,65 | 400 | Texto corrido |
| `t-kicker` | 13 px, caixa alta, tracking 0,18em | 800 | Kicker/eyebrow, rótulos |
| `t-number` | 44 → 76 px | 800, tabular | KPIs |
| `prose-spac` | 18 px / 1,75 | — | Artigos (Markdown) |

Regras: tudo alinhado à esquerda (centralizar só KPI isolado); itálico só em citação; sublinhado só em links de texto corrido; nunca justificar; `text-wrap: balance` em títulos já está no base.

## 3. Espaço, grid e forma

- Container: `container-spac` (máx. 82rem = 1312 px; gutter fluido 20 → 56 px).
- Ritmo vertical de seção: `section-y` (80 → 144 px).
- Grid de página: 12 colunas no `lg` (`lg:grid-cols-12`); **sempre `grid-cols-1` no mobile** (trilha `minmax(0,1fr)` evita estouro horizontal).
- Proporções recorrentes: título 5 col + conteúdo 7 col; destaque 7 + lista 5.
- Escala de espaçamento: múltiplos de 4 px; entre elementos do mesmo grupo 8–16 px, entre grupos 24–40 px, entre blocos 64–80 px.
- Raio: `rounded-card` = 6 px (cards, botões, campos). Selos: 3 px. Círculos só para nós da metodologia e retratos.
- Bordas: 1 px `gray-200` (claro) / `amber-line` (escuro). Destaque: 1 px `gold`.
- Sombras: **nenhuma**. Profundidade vem de contraste de fundo e borda.

## 4. Breakpoints

`xs` 416 · `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280. Testar sempre em **390, 768 e 1440 px**. Navegação completa a partir de `lg`; abaixo, menu em tela cheia.
