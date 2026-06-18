"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Briefcase, GraduationCap } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

/** One connector segment: a gray track with a clay fill whose height tracks the
 *  timeline's scroll progress over this segment's slice. */
function TimelineSpine({
  progress,
  start,
  end,
  reduce,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
  reduce: boolean | null;
}) {
  const scaleY = useTransform(progress, [start, end], [0, 1], { clamp: true });
  return (
    <span className="relative my-1 w-px flex-1 bg-border">
      {!reduce && (
        <motion.span
          aria-hidden
          className="absolute inset-0 origin-top bg-accent"
          style={{ scaleY }}
        />
      )}
    </span>
  );
}

type Entry = {
  period: string;
  role: string;
  org: string;
  kind: "work" | "education";
  points: string[];
};

const timeline: Entry[] = [
  {
    period: "May 2025 – Jul 2025",
    role: "IT Intern, Autonomous Robotics",
    org: "Lab of Future · UAE",
    kind: "work",
    points: [
      "Contributed to the end-to-end build of an autonomous object-detection and sorting robot: camera calibration, colour detection, path planning, and robotic-arm integration.",
      "Programmed and integrated the robotic arm, coordinating the vision, navigation, and mechanical subsystems.",
    ],
  },
  {
    period: "Sep 2022 – Jun 2026",
    role: "BSc (Hons) Software Engineering",
    org: "University of Stirling, RAK Campus · UAE",
    kind: "education",
    points: [
      "Honours dissertation on semantic search and classification for news articles (NLP).",
      "Coursework: Machine Learning, Distributed Systems, Web Services, Android, UX Design, Data Structures & Algorithms, Databases.",
      "Active Module Representative across multiple semesters.",
    ],
  },
];

export default function Experience() {
  const reduce = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start center", "end center"],
  });
  const segments = Math.max(timeline.length - 1, 1);

  return (
    <section
      id="experience"
      className="relative scroll-mt-24 bg-bg-soft py-24 sm:py-32 glow-bl fade-top"
    >
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          index="04"
          eyebrow="Journey"
          title="Experience & education"
        />

        <div className="mt-14" ref={railRef}>
          {timeline.map((item, i) => {
            const Icon = item.kind === "work" ? Briefcase : GraduationCap;
            const isLast = i === timeline.length - 1;
            return (
              <Reveal key={item.role} delay={i * 0.06}>
                <div className="grid grid-cols-[auto_1fr] gap-5">
                  <div className="flex flex-col items-center">
                    <motion.span
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-surface text-accent-soft"
                      {...(reduce
                        ? {}
                        : {
                            initial: { scale: 0.6, opacity: 0 },
                            whileInView: { scale: 1, opacity: 1 },
                            viewport: {
                              once: true,
                              margin: "0px 0px -80px 0px",
                            },
                            transition: {
                              type: "spring",
                              stiffness: 500,
                              damping: 16,
                              mass: 0.7,
                            },
                          })}
                    >
                      <Icon size={18} />
                    </motion.span>
                    {!isLast && (
                      <TimelineSpine
                        progress={scrollYProgress}
                        start={i / segments}
                        end={(i + 1) / segments}
                        reduce={reduce}
                      />
                    )}
                  </div>
                  <div className={isLast ? "pt-1" : "pb-10 pt-1"}>
                    <span className="font-mono text-xs tracking-wide text-accent-soft">
                      {item.period}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-semibold">
                      {item.role}
                    </h3>
                    <p className="text-sm text-muted">{item.org}</p>
                    {item.points.length > 0 && (
                      <ul className="mt-3 space-y-1.5">
                        {item.points.map((p) => (
                          <li key={p} className="flex gap-2.5 text-sm text-muted">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                            <span className="leading-relaxed">{p}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
