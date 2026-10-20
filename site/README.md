# Site institucional SPAC Gestão

Next.js 16 · React 19 · Tailwind CSS v4 · Motion · conteúdo em arquivos (TypeScript + Markdown).
Sistema visual derivado do skill **spac-decks** e documentado no skill **spac-web** (`../skills/spac-web`).

## Rodar localmente

```bash
cd site
npm install
npm run dev          # http://localhost:3000
```

Verificação completa (lint + tipos + build de produção):

```bash
npm run check
npm start            # serve o build em http://localhost:3000
```

Requisito: Node.js 20.9 ou superior.

## Páginas

| Rota | Conteúdo |
|---|---|
| `/` | Hero, credibilidade, desafios, soluções, cases, diferenciais, metodologia interativa, conhecimento, conversão |
| `/sobre` | Posicionamento, história, propósito e valores, sócios, diferenciais |
| `/metodologia` | Ciclo SPAC interativo, método nas três frentes, princípios |
| `/solucoes` e `/solucoes/[estrategia|performance|transformacao]` | Visão geral e páginas de cada frente |
| `/cases` e `/cases/[slug]` | Listagem e modelo de case (contexto, desafio, solução, resultados) |
| `/conhecimento` e `/conhecimento/[slug]` | Área editorial e artigo |
| `/contato` | Formulário comercial (envio ativado por variáveis de ambiente) |
| `/privacidade` | Política de privacidade (texto-base) |

## Editar conteúdo

| O quê | Arquivo |
|---|---|
| Nome, URL, menu, contato | `content/site.ts` |
| Frentes e serviços | `content/solutions.ts` |
| Cases | `content/cases.ts` |
| Método, valores, sócios, indicadores, desafios, diferenciais | `content/institutional.ts` |
| Artigos publicados | `content/conhecimento/*.md` (só `status: "publicado"`) |
| Rascunhos de artigos | `content/rascunhos/*.md` (não aparecem no site) |
| Fotos dos sócios | Coloque em `public/team/` e preencha `photo` em `content/institutional.ts` |

Clientes aparecem de forma anônima (por setor). Selos internos como "Conteúdo a validar" só aparecem com `NEXT_PUBLIC_SHOW_PENDING=true` (use no ambiente de Preview da Vercel). Sem artigo publicado, a área Conhecimento sai do menu e da home automaticamente.

## Variáveis de ambiente

Veja `.env.example`. Resumo:

| Variável | Efeito |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL canônica (sitemap, Open Graph) |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `true` libera indexação. **Padrão: bloqueado** (pré-visualização) |
| `NEXT_PUBLIC_SHOW_PENDING` | `true` mostra os selos internos de conteúdo pendente (só para revisão) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Troca o e-mail comercial (padrão: `contato@spacgestao.com`), exibido no rodapé/contato e destino do formulário |
| `NEXT_PUBLIC_LINKEDIN_URL` | Exibido no rodapé quando preenchido |
| `RESEND_API_KEY` | **Ativa o envio do formulário** (Resend). Sem ela, o formulário mostra "disponível em breve" e indica o e-mail |
| `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Opcionais: destinatário(s) e remetente. Veja `.env.example` |

## Publicar na Vercel

1. Em vercel.com › **Add New › Project**, importe o repositório `AugustoSpac/-spac-diagnostico`.
2. Em **Root Directory**, selecione `site`. O framework é detectado como Next.js; não altere comandos.
3. Em **Environment Variables**, cadastre as variáveis acima.
   - Ambiente *Preview*: deixe `NEXT_PUBLIC_ALLOW_INDEXING` vazio.
   - Ambiente *Production*: `NEXT_PUBLIC_ALLOW_INDEXING=true` somente após aprovação.
4. **Deploy**. A Vercel gera um endereço de prévia (`*.vercel.app`) para revisão.
5. Domínio oficial: em **Settings › Domains**, adicione o domínio e ajuste o DNS conforme as instruções da Vercel. Faça isso apenas com a aprovação final.

Para ativar o formulário (as mensagens vão para `contato@spacgestao.com`):
1. Crie a conta em resend.com **usando o e-mail contato@spacgestao.com** (o remetente de teste da Resend só entrega para o e-mail dono da conta).
2. Em **API Keys → Create API Key** (permissão *Sending access*), copie a chave.
3. Na Vercel, cadastre `RESEND_API_KEY` com a chave e faça **Redeploy**.
4. Envie um teste pelo site e confira a caixa de entrada (e o spam).
5. Recomendado depois: em **Domains** na Resend, verifique `spacgestao.com` (registros DNS no Cloudflare, *DNS only*) e cadastre `CONTACT_FROM_EMAIL` = `Site SPAC <site@spacgestao.com>` para melhor entrega.

## Estrutura

```
app/            rotas, layout, SEO (sitemap, robots, opengraph-image, ícones), API /api/contato
components/     ui · cards · sections · graphics · layout · forms
content/        conteúdo editável
lib/            artigos, SEO, regras do formulário
public/brand/   logos oficiais recortados e molduras de foto
```

Observação técnica: esta versão do Next.js tem mudanças importantes em relação a versões anteriores (veja `AGENTS.md` e `../skills/spac-web/references/tech.md`).
