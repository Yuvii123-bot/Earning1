"use client";

import React, { useMemo, useState } from "react";
import {
  Leaf,
  Globe,
  ShieldCheck,
  Check,
  Package,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Award,
  Sparkles,
  Star,
  ArrowUpRight,
} from "lucide-react";
import type { KoraBusinessConfig } from "@/data/kora-businesses";

export function ArtisanalExportEngine({
  business,
}: {
  business: KoraBusinessConfig;
  isPreview?: boolean;
}) {
  const lots = business.exportLots || [];

  const [selectedLotId, setSelectedLotId] = useState(lots[0]?.id || "");
  const [channel, setChannel] = useState<"export" | "domestic">("export");
  const [currency, setCurrency] = useState<"USD" | "EUR" | "NPR">("USD");
  const [kgQty, setKgQty] = useState(25);
  const [freightMode, setFreightMode] = useState<"air" | "sea" | "sample">("air");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [buyerName, setBuyerName] = useState("");
  const [buyerCompany, setBuyerCompany] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [destinationPort, setDestinationPort] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const activeLot = useMemo(
    () => lots.find((l) => l.id === selectedLotId) || lots[0],
    [lots, selectedLotId]
  );

  const exportQuote = useMemo(() => {
    if (!activeLot) return { unitDisplay: "", totalDisplay: "", volumeDiscount: 0 };
    const effectiveQty = freightMode === "sample" ? 2 : kgQty;
    const discount = effectiveQty >= 100 ? 0.12 : effectiveQty >= 50 ? 0.07 : 0;
    const unitUsd = +(activeLot.fobUsdPerKg * (1 - discount)).toFixed(2);
    const totalUsd = Math.round(unitUsd * effectiveQty);

    const fmt = (u: number) => {
      if (currency === "EUR") return `€${Math.round(u * 0.92).toLocaleString()}`;
      if (currency === "NPR") return `NPR ${Math.round(u * 134).toLocaleString()}`;
      return `$${u.toLocaleString()}`;
    };

    return {
      effectiveQty,
      unitDisplay: fmt(unitUsd),
      totalDisplay: fmt(totalUsd),
      volumeDiscount: Math.round(discount * 100),
    };
  }, [activeLot, kgQty, freightMode, currency]);

  async function handleRfqSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!buyerName.trim() || !buyerEmail.trim()) return;
    setSubmitting(true);
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_slug: business.slug,
          customer_name: `${buyerName}${buyerCompany ? ` (${buyerCompany})` : ""}`,
          customer_phone: buyerEmail,
          service_selected:
            channel === "export"
              ? `${activeLot?.lotCode} ${activeLot?.name} · ${exportQuote.effectiveQty} kg (${exportQuote.totalDisplay} FOB)`
              : `Tealaya Boutique Cupping / Nepal Wholesale — ${activeLot?.name}`,
          preferred_date: freightMode.toUpperCase(),
          party_size: exportQuote.effectiveQty || 1,
          notes: `Destination / Store: ${destinationPort || "Germany / EU / Kathmandu"}`,
        }),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F6F2E9] text-stone-900">
      {/* Top Export Provenance Bar */}
      <div className="bg-[#12241C] px-4 py-2 text-[11px] text-stone-200">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 font-mono">
          <span>
            <Leaf className="mr-1.5 inline h-3.5 w-3.5 text-amber-300" />
            {business.established} · {business.coordinates}
          </span>
          <span>
            Export HQ: Kupondole-10, Lalitpur · {business.phoneDisplay} · {business.email}
          </span>
        </div>
      </div>

      {/* Sticky Editorial Header */}
      <header className="sticky top-0 z-40 border-b border-stone-900/10 bg-[#F6F2E9]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <a href="#" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#162D23] font-display text-base font-semibold text-amber-200">
              {business.monogram}
            </span>
            <div>
              <p className="font-display text-xl font-semibold leading-none text-stone-950 sm:text-2xl">
                {business.name}
              </p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-stone-500">
                {business.sectorLabel}
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-xs font-medium text-stone-700 lg:flex">
            <a href="#terroir" className="hover:text-stone-950">
              Ilam Terroir
            </a>
            <a href="#harvest-lots" className="hover:text-stone-950">
              Harvest Lots &amp; Export RFQ
            </a>
            <a href="#boutiques" className="hover:text-stone-950">
              Thamel &amp; Jhamsikhel Salons
            </a>
            <a href="#faq" className="hover:text-stone-950">
              Export Compliance
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex rounded-full border border-stone-300 bg-white p-0.5 font-mono text-[11px] font-semibold">
              {(["USD", "EUR", "NPR"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`rounded-full px-2.5 py-1 transition ${
                    currency === c ? "bg-[#162D23] text-white" : "text-stone-600"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <a
              href="#harvest-lots"
              className="hidden rounded-full bg-[#162D23] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#1E3D30] sm:inline-flex"
            >
              Request Cupping / FOB Quote
            </a>
          </div>
        </div>
      </header>

      {/* Kinfolk-Inspired Editorial Hero */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#162D23]/25 bg-[#162D23]/5 px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-[#162D23]">
              <Sparkles className="h-3 w-3" />
              {business.credentialsBadge}
            </span>

            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.06] tracking-tight text-stone-950 sm:text-6xl">
              {business.tagline}
            </h1>

            <p className="mt-5 text-sm leading-relaxed text-stone-600 sm:text-base">
              {business.editorialIntro}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#harvest-lots"
                className="inline-flex items-center gap-2 rounded-full bg-[#162D23] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#1F3F31]"
              >
                Explore Micro-Lots &amp; FOB Export
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#boutiques"
                className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-3.5 text-xs font-semibold text-stone-800 hover:border-stone-500"
              >
                Visit Thamel &amp; Jhamsikhel Boutiques
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-stone-300 pt-7 sm:grid-cols-4">
              {business.stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl font-semibold tabular-nums text-stone-950">
                    {s.value}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-stone-500">
                    {s.label}
                  </p>
                  <p className="mt-0.5 text-[11px] text-stone-600">{s.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-[2rem] border border-stone-900/10 shadow-2xl">
              <img
                src={business.heroImage}
                alt={business.name}
                className="h-[420px] w-full object-cover sm:h-[540px]"
              />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-[#12241C]/90 p-5 text-stone-100 backdrop-blur-md">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-300">
                  Leadership &amp; Trade Stewardship
                </p>
                <p className="mt-1 font-display text-2xl font-semibold text-white">
                  {business.principalOrFounder}
                </p>
                <p className="text-xs text-stone-300">{business.principalTitle}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terroir & Export Compliance Pillars */}
      <section id="terroir" className="border-y border-stone-300/80 bg-[#EDE7DA] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {business.pillars.map((p) => (
              <div key={p.code} className="rounded-3xl bg-white p-7 shadow-sm">
                <span className="font-mono text-xs font-semibold text-[#8A5224]">
                  ORIGIN {p.code}
                </span>
                <h3 className="mt-3 font-display text-2xl font-semibold text-stone-950">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Sensory Cupping Table & Global FOB Export Configurator */}
      <section id="harvest-lots" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#8A5224]">
                Single-Origin Traceable Lots · 2026 Harvest
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-stone-950 sm:text-5xl">
                Sensory Cupping Vault &amp; Export RFQ Builder
              </h2>
            </div>

            <div className="inline-flex rounded-full border border-stone-300 bg-white p-1 text-xs font-semibold">
              <button
                onClick={() => setChannel("export")}
                className={`rounded-full px-4 py-2 transition ${
                  channel === "export" ? "bg-[#162D23] text-white" : "text-stone-600"
                }`}
              >
                Global B2B Export (FOB)
              </button>
              <button
                onClick={() => {
                  setChannel("domestic");
                  setCurrency("NPR");
                }}
                className={`rounded-full px-4 py-2 transition ${
                  channel === "domestic" ? "bg-[#162D23] text-white" : "text-stone-600"
                }`}
              >
                Nepal Hotels &amp; Tasting Salon
              </button>
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            {/* Left: 6 Harvest Lots with Live Liquor Swatch */}
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {lots.map((lot) => {
                const selected = lot.id === activeLot?.id;
                return (
                  <div
                    key={lot.id}
                    onClick={() => setSelectedLotId(lot.id)}
                    className={`cursor-pointer rounded-3xl border p-5 transition ${
                      selected
                        ? "border-[#162D23] bg-white shadow-md ring-1 ring-[#162D23]"
                        : "border-stone-200 bg-white/75 hover:border-stone-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-stone-500">
                        {lot.lotCode} · {lot.category}
                      </span>
                      <span
                        className="h-5 w-5 rounded-full border border-black/15 shadow-inner"
                        style={{ backgroundColor: lot.liquorHex }}
                        title="Cup Liquor Tone"
                      />
                    </div>

                    <h3 className="mt-2 font-display text-2xl font-semibold text-stone-950">
                      {lot.name}
                    </h3>
                    <p className="mt-0.5 font-mono text-[11px] text-[#8A5224]">
                      {lot.originAltitude}
                    </p>
                    <p className="mt-2.5 text-xs leading-relaxed text-stone-600">
                      {lot.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {lot.tastingNotes.map((note) => (
                        <span
                          key={note}
                          className="rounded-full bg-[#F6F2E9] px-2.5 py-0.5 text-[11px] font-medium text-stone-700"
                        >
                          {note}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex items-baseline justify-between border-t border-stone-200 pt-3 font-mono text-xs">
                      <span className="text-stone-500">MOQ {lot.moqKg} kg</span>
                      <span className="font-bold text-stone-950">
                        {channel === "export"
                          ? `$${lot.fobUsdPerKg}/kg FOB`
                          : `NPR ${lot.retailNpr250g.toLocaleString()} / 250g`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Export / Tasting Dispatch Form */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 rounded-3xl border border-stone-900/15 bg-white p-6 shadow-xl sm:p-7">
                <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500">
                      {channel === "export"
                        ? "Direct Exporter Proforma Desk"
                        : "Tealaya Kathmandu & Lalitpur"}
                    </p>
                    <h3 className="font-display text-2xl font-semibold text-stone-950">
                      {activeLot?.name}
                    </h3>
                  </div>
                  <Award className="h-6 w-6 text-[#8A5224]" />
                </div>

                <p className="mt-3 font-mono text-[11px] text-stone-500">
                  Brew / Spec: {activeLot?.steepSpec}
                </p>

                {channel === "export" && (
                  <>
                    <div className="mt-4 grid grid-cols-3 gap-1.5 text-[11px]">
                      {[
                        { id: "sample", label: "2kg DHL Sample" },
                        { id: "air", label: "Air Cargo FOB" },
                        { id: "sea", label: "Sea Container" },
                      ].map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() =>
                            setFreightMode(m.id as "air" | "sea" | "sample")
                          }
                          className={`rounded-xl border py-2 font-semibold transition ${
                            freightMode === m.id
                              ? "border-[#162D23] bg-[#162D23] text-white"
                              : "border-stone-300 bg-stone-50 text-stone-700"
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>

                    {freightMode !== "sample" && (
                      <div className="mt-4">
                        <div className="flex justify-between font-mono text-xs">
                          <span className="text-stone-500">Consignment Volume</span>
                          <span className="font-bold">{kgQty} kg</span>
                        </div>
                        <input
                          type="range"
                          min={5}
                          max={300}
                          step={5}
                          value={kgQty}
                          onChange={(e) => setKgQty(Number(e.target.value))}
                          className="mt-2 h-2 w-full cursor-pointer accent-[#162D23]"
                        />
                      </div>
                    )}

                    <div className="mt-4 rounded-2xl bg-[#F6F2E9] p-4 text-xs">
                      <div className="flex justify-between text-stone-600">
                        <span>Indicative Rate ({exportQuote.effectiveQty} kg)</span>
                        <span className="font-mono font-semibold">
                          {exportQuote.unitDisplay} / kg
                        </span>
                      </div>
                      {exportQuote.volumeDiscount > 0 && (
                        <div className="mt-1 flex justify-between text-emerald-800">
                          <span>Block-Volume Tier Discount</span>
                          <span className="font-mono">-{exportQuote.volumeDiscount}%</span>
                        </div>
                      )}
                      <div className="mt-2.5 flex items-baseline justify-between border-t border-stone-300 pt-2.5">
                        <span className="font-semibold text-stone-900">
                          Indicative FOB Kathmandu
                        </span>
                        <span className="font-display text-3xl font-semibold tabular-nums text-stone-950">
                          {exportQuote.totalDisplay}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-stone-500">
                        Includes Phytosanitary Cert, Certificate of Origin &amp; Organic Lot Sheet
                      </p>
                    </div>
                  </>
                )}

                {submitted ? (
                  <div className="mt-5 rounded-2xl border border-emerald-700/30 bg-emerald-50 p-4 text-xs text-emerald-950">
                    <p className="font-semibold">
                      Trade / Cupping Request Logged with ANTCC &amp; Tealaya!
                    </p>
                    <p className="mt-1">
                      Our Kupondole export desk will respond with harvest certificates, DHL sample tracking, or proforma terms.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleRfqSubmit} className="mt-4 space-y-2.5">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs focus:border-stone-900 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Company / Tea House / Hotel Name"
                      value={buyerCompany}
                      onChange={(e) => setBuyerCompany(e.target.value)}
                      className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs focus:border-stone-900 focus:outline-none"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Business Email or Phone"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs focus:border-stone-900 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder={
                        channel === "export"
                          ? "Destination City / Port (e.g., Hamburg, Tokyo, New York)"
                          : "Preferred Boutique (Thamel / Jhamsikhel / Kupondole HQ)"
                      }
                      value={destinationPort}
                      onChange={(e) => setDestinationPort(e.target.value)}
                      className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs focus:border-stone-900 focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full rounded-xl bg-[#162D23] py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#1E3D30]"
                    >
                      {submitting
                        ? "Dispatching..."
                        : channel === "export"
                        ? "Request Export Proforma / Sample Flight"
                        : "Reserve Private Tasting / Hotel Supply"}
                    </button>
                  </form>
                )}

                <a
                  href={`mailto:${business.email}?subject=${encodeURIComponent(
                    `Export / Wholesale Inquiry — ${activeLot?.name}`
                  )}`}
                  className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl border border-stone-300 bg-stone-50 py-3 text-xs font-semibold text-stone-800 hover:bg-stone-100"
                >
                  <Mail className="h-4 w-4 text-[#162D23]" />
                  Direct Export Desk ({business.email})
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kupondole HQ + Thamel & Jhamsikhel Boutiques */}
      {business.boutiqueLocations && (
        <section id="boutiques" className="bg-[#12241C] py-16 text-stone-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-300">
              Export Headquarters &amp; Kathmandu Valley Tasting Rooms
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-white sm:text-5xl">
              Experience Tealaya in Person
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {business.boutiqueLocations.map((loc) => (
                <div
                  key={loc.title}
                  className="rounded-3xl border border-white/15 bg-white/5 p-6"
                >
                  <Package className="h-5 w-5 text-amber-300" />
                  <h3 className="mt-3 font-display text-2xl font-semibold text-white">
                    {loc.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-stone-300">
                    {loc.address}
                  </p>
                  <p className="mt-3 font-mono text-[11px] text-amber-200">{loc.hours}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* International Buyer Notes & FAQ */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-semibold text-stone-950 sm:text-4xl">
            International Connoisseur &amp; Buyer Notes
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {business.reviews.map((rev) => (
              <div
                key={rev.author}
                className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm"
              >
                <div className="flex gap-1 text-amber-500">
                  {Array.from({ length: rev.rating }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-3 font-display text-xl italic text-stone-800">
                  &ldquo;{rev.quote}&rdquo;
                </p>
                <p className="mt-4 text-xs font-bold text-stone-900">{rev.author}</p>
                <p className="font-mono text-[11px] text-stone-500">{rev.origin}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="border-t border-stone-300/80 bg-[#EDE7DA] py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-center font-display text-3xl font-semibold text-stone-950 sm:text-4xl">
            Global Export, Organic Certification &amp; Logistics FAQ
          </h2>
          <div className="mt-8 space-y-3">
            {business.faqs.map((f, idx) => (
              <div key={f.q} className="rounded-2xl bg-white px-6 py-4 shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 text-left text-sm font-semibold text-stone-900"
                >
                  <span>{f.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <p className="mt-3 text-xs leading-relaxed text-stone-600 sm:text-sm">
                    {f.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#0E1C16] py-14 pb-28 text-stone-300">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl font-semibold text-white">
              {business.name}
            </p>
            <p className="mt-2 text-xs text-stone-400">{business.tagline}</p>
            <p className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] text-amber-300">
              <ShieldCheck className="h-3.5 w-3.5" />
              {business.principalOrFounder}
            </p>
          </div>
          <div className="space-y-1.5 text-xs">
            <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
              Corporate Export Office
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
              <span>{business.fullAddress}</span>
            </p>
            <p className="text-stone-400">{business.hours}</p>
          </div>
          <div className="space-y-1.5 text-xs">
            <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
              Trade &amp; Wholesale Desk
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-amber-300" />
              <a href={`tel:${business.phoneTel}`} className="text-white hover:underline">
                {business.phoneDisplay}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-amber-300" />
              <a href={`mailto:${business.email}`} className="text-white hover:underline">
                {business.email}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-amber-300" />
              <span>info@allnepaltea.com</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
