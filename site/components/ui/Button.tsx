import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "./Icons";

type Variant = "gold" | "dark" | "outline-light" | "outline-dark";

const variants: Record<Variant, string> = {
  // Sobre ouro, texto sempre preto SPAC (regra inegociável spac-decks #4)
  gold: "bg-gold text-ink hover:bg-champagne",
  dark: "bg-graphite-900 text-white hover:bg-ink",
  "outline-light":
    "border border-champagne/40 text-white hover:border-champagne hover:bg-white/5",
  "outline-dark": "border border-graphite-900/25 text-graphite-900 hover:border-graphite-900",
};

export const buttonClass = (variant: Variant = "gold") =>
  [
    "group inline-flex min-h-12 items-center justify-center gap-3 rounded-card px-6 py-3",
    "text-[0.9375rem] font-extrabold tracking-[0.01em] whitespace-nowrap",
    "transition-colors duration-300 ease-spac",
    variants[variant],
  ].join(" ");

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
};

export function ButtonLink({
  variant = "gold",
  arrow = true,
  children,
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={`${buttonClass(variant)} ${className}`} {...props}>
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          size={18}
          className="transition-transform duration-500 ease-spac group-hover:translate-x-1"
        />
      )}
    </Link>
  );
}

type TextLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  children: ReactNode;
  className?: string;
};

export function TextLink({ children, className = "", ...props }: TextLinkProps) {
  return (
    <Link className={`link-arrow ${className}`} {...props}>
      <span>{children}</span>
      <ArrowRight size={18} />
    </Link>
  );
}
