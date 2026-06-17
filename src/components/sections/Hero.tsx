"use client";

import { ArrowRight, Download, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { site } from "@/lib/site";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  const reduce = useReducedMotion();
  const groupProps = reduce
    ? {}
    : ({ variants: container, initial: "hidden", animate: "show" } as const);
  const itemProps = reduce ? {} : { variants: item };

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      {/* Ambient background */}
      <div aria-hidden className="blob hero-blob-1" />
      <div aria-hidden className="blob hero-blob-2" />
      <div aria-hidden className="dot-grid absolute inset-0" />

      <motion.div
        {...groupProps}
        className="relative mx-auto w-full max-w-6xl px-6"
      >
        <motion.p
          {...itemProps}
          className="font-mono text-sm tracking-wide text-accent-soft"
        >
          {site.role}
        </motion.p>

        <motion.h1
          {...itemProps}
          className="mt-5 max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          I turn data and ideas into{" "}
          <span className="text-gradient">software that ships.</span>
        </motion.h1>

        <motion.p
          {...itemProps}
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
        >
          Recent BSc (Hons) Software Engineering graduate based in the UAE. I work
          across machine learning, NLP, and full-stack development — from semantic
          search and ML classifiers to production-grade APIs and mobile apps.
        </motion.p>

        <motion.div
          {...itemProps}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <a href="#projects" className="btn-primary">
            View projects
            <ArrowRight size={18} />
          </a>
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

        <motion.div {...itemProps} className="mt-9 flex items-center gap-4">
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
    </section>
  );
}
