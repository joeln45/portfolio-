"use client";

import Image from "next/image";
import {
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { site } from "@/lib/site";

const SPRING = { stiffness: 120, damping: 20, mass: 0.6 };

/** A dark "portrait stage" split into depth layers that parallax on scroll
 *  (driven by the parent section's progress) and cursor. The crisp cutout is
 *  the star; everything behind/in-front frames it. Falls back to the original
 *  photo until /headshot-cutout.png exists. Reduced-motion safe. */
export default function PortraitStage({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const [hasCutout, setHasCutout] = useState(true);

  // Cursor position over the stage, normalised to -0.5..0.5.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, SPRING);
  const sy = useSpring(my, SPRING);

  // Per-layer offsets: x = cursor only, y = cursor + scroll. Closer layers move
  // more (parallax); the figure stays the calm anchor.
  const backX = useTransform(sx, (v) => v * -6);
  const backY = useTransform([sy, progress], ([c, p]: number[]) => c * -6 + (p - 0.5) * 12);
  const midX = useTransform(sx, (v) => v * -12);
  const midY = useTransform([sy, progress], ([c, p]: number[]) => c * -12 + (p - 0.5) * 26);
  const figX = useTransform(sx, (v) => v * 10);
  const figY = useTransform([sy, progress], ([c, p]: number[]) => c * 10 + (p - 0.5) * 8);
  const topX = useTransform(sx, (v) => v * 20);
  const topY = useTransform([sy, progress], ([c, p]: number[]) => c * 20 + (p - 0.5) * 40);

  function handleMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function reset() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className="relative mx-auto aspect-[4/5] w-full max-w-[26rem] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl"
      style={{ backgroundColor: "#0e0c0b" }}
    >
      {/* Back: warm-dark stage */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { x: backX, y: backY }}
        className="absolute -inset-12"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 26%, #2a211b, #0e0c0b 72%)",
          }}
        />
      </motion.div>

      {/* Mid: accent glow + dot-grid */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { x: midX, y: midY }}
        className="absolute -inset-8"
      >
        <div
          className="absolute left-1/2 top-1/4 h-2/3 w-2/3 -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--color-accent), transparent 70%)",
            opacity: 0.32,
          }}
        />
        <div className="dot-grid absolute inset-0 opacity-20" />
      </motion.div>

      {/* Figure: the star */}
      <motion.div
        style={reduce ? undefined : { x: figX, y: figY }}
        className="absolute inset-0"
      >
        <Image
          src={hasCutout ? "/headshot-cutout.png" : "/headshot.png"}
          alt={site.name}
          fill
          sizes="(max-width: 1024px) 80vw, 420px"
          className={
            hasCutout
              ? "object-contain object-bottom"
              : "object-cover object-top"
          }
          onError={() => setHasCutout(false)}
        />
      </motion.div>

      {/* Top: foreground accent flare */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { x: topX, y: topY }}
        className="pointer-events-none absolute -inset-8"
      >
        <div
          className="absolute -right-8 top-1/4 h-40 w-40 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--color-accent-2), transparent 70%)",
            opacity: 0.22,
          }}
        />
      </motion.div>

      {/* Inset frame highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/5"
      />
    </div>
  );
}
