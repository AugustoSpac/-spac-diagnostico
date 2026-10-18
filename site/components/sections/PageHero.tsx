import Link from "next/link";
import type { ReactNode } from "react";
import { HeroTrajectory } from "@/components/graphics/HeroTrajectory";

export type Crumb = { label: string; href?: string };

/** Hero das páginas internas: fundo âmbar, kicker, título em peso misto e lead. */
export function PageHero({
  kicker,
  title,
  lead,
  crumbs,
  children,
  compact = false,
}: {
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section className="bg-spac-dark relative isolate overflow-hidden text-white">
      <HeroTrajectory className="opacity-60" />
      <div
        className={`container-spac relative pt-[calc(var(--header-h)+4.5rem)] ${compact ? "pb-16 md:pb-20" : "pb-20 md:pb-28"} md:pt-[calc(var(--header-h)+7rem)]`}
      >
        {crumbs && (
          <nav aria-label="Trilha de navegação" className="rise mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-champagne">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-gray-300">
                      {c.label}
                    </span>
                  )}
                  {i < crumbs.length - 1 && <span aria-hidden="true">/</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <p className="t-kicker rise text-gray-300">{kicker}</p>
        <h1
          className="t-display-s rise mt-6 max-w-[18ch] md:mt-8"
          style={{ animationDelay: "0.08s" }}
        >
          {title}
        </h1>
        {lead && (
          <p
            className="t-lead rise mt-8 max-w-[52ch] text-gray-200"
            style={{ animationDelay: "0.18s" }}
          >
            {lead}
          </p>
        )}
        {children && (
          <div className="rise mt-10" style={{ animationDelay: "0.28s" }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
