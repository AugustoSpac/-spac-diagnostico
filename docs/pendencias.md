# Informações que a SPAC precisa fornecer ou validar

Decisões já tomadas para a publicação: clientes anônimos, artigos-rascunho fora do ar, e-mail comercial contato@spacgestao.com.

## Prioridade 1 — impacto direto na conversão

| # | Item | Situação atual |
|---|---|---|
| 1 | **Ativar o envio do formulário**: conta Resend com contato@spacgestao.com + `RESEND_API_KEY` na Vercel (ver `site/README.md`) | E-mail contato@spacgestao.com já exibido no site; formulário mostra "disponível em breve" até a chave ser cadastrada |
| 2 | **Domínio oficial** confirmado (assumido: spacgestao.com) | Configurável por variável |
| 3 | **Revisão jurídica** da política de privacidade; CNPJ e razão social completos | Texto-base publicado |

## Prioridade 2 — credibilidade

| # | Item | Onde entra |
|---|---|---|
| 4 | Fotos profissionais dos sócios (quadradas, ≥ 800 px) | Sobre › Sócios (hoje: monograma) |
| 5 | Confirmar se os resultados do case de varejo alimentar são trabalho da SPAC ou trajetória executiva dos sócios | /cases/varejo-alimentar |
| 6 | Validar contexto e desafio do case de varejo alimentar (textos derivados dos resultados) | /cases/varejo-alimentar |
| 7 | Dados do case do setor de bebidas (contexto, desafio, solução, resultados) para voltar a ser um case completo | /cases |
| 8 | Cases adicionais (distribuição, serviços). Indústria publicado: /cases/industria-bens-de-consumo | /cases ("Case em preparação") |
| 9 | Ano de fundação e marcos da SPAC | Sobre › Nossa história |
| 10 | Seção Clientes publicada com as 16 logos recortadas da imagem de referência. **Substituir pelos arquivos oficiais** (SVG/PNG em alta) quando disponíveis, mantendo os nomes em `site/public/clientes/`; confirmar autorização de uso das marcas. Depoimentos, com autorização | Home (após Credibilidade) |
| 11 | LinkedIn da empresa (`NEXT_PUBLIC_LINKEDIN_URL`) | Rodapé |

## Prioridade 3 — conteúdo editorial

| # | Item |
|---|---|
| 12 | Revisar os 3 artigos em `site/content/rascunhos/`, definir autor e publicar (status `publicado` + mover para `content/conhecimento/`) |
| 13 | Ajustes de redação nos textos do site (`site/content/`) |
| 14 | Validar o favicon derivado da estrela do logo |
