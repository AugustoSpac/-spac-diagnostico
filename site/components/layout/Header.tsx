"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ctaNav, type NavItem } from "@/content/site";
import { buttonClass } from "@/components/ui/Button";
import { ArrowRight, CloseIcon, MenuIcon } from "@/components/ui/Icons";
import { Logo } from "./Logo";

const EASE = [0.22, 1, 0.36, 1] as const;

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Cabeçalho global.
 * - Topo da página (sempre sobre hero escuro): transparente, logo branco+ouro.
 * - Após rolar: fundo off-white translúcido com hairline, logo principal.
 * - Rolando para baixo esconde; rolando para cima reaparece.
 * - Mobile: menu em tela cheia, com Esc, foco gerenciado e trava de rolagem.
 */
export function Header({ pathname, nav }: { pathname: string | null; nav: NavItem[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        const goingDown = y > lastY.current;
        setHidden(goingDown && y > 360);
        lastY.current = y;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Fecha o menu ao navegar
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Conteúdo atrás do menu fica fora da ordem de foco e da árvore de acessibilidade
    const behind = [document.getElementById("conteudo"), document.querySelector("footer")];
    behind.forEach((el) => el?.setAttribute("inert", ""));
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      behind.forEach((el) => el?.removeAttribute("inert"));
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled && !open;

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color,backdrop-filter] duration-500 ease-spac",
          solid
            ? "border-b border-gray-200 bg-paper/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
        ].join(" ")}
      >
        <div className="container-spac flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link
            href="/"
            aria-label="SPAC Gestão — página inicial"
            className="relative block shrink-0 py-2"
          >
            <span
              className={`block transition-opacity duration-500 ${solid ? "opacity-0" : "opacity-100"}`}
            >
              <Logo variant="dark-bg" width={78} priority />
            </span>
            <span
              aria-hidden="true"
              className={`absolute inset-0 py-2 transition-opacity duration-500 ${solid ? "opacity-100" : "opacity-0"}`}
            >
              <Logo variant="principal" width={78} />
            </span>
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "relative rounded-card px-4 py-2.5 text-[0.9375rem] font-semibold transition-colors duration-300",
                    solid
                      ? "text-graphite-700 hover:text-graphite-900"
                      : "text-gray-200 hover:text-white",
                    "after:absolute after:inset-x-4 after:bottom-1 after:h-px after:origin-left after:transition-transform after:duration-500 after:ease-spac",
                    solid ? "after:bg-graphite-900" : "after:bg-champagne",
                    active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href={ctaNav.href}
              className={`${buttonClass(solid ? "dark" : "gold")} ml-4 min-h-11 px-5`}
            >
              {ctaNav.label}
            </Link>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className={[
              "-mr-2 inline-flex size-12 items-center justify-center rounded-card transition-colors lg:hidden",
              solid ? "text-graphite-900" : "text-white",
            ].join(" ")}
          >
            {open ? <CloseIcon size={26} /> : <MenuIcon size={26} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="bg-spac-dark fixed inset-0 z-40 flex flex-col overflow-y-auto pt-[var(--header-h)] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <nav aria-label="Menu móvel" className="container-spac flex flex-1 flex-col py-10">
              <ul className="flex flex-col border-t border-amber-line">
                {[...nav, { label: "Contato", href: "/contato" }].map((item, i) => (
                  <motion.li
                    key={item.href}
                    className="border-b border-amber-line"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.05 + i * 0.05 }}
                  >
                    <Link
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={item.href}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                      className="flex items-center justify-between py-5 text-[1.75rem] leading-tight font-extrabold tracking-[-0.02em] text-white aria-[current=page]:text-champagne"
                    >
                      {item.label}
                      <ArrowRight size={22} className="text-champagne" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto pt-10">
                <p className="t-kicker text-gray-500">Consultoria de gestão</p>
                <p className="mt-3 max-w-[28ch] text-lg text-gray-300">
                  Estratégia que se transforma em resultado.
                </p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
