"use client";

import { useRef } from "react";
import { useScroll } from "motion/react";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import AccentRule from "@/components/AccentRule";
import PortraitStage from "@/components/PortraitStage";
import { site } from "@/lib/site";

const stats = [
  { value: 8, suffix: "+", label: "Projects built" },
  { value: 2, suffix: "", label: "Internships" },
  { value: 7, suffix: "+", label: "Languages" },
  { value: 4, suffix: "+", label: "Years coding" },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-32 glow-tr">
      <div className="mx-auto max-w-6xl px-6">
        <div
          ref={sectionRef}
          className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16"
        >
          {/* Sticky portrait stage */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <PortraitStage progress={scrollYProgress} />
          </div>

          {/* Scrolling narrative beats */}
          <div className="flex flex-col gap-14 lg:gap-28 lg:py-[10vh]">
            <Reveal>
              <p className="font-mono text-sm tracking-widest text-accent-soft">
                <span className="text-muted">01</span> / About
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Built end to end.
              </h2>
              <AccentRule />
            </Reveal>

            <Reveal>
              <p className="text-lg leading-relaxed text-muted">
                I&apos;m Joel. I build across the whole stack, from training a
                model to shipping the interface someone actually uses. BSc (Hons)
                Software Engineering, University of Stirling, where my honours
                dissertation built a semantic search and classification engine
                for news on TF-IDF, scikit-learn, and Hugging Face Transformers.
              </p>
            </Reveal>

            <Reveal>
              <p className="text-lg leading-relaxed text-muted">
                My best work lives where machine learning meets real engineering.
                A JWT-secured Spring Boot order platform. A distributed
                mutual-exclusion protocol written over raw TCP sockets. A data
                story on what makes a bestseller last. I care about the
                unglamorous parts as much as the demo: tests, CI, clean
                architecture.
              </p>
            </Reveal>

            <Reveal>
              <p className="text-lg leading-relaxed text-muted">
                Now I&apos;m after a role in{" "}
                <span className="text-foreground">
                  machine learning, AI, or fintech
                </span>
                , somewhere I can keep building end to end. Off the keyboard:
                travel, basketball, football. Based in {site.location}, open to
                relocation.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Stat band */}
        <Reveal delay={0.1}>
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-6 text-center">
                <div className="font-display text-4xl font-bold text-gradient">
                  <CountUp value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
