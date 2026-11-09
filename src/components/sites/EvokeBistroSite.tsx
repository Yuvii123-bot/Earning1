"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Star,
  Utensils,
  Sparkles,
  Calendar,
  Users,
  CheckCircle2,
  Wine,
  Coffee,
  ChevronRight,
} from "lucide-react";
import type { BusinessConfig } from "@/data/businesses";

export function EvokeBistroSite({
  business,
  isPreview,
}: {
  business: BusinessConfig;
  isPreview: boolean;
}) {
  const categories = Array.from(new Set(business.services.map((s) => s.category)));
  const [activeCat, setActiveCat] = useState<string>("All");
  const [selectedDishes, setSelectedDishes] = useState<string[]>([
    business.services[0]?.id || "",
  ]);

  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [partySize, setPartySize] = useState(4);
  const [seatingZone, setSeatingZone] = useState("String-Lit Garden Courtyard");
  const [dateTime, setDateTime] = useState("Friday · 7:00 PM");
  const [occasion, setOccasion] = useState("Evening Dinner & Cocktails");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const visibleMenu =
    activeCat === "All"
      ? business.services
      : business.services.filter((s) => s.category === activeCat);

  const toggleDish = (id: string) => {
    setSelectedDishes((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const preselectedItems = business.services.filter((s) =>
    selectedDishes.includes(s.id)
  );
  const estimatedTableSpend =
    preselectedItems.reduce((acc, item) => acc + item.priceNpr, 0) ||
    partySize * 1250;

  async function handleReserve(e: React.FormEvent) {
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
          service_selected: `${seatingZone} (${partySize} Guests) — ${occasion}`,
          preferred_date: dateTime,
          estimated_value: `~NPR ${estimatedTableSpend.toLocaleString()}`,
          notes: preselectedItems.map((i) => i.name).join(", "),
          is_preview_test: isPreview,
        }),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#120f0d] text-[#f6efe6] selection:bg-amber-500/30">
      {/* Top Bar */}
      <div className="border-b border-amber-200/10 bg-[#0d0a09] px-4 py-2.5 text-xs text-amber-200/80">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-amber-400" />
              {business.neighborhood}
            </span>
            <span className="hidden items-center gap-1.5 sm:inline-flex">
              <Clock className="h-3.5 w-3.5 text-amber-400" />
              {business.hours}
            </span>
          </div>
          <a
            href={`tel:${business.phoneTel}`}
            className="inline-flex items-center gap-1.5 font-medium text-amber-300 hover:text-amber-200"
          >
            <Phone className="h-3.5 w-3.5" />
            Reservations: {business.phoneDisplay}
          </a>
        </div>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-amber-200/10 bg-[#120f0d]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <span className="font-serif text-2xl font-bold tracking-[0.22em] text-amber-100">
              EVOKE
            </span>
            <span className="ml-2.5 hidden text-xs uppercase tracking-[0.2em] text-amber-400/80 sm:inline">
              Cafe &amp; Bistro · Jhamsikhel
            </span>
          </div>
          <nav className="hidden items-center gap-7 text-sm text-stone-300 md:flex">
            <a href="#menu" className="hover:text-amber-300">
              Kitchen &amp; Bar
            </a>
            <a href="#courtyard" className="hover:text-amber-300">
              The Courtyard
            </a>
            <a href="#reviews" className="hover:text-amber-300">
              774+ Reviews
            </a>
            <a href="#reserve" className="hover:text-amber-300">
              Private Events
            </a>
          </nav>
          <a
            href="#reserve"
            className="rounded-full bg-amber-500 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-950 transition hover:bg-amber-400"
          >
            Reserve a Table
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-medium text-amber-300">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              {business.heroBadge}
            </div>
            <h1 className="mt-5 font-serif text-4xl font-semibold leading-[1.12] tracking-tight text-amber-50 sm:text-5xl lg:text-6xl">
              Jhamsikhel&apos;s Warmest Courtyard for Coffee, Wood-Fired Fare &amp; Late Cocktails.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-stone-300 sm:text-lg">
              From sun-drenched Nuwakot pour-overs and remote-work mornings to string-lit sourdough pizzas and timur-spiced craft cocktails after dusk.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#reserve"
                className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-7 py-3.5 text-sm font-semibold text-stone-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400"
              >
                Book Courtyard or Lounge Table
                <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href="#menu"
                className="inline-flex items-center gap-2 rounded-full border border-amber-200/25 bg-white/5 px-6 py-3.5 text-sm font-medium text-amber-100 transition hover:bg-white/10"
              >
                <Utensils className="h-4 w-4 text-amber-400" />
                Explore Menu &amp; Prices
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-amber-200/10 pt-7 sm:grid-cols-4">
              {business.stats.map((st) => (
                <div key={st.label}>
                  <p className="font-serif text-2xl font-bold text-amber-300">
                    {st.value}
                  </p>
                  <p className="text-xs text-stone-400">{st.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-6">
            <div className="overflow-hidden rounded-3xl border border-amber-200/15 shadow-2xl">
              <img
                src={business.heroImage}
                alt="EVOKE Cafe & Bistro Jhamsikhel Courtyard"
                className="h-[420px] w-full object-cover sm:h-[500px]"
              />
            </div>
            <div className="mt-4 flex items-center justify-between rounded-2xl border border-amber-400/20 bg-[#1c1714] p-4 sm:-mt-12 sm:mx-6 sm:relative sm:shadow-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400">
                  <Wine className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-amber-50">
                    Tonight in Jhamsikhel
                  </p>
                  <p className="text-xs text-stone-400">
                    Garden Courtyard &amp; Terrace Tables Open · Wood Oven Live from 12 PM
                  </p>
                </div>
              </div>
              <a
                href={`tel:${business.phoneTel}`}
                className="shrink-0 rounded-xl border border-amber-400/30 px-3.5 py-2 text-xs font-semibold text-amber-300 hover:bg-amber-400/10"
              >
                Call Desk
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Menu */}
      <section id="menu" className="border-t border-amber-200/10 bg-[#171310] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                Artisanal Kitchen · Roastery · Bar
              </p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-amber-50 sm:text-4xl">
                Curated Menu &amp; Table Pre-Selection
              </h2>
            </div>
            <p className="text-sm text-stone-400">
              Tap dishes to attach favourites to your table reservation
            </p>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {["All", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  activeCat === cat
                    ? "bg-amber-500 text-stone-950"
                    : "border border-amber-200/15 bg-[#211b17] text-stone-300 hover:border-amber-400/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {visibleMenu.map((item) => {
              const chosen = selectedDishes.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleDish(item.id)}
                  className={`cursor-pointer rounded-2xl border p-5 transition ${
                    chosen
                      ? "border-amber-400 bg-amber-500/10"
                      : "border-amber-200/10 bg-[#1d1815] hover:border-amber-200/25"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] uppercase tracking-wider text-amber-400">
                          {item.category}
                        </span>
                        {item.popular && (
                          <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                            Guest Favourite
                          </span>
                        )}
                      </div>
                      <h3 className="mt-1 font-serif text-lg font-semibold text-amber-50">
                        {item.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="font-serif text-lg font-bold text-amber-300">
                        Rs. {item.priceNpr.toLocaleString()}
                      </p>
                      <span className="text-[11px] text-stone-400">
                        {chosen ? "✓ Added to table" : "+ Add to table"}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-stone-300">{item.description}</p>
                  <p className="mt-2 text-xs text-stone-400">{item.durationOrNote}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Courtyard Highlights */}
      <section id="courtyard" className="border-t border-amber-200/10 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {business.highlights.map((h, i) => (
              <div
                key={h.title}
                className="rounded-3xl border border-amber-200/10 bg-[#191512] p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400">
                  {i === 0 ? (
                    <Coffee className="h-5 w-5" />
                  ) : i === 1 ? (
                    <Calendar className="h-5 w-5" />
                  ) : (
                    <Sparkles className="h-5 w-5" />
                  )}
                </div>
                <h3 className="mt-4 font-serif text-xl font-semibold text-amber-50">
                  {h.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-300">
                  {h.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Table & Private Event Reservation */}
      <section
        id="reserve"
        className="border-t border-amber-200/10 bg-gradient-to-b from-[#1a1410] to-[#120f0d] py-16"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
              Instant Table &amp; Event Desk
            </span>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-amber-50 sm:text-4xl">
              Reserve Your Courtyard Table or Group Gathering
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-300">
              Skip busy phone lines on Friday &amp; weekend evenings. Pick your preferred zone in Jhamsikhel and our host desk holds your table for 20 minutes past arrival time.
            </p>

            <div className="mt-6 rounded-2xl border border-amber-400/20 bg-[#211a15] p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-300">Selected Zone</span>
                <span className="font-semibold text-amber-200">{seatingZone}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-stone-300">Party Size</span>
                <span className="font-semibold text-amber-200">{partySize} Guests</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-stone-300">Pre-Selected Dishes</span>
                <span className="font-semibold text-amber-300">
                  {preselectedItems.length} item(s)
                </span>
              </div>
              <div className="mt-4 border-t border-amber-200/10 pt-3 flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-stone-400">
                  Estimated Table Spend
                </span>
                <span className="font-serif text-xl font-bold text-amber-300">
                  ~NPR {estimatedTableSpend.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-2 text-xs text-stone-400">
              <p>📍 {business.fullAddress}</p>
              <p>📞 Direct Host Line: {business.phoneDisplay}</p>
              <p>✉️ Events &amp; Enquiries: {business.email}</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-amber-200/15 bg-[#1b1613] p-6 shadow-2xl sm:p-8">
              {submitted ? (
                <div className="py-8 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
                  <h3 className="mt-4 font-serif text-2xl font-semibold text-amber-50">
                    Table Request Logged for {guestName}!
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-stone-300">
                    We&apos;ve registered your request for{" "}
                    <strong>{partySize} guests</strong> in the{" "}
                    <strong>{seatingZone}</strong> ({dateTime}). Need immediate confirmation? Call our Jhamsikhel host desk directly:
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <a
                      href={`tel:${business.phoneTel}`}
                      className="rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-stone-950"
                    >
                      Call {business.phoneDisplay}
                    </a>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="rounded-full border border-stone-700 px-5 py-3 text-sm text-stone-300"
                    >
                      Modify Reservation
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleReserve} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-stone-300">
                        Your Name *
                      </label>
                      <input
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="e.g. Aarav Shrestha"
                        className="mt-1.5 w-full rounded-xl border border-amber-200/15 bg-[#120f0d] px-4 py-3 text-sm text-white placeholder-stone-500 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-300">
                        Mobile / WhatsApp Number *
                      </label>
                      <input
                        required
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        placeholder="98XXXXXXXX"
                        className="mt-1.5 w-full rounded-xl border border-amber-200/15 bg-[#120f0d] px-4 py-3 text-sm text-white placeholder-stone-500 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-stone-300">
                        Number of Guests ({partySize})
                      </label>
                      <div className="mt-1.5 flex items-center gap-2">
                        {[2, 4, 6, 10, 20].map((num) => (
                          <button
                            type="button"
                            key={num}
                            onClick={() => setPartySize(num)}
                            className={`flex-1 rounded-xl py-2.5 text-xs font-semibold transition ${
                              partySize === num
                                ? "bg-amber-500 text-stone-950"
                                : "border border-amber-200/15 bg-[#120f0d] text-stone-300"
                            }`}
                          >
                            {num === 20 ? "20+" : num}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-300">
                        Preferred Day &amp; Time
                      </label>
                      <input
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-amber-200/15 bg-[#120f0d] px-4 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-stone-300">
                        Preferred Seating Zone
                      </label>
                      <select
                        value={seatingZone}
                        onChange={(e) => setSeatingZone(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-amber-200/15 bg-[#120f0d] px-4 py-3 text-sm text-white focus:border-amber-400 focus:outline-none"
                      >
                        <option>String-Lit Garden Courtyard</option>
                        <option>Covered Brick Terrace</option>
                        <option>Indoor Lounge &amp; Bar</option>
                        <option>Private Celebration Deck (15+ Guests)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-300">
                        Occasion
                      </label>
                      <select
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-amber-200/15 bg-[#120f0d] px-4 py-3 text-sm text-white focus:border-amber-400 focus:outline-none"
                      >
                        <option>Evening Dinner &amp; Cocktails</option>
                        <option>Specialty Coffee &amp; Brunch</option>
                        <option>Birthday / Anniversary Table</option>
                        <option>Corporate Mixer / Private Event</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-semibold text-stone-950 transition hover:bg-amber-400 disabled:opacity-60"
                  >
                    <Users className="h-4 w-4" />
                    {submitting
                      ? "Confirming Table..."
                      : `Request Table for ${partySize} Guests at EVOKE`}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews & FAQ */}
      <section id="reviews" className="border-t border-amber-200/10 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-serif text-3xl font-semibold text-amber-50">
            Loved by 774+ Guests Across Kathmandu Valley
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {business.reviews.map((rev) => (
              <div
                key={rev.author}
                className="rounded-2xl border border-amber-200/10 bg-[#1a1512] p-6"
              >
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-stone-200">
                  &ldquo;{rev.text}&rdquo;
                </p>
                <div className="mt-4 border-t border-amber-200/10 pt-3">
                  <p className="text-sm font-semibold text-amber-100">
                    {rev.author}
                  </p>
                  <p className="text-xs text-stone-400">{rev.roleOrSource}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {business.faqs.map((f) => (
              <div
                key={f.q}
                className="rounded-2xl border border-amber-200/10 bg-[#171210] p-5"
              >
                <h4 className="font-serif text-base font-semibold text-amber-200">
                  {f.q}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-stone-300">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-amber-200/10 bg-[#0c0908] py-10 text-xs text-stone-400">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-4 sm:flex-row sm:items-center">
          <div>
            <p className="font-serif text-base font-bold tracking-widest text-amber-100">
              EVOKE CAFE &amp; BISTRO
            </p>
            <p className="mt-1">{business.fullAddress}</p>
          </div>
          <div className="text-left sm:text-right">
            <p>Reservations: {business.phoneDisplay} · {business.email}</p>
            <p className="mt-1">{business.hours}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
