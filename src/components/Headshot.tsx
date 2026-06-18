"use client";

import Image from "next/image";
import { useState, type PointerEvent as ReactPointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { site } from "@/lib/site";

const SPRING = { stiffness: 150, damping: 20, mass: 0.6 };
const MAX_TILT = 4; // degrees

/** Shows /public/headshot.png, gracefully falling back to a monogram tile
 *  if the file isn't present yet. Tilts gently toward the cursor (mouse only,
 *  reduced-motion safe) unless `tilt` is disabled. */
export default function Headshot({ tilt = true }: { tilt?: boolean }) {
  const [errored, setErrored] = useState(false);
  const reduce = useReducedMotion();
  const interactive = tilt && !reduce;

  // Normalised pointer position over the card, -0.5..0.5 on each axis.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(
    useTransform(px, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]),
    SPRING,
  );
  const rotateX = useSpring(
    useTransform(py, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]),
    SPRING,
  );

  function handleMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!interactive || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function reset() {
    px.set(0);
    py.set(0);
  }

  return (
    <div
      className="relative mx-auto w-full max-w-[20rem]"
      style={{ perspective: 1000 }}
    >
      <div
        aria-hidden
        className="absolute -inset-4 rounded-[2rem] opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, var(--color-accent), transparent 70%)",
        }}
      />
      <motion.div
        onPointerMove={interactive ? handleMove : undefined}
        onPointerLeave={interactive ? reset : undefined}
        style={
          interactive
            ? { rotateX, rotateY, transformStyle: "preserve-3d" }
            : undefined
        }
        className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border bg-surface"
      >
        {errored ? (
          <div className="grid h-full w-full place-items-center">
            <span className="font-display text-7xl font-bold text-gradient">
              {site.initials}
            </span>
            <span className="absolute bottom-4 font-mono text-xs text-muted">
              add /headshot.png
            </span>
          </div>
        ) : (
          <Image
            src="/headshot.png"
            alt={site.name}
            fill
            sizes="(max-width: 1024px) 80vw, 320px"
            priority
            className="object-cover object-top"
            onError={() => setErrored(true)}
          />
        )}
      </motion.div>
    </div>
  );
}
