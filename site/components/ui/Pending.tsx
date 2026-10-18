/**
 * Sinalização de conteúdo não validado, para revisão interna.
 * Visível apenas em builds com NEXT_PUBLIC_SHOW_PENDING=true (ex.: ambiente de Preview da Vercel);
 * o site publicado nunca mostra o selo. Remover a marcação no conteúdo quando a SPAC validar o texto.
 */
export function PendingBadge({
  children = "Conteúdo a validar",
  tone = "light",
}: {
  children?: string;
  tone?: "light" | "dark";
}) {
  // Selos são para revisão interna: só aparecem com NEXT_PUBLIC_SHOW_PENDING=true.
  if (process.env.NEXT_PUBLIC_SHOW_PENDING !== "true") return null;
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-[3px] border px-2.5 py-1 text-[0.6875rem] font-extrabold tracking-[0.14em] uppercase",
        tone === "dark"
          ? "border-champagne/40 text-champagne"
          : "border-negative/50 bg-white text-negative",
      ].join(" ")}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}
