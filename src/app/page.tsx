import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />

      {/* Filled in over the next build phases. */}
      <section id="experience" className="scroll-mt-24" />
      <section id="contact" className="scroll-mt-24" />
    </>
  );
}
