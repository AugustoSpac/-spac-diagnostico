import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import { Suspense } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { HeaderWithPath } from "@/components/layout/HeaderWithPath";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { site } from "@/content/site";
import { JsonLd } from "@/lib/seo";
import "./globals.css";

// Família única da marca (spac-decks): Nunito — regular para texto, ExtraBold para destaques.
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Estratégia que se transforma em resultado`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: "/",
    title: `${site.name} | Estratégia que se transforma em resultado`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  // Pré-visualização: impede indexação até a aprovação de publicação (ver README).
  robots:
    process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true"
      ? { index: true, follow: true }
      : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#100C04",
  colorScheme: "light",
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  logo: `${site.url}/brand/spac-logo-principal.png`,
  description: site.description,
  areaServed: "BR",
  knowsAbout: [
    "Planejamento estratégico",
    "Gestão comercial",
    "Gestão por resultados",
    "Eficiência operacional",
    "Gestão de projetos",
    "Inteligência artificial aplicada à gestão",
  ],
  ...(site.contactEmail ? { email: site.contactEmail } : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={nunito.variable} data-scroll-behavior="smooth">
      <body className="min-h-dvh">
        <noscript>
          {/* Sem JavaScript, nada fica oculto à espera de animação */}
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-card focus:bg-gold focus:px-4 focus:py-3 focus:font-extrabold focus:text-ink"
        >
          Pular para o conteúdo
        </a>
        <MotionProvider>
          <Suspense fallback={<Header pathname={null} />}>
            <HeaderWithPath />
          </Suspense>
          <main id="conteudo" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </MotionProvider>
        <JsonLd data={organizationLd} />
      </body>
    </html>
  );
}
