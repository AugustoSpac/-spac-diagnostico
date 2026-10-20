# Conteúdo e tom — SPAC Web

## Posicionamento (não alterar sem aprovação)

- **Quem somos:** consultoria de gestão. Não somos agência, software house nem produtora de apresentações.
- **Para quem:** sócios, CEOs e diretores de empresas de médio porte (foco R$ 5 mi a R$ 100 mi/ano), com experiência forte em varejo e distribuição, além de indústria e serviços.
- **Proposta de valor:** experiência executiva + metodologia estruturada + IA integrada aos processos + estrutura eficiente + proximidade da liderança + foco em implantação e resultado.
- **IA:** capacidade operacional que gera agilidade e preço competitivo — nunca o produto principal.
- **Método:** SPAC = Sonhar, Planejar, Agir, Controlar. "O ciclo não termina em Controlar: o que se aprende no controle realimenta o próximo sonho."
- **Propósito:** "Democratizar a transformação para todos que querem fazer a diferença."
- **Headline:** "Estratégia que se transforma em resultado."

## Frentes

| Frente | Letras | Promessa |
|---|---|---|
| Estratégia | S · P | Direção clara e um plano que a organização consegue executar |
| Performance | A · C | Resultado previsível, sustentado por rotina, processo e indicador |
| Transformação | S · P · A · C | Mudanças complexas conduzidas do desenho à implantação |

## Tom de voz

Executivo, seguro, objetivo, inteligente. Frases curtas, voz ativa, verbos concretos.

| Evitar | Preferir |
|---|---|
| "Soluções inovadoras e disruptivas" | "Metas desdobradas e rituais que fazem o plano acontecer" |
| "Transformação digital end-to-end" | "Processos redesenhados, com IA onde houver ganho real" |
| "Líder de mercado", superlativos | Número com fonte, ou nada |
| Ponto de exclamação, emoji, anglicismo evitável | — |
| "Sinergia", "alavancar", "holístico", "robusto" | — |

## Títulos

- Título-conclusão com verbo, de preferência com número. Ex.: "Resultado medido, não promessa." / "A empresa cresceu. **A gestão precisa acompanhar.**"
- Peso misto: regular + `<Em>` no trecho que carrega a conclusão.
- Kicker numerado (`01 — CREDIBILIDADE`) descreve a categoria; o título diz o que ela significa.
- Máximo ~110 caracteres; lead com até 2–3 linhas.

## Dados e provas — regra de ouro

- **Nunca inventar** clientes, logos, depoimentos, números, prazos ou datas.
- Todo número leva unidade e contexto ("R$ 500 mi em ganhos de gestão em uma rede do varejo alimentar") e, quando aplicável, a nota de fonte.
- Resultados da trajetória dos sócios em empregos anteriores são apresentados como **trajetória executiva**, não como case da SPAC.
- **Padrão do site: clientes anônimos**, identificados por setor ("Rede varejista do setor alimentar"). Citar o nome só com autorização formal (`needsClientApproval: true`).
- Conteúdo não validado leva `PendingBadge` (visível só com `NEXT_PUBLIC_SHOW_PENDING=true`, na pré-visualização). No site publicado, conteúdo sem dado real não entra: prefira omitir a mostrar placeholder.
- Números: padrão brasileiro (vírgula decimal, "R$ 4,2 mi", "30×", "+4,2 p.p.").

## Estrutura de case

Cliente (anônimo) · setor · frentes → **Contexto** (opcional) → **O desafio** (parágrafos) → **Nossa atuação** (abertura + frentes de trabalho numeradas, ou lista simples) → **Resultados** (KPIs com contexto + texto interpretativo) → **O diferencial SPAC** (opcional) → fonte. Os blocos se numeram sozinhos (`content/cases.ts`). Título no formato de conclusão.

## Artigos

Rascunhos ficam em `site/content/rascunhos/` (fora do site). Publicar = `status: "publicado"` + mover para `site/content/conhecimento/`. Sem artigo publicado, a área Conhecimento sai do menu, do rodapé, da home e do sitemap automaticamente.

Frontmatter: `title`, `excerpt` (≤ 200 caracteres), `category` (Estratégia, Performance, Transformação, Gestão), `date` (AAAA-MM-DD), `author`, `status` (`rascunho` | `publicado`), `artSeed`. Intertítulos `##`, listas curtas, um parágrafo = uma ideia. Fechar com aplicação prática ("Por onde começar").

## Conversão

CTA principal: "Iniciar uma conversa" / "Agendar uma conversa". Secundários: "Conhecer a SPAC", "Entender o método". Sem urgência artificial, sem "garanta já", sem promessas de prazo de resposta não confirmadas.
