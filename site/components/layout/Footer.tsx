import Link from "next/link";
import { site } from "@/content/site";
import { solutions } from "@/content/solutions";
import { Logo } from "./Logo";

async function CurrentYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

const company = [
  { label: "Sobre a SPAC", href: "/sobre" },
  { label: "Metodologia SPAC", href: "/metodologia" },
  { label: "Cases", href: "/cases" },
  { label: "Conhecimento", href: "/conhecimento" },
];

export function Footer() {
  return (
    <footer className="bg-amber-950 text-gray-300">
      <div className="container-spac pt-20 pb-10 md:pt-24">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo variant="dark-bg" width={104} />
            <p className="mt-8 max-w-[34ch] text-[1.0625rem] leading-relaxed text-gray-300">
              Consultoria de gestão que transforma estratégia em resultado, com experiência
              executiva, método proprietário e inteligência artificial integrada à entrega.
            </p>
          </div>

          <nav aria-label="Soluções" className="md:col-span-2">
            <p className="t-kicker text-gray-500">Soluções</p>
            <ul className="mt-5 space-y-3">
              {solutions.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/solucoes/${s.slug}`}
                    className="text-gray-200 transition-colors hover:text-champagne"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Empresa" className="md:col-span-2">
            <p className="t-kicker text-gray-500">Empresa</p>
            <ul className="mt-5 space-y-3">
              {company.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="text-gray-200 transition-colors hover:text-champagne">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="t-kicker text-gray-500">Contato</p>
            <ul className="mt-5 space-y-3">
              <li>
                <Link href="/contato" className="text-gray-200 transition-colors hover:text-champagne">
                  Iniciar uma conversa
                </Link>
              </li>
              {site.contactEmail && (
                <li>
                  <a
                    href={`mailto:${site.contactEmail}`}
                    className="text-gray-200 transition-colors hover:text-champagne"
                  >
                    {site.contactEmail}
                  </a>
                </li>
              )}
              {site.linkedinUrl && (
                <li>
                  <a
                    href={site.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-200 transition-colors hover:text-champagne"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-amber-line pt-8 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {site.legalName}. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="/privacidade" className="transition-colors hover:text-champagne">
              Privacidade
            </Link>
            <span>Sonhar · Planejar · Agir · Controlar</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
