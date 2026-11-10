"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  ShieldCheck,
  Camera,
  Car,
  Mountain,
  Star,
  MessageCircle,
  CheckCircle2,
  Users,
  Sun,
} from "lucide-react";
import type { BusinessConfig } from "@/data/businesses";

export function ParaglidingSite({
  business,
  isPreview,
}: {
  business: BusinessConfig;
  isPreview: boolean;
}) {
  const [currency, setCurrency] = useState<"USD" | "NPR">("USD");
  const [selectedFlightId, setSelectedFlightId] = useState(
    business.services[0]?.id || ""
  );
  const [flyerCount, setFlyerCount] = useState(2);
  const [includeAcro, setIncludeAcro] = useState(false);
  const [flightSlot, setFlightSlot] = useState("09:00 AM · Crystal Sunrise");
  const [hotelName, setHotelName] = useState("");
  const [flyerName, setFlyerName] = useState("");
  const [flyerPhone, setFlyerPhone] = useState("");
  const [flightDate, setFlightDate] = useState("Tomorrow Morning");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const flightsOnly = business.services.filter((s) => s.category === "Tandem Flights");
  const acroAddon = business.services.find((s) => s.id === "acro-thrill-upgrade");
  const selectedFlight =
    flightsOnly.find((f) => f.id === selectedFlightId) || flightsOnly[0];

  const unitPrice =
    currency === "USD"
      ? (selectedFlight.priceUsd || 75) + (includeAcro ? acroAddon?.priceUsd || 15 : 0)
      : selectedFlight.priceNpr + (includeAcro ? acroAddon?.priceNpr || 2000 : 0);

  const groupDiscountMultiplier = flyerCount >= 4 ? 0.92 : 1;
  const totalFare = Math.round(unitPrice * flyerCount * groupDiscountMultiplier);
  const formattedTotal =
    currency === "USD" ? `$${totalFare} USD` : `NPR ${totalFare.toLocaleString()}`;

  const whatsappHref = business.whatsappDigits
    ? `https://wa.me/${business.whatsappDigits}?text=${encodeURIComponent(
        `Hi Advance Paragliding Pokhara! 🪂\nI want to book a tandem flight:\n• Package: ${
          selectedFlight.name
        }${includeAcro ? " + Acro Finish" : ""}\n• Flyers: ${flyerCount}\n• Date & Slot: ${flightDate} (${flightSlot})\n• Lakeside Hotel Pickup: ${
          hotelName || "TBA"
        }\n• Estimated Total: ${formattedTotal}`
      )}`
    : "#";

  async function handleBookFlight(e: React.FormEvent) {
    e.preventDefault();
    if (!flyerName || !flyerPhone) return;
    setSubmitting(true);
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_slug: business.slug,
          customer_name: flyerName,
          customer_phone: flyerPhone,
          service_selected: `${selectedFlight.name} (${flyerCount} Flyers, ${flightSlot})`,
          preferred_date: flightDate,
          estimated_value: formattedTotal,
          notes: `Lakeside Pickup Hotel: ${hotelName || "Not specified"}`,
          is_preview_test: isPreview,
        }),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-sky-400/15 bg-slate-950/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500 text-slate-950">
              <Mountain className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-extrabold tracking-tight text-white">
                ADVANCE PARAGLIDING
              </p>
              <p className="text-[11px] font-medium text-sky-400">
                &ldquo;We Fly, We Care&rdquo; · Lakeside St. 7, Pokhara
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Currency Switcher */}
            <div className="flex rounded-xl border border-slate-800 bg-slate-900 p-1 text-xs font-bold">
              <button
                onClick={() => setCurrency("USD")}
                className={`rounded-lg px-2.5 py-1 transition ${
                  currency === "USD" ? "bg-sky-500 text-slate-950" : "text-slate-400"
                }`}
              >
                USD $
              </button>
              <button
                onClick={() => setCurrency("NPR")}
                className={`rounded-lg px-2.5 py-1 transition ${
                  currency === "NPR" ? "bg-sky-500 text-slate-950" : "text-slate-400"
                }`}
              >
                NPR रु
              </button>
            </div>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400 px-4 py-2.5 text-xs font-extrabold text-slate-950 transition hover:bg-amber-300"
            >
              <MessageCircle className="h-4 w-4" />
              Book Flight
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-12 lg:py-16">
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1.5 text-xs font-semibold text-sky-300">
              <ShieldCheck className="h-3.5 w-3.5" />
              {business.heroBadge}
            </span>
            <h1 className="mt-5 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Fly Eye-Level With{" "}
              <span className="bg-gradient-to-r from-sky-400 to-amber-300 bg-clip-text text-transparent">
                Fishtail &amp; Annapurna
              </span>{" "}
              Over Phewa Lake.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Launch from 1,592m Sarangkot with veteran CAAN-licensed tandem pilots. Free 4x4 hotel pickup from Lakeside, full flight insurance, and GoPro HD video &amp; photos transferred straight to your phone on landing.
            </p>

            <div className="mt-7 grid grid-cols-3 gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-xs">
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 shrink-0 text-sky-400" />
                <span>Free Lakeside Hotel Pickup</span>
              </div>
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4 shrink-0 text-amber-400" />
                <span>GoPro Video Included</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>Full Pilot Insurance</span>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#book-flight"
                className="rounded-xl bg-sky-500 px-6 py-3.5 text-sm font-extrabold text-slate-950 transition hover:bg-sky-400"
              >
                Calculate Fare &amp; Lock Slot →
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-5 py-3.5 text-sm font-bold text-emerald-300 hover:bg-emerald-500/20"
              >
                <MessageCircle className="h-4 w-4" />
                Instant WhatsApp ({business.phoneDisplay})
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-3xl border border-sky-400/20 shadow-2xl shadow-sky-500/10">
              <img
                src={business.heroImage}
                alt="Sarangkot Tandem Paragliding Over Phewa Lake Pokhara"
                className="h-[400px] w-full object-cover sm:h-[470px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Flight Packages + Interactive Fare Calculator */}
      <section id="book-flight" className="border-t border-slate-800 bg-slate-900/60 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-6">
            <p className="text-xs font-bold uppercase tracking-widest text-sky-400">
              Step 1 · Choose Your Sarangkot Flight
            </p>
            <h2 className="text-3xl font-extrabold">
              All-Inclusive Tandem Packages
            </h2>

            {flightsOnly.map((fl) => {
              const active = fl.id === selectedFlight.id;
              const priceLabel =
                currency === "USD"
                  ? `$${fl.priceUsd}`
                  : `NPR ${fl.priceNpr.toLocaleString()}`;
              return (
                <div
                  key={fl.id}
                  onClick={() => setSelectedFlightId(fl.id)}
                  className={`cursor-pointer rounded-2xl border p-5 transition ${
                    active
                      ? "border-sky-400 bg-sky-500/10"
                      : "border-slate-800 bg-slate-900 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{fl.name}</h3>
                      <p className="mt-1 text-xs font-medium text-sky-300">
                        {fl.durationOrNote}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-amber-300">{priceLabel}</p>
                      <span className="text-[11px] text-slate-400">per flyer</span>
                    </div>
                  </div>
                  <p className="mt-2.5 text-sm text-slate-300">{fl.description}</p>
                </div>
              );
            })}

            {acroAddon && (
              <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-amber-400/25 bg-amber-400/5 p-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={includeAcro}
                    onChange={(e) => setIncludeAcro(e.target.checked)}
                    className="h-4 w-4 accent-amber-400"
                  />
                  <div>
                    <p className="text-sm font-bold text-amber-200">
                      {acroAddon.name}
                    </p>
                    <p className="text-xs text-slate-400">{acroAddon.description}</p>
                  </div>
                </div>
                <span className="text-sm font-extrabold text-amber-300">
                  +{currency === "USD" ? `$${acroAddon.priceUsd}` : `Rs.${acroAddon.priceNpr}`}
                </span>
              </label>
            )}
          </div>

          {/* Right: Booking Card */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-2xl sm:p-8">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Step 2 · Instant Flight Slot Reservation
                </span>
                {flyerCount >= 4 && (
                  <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300">
                    8% Group Discount Applied!
                  </span>
                )}
              </div>

              {submitted ? (
                <div className="py-8 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
                  <h3 className="mt-3 text-2xl font-extrabold">
                    Flight Slot Hold Created for {flyerName}!
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">
                    {flyerCount} Flyer(s) · {flightDate} ({flightSlot}) · Total:{" "}
                    <strong className="text-amber-300">{formattedTotal}</strong>.
                    Tap below to confirm pickup time directly on WhatsApp:
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-extrabold text-slate-950"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Send Pickup Details on WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBookFlight} className="mt-5 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300">
                      Number of Flyers ({flyerCount}) ·{" "}
                      <span className="text-sky-400">4+ flyers unlock 8% group savings</span>
                    </label>
                    <div className="mt-2 flex gap-2">
                      {[1, 2, 3, 4, 6].map((n) => (
                        <button
                          type="button"
                          key={n}
                          onClick={() => setFlyerCount(n)}
                          className={`flex-1 rounded-xl py-2.5 text-xs font-extrabold transition ${
                            flyerCount === n
                              ? "bg-sky-500 text-slate-950"
                              : "border border-slate-800 bg-slate-900 text-slate-300"
                          }`}
                        >
                          {n} {n === 1 ? "Flyer" : "Flyers"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300">
                      Takeoff Thermal Window
                    </label>
                    <div className="mt-2 grid gap-2 sm:grid-cols-3">
                      {[
                        "09:00 AM · Crystal Sunrise",
                        "11:30 AM · High Thermal",
                        "02:00 PM · Golden Lake",
                      ].map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setFlightSlot(slot)}
                          className={`rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition ${
                            flightSlot === slot
                              ? "border-amber-400 bg-amber-400/15 text-amber-200"
                              : "border-slate-800 bg-slate-900 text-slate-400"
                          }`}
                        >
                          <Sun className="mb-1 h-3.5 w-3.5 text-amber-400" />
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      required
                      value={flyerName}
                      onChange={(e) => setFlyerName(e.target.value)}
                      placeholder="Lead Traveller Name *"
                      className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none"
                    />
                    <input
                      required
                      value={flyerPhone}
                      onChange={(e) => setFlyerPhone(e.target.value)}
                      placeholder="WhatsApp / Phone (+Code) *"
                      className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none"
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      value={flightDate}
                      onChange={(e) => setFlightDate(e.target.value)}
                      placeholder="Flight Date (e.g. Nov 12)"
                      className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none"
                    />
                    <input
                      value={hotelName}
                      onChange={(e) => setHotelName(e.target.value)}
                      placeholder="Lakeside Hotel Name (Free Pickup)"
                      className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-sky-500/25 bg-sky-500/10 px-4 py-3.5">
                    <div>
                      <p className="text-xs text-sky-200">
                        All-Inclusive Total ({flyerCount} Flyer{flyerCount > 1 ? "s" : ""})
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Includes Pickup + Insurance + GoPro Video · Pay on Flight Day
                      </p>
                    </div>
                    <p className="text-2xl font-black text-amber-300">{formattedTotal}</p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3.5 text-sm font-extrabold text-slate-950 hover:bg-amber-300"
                    >
                      <Users className="h-4 w-4" />
                      {submitting ? "Reserving..." : "Reserve Flight Slot"}
                    </button>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-500/15 px-5 py-3.5 text-sm font-bold text-emerald-300 hover:bg-emerald-500/25"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp Instant
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews & FAQs */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {business.reviews.map((r) => (
              <div
                key={r.author}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"
              >
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="mt-3 text-sm text-slate-200">&ldquo;{r.text}&rdquo;</p>
                <p className="mt-4 text-sm font-bold text-white">{r.author}</p>
                <p className="text-xs text-slate-400">{r.roleOrSource}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {business.faqs.map((f) => (
              <div
                key={f.q}
                className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5"
              >
                <h4 className="text-sm font-bold text-sky-300">{f.q}</h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-slate-950 py-10 text-xs text-slate-400">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-4 sm:flex-row">
          <div>
            <p className="text-sm font-bold text-white">{business.name}</p>
            <p className="mt-1">
              <MapPin className="mr-1 inline h-3.5 w-3.5 text-sky-400" />
              {business.fullAddress}
            </p>
          </div>
          <div className="sm:text-right">
            <p>
              <Phone className="mr-1 inline h-3.5 w-3.5 text-sky-400" />
              {business.phoneDisplay} · {business.email}
            </p>
            <p className="mt-1">{business.hours}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
