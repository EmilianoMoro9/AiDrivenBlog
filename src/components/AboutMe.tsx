"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const traits = [
  {
    label: "Innovación",
    desc: "Nuevas formas de resolver problemas",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.5-1.3 4.7-3.3 6L15 17H9l-.7-2C6.3 13.7 5 11.5 5 9a7 7 0 0 1 7-7z"/>
      </svg>
    ),
  },
  {
    label: "AI Integration",
    desc: "IA donde agrega valor real",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2"/>
        <path d="M6 6V4M10 6V4M14 6V4M18 6V4M6 18v2M10 18v2M14 18v2M18 18v2"/>
        <path d="M9 12h.01M12 12h.01M15 12h.01"/>
      </svg>
    ),
  },
  {
    label: "Team Player",
    desc: "Colaboración y trabajo en equipo",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    label: "Growth Mindset",
    desc: "Aprendizaje constante como forma de vida",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
];

const glassBox = {
  background: "rgba(255,255,255,0.03)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "24px",
  boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
};

export default function AboutMe() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="relative py-32 overflow-hidden">

      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />

      <div style={{ width: "88%", maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header centrado — fuera del grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-5 mb-14"
        >
          <span className="text-sm font-light tracking-[0.4em] uppercase text-indigo-400">01</span>
          <div className="h-px w-16 bg-indigo-400/40" />
          <h2 className="text-sm font-light tracking-[0.4em] uppercase text-zinc-500">About Me</h2>
        </motion.div>

        {/* Título — fuera del grid */}
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-5xl md:text-6xl font-thin text-white leading-tight text-center mb-10"
        >
          Estudiante.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
            Desarrollador.
          </span>{" "}
          Innovador.
        </motion.h3>

        {/* BENTO GRID */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "auto auto",
            gridTemplateAreas: `
              "identity skills"
              "bio      skills"
            `,
            gap: "24px",
            marginTop: "3rem",
          }}
          className="bento-grid"
        >

          {/* Bloque 1 — Identidad */}
          <div style={{ ...glassBox, gridArea: "identity", padding: "2.25rem" }} className="flex items-center gap-5">
            <img
              src="/profile.jpg"
              alt="Emiliano Moro"
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 0 0 3px rgba(99,102,241,0.15)",
                flexShrink: 0,
              }}
            />
            <div className="flex flex-col gap-2">
              <h4 className="text-xl font-light text-white tracking-wide">Emiliano Moro</h4>
              <p className="text-sm font-light text-zinc-500 leading-relaxed">
                23 años · Ingeniería en Software
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-xs font-light text-zinc-400">Disponible para nuevas oportunidades</span>
              </div>
            </div>
          </div>

          {/* Bloque 2 — Bio */}
          <div style={{ ...glassBox, gridArea: "bio", padding: "2rem" }}>
            <p className="text-[15px] font-light text-zinc-400 leading-relaxed">
              Me apasiona{" "}
              <span className="text-white">aprender, innovar</span>{" "}
              y trabajar en equipo enfrentando desafíos reales. Busco constantemente integrar{" "}
              <span className="text-indigo-400">inteligencia artificial</span>{" "}
              en los proyectos y equipos donde trabajo.
            </p>
            <p className="text-sm text-zinc-600 italic mt-3">— Esta misma página es prueba de eso.</p>
          </div>

          {/* Bloque 3 — Skills 2x2 */}
          <div
            style={{
              ...glassBox,
              gridArea: "skills",
              padding: "1.5rem",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            {traits.map((trait, i) => (
              <motion.div
                key={trait.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                className="group flex flex-col gap-3 cursor-default"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "16px",
                  padding: "1.25rem",
                  transition: "border-color 0.3s ease, background 0.3s ease",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(99,102,241,0.3)";
                  el.style.background = "rgba(99,102,241,0.05)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(255,255,255,0.07)";
                  el.style.background = "rgba(255,255,255,0.02)";
                }}
              >
                <span className="text-zinc-400 group-hover:text-indigo-400 transition-colors duration-300">
                  {trait.icon}
                </span>
                <div>
                  <p className="text-[13px] font-light text-white mb-1">{trait.label}</p>
                  <p className="text-[11px] font-light text-zinc-500 leading-relaxed">{trait.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>

      {/* Responsive: colapso a 1 columna en mobile */}
      <style>{`
        @media (max-width: 768px) {
          .bento-grid {
            grid-template-columns: 1fr !important;
            grid-template-areas:
              "identity"
              "bio"
              "skills" !important;
          }
        }
      `}</style>
    </section>
  );
}
