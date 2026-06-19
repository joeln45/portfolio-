"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Magnetic from "@/components/Magnetic";
import NeuralBackground from "@/components/NeuralBackground";
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

const FADE =
  "linear-gradient(to bottom, #000 0%, #000 82%, transparent 100%)";

export default function Hero() {
  const reduce = useReducedMotion();
  const [hasCutout, setHasCutout] = useState(true);

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
      className="relative flex min-h-screen items-start overflow-hidden pt-28 pb-20 lg:items-center lg:pb-0 lg:pt-24"
    >
      {/* Ambient warm glow */}
      <div aria-hidden className="blob hero-blob-1" />
      <div aria-hidden className="blob hero-blob-2" />

      {/* Neural constellation */}
      <NeuralBackground className="pointer-events-none absolute inset-0 z-0" />

      {/* Cutout portrait — square, vertically centred on the right (desktop only;
          mobile uses a contained portrait inside the column below the name) */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[50%] items-center justify-end lg:flex">
        <motion.div
          className="relative aspect-square w-full max-w-[17rem] sm:max-w-[24rem] lg:max-w-[40rem]"
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
              })}
        >
          <div
            aria-hidden
            className="absolute left-1/2 top-1/3 h-3/4 w-3/4 -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, var(--color-accent), transparent 70%)",
              opacity: 0.26,
            }}
          />
          <div
            className="relative h-full w-full"
            style={{ maskImage: FADE, WebkitMaskImage: FADE }}
          >
            {hasCutout ? (
              <Image
                src="/headshot-cutout.png?v=5"
                alt={site.name}
                fill
                priority
                sizes="(max-width: 1024px) 66vw, 640px"
                className="object-contain object-center"
                onError={() => setHasCutout(false)}
              />
            ) : null}
          </div>
        </motion.div>
      </div>

      {/* Left scrim keeps the copy readable over the motion (desktop only) */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] hidden lg:block"
        style={{
          background:
            "linear-gradient(to right, var(--color-bg) 0%, color-mix(in srgb, var(--color-bg) 72%, transparent) 38%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.4fr_0.9fr]">
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

          {/* Contained portrait — mobile/tablet only (desktop uses the
              full-bleed cutout). Keeps copy first, figure never behind text. */}
          <motion.div
            {...itemProps}
            className="relative mx-auto mt-8 aspect-square w-full max-w-[15rem] lg:hidden"
          >
            <div
              aria-hidden
              className="absolute left-1/2 top-1/3 h-3/4 w-3/4 -translate-x-1/2 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, var(--color-accent), transparent 70%)",
                opacity: 0.26,
              }}
            />
            <div
              className="relative h-full w-full"
              style={{ maskImage: FADE, WebkitMaskImage: FADE }}
            >
              {hasCutout ? (
                <Image
                  src="/headshot-cutout.png?v=5"
                  alt={site.name}
                  fill
                  sizes="(max-width: 1024px) 60vw, 240px"
                  className="object-contain object-center"
                  onError={() => setHasCutout(false)}
                />
              ) : null}
            </div>
          </motion.div>

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
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <Magnetic className="inline-flex w-full sm:w-auto">
              <a href="#projects" className="btn-primary w-full sm:w-auto">
                View projects
                <ArrowRight size={18} />
              </a>
            </Magnetic>
            <a
              href={site.resume}
              className="btn-ghost w-full sm:w-auto"
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

        {/* Right grid cell is intentionally empty; the cutout is full-bleed. */}
        <div aria-hidden className="hidden lg:block" />
      </div>
    </section>
  );
}
