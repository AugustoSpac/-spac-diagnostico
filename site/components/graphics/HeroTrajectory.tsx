/**
 * Trajetória animada do hero: o traço da estrela do logo desenhado em tela cheia.
 * Animação 100% CSS (sem JavaScript) — não atrasa a primeira renderização
 * e é desligada por prefers-reduced-motion.
 */
const LINES = [
  { d: "M-60 790 C 380 640, 860 470, 1250 318", color: "#F3D7A6", width: 2.2, opacity: 0.95 },
  { d: "M-60 830 C 400 680, 880 520, 1250 318", color: "#B78908", width: 1.1, opacity: 0.6 },
  { d: "M-60 872 C 420 724, 900 572, 1250 318", color: "#B78908", width: 1, opacity: 0.42 },
  { d: "M-60 918 C 440 772, 920 628, 1250 318", color: "#B78908", width: 0.9, opacity: 0.28 },
  { d: "M-60 968 C 460 824, 940 688, 1250 318", color: "#4A3A16", width: 1, opacity: 0.9 },
  { d: "M-60 1020 C 480 880, 960 752, 1250 318", color: "#4A3A16", width: 1, opacity: 0.7 },
];

export function HeroTrajectory({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 960"
      preserveAspectRatio="xMidYMid slice"
      // A cauda esmaece longe da estrela: mantém a área de texto (à esquerda) legível.
      className={`pointer-events-none absolute inset-0 size-full [mask-image:linear-gradient(100deg,rgb(0_0_0/0.14)_0%,rgb(0_0_0/0.3)_42%,black_74%)] max-md:opacity-50 ${className}`}
    >
      <g fill="none" strokeLinecap="round">
        {LINES.map((l, i) => (
          <path
            key={i}
            d={l.d}
            pathLength={1}
            stroke={l.color}
            strokeWidth={l.width}
            strokeOpacity={l.opacity}
            className="traj-draw"
            style={{ animationDelay: `${0.25 + i * 0.12}s` }}
          />
        ))}
      </g>
      <g className="traj-focal">
        <circle cx="1250" cy="318" r="160" fill="none" stroke="#F3D7A6" strokeOpacity="0.06" />
        <circle cx="1250" cy="318" r="72" fill="none" stroke="#F3D7A6" strokeOpacity="0.14" />
        <circle
          cx="1250"
          cy="318"
          r="26"
          fill="none"
          stroke="#F3D7A6"
          strokeOpacity="0.4"
          className="traj-pulse"
        />
        <circle cx="1250" cy="318" r="5.5" fill="#F3D7A6" />
      </g>
    </svg>
  );
}
