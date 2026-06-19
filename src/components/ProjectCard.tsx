"use client";

import type { MouseEvent } from "react";
import { useReducedMotion } from "motion/react";
import { ExternalLink, Lock } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import type { Project, ProjectLink } from "@/lib/projects";

function ProjectLinkItem({ link }: { link: ProjectLink }) {
  if (link.type === "private") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-muted">
        <Lock size={13} />
        {link.label}
      </span>
    );
  }

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-foreground"
    >
      {link.type === "github" ? (
        <GithubIcon size={14} />
      ) : (
        <ExternalLink size={14} />
      )}
      {link.label}
    </a>
  );
}

export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const Icon = project.icon;
  const reduce = useReducedMotion();

  function handleMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
    if (reduce) return;
    // Ghost icon drifts ~2px opposite the cursor — barely-there parallax.
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    e.currentTarget.style.setProperty("--icon-x", `${-px * 4}px`);
    e.currentTarget.style.setProperty("--icon-y", `${-py * 4}px`);
  }

  function handleLeave(e: MouseEvent<HTMLElement>) {
    e.currentTarget.style.setProperty("--icon-x", "0px");
    e.currentTarget.style.setProperty("--icon-y", "0px");
  }

  return (
    <article
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="card-lift group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface"
    >
      {/* Art-directed cover: warm wash + ghosted icon watermark */}
      <div
        className="relative h-32 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
        }}
      >
        <div aria-hidden className="dot-grid absolute inset-0 opacity-20" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-transform duration-200 ease-out"
          style={{ transform: "translate3d(var(--icon-x, 0px), var(--icon-y, 0px), 0)" }}
        >
          <Icon
            aria-hidden
            size={featured ? 150 : 130}
            className="absolute -bottom-7 -right-4 text-white/15 transition-transform duration-500 ease-out group-hover:-rotate-3 group-hover:scale-105"
          />
        </div>
        <span className="absolute bottom-3 left-4 font-mono text-xs text-white/90">
          {project.category}
        </span>
      </div>

      <div className="relative z-10 flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.blurb}</p>

        {project.highlight && (
          <p className="mt-3 text-sm leading-relaxed text-foreground/80">
            <span className="text-accent-soft">→ </span>
            {project.highlight}
          </p>
        )}

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border bg-bg px-2.5 py-0.5 text-xs text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-border pt-4">
          {project.links.map((link) => (
            <ProjectLinkItem key={link.label} link={link} />
          ))}
        </div>
      </div>

      {/* Cursor-following spotlight (above content, never blocks clicks) */}
      <div
        aria-hidden
        className="card-sheen pointer-events-none absolute inset-0 z-20"
      />
    </article>
  );
}
