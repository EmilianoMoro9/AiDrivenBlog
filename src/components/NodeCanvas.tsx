"use client";

import { useEffect, useRef } from "react";

/* Node color palettes — [R, G, B] */
const DARK_PALETTE: [number, number, number][] = [
  [ 99, 102, 241],  // indigo
  [139,  92, 246],  // violet
  [196, 181, 253],  // lavender
  [165, 180, 252],  // periwinkle
  [224, 231, 255],  // almost-white
];

const LIGHT_PALETTE: [number, number, number][] = [
  [204,  85,  66],  // terracota core
  [212,  97,  79],  // terracota cálido
  [184,  64,  53],  // terracota oscuro
  [228, 123, 106],  // salmón
  [157,  58,  42],  // terracota profundo
];

interface Node {
  baseX: number; baseY: number;
  x: number;     y: number;
  vx: number;    vy: number;
  phX: number;   phY: number;
  dX: number;    dY: number;
  r: number;
  col: [number, number, number];
}

function isLightTheme() {
  return document.documentElement.getAttribute("data-theme") === "light";
}

export default function NodeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const N        = 15;
    const MAX_DIST = 230;
    const MOUSE_R  = 140;
    const PUSH     = 30;

    const mouse = { x: -9999, y: -9999 };
    let nodes: Node[] = [];
    let W = 0, H = 0;
    let rafId = 0;
    let rTimer: ReturnType<typeof setTimeout>;

    /* ── Theme colors ─────────────────────────────── */
    function getLineColor(): [number, number, number, number] {
      return isLightTheme()
        ? [0,   0,   0,   0.30]  // black  lines, light mode
        : [255, 255, 255, 0.35]; // white lines, dark mode
    }

    function getPalette() {
      return isLightTheme() ? LIGHT_PALETTE : DARK_PALETTE;
    }

    /* ── Canvas setup ─────────────────────────────── */
    function resize() {
      W = canvas!.width  = window.innerWidth;
      H = canvas!.height = window.innerHeight;
    }

    function spawnNodes() {
      const pad     = 80;
      const palette = getPalette();
      nodes = Array.from({ length: N }, () => {
        const bx = pad + Math.random() * (W - pad * 2);
        const by = pad + Math.random() * (H - pad * 2);
        return {
          baseX: bx, baseY: by, x: bx, y: by,
          vx:  2.2e-4 + Math.random() * 5e-4,
          vy:  1.8e-4 + Math.random() * 4.5e-4,
          phX: Math.random() * Math.PI * 2,
          phY: Math.random() * Math.PI * 2,
          dX:  16 + Math.random() * 30,
          dY:  12 + Math.random() * 22,
          r:   1.6 + Math.random() * 2.4,
          col: palette[Math.floor(Math.random() * palette.length)],
        };
      });
    }

    /* ── Update ───────────────────────────────────── */
    function update(t: number) {
      for (const n of nodes) {
        n.x = n.baseX + Math.sin(t * n.vx + n.phX) * n.dX;
        n.y = n.baseY + Math.cos(t * n.vy + n.phY) * n.dY;
        const mdx  = n.x - mouse.x;
        const mdy  = n.y - mouse.y;
        const dist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (dist < MOUSE_R && dist > 0.5) {
          const f = (MOUSE_R - dist) / MOUSE_R;
          n.x += (mdx / dist) * f * PUSH;
          n.y += (mdy / dist) * f * PUSH;
        }
      }
    }

    /* ── Draw ─────────────────────────────────────── */
    function draw() {
      ctx.clearRect(0, 0, W, H);

      const [lr, lg, lb, maxA] = getLineColor();
      ctx.lineWidth = 0.9;

      /* connections — white (dark) / black (light), solid color */
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx   = nodes[j].x - nodes[i].x;
          const dy   = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist >= MAX_DIST) continue;

          const a = (1 - dist / MAX_DIST) * maxA;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${lr},${lg},${lb},${a})`;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      /* nodes */
      for (const n of nodes) {
        const [r, g, b] = n.col;

        ctx.shadowBlur  = 20;
        ctx.shadowColor = `rgba(${r},${g},${b},0.65)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},0.92)`;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},0.055)`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    }

    /* ── Loop ─────────────────────────────────────── */
    function loop(t: number) {
      update(t);
      draw();
      rafId = requestAnimationFrame(loop);
    }

    /* ── Init ─────────────────────────────────────── */
    function init() {
      resize();
      spawnNodes();
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(loop);
    }

    /* ── Events ───────────────────────────────────── */
    const onMove   = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave  = () => { mouse.x = -9999; mouse.y = -9999; };
    const onResize = () => { clearTimeout(rTimer); rTimer = setTimeout(init, 120); };

    /* Watch data-theme attribute changes for live theme switching */
    const observer = new MutationObserver(() => spawnNodes());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);
    init();

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(rTimer);
      observer.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
