"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Barra dourada de progresso de leitura (artigos). */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[55] h-[3px] origin-left bg-gold"
      style={{ scaleX }}
    />
  );
}
