"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Star,
  Sparkles,
  MessageCircle,
  CheckCircle2,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";
import type { BusinessConfig } from "@/data/businesses";

export function SpaAndSkinSite({
  business,
  isPreview,
}: {
  business: BusinessConfig;
  isPreview: boolean;
}) {
  const isDermatology = business.template === "dermatology";
  const isLuxurySpa = business.template === "spa-luxury";
  const isHeritageSpa = business.template === "spa-heritage";

  const [currency, setCurrency] = useState<"NPR" | "USD">("NPR");
  const [selectedId, setSelectedId] = useState(business.services[0]?.id || "");
  const [guestCount, setGuestCount] = useState(1);
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [preferredTime, setPreferredTime] = useState(
    isDermatology ? "Tomorrow · 11:00 AM OPD" : "Today · 5:30 PM"
  );
  const [pressureOrNote, setPressureOrNote] = useState(
    isDermatology ? "First-time Specialist Consultation" : "Medium-Firm Post-Trek Recovery"
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedService =
    business.services.find((s) => s.id === selectedId) || business.services[0];

  const totalNpr = selectedService.priceNpr * (isDermatology ? 1 : guestCount);
  const totalUsd =
    (selectedService.priceUsd || Math.round(selectedService.priceNpr / 130)) *
    (isDermatology ? 1 : guestCount);

  const displayTotal =
    currency === "USD" && !isDermatology
      ? `$${totalUsd} USD`
      : `NPR ${totalNpr.toLocaleString()}`;

  const whatsappHref = business.whatsappDigits
    ? `https://wa.me/${business.whatsappDigits}?text=${encodeURIComponent(
        `Namaste ${business.shortName}! ✨\nI would like to book:\n• Treatment: ${
          selectedService.name
        }\n• Guests: ${guestCount}\n• Preferred Time: ${preferredTime}\n• Preference: ${pressureOrNote}`
      )}`
    : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!guestName || !guestPhone) return;
    setSubmitting(true);
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_slug: business.slug,
          customer_name: guestName,
          customer_phone: guestPhone,
          service_selected: `${selectedService.name}${
            !isDermatology ? ` (${guestCount} Guest${guestCount > 1 ? "s" : ""})` : ""
          }`,
          preferred_date: preferredTime,
          estimated_value: displayTotal,
          notes: pressureOrNote,
          is_preview_test: isPreview,
        }),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  // Distinct bespoke palettes for each of the 4 Pokhara wellness/skin brands
  const theme = isDermatology
    ? {
        pageBg: "bg-[#f6faf9] text-slate-900",
        topBar: "bg-teal-950 text-teal-50",
        accentBtn: "bg-teal-700 hover:bg-teal-800 text-white",
        badge: "bg-teal-100/80 text-teal-900 border-teal-300",
        cardActive: "border-teal-600 bg-teal-50/60 ring-2 ring-teal-600/15",
        priceText: "text-teal-800",
      }
    : isLuxurySpa
    ? {
        pageBg: "bg-[#161311] text-[#f5efe8]",
        topBar: "bg-[#0d0b0a] text-amber-200/90",
        accentBtn: "bg-[#d4af7a] hover:bg-[#e0be8c] text-stone-950",
        badge: "bg-[#d4af7a]/15 text-[#e6c89c] border-[#d4af7a]/35",
        cardActive: "border-[#d4af7a] bg-[#241f1b]",
        priceText: "text-[#e6c89c]",
      }
    : isHeritageSpa
    ? {
        pageBg: "bg-[#faf6f0] text-stone-900",
        topBar: "bg-[#3d251e] text-amber-100",
        accentBtn: "bg-[#6e3b2e] hover:bg-[#582e23] text-amber-50",
        badge: "bg-[#6e3b2e]/10 text-[#6e3b2e] border-[#6e3b2e]/25",
        cardActive: "border-[#6e3b2e] bg-[#f3eae0]",
        priceText: "text-[#6e3b2e]",
      }
    : {
        // Green Spa Botanical Emerald
        pageBg: "bg-[#f4f8f4] text-stone-900",
        topBar: "bg-[#123123] text-emerald-100",
        accentBtn: "bg-[#1b5e3f] hover:bg-[#144730] text-white",
        badge: "bg-emerald-100 text-emerald-900 border-emerald-300",
        cardActive: "border-emerald-700 bg-emerald-50/80",
        priceText: "text-emerald-800",
      };

  const darkSurface = isLuxurySpa;

  return (
    <div className={`min-h-screen ${theme.pageBg}`}>
      {/* Top Bar */}
      <div className={`${theme.topBar} px-4 py-2.5 text-xs`}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 opacity-80" />
              {business.landmark}
            </span>
            <span className="hidden items-center gap-1.5 sm:inline-flex">
              <Clock className="h-3.5 w-3.5 opacity-80" />
              {business.hours}
            </span>
          </div>
          <a
            href={`tel:${business.phoneTel}`}
            className="inline-flex items-center gap-1.5 font-semibold hover:underline"
          >
            <Phone className="h-3.5 w-3.5" />
            {business.phoneDisplay}
          </a>
        </div>
      </div>

      {/* Navbar */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-md ${
          darkSurface
            ? "border-stone-800 bg-[#161311]/90"
            : "border-stone-200/80 bg-white/90"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p className="font-serif text-xl font-bold tracking-tight">
              {business.name}
            </p>
            <p
              className={`text-xs ${
                darkSurface ? "text-stone-400" : "text-stone-500"
              }`}
            >
              {business.neighborhood}, Pokhara
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {!isDermatology && (
              <div
                className={`hidden rounded-xl border p-1 text-xs font-bold sm:flex ${
                  darkSurface
                    ? "border-stone-800 bg-stone-900"
                    : "border-stone-200 bg-stone-100"
                }`}
              >
                <button
                  onClick={() => setCurrency("NPR")}
                  className={`rounded-lg px-2.5 py-1 ${
                    currency === "NPR" ? theme.accentBtn : "opacity-60"
                  }`}
                >
                  NPR
                </button>
                <button
                  onClick={() => setCurrency("USD")}
                  className={`rounded-lg px-2.5 py-1 ${
                    currency === "USD" ? theme.accentBtn : "opacity-60"
                  }`}
                >
                  USD
                </button>
              </div>
            )}
            <a
              href="#booking"
              className={`rounded-xl px-4 py-2.5 text-xs font-semibold transition ${theme.accentBtn}`}
            >
              {isDermatology ? "Book OPD Consultation" : "Book Session"}
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-6">
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold ${theme.badge}`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {business.heroBadge}
          </span>

          <h1 className="mt-5 font-serif text-4xl font-semibold leading-[1.14] tracking-tight sm:text-5xl">
            {business.tagline}
          </h1>

          {business.leadDoctorOrFounder && (
            <p
              className={`mt-3 text-xs font-semibold uppercase tracking-wider ${theme.priceText}`}
            >
              {business.leadDoctorOrFounder}
            </p>
          )}

          <p
            className={`mt-4 text-base leading-relaxed ${
              darkSurface ? "text-stone-300" : "text-stone-600"
            }`}
          >
            {isDermatology
              ? "Personalized medical dermatology, acne & scar clearance, PRP hair restoration, and board-certified cosmetic procedures in a calm, patient-first Pokhara clinic."
              : isHeritageSpa
              ? "Established in 2004 as Pokhara's very first wellness sanctuary at Street 16 Centerpoint—offering authentic Ayurvedic therapies, Trekkers Recovery, Thai stretching, and full salon care in cozy AC suites."
              : "Unwind in serene private suites with pure botanical oils, tailored therapist pressure, warm herbal tea, and instant WhatsApp slot confirmation."}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#booking"
              className={`rounded-xl px-6 py-3.5 text-sm font-semibold shadow-sm transition ${theme.accentBtn}`}
            >
              {isDermatology
                ? "Match My Skin/Hair Concern →"
                : "Customize Ritual & Book →"}
            </a>
            {whatsappHref ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 rounded-xl border px-5 py-3.5 text-sm font-semibold transition ${
                  darkSurface
                    ? "border-stone-700 bg-stone-900 text-stone-100 hover:bg-stone-800"
                    : "border-stone-300 bg-white text-stone-800 hover:bg-stone-50"
                }`}
              >
                <MessageCircle className="h-4 w-4 text-emerald-500" />
                WhatsApp Direct
              </a>
            ) : (
              <a
                href={`tel:${business.phoneTel}`}
                className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-3.5 text-sm font-semibold text-stone-800"
              >
                <Phone className="h-4 w-4" />
                Call {business.phoneDisplay}
              </a>
            )}
          </div>

          <div
            className={`mt-9 grid grid-cols-2 gap-4 border-t pt-6 sm:grid-cols-4 ${
              darkSurface ? "border-stone-800" : "border-stone-200"
            }`}
          >
            {business.stats.map((st) => (
              <div key={st.label}>
                <p className={`font-serif text-xl font-bold ${theme.priceText}`}>
                  {st.value}
                </p>
                <p
                  className={`text-xs ${
                    darkSurface ? "text-stone-400" : "text-stone-500"
                  }`}
                >
                  {st.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6">
          <div
            className={`overflow-hidden rounded-3xl border shadow-xl ${
              darkSurface ? "border-stone-800" : "border-stone-200 bg-white"
            }`}
          >
            <img
              src={business.heroImage}
              alt={business.name}
              className="h-[400px] w-full object-cover sm:h-[460px]"
            />
          </div>
        </div>
      </section>

      {/* Menu & Interactive Booking */}
      <section
        id="booking"
        className={`border-y py-16 ${
          darkSurface
            ? "border-stone-800 bg-[#1c1815]"
            : "border-stone-200 bg-white"
        }`}
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-12">
          <div className="space-y-3.5 lg:col-span-7">
            <h2 className="font-serif text-3xl font-semibold">
              {isDermatology
                ? "Clinical Dermatology & Aesthetic Services"
                : "Signature Therapies & Wellness Packages"}
            </h2>
            <p
              className={`text-sm ${
                darkSurface ? "text-stone-400" : "text-stone-600"
              }`}
            >
              Tap a treatment below to select it for instant reservation:
            </p>

            <div className="space-y-3 pt-2">
              {business.services.map((srv) => {
                const active = srv.id === selectedService.id;
                const priceStr =
                  currency === "USD" && !isDermatology && srv.priceUsd
                    ? `$${srv.priceUsd}`
                    : `NPR ${srv.priceNpr.toLocaleString()}`;
                return (
                  <div
                    key={srv.id}
                    onClick={() => setSelectedId(srv.id)}
                    className={`cursor-pointer rounded-2xl border p-5 transition ${
                      active
                        ? theme.cardActive
                        : darkSurface
                        ? "border-stone-800 bg-[#161311] hover:border-stone-700"
                        : "border-stone-200 bg-stone-50/50 hover:border-stone-300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-wider opacity-70">
                          {srv.category}
                        </span>
                        <h3 className="mt-0.5 text-base font-bold">{srv.name}</h3>
                        <p className="mt-1 text-xs opacity-75">
                          {srv.durationOrNote}
                        </p>
                      </div>
                      <p className={`font-serif text-lg font-bold ${theme.priceText}`}>
                        {priceStr}
                      </p>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed opacity-85">
                      {srv.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-5">
            <div
              className={`sticky top-24 rounded-3xl border p-6 shadow-xl sm:p-7 ${
                darkSurface
                  ? "border-stone-800 bg-[#14110f]"
                  : "border-stone-200 bg-stone-50/90"
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-75">
                {isDermatology ? (
                  <ShieldCheck className="h-4 w-4" />
                ) : (
                  <HeartHandshake className="h-4 w-4" />
                )}
                {isDermatology
                  ? "30-Second OPD Appointment"
                  : "Instant Room & Therapist Hold"}
              </div>

              <h3 className="mt-2 font-serif text-2xl font-semibold">
                {selectedService.name}
              </h3>

              {submitted ? (
                <div className="mt-6 py-6 text-center">
                  <CheckCircle2 className="mx-auto h-11 w-11 text-emerald-500" />
                  <h4 className="mt-3 text-lg font-bold">
                    Booking Logged for {guestName}!
                  </h4>
                  <p className="mt-1.5 text-xs opacity-80">
                    Preferred slot: <strong>{preferredTime}</strong> · Estimated:{" "}
                    <strong>{displayTotal}</strong>.
                  </p>
                  <div className="mt-5 flex flex-col gap-2.5">
                    {whatsappHref && (
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Confirm Immediately on WhatsApp
                      </a>
                    )}
                    <a
                      href={`tel:${business.phoneTel}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-400/40 px-5 py-3 text-xs font-bold"
                    >
                      <Phone className="h-4 w-4" />
                      Call Reception ({business.phoneDisplay})
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  {!isDermatology && (
                    <div>
                      <label className="block text-xs font-semibold opacity-80">
                        Number of Guests
                      </label>
                      <div className="mt-1.5 flex gap-2">
                        {[1, 2, 3, 4].map((n) => (
                          <button
                            type="button"
                            key={n}
                            onClick={() => setGuestCount(n)}
                            className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${
                              guestCount === n
                                ? theme.accentBtn
                                : darkSurface
                                ? "border border-stone-800 bg-stone-900"
                                : "border border-stone-200 bg-white"
                            }`}
                          >
                            {n === 2 ? "2 (Couple)" : n}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold opacity-80">
                      Your Name *
                    </label>
                    <input
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Full Name"
                      className={`mt-1 w-full rounded-xl border px-3.5 py-2.5 text-sm focus:outline-none ${
                        darkSurface
                          ? "border-stone-800 bg-stone-900 text-white"
                          : "border-stone-300 bg-white text-stone-900"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold opacity-80">
                      Phone or WhatsApp *
                    </label>
                    <input
                      required
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="+977 98XXXXXXXX"
                      className={`mt-1 w-full rounded-xl border px-3.5 py-2.5 text-sm focus:outline-none ${
                        darkSurface
                          ? "border-stone-800 bg-stone-900 text-white"
                          : "border-stone-300 bg-white text-stone-900"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold opacity-80">
                      Preferred Day &amp; Time
                    </label>
                    <input
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className={`mt-1 w-full rounded-xl border px-3.5 py-2.5 text-sm focus:outline-none ${
                        darkSurface
                          ? "border-stone-800 bg-stone-900 text-white"
                          : "border-stone-300 bg-white text-stone-900"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold opacity-80">
                      {isDermatology
                        ? "Primary Skin / Hair Concern"
                        : "Pressure / Focus Area"}
                    </label>
                    <select
                      value={pressureOrNote}
                      onChange={(e) => setPressureOrNote(e.target.value)}
                      className={`mt-1 w-full rounded-xl border px-3.5 py-2.5 text-sm focus:outline-none ${
                        darkSurface
                          ? "border-stone-800 bg-stone-900 text-white"
                          : "border-stone-300 bg-white text-stone-900"
                      }`}
                    >
                      {isDermatology ? (
                        <>
                          <option>First-time Specialist Consultation</option>
                          <option>Acne, Pigmentation or Post-Acne Scars</option>
                          <option>Hair Fall / Dandruff / PRP Inquiry</option>
                          <option>Chemical Peel / Hydra-Glow / Laser</option>
                        </>
                      ) : (
                        <>
                          <option>Medium-Firm Post-Trek Recovery</option>
                          <option>Gentle Soothing Relaxation</option>
                          <option>Deep Tissue Back, Shoulders &amp; Calves</option>
                          <option>Private Couple Suite Request</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div
                    className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${
                      darkSurface
                        ? "border-stone-800 bg-stone-900"
                        : "border-stone-200 bg-white"
                    }`}
                  >
                    <span className="text-xs opacity-75">Estimated Total</span>
                    <span className={`font-serif text-xl font-bold ${theme.priceText}`}>
                      {displayTotal}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full rounded-xl px-5 py-3.5 text-sm font-semibold transition ${theme.accentBtn}`}
                  >
                    {submitting
                      ? " reserving..."
                      : isDermatology
                      ? "Confirm Clinic Appointment"
                      : "Reserve Session Now"}
                  </button>

                  {whatsappHref && (
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-xs font-bold text-emerald-600"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Or Book in 1 Tap via WhatsApp
                    </a>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews & FAQs */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-serif text-3xl font-semibold">
            Guest &amp; Patient Testimonials
          </h2>
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {business.reviews.slice(0, 3).map((rev) => (
              <div
                key={rev.author}
                className={`rounded-2xl border p-6 ${
                  darkSurface
                    ? "border-stone-800 bg-[#1d1916]"
                    : "border-stone-200 bg-white shadow-sm"
                }`}
              >
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed opacity-90">
                  &ldquo;{rev.text}&rdquo;
                </p>
                <p className="mt-4 text-sm font-bold">{rev.author}</p>
                <p className="text-xs opacity-65">{rev.roleOrSource}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {business.faqs.map((f) => (
              <div
                key={f.q}
                className={`rounded-2xl border p-5 ${
                  darkSurface
                    ? "border-stone-800 bg-[#1a1614]"
                    : "border-stone-200 bg-white"
                }`}
              >
                <h4 className="text-sm font-bold">{f.q}</h4>
                <p className="mt-2 text-xs leading-relaxed opacity-80">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer
        className={`border-t py-10 text-xs ${
          darkSurface
            ? "border-stone-800 bg-[#0d0b0a] text-stone-400"
            : "border-stone-200 bg-stone-900 text-stone-300"
        }`}
      >
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-4 sm:flex-row">
          <div>
            <p className="font-serif text-base font-bold text-white">
              {business.name}
            </p>
            <p className="mt-1">{business.fullAddress}</p>
          </div>
          <div className="sm:text-right">
            <p>
              {business.phoneDisplay} · {business.email}
            </p>
            <p className="mt-1">{business.hours}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
