import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import { site } from "@/lib/site";

const stats = [
  { value: 8, suffix: "", label: "Projects built" },
  { value: 2, suffix: "", label: "Internships" },
  { value: 7, suffix: "", label: "Languages" },
  { value: 4, suffix: "+", label: "Years coding" },
];

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <Reveal>
            <p className="font-mono text-sm tracking-widest text-accent-soft">
              <span className="text-muted">01</span> — About
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              A bit about me
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-muted">
              <p>
                I&apos;m Joel — a software engineer who enjoys the whole stack,
                from training a model to shipping the interface someone actually
                uses. I recently completed my BSc (Hons) in Software Engineering
                at the University of Stirling, where my honours dissertation built
                a semantic search and classification system for news articles
                using TF-IDF, scikit-learn, and Hugging Face Transformers.
              </p>
              <p>
                My favourite work sits where machine learning meets real
                engineering: a data story on what makes a bestseller last, a
                JWT-secured Spring Boot order platform, and a hand-built
                distributed mutual-exclusion protocol over raw TCP sockets. I care
                about the unglamorous parts — tests, CI, clean architecture — as
                much as the demo.
              </p>
              <p>
                I&apos;m now looking for a role in{" "}
                <span className="text-foreground">
                  machine learning, AI, or fintech
                </span>{" "}
                where I can keep building end to end. Away from the keyboard
                you&apos;ll find me travelling, on the basketball court, or
                watching football. Based in {site.location}, and open to
                relocation.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="flex justify-center lg:justify-end">
            {/* TODO: replace this placeholder with
                <Image src="/headshot.jpg" alt="Joel Nirmal" width={256} height={320} .../>
                once you drop your photo into /public. */}
            <div className="relative">
              <div
                className="absolute -inset-3 rounded-3xl opacity-40 blur-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-accent), var(--color-accent-2))",
                }}
              />
              <div className="relative grid h-80 w-64 place-items-center rounded-3xl border border-border bg-surface">
                <span className="font-display text-7xl font-bold text-gradient">
                  {site.initials}
                </span>
                <span className="absolute bottom-4 font-mono text-xs text-muted">
                  add /headshot.jpg
                </span>
              </div>
            </div>
          </Reveal>
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
