import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";
import { featuredProjects, moreProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="03"
          eyebrow="Projects"
          title="Selected work"
          description="A mix of machine learning, full-stack, and systems projects — most rebuilt well beyond their original coursework, with tests and CI."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.title} delay={(i % 3) * 0.08}>
              <ProjectCard project={project} featured />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <h3 className="font-mono text-sm uppercase tracking-widest text-muted">
            More projects
          </h3>
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {moreProjects.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <a
            href={site.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            See more on GitHub
            <ArrowUpRight size={18} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
