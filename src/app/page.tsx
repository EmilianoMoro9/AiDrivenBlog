import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import Experience from "@/components/Experience";
import Stack from "@/components/Stack";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutMe />
        <Experience />
        <Stack />
        <Projects />
      </main>
    </>
  );
}
