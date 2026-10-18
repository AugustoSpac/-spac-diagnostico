"use client";

import { useId, useState } from "react";
import { TextLink } from "@/components/ui/Button";
import { solutions } from "@/content/solutions";

type Problem = {
  title: string;
  symptom: string;
  answer: string;
  solution: string;
};

/**
 * Lista editorial de desafios. No desktop, passar o mouse ou o foco abre a linha;
 * no celular, toque. Cada linha é um botão com aria-expanded (acordeão acessível).
 */
export function ProblemsList({ items }: { items: readonly Problem[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();

  return (
    <ol className="border-t border-gray-200">
      {items.map((p, i) => {
        const open = active === i;
        const sol = solutions.find((s) => s.slug === p.solution);
        const panelId = `${baseId}-panel-${i}`;
        return (
          <li
            key={p.title}
            className={[
              "border-b transition-colors duration-500 ease-spac",
              open ? "border-gold bg-gold-veil" : "border-gray-200",
            ].join(" ")}
            onMouseEnter={() => setActive(i)}
          >
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="flex w-full items-baseline gap-5 px-4 py-6 text-left md:gap-8 md:px-6 md:py-7"
              >
                <span className="t-kicker w-7 shrink-0 tracking-[0.08em] text-gold-text">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={[
                    "text-[1.375rem] leading-tight font-extrabold tracking-[-0.018em] transition-colors duration-300 md:text-[1.875rem]",
                    open ? "text-graphite-900" : "text-graphite-700",
                  ].join(" ")}
                >
                  {p.title}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-label={p.title}
              className={[
                "grid transition-[grid-template-rows,opacity] duration-500 ease-spac",
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              ].join(" ")}
              inert={!open}
            >
              <div className="overflow-hidden">
                <div className="grid gap-5 px-4 pb-7 pl-16 md:grid-cols-2 md:gap-10 md:px-6 md:pb-8 md:pl-[5.25rem]">
                  <p className="text-graphite-700">{p.symptom}</p>
                  <div>
                    <p className="t-kicker text-gray-600">Como atuamos</p>
                    <p className="mt-2 text-graphite-900">{p.answer}</p>
                    {sol && (
                      <TextLink
                        href={`/solucoes/${sol.slug}`}
                        className="mt-4 text-[0.9375rem] text-graphite-900 hover:text-gold-text"
                      >
                        {sol.name}
                      </TextLink>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
