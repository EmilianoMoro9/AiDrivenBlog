# CLAUDE.md — Punto de Restauración

## 1. Tech Stack Actual
- **Framework:** Next.js 16 (App Router) · React 19 · TypeScript 5
- **Estilos:** Tailwind CSS v4 (via `@import "tailwindcss"` en globals.css, sin tailwind.config)
- **Animaciones:** Framer Motion 12 (`useInView`, `useScroll`, `useAnimate`, `motion.*`)
- **Gráficos:** Recharts (AreaChart, ResponsiveContainer, Tooltip personalizado)
- **Fuentes:** Geist Sans / Geist Mono via `next/font/google` → vars `--font-geist-sans` / `--font-geist-mono`
- **Deploy:** Railway, auto-deploy on push to `main`
- **Repo:** github.com/EmilianoMoro9/AiDrivenBlog

## 2. Arquitectura UI — Página Principal

```
<Navbar />          ← fixed, theme-aware, scroll-reactive
<main>
  <Hero />          ← letter-fall animation on scroll (useScroll > 30px)
  <Experience />    ← 01
  <Projects />      ← 02
  <AboutMe />       ← 03
  <Stack />         ← 04
  <Evolution />     ← 05 · Recharts AreaChart
</main>
<Footer />          ← contact bar + copyright
```

**IDs de anclaje:** `#experiencia` · `#projects` · `#about` · `#stack` · `#evolution`  
**Nav links:** Experiencia → Proyectos → About Me → Stack → Contacto (`mailto:`)

## 3. Convenciones Críticas — Reglas de Oro

- **Dual theme obligatorio:** Dark (default, accent `#6366f1` indigo) / Light (accent `#D97736` terracota). Toggle via `ThemeContext` + `data-theme` en `<html>`. Anti-FOUC script en `<head>`.
- **PROHIBIDO quemar hex estáticos:** Especialmente en SVGs y Recharts. Siempre usar `var(--accent-color)`, `var(--glass-border)`, etc. Para Recharts (SVG nativo), leer vars con `getComputedStyle(document.documentElement).getPropertyValue('--x')` en un `useEffect([theme])`. Para el gradiente del área, usar `stopColor={colors.accent}` + `stopOpacity` numérico.
- **CSS tokens canónicos** (definidos en `globals.css`):
  - `--bg-primary` · `--bg-secondary` · `--text-primary` · `--text-dim` · `--text-dimmer`
  - `--accent-color` · `--accent-hover` · `--glass-bg` · `--glass-bg-2` · `--glass-border` · `--glass-border-dim`
- **Light mode Tailwind overrides:** `[data-theme="light"] .text-indigo-400` → terracota. `[data-theme="light"] .from-indigo-400` / `.to-violet-400` → terracota gradient stops. No modificar estos overrides sin razón explícita.
- **Glassmorphism pattern:** `background: var(--glass-bg)` · `border: 1px solid var(--glass-border)` · `backdropFilter: blur(12px)`. Hover via `onMouseEnter`/`onMouseLeave` inline.
- **Todos los componentes son `"use client"`** (usan hooks/animaciones).
- **Numeración de secciones:** badges decorativos 01–05 deben mantenerse en orden visual. Actualizar al reordenar.
- **Scroll margin:** secciones con ancla deben tener `scroll-padding-top: 120px` (ya en `html {}` de globals.css).

## 4. Último Hito Logrado
Integración del gráfico de Evolución de Productividad con Recharts y reestructuración del embudo de UX en la Home.

**Commit:** `ba0f984` — nuevo orden: Experiencia → Proyectos → About Me → Stack → Evolución Constante.

## 5. Componentes — Referencia Rápida

| Componente | ID ancla | Badge | Notas clave |
|---|---|---|---|
| `Experience.tsx` | `#experiencia` | 01 | Timeline laboral |
| `Projects.tsx` | `#projects` | 02 | 4 cards, accent theme-aware |
| `AboutMe.tsx` | `#about` | 03 | Foto `/profile.jpg`, trait cards |
| `Stack.tsx` | `#stack` | 04 | Pills por categoría, links externos |
| `Evolution.tsx` | `#evolution` | 05 | Recharts AreaChart, 10 data points |
| `Hero.tsx` | — | — | Letter-fall: `useScroll > 30px`, delay 0.8s |
| `Navbar.tsx` | — | — | Links: Experiencia·Proyectos·AboutMe·Stack·Contacto |
| `Footer.tsx` | — | — | LinkedIn·GitHub·mail·tel · "Algunos derechos reservados ®" |

## 6. Comandos
```bash
npm run dev      # localhost:3000 (Turbopack)
npm run build    # producción
npm run lint     # ESLint
```
