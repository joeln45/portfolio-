import { Code, Database, Server, Smartphone, Sparkles, Wrench } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import SkillCard from "@/components/SkillCard";
import { Stagger, StaggerItem } from "@/components/Stagger";

const groups = [
  {
    icon: Sparkles,
    title: "AI & Machine Learning",
    items: [
      "Claude Code",
      "Prompt & Context Engineering",
      "ChatGPT",
      "GitHub Copilot",
      "Hugging Face Transformers",
      "NLP & Semantic Search",
      "scikit-learn",
      "Computer Vision",
      "pandas",
    ],
  },
  {
    icon: Code,
    title: "Languages",
    items: ["Python", "Java", "Kotlin", "JavaScript", "TypeScript", "SQL", "C"],
  },
  {
    icon: Smartphone,
    title: "Frontend & Mobile",
    items: ["React", "Next.js", "Tailwind", "Jetpack Compose", "Android SDK", "Material 3"],
  },
  {
    icon: Server,
    title: "Backend & APIs",
    items: ["Spring Boot", "Node.js", "Express", "REST", "JWT", "HATEOAS"],
  },
  {
    icon: Database,
    title: "Databases",
    items: ["PostgreSQL", "MySQL", "SQL Server", "MongoDB", "SQLite"],
  },
  {
    icon: Wrench,
    title: "Tools & DevOps",
    items: ["Git", "GitHub Actions", "Docker", "Maven", "Gradle", "JUnit", "Testcontainers"],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-24 bg-bg-soft py-24 sm:py-32 glow-bl fade-top fade-bottom"
    >
      {/* Amber fire glow behind the grid (breathes, drifts + flickers) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Warm body */}
        <div
          className="ember absolute inset-0 m-auto h-[46rem] w-[46rem] rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, #f59e0b, #c2410c 45%, transparent 70%)",
          }}
        />
        {/* Brighter mid glow */}
        <div
          className="ember ember-2 absolute inset-0 m-auto h-[26rem] w-[26rem] rounded-full blur-[90px]"
          style={{
            background: "radial-gradient(circle, #fbbf24, transparent 65%)",
          }}
        />
        {/* Hot flickering core, set off-centre for a natural ember */}
        <div
          className="ember ember-3 absolute left-[40%] top-[36%] h-[13rem] w-[13rem] rounded-full blur-[70px]"
          style={{
            background: "radial-gradient(circle, #fde68a, transparent 60%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          index="02"
          eyebrow="Skills"
          title="The toolkit"
          description="What I reach for, grouped by where it fits."
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => {
            const Icon = group.icon;
            return (
              <StaggerItem key={group.title}>
                <SkillCard
                  icon={<Icon size={20} />}
                  title={group.title}
                  items={group.items}
                />
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
