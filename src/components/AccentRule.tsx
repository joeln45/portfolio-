"use client";

import { motion, useReducedMotion } from "motion/react";

/** A short clay hairline that draws in from the left when scrolled into view. */
export default function AccentRule({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      style={{ transformOrigin: "left" }}
      className={`mt-5 h-0.5 w-12 rounded-full bg-accent ${className}`}
      {...(reduce
        ? {}
        : {
            initial: { scaleX: 0, opacity: 0 },
            whileInView: { scaleX: 1, opacity: 1 },
            viewport: { once: true, margin: "-80px" },
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
          })}
    />
  );
}
