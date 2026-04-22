# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000 (uses Turbopack)
npm run build    # Production build
npm run lint     # ESLint via next lint
```

No test suite is configured yet. Deploy via Railway (auto-deploy on push to main).

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript 5**
- **Tailwind CSS v4** — imported via `@import "tailwindcss"` in `globals.css`, configured through `postcss.config.mjs` with `@tailwindcss/postcss`. No `tailwind.config.*` file needed.
- **Framer Motion 12** — all animations: entrance (`fadeUp`), scroll-triggered (`useInView`), scroll-linked (`useScroll`), imperative (`useAnimate`)
- **Geist Sans / Geist Mono** — loaded via `next/font/google`, exposed as CSS vars `--font-geist-sans` / `--font-geist-mono`

## Architecture

Single-page portfolio (`src/app/page.tsx`). Sections are self-contained client components in `src/components/`, composed sequentially:

```
Navbar → Hero → AboutMe → Experience → Stack → Projects → Footer
```

**All sections are built and deployed.** No pending sections (Blog/Contact were descoped in favor of the Footer contact bar).

## Theme System

Dual dark/light theme via `data-theme` attribute on `<html>`.

- **Context:** `src/context/ThemeContext.tsx` — provides `{ theme, toggle }`, persists to `localStorage`
- **Anti-FOUC:** inline script in `src/app/layout.tsx` `<head>` reads localStorage before hydration
- **Default:** dark mode

### CSS Design Tokens (`src/app/globals.css`)

`:root` = light mode (Terracota Elegante), `[data-theme="dark"]` = dark mode.

| Token | Light | Dark |
|---|---|---|
| `--bg-primary` | `#FCFBF9` | `#0a0a0a` |
| `--bg-secondary` | `#FFFFFF` | `#111111` |
| `--text-primary` | `#1F2937` | `#ededed` |
| `--text-dim` | `rgba(31,41,55,0.55)` | `rgba(255,255,255,0.50)` |
| `--text-dimmer` | `rgba(31,41,55,0.35)` | `rgba(255,255,255,0.35)` |
| `--accent-color` | `#D97736` (terracota) | `#6366f1` (indigo) |
| `--glass-bg` | `rgba(0,0,0,0.03)` | `rgba(255,255,255,0.03)` |
| `--glass-border` | `rgba(0,0,0,0.08)` | `rgba(255,255,255,0.08)` |

**Backwards-compat aliases:** `--background`, `--foreground`, `--accent`, `--muted`, `--border`, `--surface`.

### Light Mode Tailwind Overrides

`globals.css` has `[data-theme="light"]` selectors that remap Tailwind classes:
- `.text-white` → `var(--text-primary)`
- `.text-indigo-400` → `var(--accent-color)` (terracota)
- `.from-indigo-400` / `.to-violet-400` → terracota gradient stops
- `.bg-indigo-600/10` → terracota tint
- `.glass-border`, `.glass-bg` classes → their light variants

**Rule:** Never use hardcoded `rgba(255,255,255,...)` for borders/backgrounds in components — always use CSS vars so light mode works automatically.

## Component Conventions

- All components are `"use client"` (they use hooks/animations)
- Scroll-triggered entrance: `useInView(ref, { once: true, margin: "-80px" })` from Framer Motion
- Glassmorphism: `background: var(--glass-bg)`, `border: 1px solid var(--glass-border)`, `backdropFilter: blur(12px)`
- Hover state via `onMouseEnter`/`onMouseLeave` on inline styles (not Tailwind, for JS-driven values)
- Anchor sections need `style={{ scrollMarginTop: "100px" }}` for the fixed navbar

### fadeUp helper (used in Hero, can be reused)
```tsx
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
});
```

## Sections

### Navbar (`src/components/Navbar.tsx`)
Fixed, full-width. Transparent → `bg-black/60 backdrop-blur-xl` after 20px scroll (light: `bg-white/80`). Has dark/light toggle button (sun/moon SVG). Links centered with `absolute left-1/2 -translate-x-1/2`.

### Hero (`src/components/Hero.tsx`)
- "Hola, soy" greeting → animated name → tagline → badges → social CTAs (GitHub, LinkedIn, mailto)
- **Letter fall animation (`AnimatedTitle`):** name split into individual `motion.span`s. Uses `useScroll` — when `scrollY > 30`, letters shake (earthquake keyframes) then fall with gravity + spin + fade. Spring back when scrolling up. Fall has 0.8s base delay + 0.06s stagger per letter. Random fall values pre-calculated in `useMemo`.
- AI Disclaimer: fixed bottom-left amber badge
- Scroll indicator: animated arrow bottom-center

### AboutMe (`src/components/AboutMe.tsx`)
Profile photo (`/profile.jpg`) + bio text + trait cards. Bottom fade gradient. Glass card layout.

### Experience (`src/components/Experience.tsx`)
Timeline of work experience. Active tab border uses `var(--accent-color)`. "T" in "Trayectoria" uses `var(--text-primary)` (not hardcoded white).

### Stack (`src/components/Stack.tsx`)
Tech skill pills. Uses `var(--glass-bg)` / `var(--glass-border-dim)` / `var(--text-dim)`.

### Projects (`src/components/Projects.tsx`)
4 project cards in responsive grid. Each card has: colored header with dot pattern, icon, status badge, company, period, description, tech tags, optional GitHub link.

**Theme-aware accent:** `const getAccent = (rgb) => theme === "light" ? TERRACOTA : rgb` where `TERRACOTA = "217,119,54"`.

Projects:
1. Gobernanza de Agentes de AI — ASAP Consulting (2026–present) — `accentRgb: "99,102,241"`
2. Facturación Automática con IA — RMR Technology Solutions (Nov 2025–Mar 2026) — `accentRgb: "139,92,246"`
3. Suite de Automatización IVECO — Intertron IT Business (Ago 2024–Nov 2025) — `accentRgb: "16,185,129"`
4. Portfolio Personal con IA — Proyecto propio (2025–present) — `accentRgb: "245,158,11"` — links to GitHub

Title: "Lo que construí(mos)." · Subtitle: "Proyectos reales, en entornos reales, construidos en equipo."

### Footer (`src/components/Footer.tsx`)
Bottom bar with: LinkedIn, GitHub, email (`emimoro203@gmail.com`), phone (`351 3128 466`). All items are clickable links. Closes with `© {year} Emiliano Moro · Algunos derechos reservados ®`.

## Static Assets

- `public/profile.jpg` — profile photo, reference as `/profile.jpg`

## Path Alias

`@/*` maps to `src/*` — use for all internal imports.
