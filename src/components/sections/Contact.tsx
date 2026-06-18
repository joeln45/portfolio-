import { Download, Mail, MapPin } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { site } from "@/lib/site";

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-32 glow-tr">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="05"
          eyebrow="Contact"
          title="Let's work together"
          description="I'm open to machine learning, AI, fintech, and full-stack roles. Send a message, or reach out directly."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-6">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <a
                href={`mailto:${site.email}`}
                className="group flex items-center gap-4"
              >
                <span className="icon-link">
                  <Mail size={18} />
                </span>
                <span>
                  <span className="block text-xs text-muted">Email</span>
                  <span className="text-sm transition-colors group-hover:text-foreground">
                    {site.email}
                  </span>
                </span>
              </a>
              <div className="mt-5 flex items-center gap-4">
                <span className="icon-link">
                  <MapPin size={18} />
                </span>
                <span>
                  <span className="block text-xs text-muted">Location</span>
                  <span className="text-sm">
                    {site.location} · open to relocation
                  </span>
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
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
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <Download size={18} />
                Download CV
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
