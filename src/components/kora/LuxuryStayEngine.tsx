"use client";

import React, { useMemo, useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Star,
  Check,
  Sparkles,
  Calendar,
  Users,
  ShieldCheck,
  MessageCircle,
  ChevronDown,
  ArrowUpRight,
  Compass,
  Award,
  BedDouble,
} from "lucide-react";
import type { KoraBusinessConfig } from "@/data/kora-businesses";

const PALETTES = {
  "lakeside-travertine": {
    pageBg: "bg-[#F7F4EE]",
    altBg: "bg-[#EFEAE0]",
    darkBg: "bg-[#112224]",
    accentBg: "bg-[#163C3E]",
    accentHover: "hover:bg-[#1E4F52]",
    accentText: "text-[#163C3E]",
    goldText: "text-[#B08342]",
    pillBorder: "border-[#163C3E]/20 bg-[#163C3E]/5 text-[#163C3E]",
    cardActive: "border-[#163C3E] ring-1 ring-[#163C3E] bg-white",
  },
  "malla-terracotta": {
    pageBg: "bg-[#F8F3EC]",
    altBg: "bg-[#EFE6DA]",
    darkBg: "bg-[#231612]",
    accentBg: "bg-[#7C2D1E]",
    accentHover: "hover:bg-[#933827]",
    accentText: "text-[#7C2D1E]",
    goldText: "text-[#A8763E]",
    pillBorder: "border-[#7C2D1E]/25 bg-[#7C2D1E]/5 text-[#7C2D1E]",
    cardActive: "border-[#7C2D1E] ring-1 ring-[#7C2D1E] bg-white",
  },
  "bhaktapur-crimson": {
    pageBg: "bg-[#FAF6F0]",
    altBg: "bg-[#F1E9DD]",
    darkBg: "bg-[#1E1414]",
    accentBg: "bg-[#6E1E2A]",
    accentHover: "hover:bg-[#872635]",
    accentText: "text-[#6E1E2A]",
    goldText: "text-[#B4833E]",
    pillBorder: "border-[#6E1E2A]/25 bg-[#6E1E2A]/5 text-[#6E1E2A]",
    cardActive: "border-[#6E1E2A] ring-1 ring-[#6E1E2A] bg-white",
  },
} as const;

export function LuxuryStayEngine({
  business,
}: {
  business: KoraBusinessConfig;
  isPreview?: boolean;
}) {
  const themeKey =
    business.palette in PALETTES
      ? (business.palette as keyof typeof PALETTES)
      : "lakeside-travertine";
  const t = PALETTES[themeKey];

  const rooms = business.stayRooms || [];
  const addons = business.stayAddons || [];

  const [currency, setCurrency] = useState<"USD" | "NPR">("USD");
  const [selectedRoomId, setSelectedRoomId] = useState(rooms[0]?.id || "");
  const [nights, setNights] = useState(3);
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState("2026-11-20");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [guestName, setGuestName] = useState("");
  const [guestContact, setGuestContact] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const activeRoom = useMemo(
    () => rooms.find((r) => r.id === selectedRoomId) || rooms[0],
    [rooms, selectedRoomId]
  );

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const totals = useMemo(() => {
    if (!activeRoom) {
      return { stayUsd: 0, stayNpr: 0, otaUsd: 0, savedUsd: 0, savedNpr: 0 };
    }
    const addonUsd = addons
      .filter((a) => selectedAddons.includes(a.id))
      .reduce((sum, a) => sum + a.priceUsd, 0);
    const addonNpr = addons
      .filter((a) => selectedAddons.includes(a.id))
      .reduce((sum, a) => sum + a.priceNpr, 0);

    const stayUsd = activeRoom.rateUsd * nights + addonUsd;
    const stayNpr = activeRoom.rateNpr * nights + addonNpr;
    const otaUsd = activeRoom.otaRateUsd * nights + addonUsd;
    const savedUsd = Math.max(0, otaUsd - stayUsd);
    const savedNpr = Math.round(savedUsd * 134);

    return { stayUsd, stayNpr, otaUsd, savedUsd, savedNpr };
  }, [activeRoom, nights, addons, selectedAddons]);

  const formatMoney = (usd: number, npr: number) =>
    currency === "USD" ? `$${usd.toLocaleString()}` : `NPR ${npr.toLocaleString()}`;

  const whatsappReservationHref = business.whatsappDigits
    ? `https://wa.me/${business.whatsappDigits}?text=${encodeURIComponent(
        `Namaste ${business.name}! I would like to reserve:\n• Suite: ${activeRoom?.name}\n• Check-in: ${checkIn} (${nights} nights, ${guests} guests)\n• Direct Estimate: ${formatMoney(totals.stayUsd, totals.stayNpr)}${
          selectedAddons.length ? `\n• Add-ons: ${selectedAddons.join(", ")}` : ""
        }`
      )}`
    : `mailto:${business.email}`;

  async function handleBookingSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!guestName.trim() || !guestContact.trim()) return;
    setSubmitting(true);
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_slug: business.slug,
          customer_name: guestName,
          customer_phone: guestContact,
          service_selected: `${activeRoom?.name} · ${nights} Nights (${formatMoney(
            totals.stayUsd,
            totals.stayNpr
          )})`,
          preferred_date: checkIn,
          party_size: guests,
          notes: `${specialRequest} | Add-ons: ${selectedAddons.join(", ") || "None"}`,
        }),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={`min-h-screen ${t.pageBg} text-stone-900`}>
      {/* Top Micro Provenance Bar */}
      <div className={`${t.darkBg} px-4 py-2 text-[11px] text-stone-300`}>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
          <p className="font-mono tracking-wider">
            <Compass className="mr-1.5 inline h-3.5 w-3.5 text-amber-300" />
            {business.coordinates} · {business.neighborhood}, {business.city}
          </p>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-amber-200/90">
              Official Website · Best Rate Guarantee (Save ~15% vs OTAs)
            </span>
            <a href={`tel:${business.phoneTel}`} className="font-medium text-white hover:underline">
              {business.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Sticky Editorial Glass Header */}
      <header className="sticky top-0 z-40 border-b border-stone-900/10 bg-[#FAF7F2]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <a href="#" className="flex items-center gap-3">
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-full ${t.accentBg} font-display text-base font-semibold tracking-wider text-white`}
            >
              {business.monogram}
            </span>
            <div>
              <p className="font-display text-xl font-semibold leading-none tracking-tight text-stone-950 sm:text-2xl">
                {business.name}
              </p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-stone-500">
                {business.sectorLabel}
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-xs font-medium tracking-wide text-stone-700 lg:flex">
            <a href="#sanctuary" className="hover:text-stone-950">
              The Sanctuary
            </a>
            <a href="#suites" className="hover:text-stone-950">
              Suites &amp; Direct Rates
            </a>
            {business.banquetHalls && (
              <a href="#celebrations" className="hover:text-stone-950">
                Banquet Halls
              </a>
            )}
            <a href="#reviews" className="hover:text-stone-950">
              Guest Notes
            </a>
            <a href="#faq" className="hover:text-stone-950">
              Concierge FAQ
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            <div className="flex rounded-full border border-stone-300 bg-white p-0.5 text-[11px] font-semibold">
              {(["USD", "NPR"] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`rounded-full px-2.5 py-1 transition ${
                    currency === curr
                      ? `${t.accentBg} text-white`
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>

            <a
              href="#suites"
              className={`hidden rounded-full ${t.accentBg} ${t.accentHover} px-5 py-2.5 text-xs font-semibold tracking-wide text-white transition sm:inline-flex`}
            >
              Reserve Direct
            </a>
          </div>
        </div>
      </header>

      {/* Atmospheric Full-Bleed Editorial Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:items-center lg:py-20">
          <div className="lg:col-span-6">
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.16em] ${t.pillBorder}`}
            >
              <Sparkles className="h-3 w-3" />
              {business.heroEyebrow}
            </span>

            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.06] tracking-tight text-stone-950 sm:text-6xl">
              {business.tagline}
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-stone-600 sm:text-base">
              {business.editorialIntro}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#suites"
                className={`inline-flex items-center gap-2 rounded-full ${t.accentBg} ${t.accentHover} px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-lg transition`}
              >
                Configure Your Stay
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={whatsappReservationHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-3.5 text-xs font-semibold text-stone-800 transition hover:border-stone-500"
              >
                <MessageCircle className="h-4 w-4 text-emerald-700" />
                WhatsApp Front Desk
              </a>
            </div>

            {/* Key Provenance Metrics */}
            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-stone-300/80 pt-7 sm:grid-cols-4">
              {business.stats.map((st) => (
                <div key={st.label}>
                  <p className="font-display text-3xl font-semibold tabular-nums text-stone-950">
                    {st.value}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-stone-500">
                    {st.label}
                  </p>
                  <p className="mt-0.5 text-[11px] text-stone-600">{st.detail}</p>
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-3 rounded-2xl border border-white/20 bg-stone-950/75 p-4 text-white backdrop-blur-md">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-300">
                    {business.credentialsBadge}
                  </p>
                  <p className="mt-1 text-sm font-medium">{business.landmark}</p>
                </div>
                <div className="rounded-xl bg-white/10 px-3.5 py-2 text-right">
                  <p className="text-[10px] uppercase tracking-wider text-stone-300">
                    Direct From
                  </p>
                  <p className="font-display text-2xl font-semibold tabular-nums text-amber-200">
                    {rooms[0] ? formatMoney(rooms[0].rateUsd, rooms[0].rateNpr) : ""}{" "}
                    <span className="font-sans text-[11px] font-normal text-stone-300">
                      / night
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Craft & Sense of Place */}
      <section id="sanctuary" className={`${t.altBg} border-y border-stone-300/60 py-16 sm:py-20`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className={`font-mono text-xs uppercase tracking-[0.2em] ${t.goldText}`}>
                Sense of Place · {business.established}
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-stone-950 sm:text-5xl">
                Crafted for Unhurried Himalayan Days
              </h2>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-stone-600 sm:text-sm">
              Hosted by <span className="font-semibold text-stone-900">{business.principalOrFounder}</span>{" "}
              — every stay balances authentic Nepali heritage architecture with thoughtful modern comfort.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {business.pillars.map((p) => (
              <div
                key={p.code}
                className="rounded-3xl border border-stone-900/10 bg-white/85 p-7 shadow-sm"
              >
                <span className={`font-mono text-xs font-semibold ${t.goldText}`}>
                  /{p.code}
                </span>
                <h3 className="mt-3 font-display text-2xl font-semibold text-stone-950">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-stone-600">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Suite & Direct-Stay Configurator */}
      <section id="suites" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className={`font-mono text-xs uppercase tracking-[0.2em] ${t.goldText}`}>
                Zero-Commission Official Desk
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-stone-950 sm:text-5xl">
                Suites, Sanctuary Rates &amp; Stay Builder
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-800/20 bg-emerald-950/5 px-4 py-2 text-xs font-medium text-emerald-900">
              <ShieldCheck className="h-4 w-4" />
              Direct Rate Saves ~15% vs Online Travel Agencies
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            {/* Left: Suite Cards + Addons */}
            <div className="space-y-4 lg:col-span-7">
              {rooms.map((room) => {
                const selected = room.id === activeRoom?.id;
                return (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoomId(room.id)}
                    className={`cursor-pointer rounded-3xl border p-6 transition ${
                      selected
                        ? t.cardActive
                        : "border-stone-200 bg-white/75 hover:border-stone-400"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-display text-2xl font-semibold text-stone-950">
                            {room.name}
                          </h3>
                          {room.badge && (
                            <span
                              className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${t.pillBorder}`}
                            >
                              {room.badge}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-stone-500">{room.subtitle}</p>
                      </div>

                      <div className="text-right">
                        <p className="font-mono text-[11px] text-stone-400 line-through">
                          OTA{" "}
                          {currency === "USD"
                            ? `$${room.otaRateUsd}`
                            : `NPR ${Math.round(room.otaRateUsd * 134).toLocaleString()}`}
                        </p>
                        <p className="font-display text-3xl font-semibold tabular-nums text-stone-950">
                          {formatMoney(room.rateUsd, room.rateNpr)}
                          <span className="font-sans text-xs font-normal text-stone-500">
                            {" "}
                            / night
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3 text-xs text-stone-600">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1">
                        <BedDouble className="h-3.5 w-3.5" />
                        {room.bedConfig}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1">
                        <Users className="h-3.5 w-3.5" />
                        {room.maxGuests}
                      </span>
                      <span className="rounded-full bg-stone-100 px-3 py-1 font-mono text-[11px]">
                        {room.sizeSqm} m²
                      </span>
                    </div>

                    <ul className="mt-4 grid gap-2 border-t border-stone-200/80 pt-4 text-xs text-stone-700 sm:grid-cols-2">
                      {room.features.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${t.accentText}`} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}

              {/* Curated Concierge Enhancements */}
              {addons.length > 0 && (
                <div className="rounded-3xl border border-stone-200 bg-white/80 p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone-500">
                    Optional Concierge Enhancements
                  </p>
                  <div className="mt-4 space-y-2.5">
                    {addons.map((ad) => {
                      const active = selectedAddons.includes(ad.id);
                      return (
                        <label
                          key={ad.id}
                          onClick={() => toggleAddon(ad.id)}
                          className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border p-3.5 transition ${
                            active
                              ? "border-stone-900 bg-stone-900/5"
                              : "border-stone-200 hover:border-stone-300"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`flex h-5 w-5 items-center justify-center rounded border ${
                                active
                                  ? `${t.accentBg} border-transparent text-white`
                                  : "border-stone-400 bg-white"
                              }`}
                            >
                              {active && <Check className="h-3.5 w-3.5" />}
                            </span>
                            <div>
                              <p className="text-xs font-semibold text-stone-900 sm:text-sm">
                                {ad.name}
                              </p>
                              <p className="text-[11px] text-stone-500">{ad.note}</p>
                            </div>
                          </div>
                          <span className="font-mono text-xs font-semibold tabular-nums text-stone-900">
                            {ad.priceUsd === 0
                              ? "Quote"
                              : `+${formatMoney(ad.priceUsd, ad.priceNpr)}`}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Live Folio & Instant Reservation Dispatch */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 rounded-3xl border border-stone-900/15 bg-white p-6 shadow-xl sm:p-7">
                <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500">
                      Direct Stay Folio
                    </p>
                    <h3 className="font-display text-2xl font-semibold text-stone-950">
                      {activeRoom?.name}
                    </h3>
                  </div>
                  <Award className={`h-6 w-6 ${t.goldText}`} />
                </div>

                {/* Dates, Nights & Guests Controls */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-stone-500">
                      Preferred Check-In Date
                    </label>
                    <div className="relative mt-1">
                      <Calendar className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full rounded-xl border border-stone-300 bg-stone-50 py-2.5 pl-10 pr-3 text-xs font-medium text-stone-900 focus:border-stone-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-stone-500">
                      Duration (Nights)
                    </label>
                    <div className="mt-1 flex items-center justify-between rounded-xl border border-stone-300 bg-stone-50 px-3 py-2">
                      <button
                        type="button"
                        onClick={() => setNights(Math.max(1, nights - 1))}
                        className="h-6 w-6 rounded-full bg-white text-sm font-bold shadow-sm"
                      >
                        −
                      </button>
                      <span className="font-mono text-xs font-semibold tabular-nums">
                        {nights} {nights === 1 ? "Night" : "Nights"}
                      </span>
                      <button
                        type="button"
                        onClick={() => setNights(Math.min(21, nights + 1))}
                        className="h-6 w-6 rounded-full bg-white text-sm font-bold shadow-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-stone-500">
                      Guests
                    </label>
                    <div className="mt-1 flex items-center justify-between rounded-xl border border-stone-300 bg-stone-50 px-3 py-2">
                      <button
                        type="button"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="h-6 w-6 rounded-full bg-white text-sm font-bold shadow-sm"
                      >
                        −
                      </button>
                      <span className="font-mono text-xs font-semibold tabular-nums">
                        {guests} {guests === 1 ? "Guest" : "Guests"}
                      </span>
                      <button
                        type="button"
                        onClick={() => setGuests(Math.min(8, guests + 1))}
                        className="h-6 w-6 rounded-full bg-white text-sm font-bold shadow-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="mt-5 rounded-2xl bg-stone-50 p-4 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>
                      {activeRoom?.name} × {nights} {nights === 1 ? "night" : "nights"}
                    </span>
                    <span className="font-mono tabular-nums">
                      {activeRoom
                        ? formatMoney(
                            activeRoom.rateUsd * nights,
                            activeRoom.rateNpr * nights
                          )
                        : ""}
                    </span>
                  </div>
                  {totals.savedUsd > 0 && (
                    <div className="mt-2 flex justify-between font-medium text-emerald-800">
                      <span>Direct-Booking Savings vs OTA</span>
                      <span className="font-mono tabular-nums">
                        −{formatMoney(totals.savedUsd, totals.savedNpr)}
                      </span>
                    </div>
                  )}
                  <div className="mt-3 flex items-baseline justify-between border-t border-stone-200 pt-3">
                    <span className="font-semibold text-stone-900">Estimated Total</span>
                    <span className="font-display text-3xl font-semibold tabular-nums text-stone-950">
                      {formatMoney(totals.stayUsd, totals.stayNpr)}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-stone-500">
                    No prepayment required online · Settle upon arrival or confirmation
                  </p>
                </div>

                {submitted ? (
                  <div className="mt-5 rounded-2xl border border-emerald-600/30 bg-emerald-50 p-4 text-xs text-emerald-950">
                    <p className="font-semibold">
                      Reservation Inquiry Logged for {business.name}!
                    </p>
                    <p className="mt-1 text-emerald-800">
                      Our reservations desk will confirm availability promptly. For instant confirmation, tap WhatsApp below.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="mt-5 space-y-2.5">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs focus:border-stone-900 focus:outline-none"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Email or WhatsApp Number (with country code)"
                      value={guestContact}
                      onChange={(e) => setGuestContact(e.target.value)}
                      className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs focus:border-stone-900 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Flight arrival time or special request (optional)"
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-xs focus:border-stone-900 focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className={`w-full rounded-xl ${t.accentBg} ${t.accentHover} py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition`}
                    >
                      {submitting ? "Sending to Reservations..." : "Request Direct Reservation"}
                    </button>
                  </form>
                )}

                <a
                  href={whatsappReservationHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl border border-stone-300 bg-stone-50 py-3 text-xs font-semibold text-stone-800 transition hover:bg-stone-100"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-700" />
                  Instant WhatsApp Confirmation ({business.phoneDisplay})
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Optional Banquet & Celebration Halls Showcase */}
      {business.banquetHalls && business.banquetHalls.length > 0 && (
        <section id="celebrations" className={`${t.darkBg} py-16 text-stone-100 sm:py-20`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-300">
              Weddings, Retreats &amp; Conferences in {business.city}
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-white sm:text-5xl">
              Grand Heritage Celebration Halls
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {business.banquetHalls.map((h) => (
                <div
                  key={h.name}
                  className="rounded-3xl border border-white/15 bg-white/5 p-7 backdrop-blur"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-3xl font-semibold text-white">
                      {h.name}
                    </h3>
                    <span className="rounded-full bg-amber-300/15 px-3 py-1 font-mono text-xs text-amber-200">
                      {h.capacity}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-stone-300">{h.useCase}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                    <span className="text-stone-400">
                      Curated Banquet &amp; Residential Packages from{" "}
                      <strong className="text-white">
                        NPR {h.startingNpr.toLocaleString()}/guest
                      </strong>
                    </span>
                    <a
                      href={whatsappReservationHref}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-amber-300 hover:underline"
                    >
                      Inquire Dates →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Guest Testimonials */}
      <section id="reviews" className={`${t.altBg} py-16 sm:py-20`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className={`font-mono text-xs uppercase tracking-[0.2em] ${t.goldText}`}>
            Verified Guest Ledger
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-stone-950 sm:text-5xl">
            Reflections from Recent Stays
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {business.reviews.map((rev) => (
              <div
                key={rev.author}
                className="flex flex-col justify-between rounded-3xl border border-stone-200 bg-white p-7 shadow-sm"
              >
                <div>
                  <div className="flex gap-1 text-amber-500">
                    {Array.from({ length: rev.rating }).map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 font-display text-xl italic leading-relaxed text-stone-800">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                </div>
                <div className="mt-6 border-t border-stone-100 pt-4">
                  <p className="text-xs font-bold text-stone-900">{rev.author}</p>
                  <p className="font-mono text-[11px] text-stone-500">{rev.origin}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Concierge FAQ */}
      <section id="faq" className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center">
            <p className={`font-mono text-xs uppercase tracking-[0.2em] ${t.goldText}`}>
              Arrival &amp; Stay Details
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-stone-950 sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-8 space-y-3">
            {business.faqs.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={item.q}
                  className="rounded-2xl border border-stone-200 bg-white px-6 py-4"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 text-left text-sm font-semibold text-stone-900"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-xs leading-relaxed text-stone-600 sm:text-sm">
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Refined Editorial Footer */}
      <footer className={`${t.darkBg} py-14 pb-28 text-stone-300`}>
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl font-semibold text-white">
              {business.name}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-stone-400">
              {business.tagline}
            </p>
            <p className="mt-3 font-mono text-[11px] text-amber-300/90">
              {business.established}
            </p>
          </div>
          <div className="space-y-2 text-xs">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-400">
              Location &amp; Hours
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
              <span>{business.fullAddress}</span>
            </p>
            <p className="text-stone-400">{business.hours}</p>
          </div>
          <div className="space-y-2 text-xs">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-400">
              Direct Reservations Desk
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
