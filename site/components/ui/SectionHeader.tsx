import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  index?: string;
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "light" | "dark";
  /** Conteúdo alinhado à direita da régua (ex.: link "ver todos"). */
  aside?: ReactNode;
  className?: string;
  as?: "h1" | "h2";
};

/**
 * Cabeçalho de seção: kicker numerado + régua + título-conclusão em peso misto.
 * É a tradução web do padrão "kicker / título / régua" do spac-decks.
 */
export function SectionHeader({
  index,
  kicker,
  title,
  lead,
  tone = "light",
  aside,
  className = "",
  as: Tag = "h2",
}: Props) {
  const dark = tone === "dark";
  return (
    <Reveal className={className}>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
        <p className={`t-kicker ${dark ? "text-gray-500" : "text-gray-600"}`}>
          {index && <span className={dark ? "text-champagne" : "text-gold-text"}>{index} — </span>}
          {kicker}
        </p>
        {aside}
      </div>
      <div className={`rule mt-5 ${dark ? "text-amber-line" : "text-graphite-900"}`} />
      <Tag
        className={`t-h2 mt-10 max-w-[26ch] md:mt-12 ${dark ? "text-white" : "text-graphite-900"}`}
      >
        {title}
      </Tag>
      {lead && (
        <p
          className={`t-lead mt-6 max-w-[46ch] ${dark ? "text-gray-300" : "text-graphite-700"}`}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}

/** Trecho do título em ExtraBold — o recurso de hierarquia mais forte do sistema. */
export function Em({ children, gold = false }: { children: ReactNode; gold?: boolean }) {
  return <strong className={`font-extrabold ${gold ? "text-champagne" : ""}`}>{children}</strong>;
}
