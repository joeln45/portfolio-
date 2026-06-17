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

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
      {/* Gradient cover */}
      <div
        className="relative h-32 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
        }}
      >
        <div aria-hidden className="dot-grid absolute inset-0 opacity-30" />
        <Icon
          size={featured ? 40 : 32}
          className="absolute right-4 top-4 text-white/90 transition-transform duration-300 group-hover:scale-110"
        />
        <span className="absolute bottom-3 left-4 font-mono text-xs text-white/90">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
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
    </article>
  );
}
