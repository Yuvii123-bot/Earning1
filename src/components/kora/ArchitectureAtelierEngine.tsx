"use client";

import React, { useMemo, useState } from "react";
import {
  Ruler,
  Layers,
  Check,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ArrowUpRight,
  Building2,
  ShieldCheck,
  ChevronDown,
  Globe,
  Compass,
  Star,
} from "lucide-react";
import type { KoraBusinessConfig } from "@/data/kora-businesses";

export function ArchitectureAtelierEngine({
  business,
}: {
  business: KoraBusinessConfig;
  isPreview?: boolean;
}) {
  const isDarkLuxury = business.palette === "smoked-oak-brass";

  const tiers = business.archTiers || [];
  const projects = business.archProjects || [];

  const [sqft, setSqft] = useState(business.archDefaultSqft || 2400);
  const [selectedTierId, setSelectedTierId] = useState(
    tiers.find((t) => t.popular)?.id || tiers[0]?.id || ""
  );
  const [projectLocation, setProjectLocation] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientContact, setClientContact] = useState("");
  const [isNrn, setIsNrn] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activeTier = useMemo(
    () => tiers.find((t) => t.id === selectedTierId) || tiers[0],
    [tiers, selectedTierId]
  );

  const estimate = useMemo(() => {
    const rate = activeTier?.ratePerSqftNpr || 0;
    const totalNpr = sqft * rate;
    const lakhs = totalNpr / 100000;
    const displayLakhs =
      lakhs >= 100
        ? `NPR ${(lakhs / 100).toFixed(2)} Cr`
        : `NPR ${lakhs.toFixed(2)} Lakhs`;
    const approxAana = Math.max(2.5, +(sqft / 3 / 342.25 * 1.45).toFixed(1));
    return { totalNpr, displayLakhs, approxAana };
  }, [sqft, activeTier]);

  const whatsappHref = business.whatsappDigits
    ? `https://wa.me/${business.whatsappDigits}?text=${encodeURIComponent(
        `Namaste ${business.name}! I used your BOQ simulator:\n• Scope: ${activeTier?.name}\n• Area: ${sqft.toLocaleString()} sq.ft\n• Estimate: ${estimate.displayLakhs}\n${
          projectLocation ? `• Site: ${projectLocation}\n` : ""
        }Would like to schedule a consultation.`
      )}`
    : `mailto:${business.email}`;

  async function handleConsultSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!clientName.trim() || !clientContact.trim()) return;
    setSubmitting(true);
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_slug: business.slug,
          customer_name: clientName,
          customer_phone: clientContact,
          service_selected: `${activeTier?.name} · ${sqft.toLocaleString()} sq.ft (${estimate.displayLakhs})`,
          preferred_date: isNrn ? "NRN Remote Zoom Consult" : "On-Site Consultation",
          party_size: 1,
          notes: `Plot/Site Location: ${projectLocation || "Kathmandu Valley"}`,
        }),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className={
        isDarkLuxury
          ? "min-h-screen bg-[#11100E] text-stone-100"
          : "min-h-screen bg-[#F4F1EA] text-stone-900"
      }
    >
      {/* Top Architectural Grid Coordinates Bar */}
      <div
        className={
          isDarkLuxury
            ? "border-b border-stone-800 bg-[#0B0A09] px-4 py-2 text-[11px] text-stone-400"
            : "border-b border-stone-300 bg-stone-900 px-4 py-2 text-[11px] text-stone-300"
        }
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 font-mono">
          <span>
            <Compass className="mr-1.5 inline h-3.5 w-3.5 text-amber-400" />
            {business.coordinates} · {business.established}
          </span>
          <span>
            {business.neighborhood} · Direct Principal Desk: {business.phoneDisplay}
          </span>
        </div>
      </div>

      {/* Sticky Studio Navigation */}
      <header
        className={
          isDarkLuxury
            ? "sticky top-0 z-40 border-b border-stone-800/90 bg-[#11100E]/90 backdrop-blur-md"
            : "sticky top-0 z-40 border-b border-stone-300/80 bg-[#F4F1EA]/90 backdrop-blur-md"
        }
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="#" className="flex items-center gap-3">
            <span
              className={
                isDarkLuxury
                  ? "flex h-10 w-10 items-center justify-center border border-amber-300/40 bg-amber-300/10 font-arch text-sm font-bold text-amber-300"
                  : "flex h-10 w-10 items-center justify-center bg-stone-900 font-arch text-sm font-bold text-white"
              }
            >
              {business.monogram}
            </span>
            <div>
              <p className="font-arch text-base font-bold tracking-tight sm:text-lg">
                {business.name}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-60">
                {business.sectorLabel}
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-xs font-medium lg:flex">
            <a href="#practice" className="opacity-80 hover:opacity-100">
              Practice
            </a>
            <a href="#boq-simulator" className="opacity-80 hover:opacity-100">
              BOQ &amp; Cost Simulator
            </a>
            <a href="#works" className="opacity-80 hover:opacity-100">
              Selected Works
            </a>
            {business.teamMembers && (
              <a href="#principals" className="opacity-80 hover:opacity-100">
                Architects &amp; Engineers
              </a>
            )}
            <a href="#faq" className="opacity-80 hover:opacity-100">
              Norms &amp; FAQ
            </a>
          </nav>

          <a
            href="#boq-simulator"
            className={
              isDarkLuxury
                ? "rounded-none border border-amber-300 bg-amber-300 px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-stone-950 transition hover:bg-amber-200"
                : "rounded-none bg-[#9E3E22] px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#84321A]"
            }
          >
            Estimate Project →
          </a>
        </div>
      </header>

      {/* Architectural Monograph Hero */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p
              className={
                isDarkLuxury
                  ? "font-mono text-xs uppercase tracking-[0.22em] text-amber-300"
                  : "font-mono text-xs uppercase tracking-[0.22em] text-[#9E3E22]"
              }
            >
              {business.heroEyebrow}
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              {business.tagline}
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm leading-relaxed opacity-80 sm:text-base">
              {business.editorialIntro}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="#boq-simulator"
                className={
                  isDarkLuxury
                    ? "inline-flex items-center gap-2 bg-amber-300 px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-stone-950"
                    : "inline-flex items-center gap-2 bg-stone-900 px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white"
                }
              >
                Launch Sq.Ft BOQ Calculator
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-current/25 px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Studio
              </a>
            </div>
          </div>
        </div>

        {/* Wide Monograph Plate */}
        <div className="mt-10 overflow-hidden border border-current/15">
          <div className="relative">
            <img
              src={business.heroImage}
              alt={business.name}
              className="h-[380px] w-full object-cover sm:h-[520px]"
            />
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 bg-stone-950/85 px-5 py-3.5 text-xs text-stone-200 backdrop-blur-md">
              <span className="font-mono uppercase tracking-wider text-amber-300">
                {business.credentialsBadge}
              </span>
              <span className="font-mono text-[11px] text-stone-300">
                Led by {business.principalOrFounder}
              </span>
            </div>
          </div>

          <div
            className={
              isDarkLuxury
                ? "grid grid-cols-2 divide-x divide-y divide-stone-800 bg-[#171512] sm:grid-cols-4 sm:divide-y-0"
                : "grid grid-cols-2 divide-x divide-y divide-stone-300 bg-white sm:grid-cols-4 sm:divide-y-0"
            }
          >
            {business.stats.map((st) => (
              <div key={st.label} className="p-5">
                <p className="font-arch text-2xl font-bold tabular-nums sm:text-3xl">
                  {st.value}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] opacity-60">
                  {st.label}
                </p>
                <p className="mt-1 text-xs opacity-75">{st.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Methodology */}
      <section
        id="practice"
        className={
          isDarkLuxury
            ? "border-y border-stone-800 bg-[#161411] py-16 sm:py-20"
            : "border-y border-stone-300 bg-[#ECE7DC] py-16 sm:py-20"
        }
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] opacity-60">
            Architectural &amp; Technical Discipline
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-5xl">
            From First Trace Line to Final Key
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {business.pillars.map((p) => (
              <div
                key={p.code}
                className={
                  isDarkLuxury
                    ? "border border-stone-800 bg-[#11100E] p-7"
                    : "border border-stone-300 bg-white p-7"
                }
              >
                <span
                  className={
                    isDarkLuxury
                      ? "font-mono text-xs text-amber-300"
                      : "font-mono text-xs text-[#9E3E22]"
                  }
                >
                  [{p.code}]
                </span>
                <h3 className="mt-3 font-display text-2xl font-semibold">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed opacity-75">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Nepal BOQ & Turnkey Simulator */}
      <section id="boq-simulator" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p
                className={
                  isDarkLuxury
                    ? "font-mono text-xs uppercase tracking-[0.2em] text-amber-300"
                    : "font-mono text-xs uppercase tracking-[0.2em] text-[#9E3E22]"
                }
              >
                Transparent Nepal Rates · Interactive Estimator
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold sm:text-5xl">
                Spatial Scope &amp; BOQ Investment Simulator
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 border border-current/20 px-4 py-2 font-mono text-xs">
              <Globe className="h-4 w-4" />
              NRN Overseas Video Consultation Ready
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            {/* Left: Area Slider & Scope Cards */}
            <div className="space-y-6 lg:col-span-7">
              <div
                className={
                  isDarkLuxury
                    ? "border border-stone-800 bg-[#181613] p-6"
                    : "border border-stone-300 bg-white p-6"
                }
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <label className="font-mono text-xs uppercase tracking-[0.16em] opacity-70">
                    <Ruler className="mr-1.5 inline h-4 w-4" />
                    {business.archUnitLabel || "Project Area (Sq.Ft)"}
                  </label>
                  <div className="text-right">
                    <span className="font-arch text-3xl font-bold tabular-nums">
                      {sqft.toLocaleString()} sq.ft
                    </span>
                    {business.slug === "griha-prabesh-architects" && (
                      <span className="ml-2 font-mono text-xs opacity-60">
                        (~{estimate.approxAana} Aana plot)
                      </span>
                    )}
                  </div>
                </div>

                <input
                  type="range"
                  min={business.archMinSqft || 800}
                  max={business.archMaxSqft || 7000}
                  step={100}
                  value={sqft}
                  onChange={(e) => setSqft(Number(e.target.value))}
                  className="mt-4 h-2 w-full cursor-pointer accent-amber-500"
                />
                <div className="mt-2 flex justify-between font-mono text-[11px] opacity-50">
                  <span>{(business.archMinSqft || 800).toLocaleString()} sq.ft</span>
                  <span>Drag slider to match your house / floor area</span>
                  <span>{(business.archMaxSqft || 7000).toLocaleString()} sq.ft</span>
                </div>
              </div>

              <div className="space-y-3.5">
                {tiers.map((tier) => {
                  const active = tier.id === activeTier?.id;
                  return (
                    <div
                      key={tier.id}
                      onClick={() => setSelectedTierId(tier.id)}
                      className={`cursor-pointer border p-6 transition ${
                        active
                          ? isDarkLuxury
                            ? "border-amber-300 bg-[#1D1A16]"
                            : "border-stone-900 bg-white shadow-md ring-1 ring-stone-900"
                          : isDarkLuxury
                          ? "border-stone-800 bg-[#151310] hover:border-stone-600"
                          : "border-stone-300 bg-white/70 hover:border-stone-500"
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-display text-2xl font-semibold">
                              {tier.name}
                            </h3>
                            {tier.popular && (
                              <span
                                className={
                                  isDarkLuxury
                                    ? "bg-amber-300/20 px-2.5 py-0.5 font-mono text-[10px] uppercase text-amber-300"
                                    : "bg-[#9E3E22]/10 px-2.5 py-0.5 font-mono text-[10px] uppercase text-[#9E3E22]"
                                }
                              >
                                Most Commissioned
                              </span>
                            )}
                          </div>
                          <p className="mt-1 font-mono text-[11px] opacity-60">
                            Estimated Duration: {tier.timelineWeeks}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="font-arch text-xl font-bold tabular-nums">
                            NPR {tier.ratePerSqftNpr.toLocaleString()}
                            <span className="font-sans text-xs font-normal opacity-60">
                              {" "}
                              / sq.ft
                            </span>
                          </p>
                        </div>
                      </div>

                      <p className="mt-3 text-xs leading-relaxed opacity-80">
                        {tier.summary}
                      </p>

                      <ul className="mt-4 grid gap-2 border-t border-current/10 pt-4 text-xs sm:grid-cols-2">
                        {tier.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-2">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                            <span className="opacity-90">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Itemized BOQ Summary & Site Visit Booking */}
            <div className="lg:col-span-5">
              <div
                className={
                  isDarkLuxury
                    ? "sticky top-24 border border-stone-700 bg-[#191714] p-6 shadow-2xl sm:p-7"
                    : "sticky top-24 border border-stone-900 bg-white p-6 shadow-xl sm:p-7"
                }
              >
                <div className="flex items-center justify-between border-b border-current/15 pb-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">
                      Preliminary Project Estimate
                    </p>
                    <p className="mt-1 font-arch text-3xl font-bold tabular-nums">
                      {estimate.displayLakhs}
                    </p>
                  </div>
                  <Layers className="h-7 w-7 opacity-60" />
                </div>

                <div className="mt-4 space-y-2 font-mono text-xs">
                  <div className="flex justify-between opacity-75">
                    <span>Selected Tier</span>
                    <span className="text-right font-sans font-semibold">
                      {activeTier?.name}
                    </span>
                  </div>
                  <div className="flex justify-between opacity-75">
                    <span>Area × Unit Rate</span>
                    <span>
                      {sqft.toLocaleString()} × NPR{" "}
                      {activeTier?.ratePerSqftNpr.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between opacity-75">
                    <span>Exact Figure</span>
                    <span>NPR {estimate.totalNpr.toLocaleString()}</span>
                  </div>
                </div>

                {/* Milestone Schedule Bar */}
                <div className="mt-5 border border-current/10 p-3.5 text-[11px]">
                  <p className="font-mono text-[10px] uppercase tracking-wider opacity-60">
                    Stage-Gated Milestone Protection
                  </p>
                  <div className="mt-2 grid grid-cols-4 gap-1 text-center font-mono text-[10px]">
                    <div className="bg-amber-500/20 py-1.5">10% Design</div>
                    <div className="bg-amber-500/30 py-1.5">30% Mobilize</div>
                    <div className="bg-amber-500/40 py-1.5">35% Core</div>
                    <div className="bg-amber-500/50 py-1.5">25% Handover</div>
                  </div>
                </div>

                {submitted ? (
                  <div className="mt-5 border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs">
                    <p className="font-semibold">
                      Project Brief Received by {business.name}!
                    </p>
                    <p className="mt-1 opacity-80">
                      Our architectural desk will review your {sqft.toLocaleString()} sq.ft scope and reach out shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleConsultSubmit} className="mt-5 space-y-2.5 text-stone-900">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full border border-stone-300 bg-white px-3.5 py-2.5 text-xs focus:border-stone-900 focus:outline-none"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Phone / WhatsApp or Email"
                      value={clientContact}
                      onChange={(e) => setClientContact(e.target.value)}
                      className="w-full border border-stone-300 bg-white px-3.5 py-2.5 text-xs focus:border-stone-900 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Site Location (e.g., Godawari, Bhaisepati, Bhaktapur)"
                      value={projectLocation}
                      onChange={(e) => setProjectLocation(e.target.value)}
                      className="w-full border border-stone-300 bg-white px-3.5 py-2.5 text-xs focus:border-stone-900 focus:outline-none"
                    />
                    <label className="flex cursor-pointer items-center gap-2 pt-1 text-xs text-current">
                      <input
                        type="checkbox"
                        checked={isNrn}
                        onChange={(e) => setIsNrn(e.target.checked)}
                      />
                      <span className={isDarkLuxury ? "text-stone-300" : "text-stone-700"}>
                        I am inquiring from abroad (NRN Zoom Consultation)
                      </span>
                    </label>
                    <button
                      type="submit"
                      disabled={submitting}
                      className={
                        isDarkLuxury
                          ? "w-full bg-amber-300 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-stone-950 transition hover:bg-amber-200"
                          : "w-full bg-stone-900 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-white transition hover:bg-stone-800"
                      }
                    >
                      {submitting ? "Dispatching..." : "Book Site Visit / BOQ Review"}
                    </button>
                  </form>
                )}

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2.5 flex w-full items-center justify-center gap-2 border border-current/25 py-3 font-mono text-xs font-semibold"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-500" />
                  Send Scope on WhatsApp ({business.phoneDisplay})
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Architectural / Interior Monograph Works */}
      <section
        id="works"
        className={
          isDarkLuxury
            ? "border-t border-stone-800 bg-[#151310] py-16 sm:py-20"
            : "border-t border-stone-300 bg-white py-16 sm:py-20"
        }
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] opacity-60">
            Built &amp; Delivered Portfolio
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-5xl">
            Selected Works Across Nepal
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {projects.map((proj, idx) => (
              <div
                key={proj.title}
                className={
                  isDarkLuxury
                    ? "flex flex-col justify-between border border-stone-800 bg-[#11100E] p-6"
                    : "flex flex-col justify-between border border-stone-300 bg-[#F8F6F1] p-6"
                }
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[11px] opacity-60">
                    <span>ARCHIVE 0{idx + 1}</span>
                    <span>{proj.areaSqft}</span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-semibold">
                    {proj.title}
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 text-xs font-medium opacity-75">
                    <MapPin className="h-3.5 w-3.5" />
                    {proj.location}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed opacity-80">{proj.brief}</p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-current/10 pt-3 font-mono text-[11px]">
                  <span>{proj.category}</span>
                  <span className="text-amber-500">{proj.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principals & Structural Engineering Team (if present) */}
      {business.teamMembers && business.teamMembers.length > 0 && (
        <section id="principals" className="border-t border-stone-300 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#9E3E22]">
              NEC &amp; IOE Registered Expertise
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-5xl">
              Architects &amp; Structural Engineers
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {business.teamMembers.map((tm) => (
                <div key={tm.name} className="border border-stone-300 bg-white p-6">
                  <Building2 className="h-5 w-5 text-[#9E3E22]" />
                  <h3 className="mt-3 font-display text-2xl font-semibold text-stone-950">
                    {tm.name}
                  </h3>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-[#9E3E22]">
                    {tm.role}
                  </p>
                  <p className="mt-2.5 text-xs leading-relaxed text-stone-600">
                    {tm.credential}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Client Testimonials */}
      <section
        className={
          isDarkLuxury
            ? "border-t border-stone-800 py-16"
            : "border-t border-stone-300 bg-[#ECE7DC] py-16"
        }
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Homeowner &amp; NRN Client Endorsements
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {business.reviews.map((r) => (
              <div
                key={r.author}
                className={
                  isDarkLuxury
                    ? "border border-stone-800 bg-[#171512] p-6"
                    : "border border-stone-300 bg-white p-6"
                }
              >
                <div className="flex gap-1 text-amber-500">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed opacity-85">
                  &ldquo;{r.quote}&rdquo;
                </p>
                <p className="mt-4 text-xs font-bold">{r.author}</p>
                <p className="font-mono text-[11px] opacity-60">{r.origin}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bylaws & Technical FAQ */}
      <section id="faq" className="border-t border-current/15 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Municipality Bylaws, Seismic Code &amp; Execution FAQ
          </h2>
          <div className="mt-8 space-y-3">
            {business.faqs.map((f, idx) => (
              <div
                key={f.q}
                className={
                  isDarkLuxury
                    ? "border border-stone-800 bg-[#171512] px-6 py-4"
                    : "border border-stone-300 bg-white px-6 py-4"
                }
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 text-left text-sm font-semibold"
                >
                  <span>{f.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <p className="mt-3 text-xs leading-relaxed opacity-75 sm:text-sm">
                    {f.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Footer */}
      <footer className="border-t border-stone-800 bg-[#0B0A09] py-14 pb-28 text-stone-300">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-3">
          <div>
            <p className="font-arch text-xl font-bold text-white">{business.name}</p>
            <p className="mt-2 text-xs text-stone-400">{business.tagline}</p>
            <p className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] text-amber-300">
              <ShieldCheck className="h-3.5 w-3.5" />
              {business.established}
            </p>
          </div>
          <div className="space-y-1.5 text-xs">
            <p className="font-mono text-[10px] uppercase tracking-widest text-stone-500">
              Studio Address
            </p>
            <p>{business.fullAddress}</p>
            <p className="text-stone-400">{business.hours}</p>
          </div>
          <div className="space-y-1.5 text-xs">
            <p className="font-mono text-[10px] uppercase tracking-widest text-stone-500">
              Direct Principal Desk
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-amber-300" />
              <a href={`tel:${business.phoneTel}`} className="text-white hover:underline">
                {business.phoneDisplay}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-amber-300" />
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
