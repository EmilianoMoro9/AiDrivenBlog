# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000 (uses Turbopack)
npm run build    # Production build
npm run lint     # ESLint via next lint
```

No test suite is configured yet.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript 5**
- **Tailwind CSS v4** — imported via `@import "tailwindcss"` in `globals.css`, configured through `postcss.config.mjs` with `@tailwindcss/postcss`. No `tailwind.config.*` file needed.
- **Framer Motion 12** — used for all animations (entrance, scroll-triggered via `useInView`, loops)
- **Geist Sans / Geist Mono** — loaded via `next/font/google`, exposed as CSS variables `--font-geist-sans` / `--font-geist-mono`

## Architecture

Single-page portfolio (`src/app/page.tsx`) that composes section components sequentially. Each section is a self-contained client component in `src/components/`.

**Sections built so far:** `Navbar`, `Hero`, `AboutMe`  
**Sections pending:** Stack, Projects, Blog, Contact

### Design system (globals.css)

CSS custom properties define the palette:
- `--background: #0a0a0a` · `--accent: #6366f1` (indigo) · `--surface: #111111`
- Scrollbar styled to 4px, `scroll-behavior: smooth`

### Component conventions

- All interactive/animated components are `"use client"` — static sections can be server components
- Scroll-triggered animations use `useInView(ref, { once: true, margin: "-100px" })` from Framer Motion
- Inline `style` props are used alongside Tailwind when precise values are needed (e.g. glassmorphism, exact widths)
- Glassmorphism pattern: `background: rgba(255,255,255,0.02-0.05)`, `backdropFilter: blur(12px)`, `border: 1px solid rgba(255,255,255,0.08)`, hover state via `onMouseEnter`/`onMouseLeave`
- Anchor sections must include `style={{ scrollMarginTop: "100px" }}` to account for the fixed navbar

### Navbar

Fixed, full-width. Uses `absolute left-1/2 -translate-x-1/2` to center links independently of the logo. Transitions from transparent (`py-7`) to `bg-black/60 backdrop-blur-xl` after 20px scroll.

### Static assets

Profile photo lives at `public/profile.jpg` (converted from HEIC at setup). Reference as `/profile.jpg` in `<img src>`.

### Path alias

`@/*` maps to `src/*` — use for all internal imports.
