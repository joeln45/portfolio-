import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { navLinks, site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-soft">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a href="#top" className="font-display text-lg font-bold tracking-tight">
              {site.shortName}
              <span className="text-accent">.</span>
            </a>
            <p className="mt-3 text-sm text-muted">
              Software engineer working across machine learning, NLP, and
              full-stack development. Based in {site.location}.
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              Navigate
            </span>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              Connect
            </span>
            <div className="flex gap-3">
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
              <a
                href={`mailto:${site.email}`}
                aria-label="Email"
                className="icon-link"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted">
          © {year} {site.name}. Built with Next.js, Tailwind CSS &amp; Motion.
        </div>
      </div>
    </footer>
  );
}
