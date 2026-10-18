/**
 * Sinalização explícita de conteúdo não validado — evita apresentar placeholder como dado real.
 * Remover a marcação no arquivo de conteúdo quando a SPAC validar o texto.
 */
export function PendingBadge({
  children = "Conteúdo a validar",
  tone = "light",
}: {
  children?: string;
  tone?: "light" | "dark";
}) {
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
