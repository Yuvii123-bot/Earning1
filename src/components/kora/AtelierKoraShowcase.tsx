"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowUpRight,
  Globe,
  ShieldCheck,
  MessageCircle,
  MapPin,
  Layers,
  Check,
  Compass,
  Mail,
} from "lucide-react";
import { KORA_BUSINESSES, type KoraEngineType } from "@/data/kora-businesses";

const VERTICAL_FILTERS: { id: "all" | KoraEngineType; label: string }[] = [
  { id: "all", label: "All 10 Commissions" },
  { id: "kora-stay", label: "Boutique Hospitality" },
  { id: "kora-architecture", label: "Architecture & Interiors" },
  { id: "kora-clinical", label: "Dermatology & Hair" },
  { id: "kora-expedition", label: "Himalayan Expeditions" },
  { id: "kora-export", label: "Global Tea Export" },
];

export function AtelierKoraShowcase() {
  const [activeFilter, setActiveFilter] = useState<"all" | KoraEngineType>("all");

  const visibleBuilds = useMemo(() => {
    if (activeFilter === "all") return KORA_BUSINESSES;
    return KORA_BUSINESSES.filter((b) => b.engine === activeFilter);
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-[#090A0C] text-[#F5F2EB]">
      {/* Top Studio Provenance Strip */}
      <div className="border-b border-white/10 bg-black/60 px-4 py-2 text-[11px] text-stone-400">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 font-mono">
          <span>
            ATELIER KORA · DIGITAL ARCHITECTURE &amp; DIRECT BOOKING SYSTEMS · KATHMANDU · LALITPUR · POKHARA
          </span>
          <span>CONCIERGE DESK: +977 9847509025 · IMYUVOJHA@GMAIL.COM</span>
        </div>
      </div>

      {/* Sticky Editorial Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#090A0C]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="#" className="flex items-center gap-3.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C5A059]/50 bg-[#C5A059]/10 font-display text-lg font-semibold text-[#E2C282]">
              AK
            </span>
            <div>
              <p className="font-display text-2xl font-semibold tracking-wide text-white">
                Atelier Kora
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
                Bespoke Web Architecture · Nepal
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-xs font-medium text-stone-300 md:flex">
            <a href="#commissions" className="hover:text-[#E2C282]">
              Private Commissions
            </a>
            <a href="#methodology" className="hover:text-[#E2C282]">
              Interactive Systems
            </a>
            <a href="#retainer" className="hover:text-[#E2C282]">
              Commission Terms
            </a>
          </nav>

          <a
            href="https://wa.me/9779847509025?text=Hello%20Atelier%20Kora%20%E2%80%94%20we%20would%20like%20to%20discuss%20activating%20our%20custom%20digital%20flagship."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#C5A059] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-stone-950 transition hover:bg-[#D5B26E]"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Studio Concierge
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[780px] -translate-x-1/2 rounded-full bg-[#C5A059]/10 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/35 bg-[#C5A059]/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-[#E2C282]">
              <Sparkles className="h-3.5 w-3.5" />
              Engineered First · Zero Upfront Retainer · 24-Hour Domain Handover
            </span>

            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.03] tracking-tight text-white sm:text-7xl">
              Digital Flagships Built for Nepal&apos;s{" "}
              <span className="italic text-[#E2C282]">
                Most Discerning Institutions.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone-400 sm:text-lg">
              Atelier Kora designs and engineers bespoke web platforms for heritage boutique hotels, principal architectural practices, NMC specialist clinics, established Himalayan expedition outfitters, and single-origin exporters—complete with live multi-currency configurators and direct reservation engines.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#commissions"
                className="inline-flex items-center gap-2 rounded-full bg-[#C5A059] px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-stone-950 transition hover:bg-[#D5B26E]"
              >
                Inspect 10 Live Commissions
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="mailto:imyuvojha@gmail.com?subject=Atelier%20Kora%20%E2%80%94%20Private%20Digital%20Commission"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-white/10"
              >
                <Mail className="h-4 w-4 text-[#E2C282]" />
                Request Private Audit
              </a>
            </div>
          </div>

          {/* 4 Engineering Pillars */}
          <div
            id="methodology"
            className="mt-20 grid gap-5 border-t border-white/10 pt-12 sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              {
                icon: Layers,
                code: "01 / BESPOKE ENGINES",
                title: "Sector-Specific Calculators",
                desc: "Multi-currency room-night engines, sq.ft. BOQ estimators, SVG altitude curves, and FOB export RFQ builders—never generic brochure templates.",
              },
              {
                icon: Compass,
                code: "02 / DIRECT MARGIN",
                title: "Zero OTA & Middleman Leakage",
                desc: "Convert international travelers, homeowners, and B2B buyers directly via WhatsApp and front-desk dispatch without 18% OTA commissions.",
              },
              {
                icon: Globe,
                code: "03 / EDGE INFRASTRUCTURE",
                title: "Global CDN + Schema.org SEO",
                desc: "Sub-second loads across Europe, North America, India, and Nepal 4G, paired with automatic SSL security and Google Rich-Result structured data.",
              },
              {
                icon: ShieldCheck,
                code: "04 / BUILD-FIRST TRUST",
                title: "Inspect Live Before Paying",
                desc: "We build your complete custom flagship first. Review it on your phone; settle only after we bind it live to your .com or .com.np domain.",
              },
            ].map((item) => (
              <div
                key={item.code}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-[#E2C282]">
                    {item.code}
                  </span>
                  <item.icon className="h-4 w-4 text-[#C5A059]" />
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-stone-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio / Private Commissions */}
      <section id="commissions" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#E2C282]">
                Curated Nepal Cohort · Ready for Immediate Domain Activation
              </p>
              <h2 className="mt-2 font-display text-4xl font-semibold text-white sm:text-5xl">
                Private Digital Flagship Commissions
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {VERTICAL_FILTERS.map((vf) => (
                <button
                  key={vf.id}
                  onClick={() => setActiveFilter(vf.id)}
                  className={`rounded-full px-3.5 py-2 text-xs font-medium transition ${
                    activeFilter === vf.id
                      ? "bg-[#C5A059] text-stone-950 font-semibold"
                      : "border border-white/10 bg-white/5 text-stone-300 hover:border-white/25"
                  }`}
                >
                  {vf.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {visibleBuilds.map((biz) => (
              <Link
                key={biz.slug}
                href={`/${biz.slug}?founder=1`}
                className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-[#C5A059]/60"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={biz.heroImage}
                    alt={biz.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C] via-transparent to-black/30" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/65 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#E2C282] backdrop-blur">
                    {biz.sectorLabel}
                  </span>
                  <span className="absolute bottom-3 left-4 font-mono text-[11px] text-stone-200">
                    <MapPin className="mr-1 inline h-3 w-3 text-[#C5A059]" />
                    {biz.neighborhood}, {biz.city}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-white group-hover:text-[#E2C282]">
                      {biz.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-stone-400">
                      {biz.tagline}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[11px]">
                    <span className="text-stone-400">{biz.established}</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-[#E2C282]">
                      Inspect Flagship
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Transparent Commission Terms */}
      <section
        id="retainer"
        className="border-t border-white/10 bg-white/[0.02] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#E2C282]">
              Transparent Turnkey Handover
            </p>
            <h2 className="mt-2 font-display text-4xl font-semibold text-white sm:text-5xl">
              Commission &amp; Stewardship Structure
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/12 bg-white/[0.03] p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone-400">
                One-Time Flagship Transfer
              </p>
              <p className="mt-3 font-display text-4xl font-semibold text-white">
                NPR 21,999 – 27,999
              </p>
              <p className="mt-2 text-xs text-stone-400">
                Complete bespoke platform connected to your existing `.com` or `.com.np` domain within 24 hours.
              </p>
              <ul className="mt-6 space-y-3 text-xs text-stone-300">
                {[
                  "Bespoke interactive calculator, booking engine, or export RFQ desk",
                  "Tailored copywriting, real credentials, and visual curation",
                  "DNS migration, HTTPS/SSL security certificate & Schema.org SEO",
                  "Direct WhatsApp & email lead routing with zero third-party fees",
                  "Payable via Corporate Bank Transfer, Fonepay, eSewa or Khalti after launch",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#C5A059]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-[#C5A059]/40 bg-[#C5A059]/[0.06] p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#E2C282]">
                Optional Managed Cloud &amp; Concierge Care
              </p>
              <p className="mt-3 font-display text-4xl font-semibold text-white">
                NPR 2,000 – 2,500{" "}
                <span className="font-sans text-xs font-normal text-stone-400">
                  / month
                </span>
              </p>
              <p className="mt-2 text-xs text-stone-300">
                Dedicated global edge hosting, seasonal tariff/harvest/team updates, and priority engineering support.
              </p>
              <ul className="mt-6 space-y-3 text-xs text-stone-200">
                {[
                  "99.99% global edge CDN hosting & automated SSL renewals",
                  "Same-day room rate, expedition date, doctor, or harvest updates via WhatsApp",
                  "Monthly direct-inquiry & visitor performance digest",
                  "100% client ownership — cancel or self-host anytime without lock-in",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#E2C282]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-12 text-xs text-stone-500">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <p>
            © 2026 Atelier Kora · Digital Architecture &amp; Bespoke Web Systems · Kathmandu, Nepal
          </p>
          <div className="flex items-center gap-6">
            <a href="mailto:imyuvojha@gmail.com" className="hover:text-stone-300">
              imyuvojha@gmail.com
            </a>
            <a href="tel:+9779847509025" className="hover:text-stone-300">
              +977 9847509025
            </a>
            <Link href="/dashboard" className="text-stone-600 hover:text-stone-400">
              Partner Console
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
