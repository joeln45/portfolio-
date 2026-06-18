import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Headshot from "@/components/Headshot";
import { site } from "@/lib/site";

const stats = [
  { value: 8, suffix: "+", label: "Projects built" },
  { value: 2, suffix: "", label: "Internships" },
  { value: 7, suffix: "+", label: "Languages" },
  { value: 4, suffix: "+", label: "Years coding" },
];

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-32 glow-tr">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <Reveal>
            <p className="font-mono text-sm tracking-widest text-accent-soft">
              <span className="text-muted">01</span> / About
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Built end to end.
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-muted">
              <p>
                I&apos;m Joel. I build across the whole stack, from training a
                model to shipping the interface someone actually uses. BSc (Hons)
                Software Engineering, University of Stirling, where my honours
                dissertation built a semantic search and classification engine
                for news on TF-IDF, scikit-learn, and Hugging Face Transformers.
              </p>
              <p>
                My best work lives where machine learning meets real engineering.
                A JWT-secured Spring Boot order platform. A distributed
                mutual-exclusion protocol written over raw TCP sockets. A data
                story on what makes a bestseller last. I care about the
                unglamorous parts as much as the demo: tests, CI, clean
                architecture.
              </p>
              <p>
                Now I&apos;m after a role in{" "}
                <span className="text-foreground">
                  machine learning, AI, or fintech
                </span>
                , somewhere I can keep building end to end. Off the keyboard:
                travel, basketball, football. Based in {site.location}, open to
                relocation.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="flex justify-center lg:justify-end">
            <Headshot />
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
