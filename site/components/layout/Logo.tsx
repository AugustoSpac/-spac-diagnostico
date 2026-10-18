import Image from "next/image";

/**
 * Logo oficial SPAC (arquivos de spac-decks/assets/logos, recortados ao limite do desenho).
 * Proporção do desenho recortado: 1200 × 823. Nunca distorcer nem recolorir.
 * - "principal": preto + ouro champagne, fundo claro
 * - "dark-bg": branco + ouro champagne, fundo escuro
 * Largura mínima recomendada na web: 72px (o traço da estrela perde definição abaixo disso).
 */
const SRC = {
  principal: "/brand/spac-logo-principal.png",
  "dark-bg": "/brand/spac-logo-fundo-escuro.png",
} as const;

export function Logo({
  variant = "principal",
  width = 84,
  className = "",
  priority = false,
}: {
  variant?: keyof typeof SRC;
  width?: number;
  className?: string;
  /** Logo acima da dobra: busca com prioridade alta (Next 16: fetchPriority em vez de `priority`). */
  priority?: boolean;
}) {
  return (
    <Image
      src={SRC[variant]}
      alt="SPAC Gestão"
      width={1200}
      height={823}
      loading={priority ? "eager" : undefined}
      fetchPriority={priority ? "high" : undefined}
      sizes={`${width}px`}
      style={{ width, height: "auto" }}
      className={className}
    />
  );
}
