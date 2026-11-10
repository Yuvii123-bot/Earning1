"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

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
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Track scroll for navbar style change
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on outside click / escape
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
    window.location.href = href;
  }

  return (
    <>
      <nav
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/[0.06] bg-[#030712]/95 shadow-lg shadow-black/20 backdrop-blur-2xl"
            : "bg-gradient-to-b from-[#030712]/90 to-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8 md:py-4">
          {/* Brand */}
          {brand ? (
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#c9a84c] to-[#a07d2e] shadow-lg shadow-[#c9a84c]/20 transition-transform duration-300 group-hover:scale-105">
                <span className="text-sm font-black text-[#030712]">S</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base leading-tight font-bold tracking-tight text-white">
                  SSJS
                </span>
                <span className="text-[10px] leading-tight font-semibold tracking-[0.25em] text-[#c9a84c] uppercase">
                  Web Agency
                </span>
              </div>
            </Link>
          ) : (
            <Link
              href="/"
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Home
            </Link>
          )}

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-1 md:flex">
            {[
              { href: "/services", label: "Services" },
              { href: "/portfolio", label: "Portfolio" },
              { href: "/blog", label: "Blog" },
              { href: "/about", label: "About" },
              { href: "/faq", label: "FAQ" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-400 transition-all duration-200 hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-2 rounded-full bg-gradient-to-r from-[#c9a84c] to-[#d4b85c] px-5 py-2 text-sm font-bold text-[#030712] shadow-lg shadow-[#c9a84c]/20 transition-all duration-200 hover:shadow-xl hover:shadow-[#c9a84c]/30 hover:brightness-110"
            >
              Get Started
            </Link>
          </div>

          {/* 3-dot Menu Button */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 ${
                menuOpen
                  ? "bg-[#c9a84c] shadow-lg shadow-[#c9a84c]/20"
                  : "bg-white/5 hover:bg-white/10"
              }`}
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              <div className="flex flex-col gap-[5px]">
                <span
                  className={`block h-[2px] w-4 rounded-full transition-all duration-300 ${
                    menuOpen
                      ? "translate-y-[7px] rotate-45 bg-[#030712]"
                      : "bg-white"
                  }`}
                />
                <span
                  className={`block h-[2px] w-4 rounded-full transition-all duration-300 ${
                    menuOpen ? "scale-x-0 bg-[#030712]" : "bg-white"
                  }`}
                />
                <span
                  className={`block h-[2px] w-4 rounded-full transition-all duration-300 ${
                    menuOpen
                      ? "-translate-y-[7px] -rotate-45 bg-[#030712]"
                      : "bg-white"
                  }`}
                />
              </div>
            </button>

            {/* Dropdown - FULLY OPAQUE background */}
            {menuOpen && (
              <div
                className="absolute right-0 z-[60] mt-3 w-72 overflow-hidden rounded-2xl border border-white/[0.08] shadow-2xl shadow-black/60"
                style={{
                  animation: "navDropdown 0.2s ease-out",
                }}
              >
                {/* Solid opaque background */}
                <div className="absolute inset-0 bg-[#0c1425]" />

                <div className="relative p-2">
                  {/* Header */}
                  <div className="mb-1 flex items-center gap-3 px-3 py-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#c9a84c] to-[#a07d2e]">
                      <span className="text-[10px] font-black text-[#030712]">S</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">SSJS Web Agency</div>
                      <div className="text-[10px] text-gray-500">Kathmandu, Nepal</div>
                    </div>
                  </div>

                  <div className="my-1 h-px bg-white/[0.06]" />

                  {/* Nav Links */}
                  <div className="space-y-0.5">
                    {NAV_LINKS.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => handleNavigate(item.href)}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-150 hover:bg-white/[0.06] active:scale-[0.98]"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] text-sm">
                          {item.icon}
                        </span>
                        <span className="text-sm font-medium text-gray-300">{item.label}</span>
                        <svg
                          className="ml-auto h-4 w-4 text-gray-600 transition-colors group-hover:text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ))}
                  </div>

                  <div className="my-2 h-px bg-white/[0.06]" />

                  {/* WhatsApp CTA */}
                  <a
                    href="https://wa.me/9779847509025?text=Hello%20SSJS%20Web%20Agency!%20I%27d%20like%20to%20discuss%20a%20website%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-sm font-bold text-white transition-all hover:bg-green-500 active:scale-[0.98]"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp Us
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Dropdown animation keyframes */}
      <style jsx global>{`
        @keyframes navDropdown {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
}
