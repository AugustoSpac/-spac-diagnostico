# Técnica — SPAC Web

## Stack

Next.js **16** (App Router, Turbopack, `cacheComponents: true`, `partialPrefetching: true`) · React 19 · Tailwind CSS **v4** (`@theme` em `globals.css`) · Motion 14 (`motion/react`) · marked + frontmatter próprio (artigos) · Node ≥ 20.9.

> Next 16 tem mudanças relevantes. Leia `site/node_modules/next/dist/docs/` antes de usar APIs novas (ver `site/AGENTS.md`).

## Armadilhas do Next 16 com Cache Components

- `params` é **Promise**: `const { slug } = await params`. Tipos globais `PageProps<"/rota/[slug]">` e `LayoutProps<"/">`.
- Rotas `[slug]`: `generateStaticParams` (nunca vazio; sem itens, devolver um slug sentinela que cai em `notFound()`) + `export const instant = false` + `notFound()` → slugs conhecidos estáticos; desconhecidos mostram a página "não encontrada" com `noindex` (o Next 16 responde 200 nesse caso; rotas fora de `[slug]` respondem 404). **Não** usar `dynamic`, `revalidate`, `dynamicParams`, `runtime`.
- `usePathname` em layout compartilhado precisa de `<Suspense>` (ver `HeaderWithPath`).
- `new Date()`/`Date.now()` em Server Component quebra o build: usar função com `"use cache"` (ver `CurrentYear` no Footer).
- Leitura de arquivos: síncrona em escopo de módulo (`lib/articles.ts`), ou dentro de `"use cache"`.
- `next/image`: `priority` está depreciado → `loading="eager"` + `fetchPriority="high"`. Qualidade padrão única 75.
- `next lint` não existe mais: `npm run lint` usa o ESLint CLI.
- Middleware agora é `proxy.ts`.

## Conteúdo (CMS em arquivos)

| O quê | Onde |
|---|---|
| Dados institucionais, menu, contato | `content/site.ts` (+ variáveis de ambiente) |
| Frentes de solução | `content/solutions.ts` |
| Cases | `content/cases.ts` |
| Método, valores, sócios, KPIs, desafios, diferenciais | `content/institutional.ts` |
| Artigos | `content/conhecimento/*.md` |

Evolução recomendada quando o volume crescer: CMS headless (Sanity, Payload ou Contentful) mantendo os mesmos tipos.

## SEO

- `metadata` por página via `pageMetadata()` (`lib/seo.tsx`): título, descrição, canonical, Open Graph, Twitter.
- JSON-LD: `ProfessionalService` (layout), `BreadcrumbList` (detalhes), `Article` (artigos).
- `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx` (Nunito embutida), `icon.png`/`apple-icon.png`/`favicon.ico` derivados da estrela do logo.
- **Indexação desligada por padrão** (`noindex` + `Disallow: /`). Em produção: `NEXT_PUBLIC_ALLOW_INDEXING=true`.

## Formulário

`POST /api/contato` valida (`lib/contact.ts`), filtra honeypot e envia via API HTTP da Resend para `contato@spacgestao.com` (config em `lib/contact-server.ts`, só servidor). Só `RESEND_API_KEY` é obrigatória. O formulário consulta `GET /api/contato` (dinâmico, `connection()`) ao abrir, então a chave vale assim que for salva na Vercel, sem depender do build; sem ela → `{enabled:false}` / 503 no POST, e a página mostra "Formulário disponível em breve" com o e-mail como alternativa. Remetente padrão `onboarding@resend.dev` (só entrega ao dono da conta Resend); com domínio verificado, usar `CONTACT_FROM_EMAIL`. `RESEND_API_URL` existe só para testes com servidor simulado. Respostas: 400 JSON inválido · 422 validação · 502 falha no provedor · 200 ok.

## Variáveis de ambiente (`site/.env.example`)

`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_ALLOW_INDEXING`, `NEXT_PUBLIC_SHOW_PENDING` (selos internos, só em Preview), `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_LINKEDIN_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. Variáveis `NEXT_PUBLIC_*` são embutidas no build: alterou, faça novo deploy.

## Deploy (Vercel)

1. Importar o repositório na Vercel; **Root Directory = `site`**; framework detectado: Next.js.
2. Configurar variáveis de ambiente (Preview sem indexação; Production com `NEXT_PUBLIC_ALLOW_INDEXING=true`).
3. Domínio próprio só após aprovação da SPAC.

## Testes recomendados

Playwright (`playwright-core` com o Chromium do sistema) para capturas em 390/768/1440, verificação de estouro horizontal, links internos, menu mobile e metodologia; Lighthouse para métricas. Os scripts usados na v1 estão descritos em `docs/qa-relatorio.md`.
