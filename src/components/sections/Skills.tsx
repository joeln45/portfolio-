import { Brain, Code, Database, Server, Smartphone, Wrench } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { Stagger, StaggerItem } from "@/components/Stagger";

const groups = [
  {
    icon: Code,
    title: "Languages",
    items: ["Python", "Java", "Kotlin", "JavaScript", "TypeScript", "SQL", "C", "OCaml"],
  },
  {
    icon: Brain,
    title: "ML & Data",
    items: ["scikit-learn", "Hugging Face", "pandas", "TF-IDF", "NLP", "Power BI", "Orange"],
  },
  {
    icon: Server,
    title: "Backend & Web",
    items: ["Spring Boot", "Node.js", "Express", "Next.js", "React", "REST", "JWT", "HATEOAS"],
  },
  {
    icon: Smartphone,
    title: "Mobile",
    items: ["Android SDK", "Jetpack Compose", "Room", "Coroutines", "Material 3"],
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
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="02"
          eyebrow="Skills"
          title="My toolkit"
          description="The languages, frameworks, and tools I reach for — grouped by where they fit."
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => {
            const Icon = group.icon;
            return (
              <StaggerItem key={group.title}>
                <div className="group h-full rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-bg text-accent-soft transition-colors group-hover:text-accent-2">
                      <Icon size={20} />
                    </span>
                    <h3 className="font-display text-lg font-semibold">
                      {group.title}
                    </h3>
                  </div>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-border bg-bg px-3 py-1 text-sm text-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
