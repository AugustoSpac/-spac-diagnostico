"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Número que conta ao entrar na viewport.
 * O HTML do servidor já traz o valor final (SEO / sem JS); a contagem só roda
 * no cliente, uma vez, e nunca para quem prefere movimento reduzido.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || reduce || started.current) return;
    started.current = true;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {prefix}
        {display.toLocaleString("pt-BR")}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {value.toLocaleString("pt-BR")}
        {suffix}
      </span>
    </span>
  );
}
