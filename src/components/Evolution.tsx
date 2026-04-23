"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface DataPoint {
  label: string;
  value: number;
  narrative: string;
}

const data: DataPoint[] = [
  {
    label: "Scratch",
    value: 10,
    narrative: "Bases lógicas y algoritmos iniciales.",
  },
  {
    label: "Python",
    value: 25,
    narrative: "Salto al scripting y automatización básica.",
  },
  {
    label: "Haskell, Prolog, Smalltalk",
    value: 35,
    narrative: "Ampliación de paradigmas y abstracción.",
  },
  {
    label: "JS, Node, React",
    value: 60,
    narrative: "Desarrollo web moderno y ecosistema full-stack.",
  },
  {
    label: "Power Platform",
    value: 75,
    narrative: "Soluciones corporativas y desarrollo low-code.",
  },
  {
    label: "ChatGPT",
    value: 85,
    narrative: "Adopción de asistencia de IA general.",
  },
  {
    label: "Obsidian",
    value: 80,
    narrative:
      "Experimentación y gestión de conocimiento (ligera caída por curva de aprendizaje).",
  },
  {
    label: "NotebookLM",
    value: 88,
    narrative: "Casos de uso de IA específicos (Ej: creación de Podcasts).",
  },
  {
    label: "Custom Gems",
    value: 94,
    narrative: "Creación de agentes personalizados y flujos optimizados.",
  },
  {
    label: "Claude Code & Agentes",
    value: 100,
    narrative:
      "Pico máximo de productividad con agentes de software autónomos.",
  },
];

// Short display labels for X-axis ticks (prevents overlap when rotated)
const TICK_LABEL: Record<string, string> = {
  "Haskell, Prolog, Smalltalk": "Haskell & co.",
  "JS, Node, React": "JS / React",
  "Power Platform": "Power Plat.",
  "Claude Code & Agentes": "Claude Code",
};

interface ChartColors {
  accent: string;
  gridStroke: string;
  tickFill: string;
}

// Reads the three CSS vars that recharts needs (SVG attrs can't use var(--x) natively).
// Re-reads whenever `theme` changes so colors flip instantly.
function readCSSColors(): ChartColors {
  const s = getComputedStyle(document.documentElement);
  return {
    accent:     s.getPropertyValue("--accent-color").trim(),
    gridStroke: s.getPropertyValue("--glass-border").trim(),
    tickFill:   s.getPropertyValue("--text-dimmer").trim(),
  };
}

// Custom tooltip — uses CSS vars directly (it's a DOM element, not SVG)
function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ value: number; payload: DataPoint }>;
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;

  return (
    <div
      style={{
        background: "var(--bg-secondary)",
        border: "1px solid var(--glass-border)",
        borderRadius: "12px",
        padding: "14px 18px",
        maxWidth: "270px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
      }}
    >
      {/* Stage name + value */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "10px",
          marginBottom: "8px",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            color: "var(--text-primary)",
            fontSize: "0.85rem",
            fontWeight: 400,
            lineHeight: 1.2,
          }}
        >
          {point.label}
        </span>
        <span
          style={{
            color: "var(--accent-color)",
            fontSize: "1.1rem",
            fontWeight: 300,
            whiteSpace: "nowrap",
          }}
        >
          {point.value}
          <span style={{ fontSize: "0.65rem", opacity: 0.55, marginLeft: "2px" }}>
            / 100
          </span>
        </span>
      </div>

      {/* Narrative */}
      <p
        style={{
          color: "var(--text-dim)",
          fontSize: "0.75rem",
          fontWeight: 300,
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {point.narrative}
      </p>
    </div>
  );
}

export default function Evolution() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { theme } = useTheme();

  // SSR-safe initial values match dark mode (default theme).
  // useEffect replaces them immediately on the client.
  const [colors, setColors] = useState<ChartColors>({
    accent:     "#6366f1",
    gridStroke: "rgba(255,255,255,0.08)",
    tickFill:   "rgba(255,255,255,0.35)",
  });

  useEffect(() => {
    setColors(readCSSColors());
  }, [theme]);

  return (
    <section
      id="evolution"
      ref={ref}
      className="relative overflow-hidden"
      style={{ paddingTop: "5rem", paddingBottom: "8rem" }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none" />

      <div style={{ width: "88%", maxWidth: "1100px", margin: "0 auto" }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-5"
          style={{ marginBottom: "2rem" }}
        >
          <span className="text-sm font-light tracking-[0.4em] uppercase text-indigo-400">05</span>
          <div className="h-px w-16 bg-indigo-400/40" />
          <h2 className="text-sm font-light tracking-[0.4em] uppercase text-zinc-500">Evolución</h2>
        </motion.div>

        {/* Título */}
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-5xl md:text-6xl font-thin leading-tight text-center"
          style={{ marginBottom: "0.75rem" }}
        >
          <span style={{ color: "var(--text-primary)" }}>Evolución </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
            Constante.
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
          Cada herramienta fue un salto.{" "}
          <span className="text-zinc-600">Algunas hacia arriba, otras hacia adelante.</span>
        </motion.p>

        {/* Chart card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.38 }}
          style={{
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            borderRadius: "20px",
            padding: "2rem 1rem 0.5rem",
          }}
        >
          <ResponsiveContainer width="100%" height={380}>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 32, left: 8, bottom: 72 }}
            >
              <defs>
                {/*
                  stopColor reads from --accent-color (via state).
                  stopOpacity controls transparency without burning an rgba string.
                */}
                <linearGradient id="evoGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={colors.accent} stopOpacity={0.28} />
                  <stop offset="95%" stopColor={colors.accent} stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="4 4"
                stroke={colors.gridStroke}
                vertical={false}
              />

              <XAxis
                dataKey="label"
                tickFormatter={(v: string) => TICK_LABEL[v] ?? v}
                tick={{ fill: colors.tickFill, fontSize: 11, fontWeight: 300 }}
                axisLine={false}
                tickLine={false}
                angle={-38}
                textAnchor="end"
                interval={0}
                height={78}
                label={{
                  value: "Tiempo →",
                  position: "insideBottomRight",
                  offset: 4,
                  fill: colors.tickFill,
                  fontSize: 11,
                }}
              />

              <YAxis
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                tick={{ fill: colors.tickFill, fontSize: 11, fontWeight: 300 }}
                axisLine={false}
                tickLine={false}
                width={76}
                label={{
                  value: "Productividad",
                  angle: -90,
                  position: "insideLeft",
                  offset: 14,
                  style: { textAnchor: "middle" },
                  fill: colors.tickFill,
                  fontSize: 11,
                }}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: colors.gridStroke, strokeWidth: 1 }}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke={colors.accent}
                strokeWidth={2}
                fill="url(#evoGradient)"
                dot={{
                  fill: colors.accent,
                  strokeWidth: 0,
                  r: 4,
                }}
                activeDot={{
                  r: 6,
                  fill: colors.accent,
                  strokeWidth: 0,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

      </div>
    </section>
  );
}
