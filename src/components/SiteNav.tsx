"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export function SiteNav({ brand = true }: { brand?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-white/5 bg-[#030712]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {brand ? (
          <Link href="/" className="flex items-center gap-3">
            <span className="text-lg font-bold tracking-tight text-white">SSJS</span>
            <span className="text-xs font-medium tracking-[0.2em] text-[#c9a84c] uppercase">Web Agency</span>
          </Link>
        ) : (
          <Link href="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white">
            ← Home
          </Link>
        )}

        {/* Desktop Nav */}
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/services" className="text-sm text-gray-400 transition hover:text-white">Services</Link>
          <Link href="/portfolio" className="text-sm text-gray-400 transition hover:text-white">Portfolio</Link>
          <Link href="/blog" className="text-sm text-gray-400 transition hover:text-white">Blog</Link>
          <Link href="/contact" className="rounded-full bg-[#c9a84c] px-5 py-2 text-sm font-semibold text-black transition hover:bg-[#d4b85c]">
            Get Started
          </Link>
        </div>

        {/* 3-dot Menu */}
        <div className="relative md:hidden" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 rounded-lg p-2 transition hover:bg-white/5"
            aria-label="Menu"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          </button>

          {menuOpen && (
            <div className="animate-in fade-in slide-in-from-top-2 absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#0a1628]/95 shadow-2xl backdrop-blur-xl">
              <div className="p-2">
                {[
                  { href: "/", label: "Home", icon: "🏠" },
                  { href: "/services", label: "Services", icon: "⚡" },
                  { href: "/portfolio", label: "Portfolio", icon: "💼" },
                  { href: "/blog", label: "Blog & Guides", icon: "📝" },
                  { href: "/about", label: "About Us", icon: "🏢" },
                  { href: "/faq", label: "FAQ", icon: "❓" },
                  { href: "/team", label: "Our Team", icon: "👤" },
                  { href: "/contact", label: "Contact", icon: "📧" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="border-t border-white/5 p-3">
                <a
                  href="https://wa.me/9779847509025"
                  className="flex items-center justify-center gap-2 rounded-xl bg-green-600 py-2.5 text-sm font-semibold text-white transition hover:bg-green-500"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Desktop 3-dot Menu */}
        <div className="relative hidden md:block" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1 rounded-lg p-2 transition hover:bg-white/5"
            aria-label="More"
          >
            <span className="h-1 w-1 rounded-full bg-gray-400" />
            <span className="h-1 w-1 rounded-full bg-gray-400" />
            <span className="h-1 w-1 rounded-full bg-gray-400" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#0a1628]/95 shadow-2xl backdrop-blur-xl">
              <div className="p-2">
                {[
                  { href: "/about", label: "About Us", icon: "🏢" },
                  { href: "/faq", label: "FAQ", icon: "❓" },
                  { href: "/team", label: "Our Team", icon: "👤" },
                  { href: "/blog", label: "Blog & Guides", icon: "📝" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
