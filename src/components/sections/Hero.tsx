import { ArrowRight, Download, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      {/* Ambient background */}
      <div aria-hidden className="blob hero-blob-1" />
      <div aria-hidden className="blob hero-blob-2" />
      <div aria-hidden className="dot-grid absolute inset-0" />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <p className="font-mono text-sm tracking-wide text-accent-soft">
          {site.role}
        </p>

        <h1 className="mt-5 max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          I turn data and ideas into{" "}
          <span className="text-gradient">software that ships.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          Recent BSc (Hons) Software Engineering graduate based in the UAE. I work
          across machine learning, NLP, and full-stack development — from semantic
          search and ML classifiers to production-grade APIs and mobile apps.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
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
        </div>

        <div className="mt-9 flex items-center gap-4">
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
        </div>
      </div>
    </section>
  );
}
