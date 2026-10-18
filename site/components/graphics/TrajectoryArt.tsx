/**
 * Arte de trajetória — assinatura gráfica do site.
 * Derivada do traço da estrela cadente do logo SPAC: um feixe de curvas que converge
 * para um ponto focal. Determinística por `seed` (mesma arte no servidor e no cliente),
 * usada em capas de cases e artigos no lugar de fotografia genérica.
 */

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

export function buildTrajectory(seed: number, W = 800, H = 600, count = 16) {
  const rand = mulberry32(seed * 9973 + 17);
  const fx = W * (0.62 + rand() * 0.2);
  const fy = H * (0.22 + rand() * 0.2);
  const bend = 0.18 + rand() * 0.2;
  const paths = Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    const sy = H * (0.58 + t * 0.62) + (rand() - 0.5) * 18;
    const c1x = W * (0.28 + rand() * 0.08);
    const c1y = sy - H * (bend + t * 0.12);
    const c2x = fx - W * (0.22 + t * 0.1);
    const c2y = fy + H * (0.04 + t * 0.22);
    const ex = fx + (rand() - 0.5) * 6;
    const ey = fy + (rand() - 0.5) * 6;
    return {
      d: `M-20 ${r1(sy)} C ${r1(c1x)} ${r1(c1y)}, ${r1(c2x)} ${r1(c2y)}, ${r1(ex)} ${r1(ey)}`,
      lead: i === 0,
      opacity: i === 0 ? 0.95 : r1(0.12 + (1 - t) * 0.5) ,
      width: i === 0 ? 2 : r1(0.6 + rand() * 0.8),
    };
  });
  return { fx: r1(fx), fy: r1(fy), paths };
}

type Props = {
  seed: number;
  tone?: "dark" | "light";
  className?: string;
  count?: number;
};

export function TrajectoryArt({ seed, tone = "dark", className = "", count = 16 }: Props) {
  const W = 800;
  const H = 600;
  const { fx, fy, paths } = buildTrajectory(seed, W, H, count);
  const dark = tone === "dark";
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden ${dark ? "bg-spac-dark" : "bg-gold-veil"} ${className}`}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
      >
        <g fill="none" strokeLinecap="round">
          {paths.map((p, i) => (
            <path
              key={i}
              d={p.d}
              stroke={p.lead ? (dark ? "#F3D7A6" : "#8A6A05") : dark ? "#B78908" : "#B78908"}
              strokeOpacity={dark ? p.opacity : p.opacity * 0.8}
              strokeWidth={p.width}
            />
          ))}
        </g>
        <g fill="none" stroke={dark ? "#F3D7A6" : "#8A6A05"}>
          <circle cx={fx} cy={fy} r="22" strokeOpacity="0.35" />
          <circle cx={fx} cy={fy} r="64" strokeOpacity="0.14" />
          <circle cx={fx} cy={fy} r="150" strokeOpacity="0.07" />
        </g>
        <circle cx={fx} cy={fy} r="4.5" fill={dark ? "#F3D7A6" : "#8A6A05"} />
      </svg>
    </div>
  );
}
