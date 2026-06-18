import {
  Brain,
  LineChart,
  Server,
  Network,
  Globe,
  Gamepad2,
  Smartphone,
} from "lucide-react";
import type { ComponentType } from "react";

export type ProjectLink = {
  type: "github" | "live" | "private";
  href?: string;
  label: string;
};

export type Project = {
  title: string;
  category: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  blurb: string;
  highlight?: string;
  tags: string[];
  links: ProjectLink[];
  gradient: [string, string];
};

export const featuredProjects: Project[] = [
  {
    title: "Smart Document Management for News",
    category: "NLP · Machine Learning",
    icon: Brain,
    blurb:
      "Honours dissertation: a Streamlit system that ingests news articles and delivers semantic search, automated classification, and summarization in a single interface.",
    highlight:
      "TF-IDF + cosine-similarity search across the BBC News and UCI News Aggregator datasets, with Hugging Face Transformers for summarization.",
    tags: ["Python", "scikit-learn", "Hugging Face", "TF-IDF", "Streamlit"],
    links: [{ type: "private", label: "Private — available on request" }],
    gradient: ["#c2410c", "#e0875a"],
  },
  {
    title: "Amazon Bestsellers Analysis",
    category: "Data Science",
    icon: LineChart,
    blurb:
      "A data story on 11 years of Amazon's top-50 bestsellers, built on a reusable analysis toolkit with unit tests.",
    highlight:
      "Finding: 73% of titles chart only once — staying power, not star rating, drives lasting success.",
    tags: ["Python", "pandas", "Matplotlib", "pytest", "Jupyter"],
    links: [
      {
        type: "github",
        href: "https://github.com/joeln45/amazon-bestsellers-analysis",
        label: "Source",
      },
    ],
    gradient: ["#e0875a", "#c2410c"],
  },
  {
    title: "Order Management System",
    category: "Full-Stack · Backend",
    icon: Server,
    blurb:
      "A full-stack drop-shipping platform: a Spring Boot REST API with JWT auth and HATEOAS, a typed Next.js UI, Postgres, Docker Compose, and CI.",
    highlight:
      "A server-side authed proxy keeps tokens out of the browser; Testcontainers-backed integration tests gate the build.",
    tags: ["Java", "Spring Boot", "Next.js", "PostgreSQL", "JWT", "Docker"],
    links: [
      {
        type: "github",
        href: "https://github.com/joeln45/order-management-system",
        label: "Source",
      },
    ],
    gradient: ["#d4774a", "#e0875a"],
  },
  {
    title: "Distributed Mutual Exclusion",
    category: "Distributed Systems",
    icon: Network,
    blurb:
      "A centralised mutual-exclusion system in Java: a coordinator passes a single token to competing nodes over raw TCP, with priority scheduling and anti-starvation.",
    highlight:
      "Crash-tolerant by hand — no brokers, no frameworks — with rolling logs, JUnit 5 tests, and CI.",
    tags: ["Java", "TCP Sockets", "Multithreading", "JUnit 5", "Maven"],
    links: [
      {
        type: "github",
        href: "https://github.com/joeln45/distributed-mutex-coordinator",
        label: "Source",
      },
    ],
    gradient: ["#c2410c", "#d4774a"],
  },
  {
    title: "Middle East Pearl Diving",
    category: "Frontend · UX",
    icon: Globe,
    blurb:
      "A responsive multimedia museum on Gulf pearl-diving heritage: accessible to WCAG 2.1 AA, with dark mode, an interactive map, a gallery lightbox, and a working contact form.",
    highlight:
      "Hand-built in vanilla JS with a two-tier design-token system, WebP optimisation, and a full SEO pass.",
    tags: ["HTML5", "CSS3", "JavaScript", "Leaflet", "Accessibility"],
    links: [
      {
        type: "live",
        href: "https://joeln45.github.io/middle-east-pearl-diving/",
        label: "Live demo",
      },
      {
        type: "github",
        href: "https://github.com/joeln45/middle-east-pearl-diving",
        label: "Source",
      },
    ],
    gradient: ["#e0875a", "#d4774a"],
  },
];

export const moreProjects: Project[] = [
  {
    title: "Penguin Adventure",
    category: "Game · Java",
    icon: Gamepad2,
    blurb:
      "A 2D platformer with tight game-feel — coyote time, jump buffering, parallax, and custom audio filters — refactored from a 1,276-line god class into clean managers.",
    tags: ["Java 17", "Swing/AWT", "Maven", "JUnit 5"],
    links: [
      {
        type: "github",
        href: "https://github.com/joeln45/penguin-adventure",
        label: "Source",
      },
    ],
    gradient: ["#d4774a", "#e0875a"],
  },
  {
    title: "Diary App",
    category: "Android · Mobile",
    icon: Smartphone,
    blurb:
      "An Android journal with mood, tags, photos, a calendar heatmap, and biometric lock — MVVM + Room, migrated off SharedPreferences, with unit/instrumented tests and CI.",
    tags: ["Kotlin", "Room", "MVVM", "Material 3", "Coroutines"],
    links: [
      {
        type: "github",
        href: "https://github.com/joeln45/DairyApp",
        label: "Source",
      },
    ],
    gradient: ["#c2410c", "#e0875a"],
  },
];
