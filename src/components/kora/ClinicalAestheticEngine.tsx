"use client";

import React, { useMemo, useState } from "react";
import {
  Sparkles,
  ShieldCheck,
  Check,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Plane,
  ChevronDown,
  Stethoscope,
  Star,
  ArrowUpRight,
} from "lucide-react";
import type { KoraBusinessConfig } from "@/data/kora-businesses";

const ZONES = [
  { id: "zone2", label: "Grade II · Temple & Hairline Refinement", grafts: 1500 },
  { id: "zone3", label: "Grade III · Frontal Hairline + Deep Temples", grafts: 2200 },
  { id: "zone4", label: "Grade IV · Frontal + Mid-Scalp Density", grafts: 3000 },
  { id: "zone5", label: "Grade V–VI · Full Crown & Frontal Restoration", grafts: 3800 },
];

export function ClinicalAestheticEngine({
  business,
}: {
  business: KoraBusinessConfig;
  isPreview?: boolean;
}) {
  const isChampagne = business.palette === "champagne-silk";

  const theme = isChampagne
    ? {
        bg: "bg-[#FAF6F3]",
        altBg: "bg-[#F2EAE4]",
        darkBg: "bg-[#261720]",
        btn: "bg-[#3A212F] hover:bg-[#4F2D40] text-white",
        accentText: "text-[#6E3B56]",
        badge: "border-[#6E3B56]/25 bg-[#6E3B56]/5 text-[#6E3B56]",
      }
    : {
        bg: "bg-[#F6F5F0]",
        altBg: "bg-[#ECEAE1]",
        darkBg: "bg-[#152821]",
        btn: "bg-[#1D3A2F] hover:bg-[#274E40] text-white",
        accentText: "text-[#1D3A2F]",
        badge: "border-[#1D3A2F]/25 bg-[#1D3A2F]/5 text-[#1D3A2F]",
      };

  const procedures = business.clinicalProcedures || [];

  const [mode, setMode] = useState<"graft" | "procedures">("graft");
  const [grafts, setGrafts] = useState(2200);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [selectedProcId, setSelectedProcId] = useState(procedures[0]?.id || "");
  const [currency, setCurrency] = useState<"NPR" | "USD">("NPR");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("2026-11-16");
  const [flyInPatient, setFlyInPatient] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const graftEstimate = useMemo(() => {
    const rate = business.graftRateNpr || 44;
    const npr = grafts * rate;
    const usd = Math.round(npr / 134);
    return { npr, usd };
  }, [grafts, business.graftRateNpr]);

  const filteredProcedures = useMemo(
    () =>
      categoryFilter === "All"
        ? procedures
        : procedures.filter((p) => p.category === categoryFilter),
    [procedures, categoryFilter]
  );

  const activeProcedure = useMemo(
    () => procedures.find((p) => p.id === selectedProcId) || procedures[0],
    [procedures, selectedProcId]
  );

  const summaryLabel =
    mode === "graft"
      ? `Hair Restoration (${grafts.toLocaleString()} Grafts · Est. ${
          currency === "NPR"
            ? `NPR ${graftEstimate.npr.toLocaleString()}`
            : `$${graftEstimate.usd.toLocaleString()}`
        })`
      : `${activeProcedure?.name} (${
          currency === "NPR"
            ? `NPR ${activeProcedure?.priceNpr.toLocaleString()}`
            : `$${activeProcedure?.priceUsd.toLocaleString()}`
        })`;

  const whatsappHref = business.whatsappDigits
    ? `https://wa.me/${business.whatsappDigits}?text=${encodeURIComponent(
        `Namaste ${business.name} (${business.principalOrFounder})!\nI would like to book a clinical consultation:\n• Interest: ${summaryLabel}\n• Preferred Date: ${preferredDate}${
          flyInPatient ? "\n• Traveling from outside Kathmandu / Overseas" : ""
        }`
      )}`
    : `mailto:${business.email}`;

  async function handleConsultSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) return;
    setSubmitting(true);
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_slug: business.slug,
          customer_name: patientName,
          customer_phone: patientPhone,
          service_selected: summaryLabel,
          preferred_date: preferredDate,
          party_size: 1,
          notes: flyInPatient
            ? "Out-of-Valley / Overseas NRN Fly-In Schedule Requested"
            : "Kathmandu In-Clinic OPD Consultation",
        }),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={`min-h-screen ${theme.bg} text-stone-900`}>
      {/* Top Clinical Assurance Bar */}
      <div className={`${theme.darkBg} px-4 py-2 text-[11px] text-stone-200`}>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
          <span className="font-mono">
            <Stethoscope className="mr-1.5 inline h-3.5 w-3.5 text-amber-300" />
            {business.principalOrFounder} · {business.principalTitle}
          </span>
          <span>
            {business.neighborhood} · Direct Clinic Line: {business.phoneDisplay}
          </span>
        </div>
      </div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-stone-900/10 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <a href="#" className="flex items-center gap-3">
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-full ${theme.darkBg} font-display text-base font-semibold text-white`}
            >
              {business.monogram}
            </span>
            <div>
              <p className="font-display text-xl font-semibold leading-none text-stone-950 sm:text-2xl">
                {business.name}
              </p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-stone-500">
                {business.neighborhood}
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-xs font-medium text-stone-700 lg:flex">
            <a href="#science" className="hover:text-stone-950">
              Clinical Standard
            </a>
            <a href="#planner" className="hover:text-stone-950">
              Graft &amp; Treatment Planner
            </a>
            <a href="#fly-in" className="hover:text-stone-950">
              NRN &amp; Fly-In Concierge
            </a>
            <a href="#faq" className="hover:text-stone-950">
              Patient FAQ
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex rounded-full border border-stone-300 bg-stone-100 p-0.5 text-[11px] font-semibold">
              {(["NPR", "USD"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`rounded-full px-2.5 py-1 transition ${
                    currency === c ? `${theme.darkBg} text-white` : "text-stone-600"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <a
              href="#planner"
              className={`hidden rounded-full px-5 py-2.5 text-xs font-semibold sm:inline-flex ${theme.btn}`}
            >
              Book Consultation
            </a>
          </div>
        </div>
      </header>

      {/* Editorial Clinical Hero */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.15em] ${theme.badge}`}
            >
              <Sparkles className="h-3 w-3" />
              {business.credentialsBadge}
            </span>

            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.07] tracking-tight text-stone-950 sm:text-6xl">
              {business.tagline}
            </h1>

            <p className="mt-5 text-sm leading-relaxed text-stone-600 sm:text-base">
              {business.editorialIntro}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#planner"
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] transition ${theme.btn}`}
              >
                Estimate Grafts &amp; Treatments
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-3.5 text-xs font-semibold text-stone-800 hover:border-stone-500"
              >
                <MessageCircle className="h-4 w-4 text-emerald-700" />
                WhatsApp Photo Assessment
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-stone-300/80 pt-7 sm:grid-cols-4">
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
                className="h-[420px] w-full object-cover sm:h-[520px]"
              />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-stone-950/80 p-4 text-white backdrop-blur-md">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-300">
                  Lead Specialist
                </p>
                <p className="mt-0.5 font-display text-2xl font-semibold">
                  {business.principalOrFounder}
                </p>
                <p className="text-xs text-stone-300">{business.principalTitle}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Evidence-Based Pillars */}
      <section id="science" className={`${theme.altBg} border-y border-stone-300/60 py-16`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {business.pillars.map((p) => (
              <div key={p.code} className="rounded-3xl bg-white p-7 shadow-sm">
                <span className={`font-mono text-xs font-semibold ${theme.accentText}`}>
                  PROTOCOL {p.code}
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

      {/* Dual-Mode Interactive Graft & Dermatology Planner */}
      <section id="planner" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className={`font-mono text-xs uppercase tracking-[0.2em] ${theme.accentText}`}>
                Personalized Clinical Planner
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-stone-950 sm:text-5xl">
                Hair Graft Estimator &amp; Dermatology Suite
              </h2>
            </div>

            <div className="inline-flex rounded-full border border-stone-300 bg-white p-1 text-xs font-semibold">
              <button
                onClick={() => setMode("graft")}
                className={`rounded-full px-4 py-2 transition ${
                  mode === "graft" ? `${theme.darkBg} text-white` : "text-stone-600"
                }`}
              >
                Hair Graft Calculator
              </button>
              <button
                onClick={() => setMode("procedures")}
                className={`rounded-full px-4 py-2 transition ${
                  mode === "procedures" ? `${theme.darkBg} text-white` : "text-stone-600"
                }`}
              >
                Skin, Laser &amp; Injectables
              </button>
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            {/* Left Interactive Area */}
            <div className="lg:col-span-7">
              {mode === "graft" ? (
                <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone-500">
                    Step 1 · Select Target Restoration Zone
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {ZONES.map((z) => {
                      const active = Math.abs(grafts - z.grafts) < 250;
                      return (
                        <button
                          key={z.id}
                          type="button"
                          onClick={() => setGrafts(z.grafts)}
                          className={`rounded-2xl border p-4 text-left transition ${
                            active
                              ? "border-stone-900 bg-stone-900 text-white"
                              : "border-stone-200 bg-stone-50 hover:border-stone-400"
                          }`}
                        >
                          <p className="text-xs font-semibold">{z.label}</p>
                          <p className="mt-1 font-mono text-xs opacity-80">
                            ~{z.grafts.toLocaleString()} Follicular Grafts
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-6 border-t border-stone-200 pt-6">
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-xs uppercase tracking-wider text-stone-500">
                        Fine-Tune Follicular Graft Count
                      </span>
                      <span className="font-display text-3xl font-semibold tabular-nums">
                        {grafts.toLocaleString()} Grafts
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1000}
                      max={4500}
                      step={100}
                      value={grafts}
                      onChange={(e) => setGrafts(Number(e.target.value))}
                      className="mt-3 h-2 w-full cursor-pointer accent-stone-900"
                    />
                  </div>

                  {/* 4-Stage Recovery Timeline */}
                  <div className="mt-6 rounded-2xl bg-stone-50 p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-500">
                      Expected Surgical &amp; Growth Timeline
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
                      <div>
                        <p className="font-bold text-stone-900">Day 1</p>
                        <p className="text-stone-600">Walk-in local anesthesia procedure</p>
                      </div>
                      <div>
                        <p className="font-bold text-stone-900">Day 5</p>
                        <p className="text-stone-600">First clinical wash · Cleared to fly</p>
                      </div>
                      <div>
                        <p className="font-bold text-stone-900">Month 4</p>
                        <p className="text-stone-600">Visible new anagen follicle growth</p>
                      </div>
                      <div>
                        <p className="font-bold text-stone-900">Month 9–12</p>
                        <p className="text-stone-600">Full natural hairline density</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {["All", "Hair Restoration", "Regenerative & Laser", "Injectables & Skin"].map(
                      (cat) => (
                        <button
                          key={cat}
                          onClick={() => setCategoryFilter(cat)}
                          className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                            categoryFilter === cat
                              ? `${theme.darkBg} text-white`
                              : "border border-stone-300 bg-white text-stone-700"
                          }`}
                        >
                          {cat}
                        </button>
                      )
                    )}
                  </div>

                  {filteredProcedures.map((proc) => {
                    const active = proc.id === activeProcedure?.id;
                    return (
                      <div
                        key={proc.id}
                        onClick={() => setSelectedProcId(proc.id)}
                        className={`cursor-pointer rounded-3xl border p-5 transition ${
                          active
                            ? "border-stone-900 bg-white ring-1 ring-stone-900"
                            : "border-stone-200 bg-white/80 hover:border-stone-400"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-wider text-stone-500">
                              {proc.category}
                            </span>
                            <h3 className="font-display text-2xl font-semibold text-stone-950">
                              {proc.name}
                            </h3>
                          </div>
                          <p className="font-display text-2xl font-semibold tabular-nums text-stone-950">
                            {currency === "NPR"
                              ? `NPR ${proc.priceNpr.toLocaleString()}`
                              : `$${proc.priceUsd.toLocaleString()}`}
                          </p>
                        </div>
                        <p className="mt-2 text-xs text-stone-600">{proc.clinicalNote}</p>
                        <div className="mt-3 flex flex-wrap gap-3 font-mono text-[11px] text-stone-500">
                          <span>
                            <Clock className="mr-1 inline h-3 w-3" />
                            {proc.sessionTime}
                          </span>
                          <span>• {proc.downtime}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Consultation Booking Box */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 rounded-3xl border border-stone-900/15 bg-white p-6 shadow-xl sm:p-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500">
                  Confidential Specialist Assessment
                </p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-stone-950">
                  {mode === "graft"
                    ? `${grafts.toLocaleString()} Grafts · Est. ${
                        currency === "NPR"
                          ? `NPR ${graftEstimate.npr.toLocaleString()}`
                          : `$${graftEstimate.usd.toLocaleString()}`
                      }`
                    : activeProcedure?.name}
                </h3>
                <p className="mt-1 text-xs text-stone-500">
                  1-on-1 dermoscopy &amp; personalized plan with {business.principalOrFounder}
                </p>

                {submitted ? (
                  <div className="mt-5 rounded-2xl border border-emerald-600/30 bg-emerald-50 p-4 text-xs text-emerald-950">
                    <p className="font-semibold">
                      Appointment Request Logged at {business.name}!
                    </p>
                    <p className="mt-1">
                      Our clinical coordinator will confirm your slot shortly. You can also send scalp/skin photos directly on WhatsApp below.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleConsultSubmit} className="mt-5 space-y-3">
                    <input
                      type="text"
                      required
                      placeholder="Patient Full Name"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs focus:border-stone-900 focus:outline-none"
                    />
                    <input
                      type="text"
                      required
                      placeholder="WhatsApp / Mobile Number or Email"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs focus:border-stone-900 focus:outline-none"
                    />
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-stone-500">
                        Preferred Consultation Date
                      </label>
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs"
                      />
                    </div>
                    <label className="flex cursor-pointer items-center gap-2 text-xs text-stone-700">
                      <input
                        type="checkbox"
                        checked={flyInPatient}
                        onChange={(e) => setFlyInPatient(e.target.checked)}
                      />
                      <span>Traveling from outside Kathmandu / Overseas (NRN Fast-Track)</span>
                    </label>

                    <button
                      type="submit"
                      disabled={submitting}
                      className={`w-full rounded-xl py-3.5 text-xs font-semibold uppercase tracking-[0.14em] transition ${theme.btn}`}
                    >
                      {submitting ? "Booking Slot..." : "Reserve Specialist Consultation"}
                    </button>
                  </form>
                )}

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl border border-stone-300 bg-stone-50 py-3 text-xs font-semibold text-stone-800 hover:bg-stone-100"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-700" />
                  WhatsApp Clinic ({business.phoneDisplay})
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NRN & Out-of-Valley Fly-In Concierge Banner */}
      <section id="fly-in" className={`${theme.darkBg} py-16 text-stone-100`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-amber-300">
                <Plane className="h-4 w-4" />
                Overseas NRN &amp; Out-of-Valley Fast-Track
              </span>
              <h2 className="mt-2 font-display text-3xl font-semibold text-white sm:text-5xl">
                Flying Home to Nepal? Complete Your Restoration in 5 Days.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-300">
                Save 70–80% compared to UK, US, or Australian surgical fees without compromising sterile clinical standards. Share scalp photos on WhatsApp prior to departure so your surgical slot is reserved before you land at TIA.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center lg:col-span-5">
              {[
                { day: "Pre-Flight", note: "WhatsApp Graft & Bloodwork Plan" },
                { day: "Day 1–2", note: "Hairline Design & Day Procedure" },
                { day: "Day 5", note: "Clinical Wash & Cleared to Fly" },
              ].map((step) => (
                <div
                  key={step.day}
                  className="rounded-2xl border border-white/15 bg-white/5 p-4"
                >
                  <p className="font-mono text-xs font-bold text-amber-300">{step.day}</p>
                  <p className="mt-1.5 text-xs text-stone-200">{step.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Patient Stories + FAQ */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-semibold text-stone-950 sm:text-4xl">
            Verified Patient Experiences
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
                <p className="mt-3 text-sm leading-relaxed text-stone-700">
                  &ldquo;{rev.quote}&rdquo;
                </p>
                <p className="mt-4 text-xs font-bold text-stone-900">{rev.author}</p>
                <p className="font-mono text-[11px] text-stone-500">{rev.origin}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className={`${theme.altBg} py-16`}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-center font-display text-3xl font-semibold text-stone-950 sm:text-4xl">
            Clinical Questions &amp; Safety Protocols
          </h2>
          <div className="mt-8 space-y-3">
            {business.faqs.map((f, i) => (
              <div key={f.q} className="rounded-2xl bg-white px-6 py-4 shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 text-left text-sm font-semibold text-stone-900"
                >
                  <span>{f.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <p className="mt-3 text-xs leading-relaxed text-stone-600 sm:text-sm">
                    {f.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className={`${theme.darkBg} py-14 pb-28 text-stone-300`}>
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
              Clinic Location &amp; OPD Hours
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
              <span>{business.fullAddress}</span>
            </p>
            <p className="text-stone-400">{business.hours}</p>
          </div>
          <div className="space-y-1.5 text-xs">
            <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
              Appointments &amp; Inquiries
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
          </div>
        </div>
      </footer>
    </div>
  );
}
