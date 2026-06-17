import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Sections are filled in over the next build phases. */}
      <section id="about" className="scroll-mt-24" />
      <section id="skills" className="scroll-mt-24" />
      <section id="projects" className="scroll-mt-24" />
      <section id="experience" className="scroll-mt-24" />
      <section id="contact" className="scroll-mt-24" />
    </>
  );
}
