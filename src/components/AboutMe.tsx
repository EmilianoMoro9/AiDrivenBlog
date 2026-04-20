"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const traits = [
  {
    label: "Innovación",
    desc: "Siempre buscando nuevas formas de resolver problemas",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.5-1.3 4.7-3.3 6L15 17H9l-.7-2C6.3 13.7 5 11.5 5 9a7 7 0 0 1 7-7z"/>
      </svg>
    ),
  },
  {
    label: "AI Integration",
    desc: "Integrando inteligencia artificial donde agrega valor real",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2"/>
        <path d="M6 6V4M10 6V4M14 6V4M18 6V4"/>
        <path d="M6 18v2M10 18v2M14 18v2M18 18v2"/>
        <path d="M9 12h.01M12 12h.01M15 12h.01"/>
      </svg>
    ),
  },
  {
    label: "Team Player",
    desc: "Creo en el poder del trabajo en equipo y la colaboración",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
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

export default function AboutMe() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="relative py-36 overflow-hidden" style={{ scrollMarginTop: "100px" }}>

      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />

      <div style={{ width: "80%", margin: "0 auto" }} className="flex flex-col items-center">

        {/* Header centrado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-5 mb-16"
        >
          <span className="text-sm font-light tracking-[0.4em] uppercase text-indigo-400">01</span>
          <div className="h-px w-16 bg-indigo-400/40" />
          <h2 className="text-sm font-light tracking-[0.4em] uppercase text-zinc-500">About Me</h2>
        </motion.div>

        {/* Título centrado */}
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-5xl md:text-6xl font-thin text-white leading-tight text-center mb-24 w-full"
        >
          Estudiante.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
            Desarrollador.
          </span>{" "}
          Innovador.
        </motion.h3>

        {/* Dos columnas */}
        <div style={{ display: "grid", gridTemplateColumns: "45% 55%", gap: "4rem", width: "100%" }}>

          {/* Bio — izquierda */}
          <div className="flex flex-col gap-6">

            {/* Foto de perfil */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src="/profile.jpg"
                alt="Emiliano Moro"
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "#1a1a1a",
                  display: "block",
                  boxShadow: "0 0 0 4px rgba(99,102,241,0.08)",
                }}
                onError={e => {
                  (e.currentTarget as HTMLImageElement).style.background = "#1a1a1a";
                  (e.currentTarget as HTMLImageElement).removeAttribute("src");
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col gap-5 text-zinc-400 font-light leading-relaxed text-[15px]"
            >
              <p>
                Tengo <span className="text-white">23 años</span> y estoy cursando{" "}
                <span className="text-white">Ingeniería en Software</span>. Me apasiona aprender,
                trabajar en equipo y enfrentar desafíos que me saquen de la zona de confort.
              </p>
              <p>
                Sobre todo, me mueve la idea de{" "}
                <span className="text-white">innovar</span> — encontrar formas nuevas de hacer
                las cosas. Hoy eso significa integrar{" "}
                <span className="text-indigo-400">inteligencia artificial</span> en los proyectos
                y equipos donde trabajo.
              </p>
              <p className="text-zinc-500 text-sm italic">
                — Esta misma página es prueba de eso.
              </p>
            </motion.div>

            {/* Status — dentro de columna izquierda */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-3"
              style={{ marginTop: "0.5rem" }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="text-sm font-light text-zinc-400">
                Disponible para nuevas oportunidades
              </span>
            </motion.div>
          </div>

          {/* Cards — derecha, minimalistas con SVG icons */}
          <div className="flex flex-col gap-3">
            {traits.map((trait, i) => (
              <motion.div
                key={trait.label}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="group w-full cursor-default"
                style={{
                  padding: "1rem 1.25rem",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  transition: "border-color 0.3s ease, background 0.3s ease",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(99,102,241,0.3)";
                  el.style.background = "rgba(99,102,241,0.04)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(255,255,255,0.08)";
                  el.style.background = "rgba(255,255,255,0.02)";
                }}
              >
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="text-zinc-400 group-hover:text-indigo-400 transition-colors duration-300 shrink-0">
                    {trait.icon}
                  </span>
                  <span className="text-[14px] font-light text-white tracking-wide group-hover:text-indigo-300 transition-colors duration-300">
                    {trait.label}
                  </span>
                </div>
                <p className="text-[12px] font-light text-zinc-500 leading-relaxed pl-8">
                  {trait.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
