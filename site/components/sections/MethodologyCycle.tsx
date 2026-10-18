"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import type { Stage } from "@/content/institutional";

const EASE = [0.22, 1, 0.36, 1] as const;

// Posições dos nós na órbita (sentido horário a partir do topo), em % do quadrado.
const NODE_POS = [
  { x: 50, y: 7.5 },
  { x: 92.5, y: 50 },
  { x: 50, y: 92.5 },
  { x: 7.5, y: 50 },
];

/**
 * Ciclo SPAC interativo.
 * - Desktop com movimento permitido: seção fixada; a rolagem percorre S → P → A → C
 *   e o arco dourado se completa. Clicar num nó rola até a etapa.
 * - Celular ou prefers-reduced-motion: abas acessíveis (setas do teclado navegam).
 */
export function MethodologyCycle({ stages, closing }: { stages: Stage[]; closing: string }) {
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const uid = useId();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const pinned = wide && !reduce;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!pinned) return;
    setActive(Math.min(stages.length - 1, Math.max(0, Math.floor(p * stages.length * 0.999))));
  });

  // Arco: no modo fixado acompanha a rolagem; nas abas, segue a etapa ativa.
  const arcTarget = pinned ? undefined : (active + 1) / stages.length;
  const scrollArc = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  function goTo(i: number) {
    if (pinned && containerRef.current) {
      const el = containerRef.current;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const travel = el.offsetHeight - window.innerHeight;
      window.scrollTo({ top: top + ((i + 0.5) / stages.length) * travel, behavior: "smooth" });
    } else {
      setActive(i);
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + stages.length) % stages.length;
    tabsRef.current[next]?.focus();
    goTo(next);
  }

  const stage = stages[active];

  const content = (
    <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
      {/* Órbita */}
      <div className="mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:col-span-6 lg:max-w-[34rem]">
        <div className="relative aspect-square">
          <svg viewBox="0 0 400 400" className="absolute inset-0 size-full" aria-hidden="true">
            <circle cx="200" cy="200" r="170" fill="none" stroke="#4A3A16" strokeWidth="1.5" />
            <circle cx="200" cy="200" r="118" fill="none" stroke="#4A3A16" strokeOpacity="0.45" strokeDasharray="2 6" />
            {pinned ? (
              <motion.circle
                cx="200"
                cy="200"
                r="170"
                fill="none"
                stroke="#E3AE0C"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ pathLength: scrollArc, rotate: -90, transformOrigin: "200px 200px" }}
              />
            ) : (
              <motion.circle
                cx="200"
                cy="200"
                r="170"
                fill="none"
                stroke="#E3AE0C"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={false}
                animate={{ pathLength: arcTarget }}
                transition={{ duration: 0.8, ease: EASE }}
                style={{ rotate: -90, transformOrigin: "200px 200px" }}
              />
            )}
          </svg>

          {/* Letra central */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={stage.letter}
                initial={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease: EASE }}
                aria-hidden="true"
                className="block text-[7rem] leading-none font-extrabold tracking-[-0.04em] text-champagne sm:text-[9rem] lg:text-[11rem]"
              >
                {stage.letter}
              </motion.span>
            </AnimatePresence>
            <span className="t-kicker mt-2 text-gray-500" aria-hidden="true">
              {String(active + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}
            </span>
          </div>

          {/* Nós = abas */}
          <div role="tablist" aria-label="Etapas da metodologia SPAC" className="absolute inset-0">
            {stages.map((s, i) => {
              const isActive = i === active;
              const done = i < active;
              return (
                <button
                  key={s.letter}
                  ref={(el) => {
                    tabsRef.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${uid}-tab-${i}`}
                  aria-selected={isActive}
                  aria-controls={`${uid}-panel`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => goTo(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  style={{ left: `${NODE_POS[i].x}%`, top: `${NODE_POS[i].y}%` }}
                  className={[
                    "absolute flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-lg font-extrabold transition-[background-color,border-color,color,transform] duration-500 ease-spac sm:size-16",
                    isActive
                      ? "scale-110 border-gold bg-gold text-ink"
                      : done
                        ? "border-gold bg-amber-800 text-champagne hover:bg-amber-900"
                        : "border-amber-line bg-amber-950 text-gray-300 hover:border-gold-deep hover:text-white",
                  ].join(" ")}
                >
                  <span aria-hidden="true">{s.letter}</span>
                  <span className="sr-only">{s.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Painel da etapa */}
      <div className="lg:col-span-6">
        <div
          id={`${uid}-panel`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${active}`}
          aria-live="polite"
          className="min-h-[25rem] sm:min-h-[22rem]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={stage.letter}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <p className="t-kicker text-gray-500">
                <span className="text-champagne">{String(active + 1).padStart(2, "0")}</span> — {stage.subtitle}
              </p>
              <h3 className="mt-5 text-[clamp(2.75rem,2rem+3vw,4.5rem)] leading-none font-extrabold tracking-[-0.035em] text-white">
                {stage.name}
              </h3>
              <p className="t-lead mt-6 text-champagne">{stage.question}</p>
              <p className="mt-5 max-w-[46ch] text-gray-300">{stage.description}</p>
              <p className="t-kicker mt-9 text-gray-500">O que fica pronto</p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {stage.outputs.map((o) => (
                  <li
                    key={o}
                    className="rounded-card border border-amber-line bg-amber-900 px-3.5 py-2 text-[0.9375rem] text-gray-200"
                  >
                    {o}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex gap-2" aria-hidden="true">
          {stages.map((s, i) => (
            <span
              key={s.letter}
              className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ${i <= active ? "bg-gold" : "bg-amber-line"}`}
            />
          ))}
        </div>
        <p className="mt-6 flex max-w-[48ch] gap-3 text-[0.9375rem] text-gray-300">
          <svg viewBox="0 0 24 24" className="mt-0.5 size-5 shrink-0 text-champagne" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 12a8 8 0 1 1-2.34-5.66M20 4v4h-4" />
          </svg>
          {closing}
        </p>
      </div>
    </div>
  );

  if (!pinned) {
    return (
      <div ref={containerRef} className="container-spac relative pb-24 md:pb-32">
        {content}
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ height: `${100 + stages.length * 70}vh` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="container-spac w-full pt-[var(--header-h)]">{content}</div>
      </div>
    </div>
  );
}
