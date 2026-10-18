# Relatório de testes — versão 1

Ambiente: build de produção (`next build` + `next start`), Chromium headless via Playwright, Lighthouse 12 (perfil mobile).

## Cobertura

- 12 rotas (todas as páginas, um exemplo de cada página dinâmica e uma rota inexistente) em **390 px, 768 px e 1440 px**, com página inteira capturada e revisada visualmente.
- Rolagem real (roda do mouse) para disparar animações de entrada.
- Metodologia fixada testada em 3 posições de rolagem e por clique nos nós.

## Resultados

| Verificação | Resultado |
|---|---|
| Lint (ESLint) e tipos (TypeScript) | Sem erros |
| Build de produção | 28 rotas estáticas; só a API `/api/contato` é dinâmica |
| Status HTTP | Todas as páginas 200; rota inexistente 404. Em rotas dinâmicas (`/cases/x`, `/solucoes/x`, `/conhecimento/x`), endereço desconhecido mostra a página "não encontrada" com `noindex` (comportamento do Next 16, resposta 200) |
| Erros de console | Nenhum |
| Estouro horizontal | Nenhum nas 3 larguras (após a correção 4 abaixo) |
| Links internos | 16 rotas únicas verificadas, nenhuma quebrada |
| Lighthouse Acessibilidade | 100 (home, sobre, case, contato) |
| Lighthouse Boas práticas | 100 |
| Lighthouse Performance | 92–97 · CLS 0 · TBT 40–120 ms · LCP 2,6–3,1 s (4G simulado) |
| Lighthouse SEO | 100 com indexação liberada. Na pré-visualização: 69, de propósito (noindex) |
| Menu mobile | Abre com foco no 1º link; `Esc` fecha e devolve o foco; fecha ao navegar; conteúdo de trás inerte |
| Teclado | "Pular para o conteúdo" é o 1º foco; abas da metodologia navegáveis por setas |
| Movimento reduzido | Metodologia vira abas; nenhum conteúdo depende de animação |
| API do formulário | 422 validação · 503 sem integração · 400 JSON inválido · honeypot descartado com 200 |
| Dependências de produção (`npm audit --omit=dev`) | 0 vulnerabilidades |

## Problemas encontrados e corrigidos

1. **Hero:** a linha mais brilhante da trajetória cruzava o parágrafo de apoio. A cauda agora esmaece com a distância da estrela, e no mobile a opacidade é reduzida.
2. **Faixa de conversão:** a arte de fundo não aparecia (conflito entre `relative` e `absolute`). Corrigido com um contêiner próprio.
3. **Títulos de seção** quebravam em 4 linhas no desktop. Largura máxima ajustada de 22ch para 26ch.
4. **Contato mobile:** estouro de 3 px causado pelo texto do botão desabilitado. Grids passaram a usar trilha `minmax(0,1fr)` e o rótulo pode quebrar linha.
5. **Listagem de cases:** card isolado em uma linha. Novo layout com destaque em largura total e 3 colunas abaixo, mais a variante `wide` do card.
6. **LCP:** logo do cabeçalho com `fetchPriority="high"`.
7. **Robustez sem JavaScript:** `<noscript>` garante que nada fique oculto à espera de animação.
8. **Menu mobile:** o Tab podia sair para o conteúdo de trás. O conteúdo agora fica `inert` com o menu aberto.
9. **Segurança:** `gray-matter` removido (cadeia com vulnerabilidade moderada) e substituído por um parser de frontmatter próprio.

## Limitações conhecidas

- Não foi possível testar o envio real de e-mail, porque não há credenciais da Resend.
- Testes feitos em Chromium; Safari e Firefox ainda não foram verificados. Recomenda-se checar no iPhone antes de publicar.
- As 5 vulnerabilidades "high" que restam no `npm audit` completo estão só em ferramentas de desenvolvimento (não vão para o site publicado).

## Versão de publicação (revisão 2)

- Clientes anonimizados (case "Rede varejista do setor alimentar", URL `/cases/varejo-alimentar`); case sem dados completos retirado da listagem e mantido como resultado anônimo do portfólio.
- Artigos-rascunho movidos para `site/content/rascunhos/`; a área Conhecimento saiu do menu, rodapé, home e sitemap até haver artigo publicado (a página `/conhecimento` mostra "em preparação").
- Selos internos visíveis só com `NEXT_PUBLIC_SHOW_PENDING=true`; retratos sem foto viram monograma.
- Formulário sem integração: aviso "Formulário disponível em breve".
- Indicadores: unidades menores que o número para evitar quebra de linha.
- Verificado: nenhuma página publicada contém nome de cliente ou selo interno; sem estouro horizontal em 390 e 1440 px; build, lint e tipos sem erros.
