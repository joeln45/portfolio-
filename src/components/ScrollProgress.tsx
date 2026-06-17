"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/** Thin gradient progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  if (reduce) return null;

  return (
    <motion.div
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, var(--color-accent), var(--color-accent-2))",
      }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left"
    />
  );
}
