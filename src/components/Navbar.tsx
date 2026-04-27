"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

const links = [
  { label: "Experiencia", href: "/#experiencia" },
  { label: "Proyectos",   href: "/#projects"   },
  { label: "About Me",    href: "/#about"       },
  { label: "Stack",       href: "/#stack"       },
  { label: "Contacto",    href: "mailto:emimoro2003@gmail.com" },
  { label: "Art?",        href: "/art"          },
];

function NavLink({
  label,
  href,
  isActive,
  mobile,
  onClick,
}: {
  label: string;
  href: string;
  isActive?: boolean;
  mobile?: boolean;
  onClick?: () => void;
}) {
  const desktopCls = `text-[15px] font-light transition-colors duration-300 relative group tracking-wide ${
    isActive ? "text-white" : "text-zinc-300 hover:text-white"
  }`;
  const mobileCls =
    "text-base font-light text-zinc-300 hover:text-white transition-colors duration-300 tracking-wide";
  const cls = mobile ? mobileCls : desktopCls;

  const content = mobile ? (
    label
  ) : (
    <>
      {label}
      <span
        className={`absolute -bottom-1 left-0 h-px bg-indigo-400 transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </>
  );

  if (href.startsWith("/") && !href.startsWith("/#")) {
    return (
      <Link href={href} className={cls} onClick={onClick}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} onClick={onClick}>
      {content}
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? theme === "dark"
            ? "py-4 bg-black/60 backdrop-blur-xl border-b border-white/8 shadow-xl shadow-black/30"
            : "py-4 bg-white/80 backdrop-blur-xl border-b border-black/10 shadow-xl shadow-black/10"
          : "py-7 bg-transparent"
      }`}
    >
      <nav className="relative flex items-center px-10">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-light tracking-[0.2em] uppercase text-white hover:text-indigo-400 transition-colors duration-300 select-none"
        >
          dev<span className="text-indigo-400 font-thin">.</span>
        </Link>

        {/* Desktop links — centrados absolutamente */}
        <ul className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {links.map((link) => (
            <li key={link.href}>
              <NavLink
                label={link.label}
                href={link.href}
                isActive={link.href === pathname}
              />
            </li>
          ))}
        </ul>

        {/* Derecha: theme toggle + hamburger */}
        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-300 ${
              theme === "dark"
                ? "border-white/10 text-zinc-400 hover:text-white hover:border-white/30"
                : "border-black/10 text-zinc-500 hover:text-zinc-900 hover:border-black/30"
            }`}
          >
            {theme === "dark" ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden flex flex-col gap-[5px] p-1"
            aria-label="Toggle menu"
          >
            <span className={`block h-px w-7 transition-all duration-300 origin-center ${theme === "dark" ? "bg-zinc-300" : "bg-zinc-600"} ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
            <span className={`block h-px w-7 transition-all duration-300 ${theme === "dark" ? "bg-zinc-300" : "bg-zinc-600"} ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-7 transition-all duration-300 origin-center ${theme === "dark" ? "bg-zinc-300" : "bg-zinc-600"} ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className={`flex flex-col px-10 pb-6 pt-5 gap-5 border-t mt-5 ${theme === "dark" ? "border-white/8" : "border-black/10"}`}>
          {links.map((link) => (
            <li key={link.href}>
              <NavLink
                label={link.label}
                href={link.href}
                mobile
                isActive={link.href === pathname}
                onClick={() => setMenuOpen(false)}
              />
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
