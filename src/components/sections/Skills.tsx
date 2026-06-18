import { Brain, Code, Database, Server, Smartphone, Wrench } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import SkillCard from "@/components/SkillCard";
import { Stagger, StaggerItem } from "@/components/Stagger";

const groups = [
  {
    icon: Code,
    title: "Languages",
    items: ["Python", "Java", "Kotlin", "JavaScript", "TypeScript", "SQL", "C"],
  },
  {
    icon: Brain,
    title: "ML & Data",
    items: ["scikit-learn", "Hugging Face", "pandas", "TF-IDF", "NLP", "Power BI"],
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
