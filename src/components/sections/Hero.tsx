"use client";

import { ArrowRight, Download, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Headshot from "@/components/Headshot";
import Magnetic from "@/components/Magnetic";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { site } from "@/lib/site";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// Name reveals line-by-line: each line rises from behind a clipped edge.
const nameGroup = { hidden: {}, show: {} };
const nameLine = {
  hidden: { y: "115%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.09 },
  }),
};

const metrics = [
  { value: "8+", label: "projects" },
  { value: "7+", label: "languages" },
  { value: "2", label: "internships" },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const groupProps = reduce
    ? {}
    : ({ variants: container, initial: "hidden", animate: "show" } as const);
  const itemProps = reduce ? {} : { variants: item };

  const nameParts = site.name.split(" ");
  const firstLine = nameParts.slice(0, -1).join(" ");
  const lastName = nameParts.at(-1);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      {/* Ambient background */}
      <div aria-hidden className="blob hero-blob-1" />
      <div aria-hidden className="blob hero-blob-2" />
      <div aria-hidden className="dot-grid absolute inset-0" />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.4fr_0.9fr]">
        <motion.div {...groupProps}>
          <motion.div
            {...itemProps}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-soft px-3.5 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-xs text-muted">
              Available for ML/AI &amp; full-stack roles
            </span>
          </motion.div>

          <motion.p
            {...itemProps}
            className="mt-5 font-mono text-sm tracking-wide text-muted"
          >
            {site.role}
          </motion.p>

          <motion.h1
            {...(reduce ? {} : { variants: nameGroup })}
            className="mt-3 font-display text-5xl font-bold leading-[0.98] tracking-tight sm:text-6xl md:text-7xl"
          >
            <span className="block overflow-hidden py-[0.12em] -my-[0.12em]">
              <motion.span
                className="block"
                {...(reduce ? {} : { custom: 0, variants: nameLine })}
              >
                {firstLine}
              </motion.span>
            </span>
            <span className="block overflow-hidden py-[0.12em] -my-[0.12em]">
              <motion.span
                className="block"
                {...(reduce ? {} : { custom: 1, variants: nameLine })}
              >
                {lastName}
                <span className="text-accent">.</span>
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            {...itemProps}
            className="mt-6 max-w-xl text-xl leading-relaxed text-foreground"
          >
            Software that learns. Built to ship.
          </motion.p>

          <motion.p
            {...itemProps}
            className="mt-3 max-w-xl leading-relaxed text-muted"
          >
            Machine learning, NLP, and full-stack, from research to production.
          </motion.p>

          <motion.div
            {...itemProps}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a href="#projects" className="btn-primary">
                View projects
                <ArrowRight size={18} />
              </a>
            </Magnetic>
            <a
              href={site.resume}
              className="btn-ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CV
              <Download size={18} />
            </a>
          </motion.div>

          <motion.dl
            {...itemProps}
            className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-border pt-6"
          >
            {metrics.map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd className="font-display text-2xl font-bold tracking-tight">
                  {m.value}
                </dd>
                <span className="text-xs text-muted">{m.label}</span>
              </div>
            ))}
          </motion.dl>

          <motion.div {...itemProps} className="mt-8 flex items-center gap-4">
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="icon-link"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="icon-link"
            >
              <LinkedinIcon size={18} />
            </a>
            <span className="ml-2 inline-flex items-center gap-1.5 text-sm text-muted">
              <MapPin size={15} />
              {site.location}
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, scale: 0.96 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
              })}
        >
          <Headshot />
        </motion.div>
      </div>
    </section>
  );
}
