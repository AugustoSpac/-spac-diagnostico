# Direção visual do site SPAC

Canvas de design (Claude Design) com as três propostas de homepage:
https://claude.ai/artifact/LFodicQCXMmCpqd9B1Wz8Y (privado; compartilhe pelo menu Share para outras pessoas abrirem)

## Fonte da identidade

Skill **spac-decks** (`references/design-system.md`, `scripts/spac-institucional.js`, `assets/`).

| Elemento | Status | Aplicação na web |
|---|---|---|
| 5 logos oficiais | Oficial | Recortados ao limite do desenho, sem alteração. `principal` em fundo claro, `fundo-escuro` em fundo escuro |
| Ouro Champagne #F3D7A6, Preto #030405 | Oficial | Champagne = destaque de título em fundo escuro; preto = texto sobre ouro |
| Nunito / Nunito ExtraBold | Oficial | Família única, via `next/font` |
| Ouro SPAC #E3AE0C, Ouro Profundo #B78908 | Observado | Botão primário, régua ativa, linhas da trajetória |
| Fundo âmbar com brilho dourado, neutros, Ouro Texto #8A6A05, Ouro Véu | Derivado | Recriados em CSS; tokens em `site/app/globals.css` |
| Título-conclusão em peso misto, kicker em caixa alta, régua de título | Padrão do sistema | `SectionHeader` + `Em` |
| Trajetória (feixe de curvas até um ponto focal) | **Nova, derivada do logo** | Assinatura gráfica do site: hero, capas de cases/artigos, CTA |
| Favicon (estrela do logo sobre âmbar) | Derivado | `app/icon.png` — validar com a SPAC |

## As três abordagens

| Critério | A · Executive Premium | B · AI-Native Consulting | C · Contemporary Strategy |
|---|---|---|---|
| Conceito | Off-white, tipografia monumental, quase sem cor, escuro só no rodapé | Âmbar dominante, rede de nós e dados, módulos com "status", cantos pílula | Hero e blocos-chave em âmbar alternando com seções editoriais claras; trajetória como assinatura |
| Credibilidade | Alta | Média: lembra startup de tecnologia | Alta |
| Diferenciação | Baixa: parecida com qualquer consultoria premium | Alta, mas pelo motivo errado (IA vira o produto) | Alta: o método SPAC e a trajetória do logo são proprietários |
| Sofisticação | Alta | Média: elementos "tech" envelhecem rápido | Alta |
| Fidelidade ao spac-decks | Boa, mas usa pouco do ouro e nada do fundo escuro oficial | Fere regras: ouro em excesso, estética de template de IA | Total: modo claro e escuro do sistema, ouro como bisturi |
| Potencial de conversão | Médio: pouca narrativa visual | Médio | Alto: ritmo de leitura, cases com métrica, CTA recorrente |

**Escolha: C — Contemporary Strategy**, com a contenção tipográfica de A. B foi descartada porque o briefing define a IA como capacidade operacional, não como o produto, e pede para evitar estética de template de IA.

## Referências

| Referência | O que foi aproveitado (estrutura, nunca marca) |
|---|---|
| Disruptive Edge | Três ofertas com linha "Indicado para"; frase de posicionamento contrastiva; cases que abrem pela métrica; estrutura desafio → abordagem → resultado |
| Eden McCallum | Título de case no formato "resultado + contexto"; ênfase em senioridade |
| McKinsey | Impacto quantificado no topo do case |
| BCG | Área de conhecimento organizada por frente/categoria |
| Pentagram | Bloco de metadados do case (cliente, setor, frentes) |

**Limitação:** a rede deste ambiente bloqueou o acesso direto a todos os sites de referência (DNS/proxy). A análise usou resumos de mecanismos de busca, suficientes para estrutura, mensagens e organização de páginas. Tipografia, cores, animações e comportamento de menu desses sites **não puderam ser observados**.
