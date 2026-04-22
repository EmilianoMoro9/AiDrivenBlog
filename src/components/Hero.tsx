"use client";

import { motion, useScroll } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
});

const badges = ["Power Platform", "TypeScript", "AI"];

interface LetterDef {
  char: string;
  fallX: number;
  fallY: number;
  fallRotate: number;
}

function buildLetters(word: string): LetterDef[] {
  return word.split("").map(() => ({
    char: "",
    fallX: (Math.random() - 0.5) * 110,
    fallY: 150 + Math.random() * 160,
    fallRotate: (Math.random() < 0.5 ? 1 : -1) * (200 + Math.random() * 350),
  }));
}

function AnimatedTitle() {
  const { scrollY } = useScroll();
  const [shouldFall, setShouldFall] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setShouldFall(latest > 30);
    });
  }, [scrollY]);

  const firstLetters = useMemo(() => {
    const defs = buildLetters("Emiliano");
    return "Emiliano".split("").map((char, i) => ({ ...defs[i], char }));
  }, []);

  const lastLetters = useMemo(() => {
    const defs = buildLetters("Moro");
    return "Moro".split("").map((char, i) => ({ ...defs[i], char }));
  }, []);

  function fallAnimate(letter: LetterDef, idx: number) {
    return {
      y: [0, -13, 8, -6, 2, letter.fallY],
      x: [0, -4, 7, -3, 1, letter.fallX],
      rotate: [0, -5, 8, -4, 1, letter.fallRotate],
      opacity: [1, 1, 1, 1, 1, 0] as number[],
      transition: {
        duration: 0.9,
        times: [0, 0.1, 0.21, 0.33, 0.43, 1],
        delay: 0.8 + idx * 0.06,
      },
    };
  }

  function riseAnimate(idx: number) {
    return {
      y: 0,
      x: 0,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 18,
        delay: idx * 0.05,
      },
    };
  }

  return (
    <motion.h1
      {...fadeUp(0.25)}
      className="text-6xl md:text-8xl font-thin tracking-tight text-white leading-none text-center"
    >
      {firstLetters.map((letter, i) => (
        <motion.span
          key={`f${i}`}
          animate={shouldFall ? fallAnimate(letter, i) : riseAnimate(i)}
          style={{ display: "inline-block" }}
        >
          {letter.char}
        </motion.span>
      ))}
      <span aria-hidden style={{ display: "inline-block", width: "0.25em" }} />
      {lastLetters.map((letter, i) => {
        const idx = firstLetters.length + 1 + i;
        return (
          <motion.span
            key={`l${i}`}
            animate={shouldFall ? fallAnimate(letter, idx) : riseAnimate(idx)}
            className="font-light text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400"
            style={{ display: "inline-block" }}
          >
            {letter.char}
          </motion.span>
        );
      })}
    </motion.h1>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">

      {/* Glow de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto gap-7">

        {/* Saludo */}
        <motion.p
          {...fadeUp(0.1)}
          className="text-zinc-500 text-sm font-light tracking-[0.3em] uppercase"
        >
          Hola, soy
        </motion.p>

        {/* Nombre animado — letras caen al hacer scroll */}
        <AnimatedTitle />

        {/* Tagline */}
        <motion.p
          {...fadeUp(0.4)}
          className="text-xl md:text-2xl font-light text-zinc-400 tracking-wide"
        >
          Desarrollador · Power Platform ·{" "}
          <span className="text-indigo-400">AI Enthusiast</span>
        </motion.p>

        {/* Badges */}
        <motion.div {...fadeUp(0.55)} className="flex flex-wrap justify-center gap-3">
          {badges.map((badge) => (
            <span
              key={badge}
              style={{
                fontSize: "0.75rem",
                padding: "6px 16px",
                borderRadius: "9999px",
                letterSpacing: "0.08em",
                whiteSpace: "nowrap",
                boxSizing: "border-box",
                border: "1px solid var(--glass-border)",
                background: "var(--glass-bg)",
                color: "var(--text-secondary)",
                fontWeight: 300,
                textTransform: "uppercase",
                backdropFilter: "blur(4px)",
              }}
            >
              {badge}
            </span>
          ))}
        </motion.div>

        {/* Social links — CTA principal: GitHub · LinkedIn · Contact me */}
        <motion.div {...fadeUp(0.65)} className="flex items-center gap-4 mt-2">
          {/* GitHub */}
          <a
            href="https://github.com/EmilianoMoro9"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="group flex items-center gap-2.5 rounded-full border transition-all duration-300"
            style={{ borderColor: "var(--glass-border)", background: "var(--glass-bg)", padding: "12px 24px", boxShadow: "0 4px 15px rgba(255,215,0,0.3)" }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 6px 24px rgba(255,215,0,0.6)")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 4px 15px rgba(255,215,0,0.3)")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-zinc-300 group-hover:text-white transition-colors duration-300">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
            <span className="text-sm font-light text-zinc-300 group-hover:text-white transition-colors duration-300 tracking-wide">GitHub</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/emiliano-moro-dev"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="group flex items-center gap-2.5 rounded-full border transition-all duration-300"
            style={{ borderColor: "var(--glass-border)", background: "var(--glass-bg)", padding: "12px 24px", boxShadow: "0 4px 15px rgba(255,215,0,0.3)" }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 6px 24px rgba(255,215,0,0.6)")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 4px 15px rgba(255,215,0,0.3)")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-zinc-300 group-hover:text-white transition-colors duration-300">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span className="text-sm font-light text-zinc-300 group-hover:text-white transition-colors duration-300 tracking-wide">LinkedIn</span>
          </a>

          {/* Contact me */}
          <a
            href="mailto:emimoro2003@gmail.com"
            title="Contact me"
            className="group flex items-center gap-2.5 rounded-full border transition-all duration-300"
            style={{ borderColor: "var(--glass-border)", background: "var(--glass-bg)", padding: "12px 24px", boxShadow: "0 4px 15px rgba(255,215,0,0.3)" }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 6px 24px rgba(255,215,0,0.6)")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 4px 15px rgba(255,215,0,0.3)")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-300 group-hover:text-white transition-colors duration-300">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            <span className="text-sm font-light text-zinc-300 group-hover:text-white transition-colors duration-300 tracking-wide">Contact me</span>
          </a>
        </motion.div>
      </div>

      {/* AI Disclaimer */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-3 py-2 rounded-lg border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm max-w-[260px] group hover:border-amber-500/40 transition-colors duration-300"
      >
        <span className="text-amber-400 text-base shrink-0">⚠️</span>
        <p className="text-[11px] font-light text-amber-400/70 leading-snug group-hover:text-amber-400/90 transition-colors duration-300">
          This page was generated <span className="font-normal">100% by AI</span>.<br />Proceed with caution.
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-zinc-600 text-xs font-light tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-zinc-600 to-transparent"
        />
      </motion.div>
    </section>
  );
}
