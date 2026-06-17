/**
 * Central site configuration — personal details, links, and navigation.
 * Edit values here and they update everywhere on the site.
 */
export const site = {
  name: "Joel Nirmal Oommen",
  shortName: "Joel Nirmal",
  initials: "JN",
  role: "Software Engineer — ML/AI & Full-Stack",
  location: "Ajman, UAE",
  // Update this to your real domain once Vercel is connected.
  url: "https://joel-nirmal.vercel.app",
  email: "joelnirmal97@gmail.com",
  // Drop your CV here as /public/Joel-Nirmal-CV.pdf
  resume: "/Joel-Nirmal-CV.pdf",
  formspree: "https://formspree.io/f/mwvjjkkg",
  socials: {
    github: "https://github.com/joeln45",
    linkedin: "https://www.linkedin.com/in/joel-nirmal-oommen",
  },
} as const;

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
] as const;
