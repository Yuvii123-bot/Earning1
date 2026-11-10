"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/services", label: "Services", icon: "⚡" },
  { href: "/portfolio", label: "Portfolio", icon: "💼" },
  { href: "/blog", label: "Blog & Guides", icon: "📝" },
  { href: "/about", label: "About Us", icon: "🏢" },
  { href: "/faq", label: "FAQ", icon: "❓" },
  { href: "/team", label: "Our Team", icon: "👤" },
  { href: "/contact", label: "Contact", icon: "📧" },
];

export function SiteNav({ brand = true }: { brand?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }

    // Delay adding listener so the current click doesn't immediately close
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen, closeMenu]);

  function handleNavigate(href: string) {
    closeMenu();
    // Use window.location for reliable navigation
    window.location.href = href;
  }

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-white/5 bg-[#030712]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {brand ? (
          <Link href="/" className="flex items-center gap-3">
            <span className="text-lg font-bold tracking-tight text-white">SSJS</span>
            <span className="ml-1 text-xs font-medium tracking-[0.2em] text-[#c9a84c] uppercase">Web Agency</span>
          </Link>
        ) : (
          <Link href="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white">
            ← Home
          </Link>
        )}

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/services" className="text-sm text-gray-400 transition hover:text-white">Services</Link>
          <Link href="/portfolio" className="text-sm text-gray-400 transition hover:text-white">Portfolio</Link>
          <Link href="/blog" className="text-sm text-gray-400 transition hover:text-white">Blog</Link>
          <Link href="/contact" className="rounded-full bg-[#c9a84c] px-5 py-2 text-sm font-semibold text-black transition hover:bg-[#d4b85c]">
            Get Started
          </Link>
        </div>

        {/* Single 3-dot menu (visible on all sizes) */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex flex-col gap-1.5 rounded-lg p-2.5 transition hover:bg-white/10 active:scale-95"
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span className={`h-1.5 w-1.5 rounded-full bg-white transition-transform duration-200 ${menuOpen ? "translate-y-[6px] rotate-45 scale-x-150" : ""}`} />
            <span className={`h-1.5 w-1.5 rounded-full bg-white transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`h-1.5 w-1.5 rounded-full bg-white transition-transform duration-200 ${menuOpen ? "-translate-y-[6px] -rotate-45 scale-x-150" : ""}`} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#0a1628]/98 shadow-2xl shadow-black/40 backdrop-blur-xl">
              <div className="p-2">
                {NAV_LINKS.map((item, i) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavigate(item.href)}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-gray-300 transition-all duration-150 hover:bg-[#c9a84c]/10 hover:text-white active:scale-[0.98]"
                    style={{ animationDelay: `${i * 30}ms` }}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
              <div className="border-t border-white/5 p-3">
                <a
                  href="https://wa.me/9779847509025?text=Hello%20SSJS%20Web%20Agency!%20I%27d%20like%20to%20discuss%20a%20website%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-green-600 py-2.5 text-sm font-semibold text-white transition hover:bg-green-500 active:scale-[0.98]"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp Us
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
