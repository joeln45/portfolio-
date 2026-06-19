"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

type Props = {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
};

/** Counts up from 0 to `value` the first time it scrolls into view. */
export default function CountUp({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1500,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    // Reduced motion: render the final value directly, no animation, no
    // synchronous state set inside the effect.
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setDisplay(value * eased);
              if (p < 1) requestAnimationFrame(tick);
              else setDisplay(value);
            };
            requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, reduce]);

  const shown = reduce ? value : display;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown.toFixed(decimals)}
      {suffix}
    </span>
  );
}
