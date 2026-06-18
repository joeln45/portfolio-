"use client";

import { type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

const SPRING = { stiffness: 150, damping: 20, mass: 0.6 };
const MAX_TILT = 3; // degrees — kept small; these are text cards

/** A skills group card: tilts gently toward the cursor, and its chips lift +
 *  warm to accent in a left-to-right ripple on hover (ripple is pure CSS via
 *  per-chip transition-delay). Reduced-motion safe. */
export default function SkillCard({
  icon,
  title,
  items,
}: {
  icon: ReactNode;
  title: string;
  items: string[];
}) {
  const reduce = useReducedMotion();
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
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function reset() {
    px.set(0);
    py.set(0);
  }

  return (
    <div className="h-full" style={{ perspective: 1000 }}>
      <motion.div
        onPointerMove={reduce ? undefined : handleMove}
        onPointerLeave={reduce ? undefined : reset}
        style={
          reduce
            ? undefined
            : { rotateX, rotateY, transformStyle: "preserve-3d" }
        }
        className="group h-full rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-bg text-accent-soft transition-colors group-hover:text-accent-2">
            {icon}
          </span>
          <h3 className="font-display text-lg font-semibold">{title}</h3>
        </div>
        <ul className="mt-5 flex flex-wrap gap-2">
          {items.map((item, i) => (
            <li
              key={item}
              style={{ transitionDelay: `${i * 40}ms` }}
              className="rounded-full border border-border bg-bg px-3 py-1 text-sm text-muted transition duration-300 ease-out group-hover:-translate-y-0.5 group-hover:border-accent/50 group-hover:text-foreground motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
            >
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
