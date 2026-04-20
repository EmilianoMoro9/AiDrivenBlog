"use client";

import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] },
});

const badges = ["Power Platform", "TypeScript", "AI"];

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

        {/* Nombre */}
        <motion.h1
          {...fadeUp(0.25)}
          className="text-6xl md:text-8xl font-thin tracking-tight text-white leading-none"
        >
          Emiliano{" "}
          <span className="font-light text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
            Moro
          </span>
        </motion.h1>

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
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                color: "#a1a1aa",
                fontWeight: 300,
                textTransform: "uppercase",
                backdropFilter: "blur(4px)",
              }}
            >
              {badge}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div {...fadeUp(0.7)} className="flex flex-wrap justify-center gap-4 mt-6">
          <a
            href="#projects"
            style={{
              fontSize: "0.9rem",
              padding: "12px 28px",
              borderRadius: "9999px",
              whiteSpace: "nowrap",
              boxSizing: "border-box",
              fontWeight: 300,
              letterSpacing: "0.03em",
              background: "#4f46e5",
              color: "white",
              transition: "all 0.3s ease",
              display: "inline-block",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#6366f1")}
            onMouseLeave={e => (e.currentTarget.style.background = "#4f46e5")}
          >
            Ver proyectos
          </a>
          <a
            href="#contact"
            style={{
              fontSize: "0.9rem",
              padding: "12px 28px",
              borderRadius: "9999px",
              whiteSpace: "nowrap",
              boxSizing: "border-box",
              fontWeight: 300,
              letterSpacing: "0.03em",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#d4d4d8",
              transition: "all 0.3s ease",
              display: "inline-block",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.color = "#d4d4d8";
            }}
          >
            Contactame
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
