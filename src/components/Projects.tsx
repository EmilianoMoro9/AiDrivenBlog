"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const TERRACOTA = "217,119,54";

const projects = [
  {
    id: "01",
    title: "Gobernanza de Agentes de AI",
    company: "ASAP Consulting",
    period: "2026 — Actualidad",
    description:
      "Aplicativo de Power Platform para gobernanza centralizada de Agentes de AI, permitiendo controlar su generación, ciclo de vida y configuración desde un panel unificado. Integración directa con el ecosistema de recursos existente.",
    tags: ["Power Apps", "AI Agents", "Dataverse", "Power Automate"],
    accentRgb: "99,102,241",
    status: "En desarrollo",
    link: null,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10" />
        <path d="M12 6v6l4 2" />
        <circle cx="19" cy="5" r="3" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M19 3v4M17 5h4" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: "02",
    title: "Facturación Automática con IA",
    company: "RMR Technology Solutions",
    period: "Nov 2025 — Mar 2026",
    description:
      "Integración de Azure OpenAI y AI Builder en el proceso de facturación automática, conectado a ERP mediante API REST. Reducción significativa de tiempos operativos y eliminación de errores de carga manual.",
    tags: ["Azure OpenAI", "AI Builder", "Power Automate", "RPA", "API REST"],
    accentRgb: "139,92,246",
    status: null,
    link: null,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M6 6V4M10 6V4M14 6V4M18 6V4" />
        <path d="M6 18v2M10 18v2M14 18v2M18 18v2" />
        <path d="M9 12h.01M12 12h.01M15 12h.01" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "Suite de Automatización IVECO",
    company: "Intertron IT Business",
    period: "Ago 2024 — Nov 2025",
    description:
      "Desarrollo de aplicaciones y flows de soporte a procesos internos del cliente IVECO con metodologías ágiles. Automatización de flujos críticos del negocio, reduciendo intervención manual en operaciones clave.",
    tags: ["Power Apps", "Power Automate", "SharePoint", "Dataverse"],
    accentRgb: "16,185,129",
    status: null,
    link: null,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 8h4M7 11h2" />
        <rect x="13" y="7" width="4" height="5" rx="1" />
      </svg>
    ),
  },
  {
    id: "04",
    title: "Portfolio Personal con IA",
    company: "Proyecto propio",
    period: "2025 — Actualidad",
    description:
      "Este mismo portfolio: diseñado y construido 100% con Claude Code como co-piloto. Single-page app con animaciones scroll-triggered, sistema de temas dark/light y arquitectura de componentes en Next.js.",
    tags: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Framer Motion", "Claude Code"],
    accentRgb: "245,158,11",
    status: "En desarrollo",
    link: "https://github.com/EmilianoMoro9/AiDrivenBlog",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { theme } = useTheme();

  const getAccent = (projectAccentRgb: string) =>
    theme === "light" ? TERRACOTA : projectAccentRgb;

  return (
    <section
      id="projects"
      ref={ref}
      className="relative overflow-hidden"
      style={{ paddingTop: "5rem", paddingBottom: "8rem" }}
    >
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none" />

      <div style={{ width: "88%", maxWidth: "1100px", margin: "0 auto" }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-5"
          style={{ marginBottom: "2rem" }}
        >
          <span className="text-sm font-light tracking-[0.4em] uppercase text-indigo-400">04</span>
          <div className="h-px w-16 bg-indigo-400/40" />
          <h2 className="text-sm font-light tracking-[0.4em] uppercase text-zinc-500">Proyectos</h2>
        </motion.div>

        {/* Título */}
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-5xl md:text-6xl font-thin leading-tight text-center"
          style={{ marginBottom: "0.75rem" }}
        >
          <span style={{ color: "var(--text-primary)" }}>Lo que </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
            construí.
          </span>
        </motion.h3>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="text-center font-light text-zinc-500 italic"
          style={{ fontSize: "0.95rem", marginBottom: "3.5rem" }}
        >
          Proyectos reales, en entornos reales.{" "}
          <span className="text-zinc-600">Los problemas son los mejores maestros.</span>
        </motion.p>

        {/* Grid de cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {projects.map((project, i) => {
            const accent = getAccent(project.accentRgb);
            const isHovered = hoveredId === project.id;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.35 + i * 0.12 }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  background: "var(--glass-bg)",
                  border: `1px solid ${isHovered ? `rgba(${accent}, 0.35)` : "var(--glass-border)"}`,
                  borderRadius: "20px",
                  overflow: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: isHovered
                    ? `0 12px 40px rgba(${accent}, 0.15)`
                    : "0 2px 12px rgba(0,0,0,0.06)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Header zona visual */}
                <div
                  style={{
                    height: "120px",
                    background: `linear-gradient(135deg, rgba(${accent}, 0.12) 0%, rgba(${accent}, 0.04) 100%)`,
                    borderBottom: `1px solid rgba(${accent}, 0.15)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 1.75rem",
                    position: "relative",
                    flexShrink: 0,
                  }}
                >
                  {/* Dot pattern */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: `radial-gradient(circle, rgba(${accent}, 0.25) 1px, transparent 1px)`,
                      backgroundSize: "22px 22px",
                      opacity: 0.5,
                    }}
                  />

                  {/* Ícono */}
                  <div
                    style={{
                      position: "relative",
                      width: "52px",
                      height: "52px",
                      borderRadius: "14px",
                      background: `rgba(${accent}, 0.15)`,
                      border: `1px solid rgba(${accent}, 0.3)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: `rgb(${accent})`,
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {project.icon}
                  </div>

                  {/* ID + badges */}
                  <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
                    <span
                      style={{
                        fontSize: "2rem",
                        fontWeight: 100,
                        letterSpacing: "0.05em",
                        color: `rgba(${accent}, 0.3)`,
                        lineHeight: 1,
                      }}
                    >
                      {project.id}
                    </span>
                    {project.status && (
                      <span
                        style={{
                          fontSize: "0.6rem",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          padding: "3px 8px",
                          borderRadius: "9999px",
                          background: "rgba(16,185,129,0.1)",
                          border: "1px solid rgba(16,185,129,0.25)",
                          color: "#34d399",
                        }}
                      >
                        {project.status}
                      </span>
                    )}
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: "1.5rem 1.75rem 1.75rem", display: "flex", flexDirection: "column", flex: 1 }}>

                  {/* Company + period */}
                  <div className="flex items-center justify-between" style={{ marginBottom: "0.75rem" }}>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: `rgb(${accent})`,
                        fontWeight: 400,
                      }}
                    >
                      {project.company}
                    </span>
                    <span
                      style={{
                        fontSize: "0.68rem",
                        letterSpacing: "0.06em",
                        color: "var(--text-dimmer)",
                        fontWeight: 300,
                      }}
                    >
                      {project.period}
                    </span>
                  </div>

                  {/* Título */}
                  <h4
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: 300,
                      color: "var(--text-primary)",
                      lineHeight: 1.3,
                      marginBottom: "0.875rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {project.title}
                  </h4>

                  {/* Descripción */}
                  <p
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: 300,
                      color: "var(--text-dim)",
                      lineHeight: 1.65,
                      marginBottom: "1.25rem",
                      flex: 1,
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: project.link ? "1rem" : 0 }}>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "0.65rem",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          padding: "4px 10px",
                          borderRadius: "9999px",
                          background: `rgba(${accent}, 0.08)`,
                          border: `1px solid rgba(${accent}, 0.2)`,
                          color: `rgb(${accent})`,
                          fontWeight: 400,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Link (solo si existe) */}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "0.75rem",
                        fontWeight: 400,
                        letterSpacing: "0.05em",
                        color: `rgb(${accent})`,
                        textDecoration: "none",
                        opacity: 0.8,
                        transition: "opacity 0.2s ease",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                      onMouseLeave={e => (e.currentTarget.style.opacity = "0.8")}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                      </svg>
                      Ver en GitHub
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      <style>{`
        @media (max-width: 640px) {
          #projects [style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
