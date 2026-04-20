"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "About Me", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Proyectos", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contacto", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? "py-4 bg-black/60 backdrop-blur-xl border-b border-white/8 shadow-xl shadow-black/30"
          : "py-7 bg-transparent"
      }`}
    >
      <nav className="relative flex items-center px-10">

        {/* Logo — izquierda */}
        <a
          href="#"
          className="text-2xl font-light tracking-[0.2em] uppercase text-white hover:text-indigo-400 transition-colors duration-300 select-none"
        >
          dev<span className="text-indigo-400 font-thin">.</span>
        </a>

        {/* Links — centrados absolutamente */}
        <ul className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[15px] font-light text-zinc-300 hover:text-white transition-colors duration-300 relative group tracking-wide"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-indigo-400 transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu button — derecha */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden ml-auto flex flex-col gap-[5px] p-1"
          aria-label="Toggle menu"
        >
          <span className={`block h-px w-7 bg-zinc-300 transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
          <span className={`block h-px w-7 bg-zinc-300 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-px w-7 bg-zinc-300 transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-10 pb-6 pt-5 gap-5 border-t border-white/8 mt-5">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-light text-zinc-300 hover:text-white transition-colors duration-300 tracking-wide"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
