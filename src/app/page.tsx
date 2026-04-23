import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import Experience from "@/components/Experience";
import Stack from "@/components/Stack";
import Evolution from "@/components/Evolution";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <AboutMe />
        <Stack />
        <Evolution />
      </main>
      <Footer />
    </>
  );
}
