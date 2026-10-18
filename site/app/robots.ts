import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** Pré-visualização bloqueia indexação; produção libera com NEXT_PUBLIC_ALLOW_INDEXING=true. */
export default function robots(): MetadataRoute.Robots {
  const allow = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
  return {
    rules: allow ? { userAgent: "*", allow: "/", disallow: "/api/" } : { userAgent: "*", disallow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
