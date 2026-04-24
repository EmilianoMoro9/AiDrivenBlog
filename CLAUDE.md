# CLAUDE.md — Punto de Restauración

## 1. Tech Stack Actual
- **Framework:** Next.js 16 (App Router) · React 19 · TypeScript 5
- **Estilos:** Tailwind CSS v4 (via `@import "tailwindcss"` en globals.css, sin tailwind.config)
- **Animaciones:** Framer Motion 12 (`useInView`, `useScroll`, `useAnimate`, `motion.*`)
- **Canvas:** Vanilla JS + `requestAnimationFrame` — `NodeCanvas.tsx` (sin librerías)
- **Gráficos:** Recharts (AreaChart, ResponsiveContainer, Tooltip personalizado)
- **Fuentes:** Geist Sans / Geist Mono via `next/font/google` → vars `--font-geist-sans` / `--font-geist-mono`
- **Deploy:** Railway, auto-deploy on push to `main`
- **Repo:** github.com/EmilianoMoro9/AiDrivenBlog

## 2. Arquitectura UI — Página Principal

```
<Navbar />          ← fixed, theme-aware, scroll-reactive
<main>
  <Hero />          ← NodeCanvas (nodos flotantes) + fade-up simple en el nombre
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
- **NodeCanvas — regla de color:** Nunca quemar colores en el canvas. Dark: nodos indigo/violeta, líneas blancas `rgba(255,255,255,α)`. Light: nodos terracota `#CC5542` palette, líneas negras `rgba(0,0,0,α)`. Detectar tema via `document.documentElement.getAttribute("data-theme")` + `MutationObserver`.

## 4. Último Hito Logrado
Rediseño del Hero: sistema de nodos flotantes con física de antigravedad (Canvas + rAF, sin librerías), eliminación del letter-fall animation, y soporte dual-theme completo en el canvas.

**Commit:** `7172d96` — NodeCanvas integrado en Hero, hero-concept.html (prototipo standalone), ClaudeWalker easter egg disponible.

## 5. Componentes — Referencia Rápida

| Componente | ID ancla | Badge | Notas clave |
|---|---|---|---|
| `Experience.tsx` | `#experiencia` | 01 | Timeline laboral |
| `Projects.tsx` | `#projects` | 02 | 4 cards, accent theme-aware |
| `AboutMe.tsx` | `#about` | 03 | Foto `/profile.jpg`, trait cards |
| `Stack.tsx` | `#stack` | 04 | Pills por categoría, links externos |
| `Evolution.tsx` | `#evolution` | 05 | Recharts AreaChart, 10 data points |
| `Hero.tsx` | — | — | `NodeCanvas` en z-index:0 · nombre con `fadeUp(0.25)` simple |
| `NodeCanvas.tsx` | — | — | 15 nodos · sinusoidal float · mouse repulsion · MutationObserver theme |
| `ClaudeWalker.tsx` | — | — | Easter egg: robot que cruza la pantalla y cae. **No integrado aún.** |
| `Navbar.tsx` | — | — | Links: Experiencia·Proyectos·AboutMe·Stack·Contacto |
| `Footer.tsx` | — | — | LinkedIn·GitHub·mail·tel · "Algunos derechos reservados ®" |

## 6. Archivos Públicos Estáticos

| Archivo | URL | Descripción |
|---|---|---|
| `public/hero-concept.html` | `/hero-concept.html` | Prototipo standalone del Hero (Vanilla JS, CSS vars, dual-theme) |
| `public/hello-linkedin.html` | `/hello-linkedin.html` | Página de saludo para LinkedIn (mock Claude chat UI) |

## 7. NodeCanvas — Arquitectura Interna

```
useEffect → init() → resize() + spawnNodes() → rAF loop
                                                  ├─ update(t): posición = baseX + sin(t·vx + phX)·dX
                                                  │              mouse repulsion si dist < 140px
                                                  └─ draw(): clearRect → conexiones → nodos+glow

MutationObserver(data-theme) → spawnNodes()   ← re-asigna paleta al cambiar tema
window resize (debounce 120ms) → init()       ← regenera nodos proporcionales al viewport
Cleanup: cancelAnimationFrame + removeEventListener + observer.disconnect()
```

**Parámetros clave:** `N=15` nodos · `MAX_DIST=230px` para conexiones · líneas `lineWidth=0.9` · alpha máx `0.35` (dark) / `0.30` (light).

## 8. Comandos
```bash
npm run dev      # localhost:3000 (Turbopack)
npm run build    # producción
npm run lint     # ESLint
npx tsc --noEmit # type-check
```
