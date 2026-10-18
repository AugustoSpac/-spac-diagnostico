import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  status: "publicado" | "rascunho";
  artSeed: number;
  readingMinutes: number;
  html: string;
};

const DIR = path.join(process.cwd(), "content", "conhecimento");

/**
 * Frontmatter simples (chave: valor por linha, valores opcionalmente entre aspas).
 * Suficiente para os campos dos artigos e sem dependências externas.
 */
function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, content: raw };
  const data: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1).replace(/\\"/g, '"');
    }
    data[kv[1]] = v;
  }
  return { data, content: m[2] };
}

/**
 * Leitura síncrona em escopo de módulo: os arquivos são lidos uma vez no build
 * e as páginas permanecem 100% estáticas (compatível com cacheComponents).
 */
function load(): Article[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(DIR, file), "utf8");
      const { data, content } = parseFrontmatter(raw);
      const words = content.trim().split(/\s+/).length;
      return {
        slug: file.replace(/\.md$/, ""),
        title: String(data.title),
        excerpt: String(data.excerpt ?? ""),
        category: String(data.category ?? "Gestão"),
        date: String(data.date),
        author: String(data.author ?? "SPAC Gestão"),
        status: data.status === "publicado" ? "publicado" : "rascunho",
        artSeed: Number(data.artSeed ?? 1),
        readingMinutes: Math.max(1, Math.round(words / 200)),
        html: marked.parse(content, { async: false }) as string,
      } satisfies Article;
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));
}

const articles = load();

export function getArticles() {
  return articles;
}

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "jan", "fev", "mar", "abr", "mai", "jun",
    "jul", "ago", "set", "out", "nov", "dez",
  ];
  return `${d} ${months[m - 1]} ${y}`;
}
