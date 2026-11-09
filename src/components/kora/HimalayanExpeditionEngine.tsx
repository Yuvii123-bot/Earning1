"use client";

import React, { useMemo, useState } from "react";
import {
  Mountain,
  Compass,
  ShieldCheck,
  Check,
  Users,
  Calendar,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ChevronDown,
  Globe,
  Star,
  ArrowUpRight,
} from "lucide-react";
import type { KoraBusinessConfig } from "@/data/kora-businesses";

export function HimalayanExpeditionEngine({
  business,
}: {
  business: KoraBusinessConfig;
  isPreview?: boolean;
}) {
  const isMustang = business.palette === "mustang-ochre";
  const routes = business.expeditionRoutes || [];

  const [lang, setLang] = useState<"EN" | "FR">("EN");
  const [currency, setCurrency] = useState<"USD" | "EUR" | "INR" | "NPR">("USD");
  const [selectedRouteId, setSelectedRouteId] = useState(routes[0]?.id || "");
  const [groupSize, setGroupSize] = useState(2);
  const [rideMode, setRideMode] = useState<"rider" | "pillion" | "jeep">("rider");
  const [departureMonth, setDepartureMonth] = useState("2026-11");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [travelerName, setTravelerName] = useState("");
  const [travelerContact, setTravelerContact] = useState("");
  const [travelerCountry, setTravelerCountry] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const activeRoute = useMemo(
    () => routes.find((r) => r.id === selectedRouteId) || routes[0],
    [routes, selectedRouteId]
  );

  const convertFromUsd = (usd: number) => {
    if (currency === "EUR") return `€${Math.round(usd * 0.92).toLocaleString()}`;
    if (currency === "INR") return `₹${Math.round(usd * 84).toLocaleString()}`;
    if (currency === "NPR") return `NPR ${Math.round(usd * 134).toLocaleString()}`;
    return `$${usd.toLocaleString()}`;
  };

  const pricing = useMemo(() => {
    if (!activeRoute) return { perPersonUsd: 0, totalUsd: 0, tierLabel: "" };
    let base = activeRoute.duoUsd;
    let tierLabel = lang === "FR" ? "Tarif Duo (2–3 pers.)" : "Duo Tier (2–3 Pax)";
    if (groupSize === 1) {
      base = activeRoute.soloUsd;
      tierLabel = lang === "FR" ? "Départ Privé Solo" : "Private Solo Tier";
    } else if (groupSize >= 4) {
      base = activeRoute.groupUsd;
      tierLabel = lang === "FR" ? "Tarif Groupe (4+ pers.)" : "Small-Group Tier (4+ Pax)";
    }

    if (business.isMotorbikeSpecialist && activeRoute.id.includes("motorbike")) {
      if (rideMode === "pillion") base = Math.round(base * 0.78);
      if (rideMode === "jeep") base = Math.round(base * 0.88);
    }

    return {
      perPersonUsd: base,
      totalUsd: base * groupSize,
      tierLabel,
    };
  }, [activeRoute, groupSize, rideMode, business.isMotorbikeSpecialist, lang]);

  // SVG Elevation Profile Coordinates
  const chartGeometry = useMemo(() => {
    const pts = activeRoute?.elevationWaypoints || [];
    if (pts.length < 2) return { polyPoints: "", areaPoints: "", nodes: [] };
    const width = 560;
    const height = 150;
    const padX = 28;
    const padY = 24;
    const maxAlt = Math.max(...pts.map((p) => p.altitudeM), 4000);
    const minAlt = Math.min(...pts.map((p) => p.altitudeM), 800);
    const span = Math.max(1000, maxAlt - minAlt);

    const nodes = pts.map((p, idx) => {
      const x = padX + (idx / (pts.length - 1)) * (width - padX * 2);
      const y =
        height - padY - ((p.altitudeM - minAlt) / span) * (height - padY * 2);
      return { ...p, x, y };
    });

    const polyPoints = nodes.map((n) => `${n.x},${n.y}`).join(" ");
    const areaPoints = `${nodes[0].x},${height - padY} ${polyPoints} ${
      nodes[nodes.length - 1].x
    },${height - padY}`;

    return { polyPoints, areaPoints, nodes };
  }, [activeRoute]);

  const whatsappHref = business.whatsappDigits
    ? `https://wa.me/${business.whatsappDigits}?text=${encodeURIComponent(
        `Hello ${business.name}!\nExpedition Inquiry:\n• Route: ${activeRoute?.name} (${activeRoute?.days} Days · Max ${activeRoute?.maxAltitudeM}m)\n• Travelers: ${groupSize} Pax (${departureMonth})\n• Est. Quote: ${convertFromUsd(pricing.perPersonUsd)} / person`
      )}`
    : `mailto:${business.email}`;

  async function handleDossierSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!travelerName.trim() || !travelerContact.trim()) return;
    setSubmitting(true);
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_slug: business.slug,
          customer_name: travelerName,
          customer_phone: travelerContact,
          service_selected: `${activeRoute?.name} (${groupSize} Pax · ${convertFromUsd(
            pricing.totalUsd
          )})`,
          preferred_date: departureMonth,
          party_size: groupSize,
          notes: `Nationality/City: ${travelerCountry || "International"} | Lang: ${lang} | Mode: ${rideMode}`,
        }),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  const accentText = isMustang ? "text-amber-400" : "text-sky-400";
  const accentBtn = isMustang
    ? "bg-amber-500 hover:bg-amber-400 text-stone-950"
    : "bg-sky-400 hover:bg-sky-300 text-slate-950";
  const strokeColor = isMustang ? "#F59E0B" : "#38BDF8";

  return (
    <div
      className={
        isMustang
          ? "min-h-screen bg-[#12100E] text-stone-100"
          : "min-h-screen bg-[#0B1219] text-slate-100"
      }
    >
      {/* Top Expedition Telemetry Strip */}
      <div className="border-b border-white/10 bg-black/40 px-4 py-2 text-[11px] text-stone-300">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 font-mono">
          <span>
            <Compass className={`mr-1.5 inline h-3.5 w-3.5 ${accentText}`} />
            {business.coordinates} · {business.established}
          </span>
          <span>24/7 Kathmandu Expedition Desk: {business.phoneDisplay}</span>
        </div>
      </div>

      {/* Sticky Navigation */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <a href="#" className="flex items-center gap-3">
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/5 font-mono text-xs font-bold ${accentText}`}
            >
              {business.monogram}
            </span>
            <div>
              <p className="font-display text-xl font-semibold leading-none text-white sm:text-2xl">
                {business.name}
              </p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-stone-400">
                {business.neighborhood}, {business.city}
              </p>
            </div>
          </a>

          <div className="flex items-center gap-2">
            {/* Optional EN / FR Switcher for Guide du Routard operator */}
            {business.bilingualFrench && (
              <div className="flex rounded-lg border border-white/15 bg-white/5 p-0.5 font-mono text-[11px]">
                {(["EN", "FR"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`rounded-md px-2 py-1 font-semibold transition ${
                      lang === l ? "bg-white text-slate-950" : "text-stone-400"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}

            {/* Multi-Currency Switcher */}
            <div className="flex rounded-lg border border-white/15 bg-white/5 p-0.5 font-mono text-[11px]">
              {(isMustang
                ? (["USD", "INR", "NPR"] as const)
                : (["USD", "EUR", "NPR"] as const)
              ).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`rounded-md px-2 py-1 font-semibold transition ${
                    currency === c ? `${accentBtn}` : "text-stone-400"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <a
              href="#expeditions"
              className={`hidden rounded-xl px-4 py-2 text-xs font-bold sm:inline-flex ${accentBtn}`}
            >
              {lang === "FR" ? "Planifier l'Expédition" : "Plan Expedition"}
            </a>
          </div>
        </div>
      </header>

      {/* Cinematic High-Altitude Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <img
            src={business.heroImage}
            alt={business.name}
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1219] via-[#0B1219]/75 to-black/50" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-white backdrop-blur">
              <Globe className={`h-3.5 w-3.5 ${accentText}`} />
              {business.credentialsBadge}
            </span>

            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.06] text-white sm:text-6xl">
              {lang === "FR"
                ? "Trente-Trois Ans d'Expéditions au Cœur de l'Himalaya."
                : business.tagline}
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-stone-300 sm:text-base">
              {business.editorialIntro}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#expeditions"
                className={`inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] transition ${accentBtn}`}
              >
                {lang === "FR"
                  ? "Explorer les Itinéraires & Tarifs"
                  : "Explore Routes & Altitude Profiles"}
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-xs font-semibold text-white backdrop-blur hover:bg-white/10"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                24/7 WhatsApp Dispatch
              </a>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 border-t border-white/15 pt-8 sm:grid-cols-4">
            {business.stats.map((s) => (
              <div key={s.label}>
                <p className="font-arch text-3xl font-bold tabular-nums text-white">
                  {s.value}
                </p>
                <p className={`font-mono text-[10px] uppercase tracking-[0.18em] ${accentText}`}>
                  {s.label}
                </p>
                <p className="mt-0.5 text-xs text-stone-400">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Altitude Telemetry & Group-Tier Configurator */}
      <section id="expeditions" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className={`font-mono text-xs uppercase tracking-[0.2em] ${accentText}`}>
                {lang === "FR"
                  ? "Profil Altimétrique & Devis Direct Agence Locale"
                  : "Interactive Elevation Telemetry & Direct Local Rates"}
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-white sm:text-5xl">
                {lang === "FR"
                  ? "Choisissez Votre Expédition Himalayenne"
                  : "Signature Expeditions & Overland Departures"}
              </h2>
            </div>
            <span className="font-mono text-xs text-stone-400">
              Zero Middleman Markup · Gov. Licensed Thamel Operator
            </span>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            {/* Left: Route Selector + Live SVG Elevation Curve */}
            <div className="space-y-6 lg:col-span-7">
              <div className="grid gap-3 sm:grid-cols-2">
                {routes.map((rt) => {
                  const selected = rt.id === activeRoute?.id;
                  return (
                    <button
                      key={rt.id}
                      type="button"
                      onClick={() => setSelectedRouteId(rt.id)}
                      className={`rounded-2xl border p-5 text-left transition ${
                        selected
                          ? "border-white bg-white/10 shadow-lg"
                          : "border-white/10 bg-white/[0.03] hover:border-white/30"
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-stone-400">
                        <span>{rt.region}</span>
                        <span className={accentText}>{rt.days} Days</span>
                      </div>
                      <h3 className="mt-2 font-display text-xl font-semibold text-white">
                        {lang === "FR" && rt.nameFr ? rt.nameFr : rt.name}
                      </h3>
                      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-xs">
                        <span className="text-stone-300">
                          <Mountain className="mr-1 inline h-3.5 w-3.5" />
                          Max {rt.maxAltitudeM.toLocaleString()}m
                        </span>
                        <span className="font-bold text-white">
                          {convertFromUsd(rt.groupUsd)}+
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic SVG Altitude Profile Card */}
              {activeRoute && (
                <div className="rounded-3xl border border-white/15 bg-white/[0.04] p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-400">
                        Camp-by-Camp Acclimatization Profile
                      </p>
                      <h3 className="font-display text-2xl font-semibold text-white">
                        {lang === "FR" && activeRoute.nameFr
                          ? activeRoute.nameFr
                          : activeRoute.name}
                      </h3>
                    </div>
                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 font-mono text-xs text-white">
                      Peak: {activeRoute.maxAltitudeM.toLocaleString()} m · {activeRoute.season}
                    </span>
                  </div>

                  <div className="mt-5 overflow-x-auto">
                    <svg
                      viewBox="0 0 560 165"
                      className="h-44 min-w-[480px] w-full"
                      aria-label="Altitude profile chart"
                    >
                      <defs>
                        <linearGradient id="altGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.38" />
                          <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <polygon points={chartGeometry.areaPoints} fill="url(#altGrad)" />
                      <polyline
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="2.5"
                        points={chartGeometry.polyPoints}
                      />
                      {chartGeometry.nodes.map((n) => (
                        <g key={n.dayLabel}>
                          <circle
                            cx={n.x}
                            cy={n.y}
                            r="4.5"
                            fill="#0B1219"
                            stroke={strokeColor}
                            strokeWidth="2.5"
                          />
                          <text
                            x={n.x}
                            y={n.y - 10}
                            textAnchor="middle"
                            fill="#F8FAFC"
                            fontSize="10"
                            fontFamily="monospace"
                          >
                            {n.altitudeM}m
                          </text>
                          <text
                            x={n.x}
                            y={152}
                            textAnchor="middle"
                            fill="#94A3B8"
                            fontSize="9.5"
                            fontFamily="sans-serif"
                          >
                            {n.place}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>

                  <ul className="mt-4 space-y-2 border-t border-white/10 pt-4 text-xs text-stone-300">
                    {activeRoute.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${accentText}`} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right: Group Tier Calculator & Expedition Dispatch */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 rounded-3xl border border-white/15 bg-white/[0.06] p-6 shadow-2xl backdrop-blur sm:p-7">
                <p className={`font-mono text-[10px] uppercase tracking-[0.2em] ${accentText}`}>
                  {pricing.tierLabel}
                </p>
                <div className="mt-1 flex items-baseline justify-between">
                  <p className="font-arch text-3xl font-bold tabular-nums text-white">
                    {convertFromUsd(pricing.perPersonUsd)}
                    <span className="font-sans text-xs font-normal text-stone-400">
                      {" "}
                      / {lang === "FR" ? "voyageur" : "person"}
                    </span>
                  </p>
                  <span className="font-mono text-xs text-stone-400">
                    {activeRoute?.days} Days
                  </span>
                </div>

                {/* Group Size Stepper */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-stone-400">
                      <Users className="mr-1 inline h-3.5 w-3.5" />
                      Group Size
                    </label>
                    <div className="mt-1 flex items-center justify-between rounded-xl border border-white/15 bg-black/40 px-3 py-2">
                      <button
                        type="button"
                        onClick={() => setGroupSize(Math.max(1, groupSize - 1))}
                        className="h-6 w-6 rounded-lg bg-white/10 text-sm font-bold text-white"
                      >
                        −
                      </button>
                      <span className="font-mono text-xs font-bold tabular-nums">
                        {groupSize} {groupSize === 1 ? "Pax" : "Pax"}
                      </span>
                      <button
                        type="button"
                        onClick={() => setGroupSize(Math.min(30, groupSize + 1))}
                        className="h-6 w-6 rounded-lg bg-white/10 text-sm font-bold text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-stone-400">
                      <Calendar className="mr-1 inline h-3.5 w-3.5" />
                      Target Month
                    </label>
                    <input
                      type="month"
                      value={departureMonth}
                      onChange={(e) => setDepartureMonth(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Optional Motorbike Ride Mode Selector */}
                {business.isMotorbikeSpecialist &&
                  activeRoute?.id.includes("motorbike") && (
                    <div className="mt-4">
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-stone-400">
                        Overland Seat Preference
                      </label>
                      <div className="mt-1.5 grid grid-cols-3 gap-1.5 text-[11px]">
                        {[
                          { id: "rider", label: "Solo Bike Rider" },
                          { id: "pillion", label: "Pillion (-22%)" },
                          { id: "jeep", label: "4x4 Backup Seat" },
                        ].map((m) => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() =>
                              setRideMode(m.id as "rider" | "pillion" | "jeep")
                            }
                            className={`rounded-lg border px-2 py-2 font-medium transition ${
                              rideMode === m.id
                                ? "border-amber-400 bg-amber-400/20 text-amber-200"
                                : "border-white/10 bg-black/30 text-stone-400"
                            }`}
                          >
                            {m.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                <div className="mt-4 rounded-2xl bg-black/40 p-3.5 font-mono text-xs">
                  <div className="flex justify-between text-stone-300">
                    <span>
                      Total ({groupSize} {groupSize === 1 ? "Traveler" : "Travelers"})
                    </span>
                    <span className="font-bold text-white">
                      {convertFromUsd(pricing.totalUsd)}
                    </span>
                  </div>
                  <p className="mt-1 font-sans text-[11px] text-stone-400">
                    Includes permits, licensed guide, airport pickup &amp; custom date flexibility
                  </p>
                </div>

                {submitted ? (
                  <div className="mt-5 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-xs text-emerald-200">
                    <p className="font-semibold">
                      Expedition Dossier Requested from {business.name}!
                    </p>
                    <p className="mt-1 text-stone-300">
                      Our Kathmandu expedition director will reply with day-by-day logistics and permit details.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleDossierSubmit} className="mt-4 space-y-2.5">
                    <input
                      type="text"
                      required
                      placeholder="Lead Traveler Name"
                      value={travelerName}
                      onChange={(e) => setTravelerName(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:border-white focus:outline-none"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Email Address or WhatsApp (+Country Code)"
                      value={travelerContact}
                      onChange={(e) => setTravelerContact(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:border-white focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Country / Preferred Guide Language (EN, FR, DE, JP, HI)"
                      value={travelerCountry}
                      onChange={(e) => setTravelerCountry(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:border-white focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className={`w-full rounded-xl py-3.5 text-xs font-bold uppercase tracking-[0.14em] transition ${accentBtn}`}
                    >
                      {submitting
                        ? "Sending..."
                        : lang === "FR"
                        ? "Recevoir le Dossier Complet"
                        : "Request Custom Itinerary & Quote"}
                    </button>
                  </form>
                )}

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-3 text-xs font-semibold text-white hover:bg-white/10"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400" />
                  WhatsApp Expedition Director ({business.phoneDisplay})
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Deal Direct Pillars */}
      <section className="border-y border-white/10 bg-white/[0.02] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {business.pillars.map((p) => (
              <div
                key={p.code}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-7"
              >
                <span className={`font-mono text-xs font-bold ${accentText}`}>
                  EXPEDITION {p.code}
                </span>
                <h3 className="mt-3 font-display text-2xl font-semibold text-white">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-400">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expedition Reviews + FAQ */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            Verified Climber &amp; Traveler Dispatches
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {business.reviews.map((rev) => (
              <div
                key={rev.author}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-stone-300">
                  &ldquo;{rev.quote}&rdquo;
                </p>
                <p className="mt-4 text-xs font-bold text-white">{rev.author}</p>
                <p className="font-mono text-[11px] text-stone-400">{rev.origin}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-center font-display text-3xl font-semibold text-white sm:text-4xl">
            Permits, Safety &amp; Logistics FAQ
          </h2>
          <div className="mt-8 space-y-3">
            {business.faqs.map((f, idx) => (
              <div
                key={f.q}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 text-left text-sm font-semibold text-white"
                >
                  <span>{f.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <p className="mt-3 text-xs leading-relaxed text-stone-300 sm:text-sm">
                    {f.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/60 py-14 pb-28 text-stone-400">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl font-semibold text-white">
              {business.name}
            </p>
            <p className="mt-2 text-xs">{business.tagline}</p>
            <p className={`mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] ${accentText}`}>
              <ShieldCheck className="h-3.5 w-3.5" />
              {business.established}
            </p>
          </div>
          <div className="space-y-1.5 text-xs">
            <p className="font-mono text-[10px] uppercase tracking-widest text-stone-500">
              Kathmandu Headquarters
            </p>
            <p className="flex items-start gap-2">
              <MapPin className={`mt-0.5 h-4 w-4 shrink-0 ${accentText}`} />
              <span>{business.fullAddress}</span>
            </p>
            <p>{business.hours}</p>
          </div>
          <div className="space-y-1.5 text-xs">
            <p className="font-mono text-[10px] uppercase tracking-widest text-stone-500">
              Direct Expedition Desk
            </p>
            <p className="flex items-center gap-2">
              <Phone className={`h-4 w-4 ${accentText}`} />
              <a href={`tel:${business.phoneTel}`} className="text-white hover:underline">
                {business.phoneDisplay}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className={`h-4 w-4 ${accentText}`} />
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
