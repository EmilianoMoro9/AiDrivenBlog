import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import Experience from "@/components/Experience";
import Stack from "@/components/Stack";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutMe />
        <Experience />
        <Stack />
        <div className="min-h-screen bg-zinc-950" />
      </main>
    </>
  );
}
