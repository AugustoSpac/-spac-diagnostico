import type { MetadataRoute } from "next";
import { cases } from "@/content/cases";
import { site } from "@/content/site";
import { solutions } from "@/content/solutions";
import { getArticles } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => `${site.url}${p}`;
  const staticPaths = ["/", "/sobre", "/metodologia", "/solucoes", "/cases", "/conhecimento", "/contato", "/privacidade"];
  return [
    ...staticPaths.map((p) => ({ url: u(p), priority: p === "/" ? 1 : 0.8 })),
    ...solutions.map((s) => ({ url: u(`/solucoes/${s.slug}`), priority: 0.8 })),
    ...cases.map((c) => ({ url: u(`/cases/${c.slug}`), priority: 0.7 })),
    ...getArticles().map((a) => ({ url: u(`/conhecimento/${a.slug}`), lastModified: a.date, priority: 0.6 })),
  ];
}
