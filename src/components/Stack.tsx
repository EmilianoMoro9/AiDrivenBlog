"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const categories = [
  {
    label: "Power Platform",
    color: "rgba(0,120,212,0.15)",
    borderColor: "rgba(0,120,212,0.25)",
    textColor: "#60a5fa",
    items: [
      { name: "Power Apps", url: "https://learn.microsoft.com/en-us/power-apps/", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
      { name: "Power Automate", url: "https://learn.microsoft.com/en-us/power-automate/", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
      { name: "Power Automate Desktop", url: "https://learn.microsoft.com/en-us/power-automate/desktop-flows/introduction", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg> },
      { name: "Power BI", url: "https://learn.microsoft.com/en-us/power-bi/", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
      { name: "Dataverse", url: "https://learn.microsoft.com/en-us/power-apps/maker/data-platform/", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg> },
      { name: "SharePoint", url: "https://learn.microsoft.com/en-us/sharepoint/", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3a15 15 0 0 1 0 18M3 12h18"/></svg> },
      { name: "Power Pages", url: "https://learn.microsoft.com/en-us/power-pages/", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
    ],
  },
  {
    label: "Inteligencia Artificial",
    color: "rgba(139,92,246,0.12)",
    borderColor: "rgba(139,92,246,0.25)",
    textColor: "#a78bfa",
    items: [
      { name: "Azure OpenAI", url: "https://learn.microsoft.com/en-us/azure/ai-services/openai/", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/></svg> },
      { name: "AI Builder", url: "https://learn.microsoft.com/en-us/ai-builder/", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M9 12h.01M12 12h.01M15 12h.01"/></svg> },
      { name: "Claude", url: "https://docs.anthropic.com/", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
      { name: "Gemini", url: "https://ai.google.dev/docs", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
      { name: "NotebookLM", url: "https://notebooklm.google/", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> },
    ],
  },
  {
    label: "Aprendiendo",
    color: "rgba(16,185,129,0.08)",
    borderColor: "rgba(16,185,129,0.2)",
    textColor: "#6ee7b7",
    badge: true,
    items: [
      { name: "TypeScript", url: "https://www.typescriptlang.org/docs/", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
      { name: "Next.js", url: "https://nextjs.org/docs", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 19.5h20L12 2z"/></svg> },
      { name: "Docker", url: "https://docs.docker.com/", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="8" width="4" height="4" rx="0.5"/><rect x="7" y="8" width="4" height="4" rx="0.5"/><rect x="7" y="3" width="4" height="4" rx="0.5"/><rect x="12" y="8" width="4" height="4" rx="0.5"/><rect x="12" y="3" width="4" height="4" rx="0.5"/><path d="M2 14s0 4 6 4h8c4 0 6-3 6-3"/><path d="M19 11s2 0 2 2"/></svg> },
    ],
  },
];

export default function Stack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="stack" ref={ref} className="relative overflow-hidden" style={{ paddingTop: "5rem", paddingBottom: "8rem" }}>

      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />

      <div style={{ width: "88%", maxWidth: "1100px", margin: "0 auto" }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-5"
          style={{ marginBottom: "2rem" }}
        >
          <span className="text-sm font-light tracking-[0.4em] uppercase text-indigo-400">03</span>
          <div className="h-px w-16 bg-indigo-400/40" />
          <h2 className="text-sm font-light tracking-[0.4em] uppercase text-zinc-500">Stack</h2>
        </motion.div>

        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{ marginBottom: "1rem" }}
        >
          <h3 className="text-5xl md:text-6xl font-thin text-white leading-tight text-center">
            Herramientas{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              de hoy.
            </span>
          </h3>
        </motion.div>

        {/* Frase irónica */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="text-center font-light text-zinc-500 italic"
          style={{ fontSize: "0.95rem", marginBottom: "3.5rem" }}
        >
          Todo se puede aprender.{" "}
          <span className="text-zinc-600">El stack de hoy es el legacy de mañana.</span>
        </motion.p>

        {/* Categorías */}
        <div className="flex flex-col" style={{ gap: "4rem" }}>
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35 + ci * 0.12 }}
            >
              {/* Label de categoría */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs font-light tracking-[0.3em] uppercase"
                  style={{ color: cat.textColor, opacity: 0.8 }}
                >
                  {cat.label}
                </span>
                {cat.badge && (
                  <span
                    className="text-[10px] font-light tracking-widest uppercase px-2 py-0.5 rounded-full"
                    style={{
                      color: cat.textColor,
                      background: cat.color,
                      border: `1px solid ${cat.borderColor}`,
                    }}
                  >
                    en progreso
                  </span>
                )}
                <div className="flex-1 h-px" style={{ background: cat.borderColor }} />
              </div>

              {/* Pills */}
              <div className="flex flex-wrap" style={{ gap: "1rem", marginTop: "1.5rem" }}>
                {cat.items.map((item, ii) => (
                  <motion.a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.35, delay: 0.4 + ci * 0.12 + ii * 0.05 }}
                    className="flex items-center font-light transition-all duration-300 cursor-pointer select-none"
                    style={{
                      gap: "8px",
                      fontSize: "0.9rem",
                      padding: "10px 20px",
                      borderRadius: "9999px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      color: "rgba(255,255,255,0.55)",
                      letterSpacing: "0.04em",
                      textDecoration: "none",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.background = cat.color;
                      el.style.borderColor = cat.borderColor;
                      el.style.color = cat.textColor;
                      el.style.transform = "translateY(-2px)";
                      el.style.boxShadow = `0 4px 16px ${cat.borderColor}`;
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.background = "rgba(255,255,255,0.03)";
                      el.style.borderColor = "rgba(255,255,255,0.09)";
                      el.style.color = "rgba(255,255,255,0.55)";
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = "none";
                    }}
                  >
                    <span style={{ color: "inherit", opacity: 0.8, display: "flex" }}>{item.icon}</span>
                    {item.name}
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
