"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const YELLOW = "rgb(255,215,0)";
const YELLOW_GLOW = "rgba(255,215,0,0.4)";
const VIOLET = "#818cf8";

const experiences = [
  {
    role: "Power Platform Developer / Consultant",
    company: "ASAP Consulting",
    date: "Marzo 2026 — Actualidad",
    description:
      "Integrando gobernanza de Agentes de AI dentro de un aplicativo de gobernanza de recursos (flows y apps) en Power Platform, permitiendo controlar la generación y ciclo de vida de agentes de forma centralizada.",
    isActive: true,
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    role: "Power Platform Developer",
    company: "RMR Technology Solutions",
    date: "Noviembre 2025 — Marzo 2026",
    description:
      "Integración de Inteligencia Artificial (Azure OpenAI y AI Builder) en procesos de facturación automática conectados a ERP mediante API, reduciendo tiempos operativos y eliminando errores manuales.",
    isActive: false,
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M6 6V4M10 6V4M14 6V4M18 6V4M6 18v2M10 18v2M14 18v2M18 18v2" />
        <path d="M9 12h.01M12 12h.01M15 12h.01" />
      </svg>
    ),
  },
  {
    role: "Desarrollador / Analista de Productividad 365",
    company: "Intertron IT Business",
    date: "Agosto 2024 — Noviembre 2025",
    description:
      "Desarrollo de aplicaciones y flows de soporte a procesos de negocio con metodologías ágiles, trabajando con cliente IVECO. Foco en automatización de procesos internos con Power Platform.",
    isActive: false,
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => setActive(entry.isIntersecting));
      },
      { threshold: 0.15, rootMargin: "-10% 0px" }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Toggle active class on wrapper for CSS pseudo-element animation
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    if (active) el.classList.add("exp-active");
    else el.classList.remove("exp-active");
  }, [active]);

  return (
    <>
      <style>{`
        .exp-two-col {
          display: grid;
          grid-template-columns: 35% 1fr;
          gap: 4rem;
          align-items: start;
        }
        @media (max-width: 640px) {
          .exp-two-col { grid-template-columns: 1fr; gap: 0.75rem; }
        }

        /* Curved connector: border-top (underline) + border-left (timeline) */
        .exp-timeline-wrapper {
          position: relative;
          padding-left: 1.5rem;
        }
        .exp-timeline-wrapper::before {
          content: '';
          position: absolute;
          left: 0;
          top: -2.5rem;       /* reaches up into the title's margin-bottom gap */
          bottom: 1rem;
          width: 100%;
          border-top: 1px solid rgba(255,255,255,0.1);
          border-left: 1px solid rgba(255,255,255,0.1);
          border-top-left-radius: 24px;
          pointer-events: none;
          transition: border-color 0.7s ease;
        }
        .exp-active .exp-timeline-wrapper::before {
          border-top-color: ${VIOLET};
          border-left-color: ${VIOLET};
        }

        @media (max-width: 640px) {
          .exp-timeline-wrapper::before { display: none; }
        }
      `}</style>

      <section
        id="experiencia"
        ref={sectionRef}
        className="relative overflow-hidden"
        style={{
          marginTop: "6rem",
          paddingTop: "5rem",
          paddingBottom: "8rem",
        }}
      >
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] rounded-full bg-indigo-600/5 blur-[100px] pointer-events-none" />

        <div style={{ width: "88%", maxWidth: "1100px", margin: "0 auto" }}>

          {/* Badge centrado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-5"
            style={{ marginBottom: "2rem" }}
          >
            <span className="text-sm font-light tracking-[0.4em] uppercase text-indigo-400">02</span>
            <div className="h-px w-16 bg-indigo-400/40" />
            <h2 className="text-sm font-light tracking-[0.4em] uppercase text-zinc-500">Experiencia</h2>
          </motion.div>

          {/* Título LEFT-ALIGNED — "T" queda sobre la línea */}
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-5xl md:text-6xl font-thin leading-tight"
            style={{ marginBottom: "2.5rem", textAlign: "left" }}
          >
            <span style={{ color: "white" }}>
              T
            </span>
            <span className="text-white">rayectoria </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              profesional.
            </span>
          </motion.h3>

          {/* Wrapper con pseudo-elemento curvo + timeline */}
          <div ref={wrapperRef}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="exp-timeline-wrapper"
            >
              <div className="flex flex-col" style={{ gap: "5rem" }}>
                {experiences.map((exp, i) => (
                  <motion.div
                    key={exp.company}
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.35 + i * 0.12 }}
                    className="relative group"
                  >
                    {/* Nodo: amarillo para activo, gris para inactivos */}
                    <div
                      className="absolute"
                      style={{
                        left: "-1.5rem",
                        top: "0.45rem",
                        width: "11px",
                        height: "11px",
                        borderRadius: "50%",
                        background: exp.isActive ? YELLOW : "rgba(255,255,255,0.15)",
                        boxShadow: exp.isActive ? `0 0 8px ${YELLOW_GLOW}, 0 0 16px ${YELLOW_GLOW}` : "none",
                        marginLeft: "-5px",
                        transition: "all 0.3s ease",
                      }}
                    />

                    {/* Two-column layout */}
                    <div className="exp-two-col">

                      {/* Izquierda: rol + empresa + fecha */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.35)" }}>
                          {exp.icon}
                          {exp.isActive && (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                              </span>
                              <span style={{ fontSize: "0.6rem" }} className="font-light text-emerald-400">Actualidad</span>
                            </span>
                          )}
                        </div>

                        <h4 className="font-light text-white leading-snug" style={{ fontSize: "1rem" }}>
                          {exp.role}
                        </h4>

                        {/* Empresa en violeta suave */}
                        <p className="font-light" style={{ fontSize: "0.8rem", color: "rgba(129,140,248,0.7)" }}>
                          {exp.company}
                        </p>

                        <p className="font-light text-zinc-600 tracking-widest uppercase" style={{ fontSize: "0.62rem" }}>
                          {exp.date}
                        </p>
                      </div>

                      {/* Derecha: descripción */}
                      <p className="font-light" style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: "1.6" }}>
                        {exp.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </section>
    </>
  );
}
