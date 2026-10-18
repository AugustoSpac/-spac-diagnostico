# Técnica — SPAC Web

## Stack

Next.js **16** (App Router, Turbopack, `cacheComponents: true`, `partialPrefetching: true`) · React 19 · Tailwind CSS **v4** (`@theme` em `globals.css`) · Motion 14 (`motion/react`) · gray-matter + marked (artigos) · Node ≥ 20.9.

> Next 16 tem mudanças relevantes. Leia `site/node_modules/next/dist/docs/` antes de usar APIs novas (ver `site/AGENTS.md`).

## Armadilhas do Next 16 com Cache Components

- `params` é **Promise**: `const { slug } = await params`. Tipos globais `PageProps<"/rota/[slug]">` e `LayoutProps<"/">`.
- Rotas `[slug]`: `generateStaticParams` (nunca vazio) + `export const instant = false` + `notFound()` → slugs conhecidos estáticos, desconhecidos 404 real. **Não** usar `dynamic`, `revalidate`, `dynamicParams`, `runtime`.
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

`POST /api/contato` valida (`lib/contact.ts`), filtra honeypot e envia via API HTTP da Resend. Sem `RESEND_API_KEY`, `CONTACT_TO_EMAIL` e `CONTACT_FROM_EMAIL` → 503 `not_configured`, e a página mostra o formulário em modo pré-visualização (envio desativado, aviso explícito). Respostas: 400 JSON inválido · 422 validação · 502 falha no provedor · 200 ok.

## Variáveis de ambiente (`site/.env.example`)

`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_ALLOW_INDEXING`, `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_LINKEDIN_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. Variáveis `NEXT_PUBLIC_*` são embutidas no build: alterou, faça novo deploy.

## Deploy (Vercel)

1. Importar o repositório na Vercel; **Root Directory = `site`**; framework detectado: Next.js.
2. Configurar variáveis de ambiente (Preview sem indexação; Production com `NEXT_PUBLIC_ALLOW_INDEXING=true`).
3. Domínio próprio só após aprovação da SPAC.

## Testes recomendados

Playwright (`playwright-core` com o Chromium do sistema) para capturas em 390/768/1440, verificação de estouro horizontal, links internos, menu mobile e metodologia; Lighthouse para métricas. Os scripts usados na v1 estão descritos em `docs/qa-relatorio.md`.
