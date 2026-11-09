"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Star,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Calculator,
  MessageCircle,
  Sparkles,
  Award,
} from "lucide-react";
import type { BusinessConfig } from "@/data/businesses";

export function DentalClinicSite({
  business,
  isPreview,
}: {
  business: BusinessConfig;
  isPreview: boolean;
}) {
  const isOrtho = business.template === "dental-ortho";

  const [selectedServiceId, setSelectedServiceId] = useState(
    business.services[0]?.id || ""
  );
  const [monthsOrUnits, setMonthsOrUnits] = useState(isOrtho ? 12 : 1);
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [preferredSlot, setPreferredSlot] = useState("Tomorrow · 11:30 AM");
  const [concernNote, setConcernNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedService =
    business.services.find((s) => s.id === selectedServiceId) ||
    business.services[0];

  // For Ortho: calculate comfortable initial downpayment + monthly EMI
  // For Prostho: calculate multi-unit E-Max / Implant estimate
  const downPaymentNpr = isOrtho
    ? Math.round(selectedService.priceNpr * 0.3)
    : selectedService.priceNpr * monthsOrUnits;

  const monthlyInstallmentNpr = isOrtho
    ? Math.max(
        1500,
        Math.round((selectedService.priceNpr - downPaymentNpr) / monthsOrUnits)
      )
    : 0;

  const totalEstimateNpr = isOrtho
    ? selectedService.priceNpr
    : selectedService.priceNpr * monthsOrUnits;

  const whatsappUrl = business.whatsappDigits
    ? `https://wa.me/${business.whatsappDigits}?text=${encodeURIComponent(
        `Namaste ${business.shortName}! I'd like to book an appointment.\nName: ${
          patientName || "New Patient"
        }\nTreatment: ${selectedService.name}\nPreferred Time: ${preferredSlot}`
      )}`
    : null;

  async function handleBook(e: React.FormEvent) {
    e.preventDefault();
    if (!patientName || !patientPhone) return;
    setSubmitting(true);
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_slug: business.slug,
          customer_name: patientName,
          customer_phone: patientPhone,
          service_selected: selectedService.name,
          preferred_date: preferredSlot,
          estimated_value: `NPR ${totalEstimateNpr.toLocaleString()}`,
          notes: concernNote,
          is_preview_test: isPreview,
        }),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  const accentBg = isOrtho
    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
    : "bg-[#1b3158] hover:bg-[#142544] text-amber-100";
  const accentSoft = isOrtho
    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
    : "bg-amber-50 text-[#1b3158] border-amber-300/60";
  const accentText = isOrtho ? "text-emerald-700" : "text-[#1b3158]";

  return (
    <div
      className={`min-h-screen ${
        isOrtho ? "bg-slate-50 text-slate-900" : "bg-[#fbfaf7] text-slate-900"
      }`}
    >
      {/* Top Info Strip */}
      <div
        className={`${
          isOrtho ? "bg-emerald-950 text-emerald-50" : "bg-[#0f1d36] text-amber-100"
        } px-4 py-2.5 text-xs`}
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 opacity-80" />
              {business.landmark}
            </span>
            <span className="hidden items-center gap-1.5 md:inline-flex">
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

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p className={`text-xl font-bold tracking-tight ${accentText}`}>
              {business.name}
            </p>
            <p className="text-xs text-slate-500">{business.neighborhood}, Kathmandu</p>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#treatments" className="hover:text-slate-950">
              Treatments
            </a>
            <a href="#estimator" className="hover:text-slate-950">
              {isOrtho ? "Braces & EMI Planner" : "Smile Cost Planner"}
            </a>
            <a href="#reviews" className="hover:text-slate-950">
              Patient Stories
            </a>
          </nav>
          <div className="flex items-center gap-2">
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden items-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50 px-3.5 py-2 text-xs font-semibold text-emerald-800 sm:inline-flex"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                WhatsApp
              </a>
            )}
            <a
              href="#appointment"
              className={`rounded-xl px-4 py-2.5 text-xs font-semibold transition ${accentBg}`}
            >
              Book Consultation
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-6">
          <div
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold ${accentSoft}`}
          >
            <Award className="h-3.5 w-3.5" />
            {business.heroBadge}
          </div>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-950 sm:text-5xl">
            {business.tagline}
          </h1>

          {business.leadDoctorOrFounder && (
            <p className="mt-4 text-sm font-semibold text-slate-700">
              Clinical Leadership: {business.leadDoctorOrFounder}
            </p>
          )}

          <p className="mt-3 text-base leading-relaxed text-slate-600">
            {isOrtho
              ? "From invisible 3D-mapped Clear Aligners to aesthetic ceramic & self-ligating braces—get specialist orthodontic care opposite the Japanese Embassy with stress-free monthly installments."
              : "Experience wax-mockup smile previews, metal-free E-Max porcelain veneers, and guided titanium dental implants in a calm Lazimpat superspeciality suite."}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#appointment"
              className={`inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold shadow-sm transition ${accentBg}`}
            >
              <Calendar className="h-4 w-4" />
              Schedule Clinic Visit
            </a>
            <a
              href="#estimator"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
            >
              <Calculator className="h-4 w-4" />
              {isOrtho ? "Check Monthly Braces EMI" : "Estimate Treatment Budget"}
            </a>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-4 border-t border-slate-200 pt-6 sm:grid-cols-4">
            {business.stats.map((st) => (
              <div key={st.label}>
                <p className={`text-lg font-extrabold ${accentText}`}>{st.value}</p>
                <p className="text-xs text-slate-500">{st.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
            <img
              src={business.heroImage}
              alt={business.name}
              className="h-[390px] w-full object-cover sm:h-[460px]"
            />
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 sm:px-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className={`h-6 w-6 ${accentText}`} />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    NMC Registered Specialist Care · Autoclave Sterilization
                  </p>
                  <p className="text-xs text-slate-500">{business.fullAddress}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Treatment Menu */}
      <section id="treatments" className="border-y border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-2xl">
            <p className={`text-xs font-bold uppercase tracking-widest ${accentText}`}>
              Transparent Clinical Menu
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              Specialist Dental &amp; Aesthetic Treatments
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Select any procedure below to calculate your personalized plan or book a diagnostic visit.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {business.services.map((srv) => {
              const active = srv.id === selectedService.id;
              return (
                <div
                  key={srv.id}
                  onClick={() => setSelectedServiceId(srv.id)}
                  className={`cursor-pointer rounded-2xl border p-5 transition ${
                    active
                      ? isOrtho
                        ? "border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-600/20"
                        : "border-[#1b3158] bg-slate-50 ring-2 ring-[#1b3158]/15"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                      {srv.category}
                    </span>
                    {srv.popular && (
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${accentSoft}`}
                      >
                        <Sparkles className="h-3 w-3" /> Popular
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 text-base font-bold text-slate-950">
                    {srv.name}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                    {srv.description}
                  </p>
                  <div className="mt-4 flex items-baseline justify-between border-t border-slate-100 pt-3">
                    <div>
                      <span className="text-[11px] text-slate-400">Starting from</span>
                      <p className={`text-lg font-extrabold ${accentText}`}>
                        NPR {srv.priceNpr.toLocaleString()}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-slate-500">
                      {active ? "Selected ✓" : "Select →"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Calculator + Booking Section */}
      <section id="estimator" className="py-16">
        <div
          id="appointment"
          className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-12"
        >
          {/* Left: Calculator */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <Calculator className="h-4 w-4" />
              {isOrtho
                ? "Interactive Braces & Aligner EMI Estimator"
                : "Interactive Smile Restoration Planner"}
            </div>
            <h3 className="mt-2 text-2xl font-bold text-slate-950">
              {selectedService.name}
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              {selectedService.durationOrNote}
            </p>

            <div className="mt-6">
              <label className="block text-xs font-semibold text-slate-700">
                {isOrtho
                  ? `Choose Installment Duration: ${monthsOrUnits} Months`
                  : `Number of Teeth / Restorations: ${monthsOrUnits}`}
              </label>
              <div className="mt-2 flex gap-2">
                {(isOrtho ? [6, 12, 15, 18] : [1, 2, 4, 6]).map((val) => (
                  <button
                    type="button"
                    key={val}
                    onClick={() => setMonthsOrUnits(val)}
                    className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition ${
                      monthsOrUnits === val
                        ? accentBg
                        : "border border-slate-200 bg-slate-50 text-slate-700"
                    }`}
                  >
                    {isOrtho ? `${val} mo` : `${val} ${val === 1 ? "tooth" : "teeth"}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-3 rounded-2xl bg-slate-50 p-5">
              {isOrtho ? (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Complete Package Estimate</span>
                    <span className="font-bold text-slate-900">
                      NPR {totalEstimateNpr.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Initial Start (~30%)</span>
                    <span className="font-semibold text-slate-800">
                      NPR {downPaymentNpr.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between border-t border-slate-200 pt-3">
                    <span className="text-xs font-bold uppercase text-slate-500">
                      Monthly Visit Installment
                    </span>
                    <span className={`text-2xl font-extrabold ${accentText}`}>
                      NPR {monthlyInstallmentNpr.toLocaleString()}/mo
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Per Unit Clinical Fee</span>
                    <span className="font-semibold text-slate-900">
                      NPR {selectedService.priceNpr.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Diagnostic Wax Mockup</span>
                    <span className="font-semibold text-emerald-700">
                      Included with Rehab Plan
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between border-t border-slate-200 pt-3">
                    <span className="text-xs font-bold uppercase text-slate-500">
                      Tentative Treatment Budget
                    </span>
                    <span className={`text-2xl font-extrabold ${accentText}`}>
                      NPR {totalEstimateNpr.toLocaleString()}
                    </span>
                  </div>
                </>
              )}
            </div>

            <p className="mt-4 text-[11px] leading-relaxed text-slate-500">
              * Exact clinical plan is confirmed after an in-person exam &amp; digital X-ray in our Lazimpat clinic.
            </p>
          </div>

          {/* Right: Appointment Form */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-7">
            <h3 className="text-2xl font-bold text-slate-950">
              Book Your Specialist Appointment in Lazimpat
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Lock in your preferred slot—our reception confirms within 30 minutes during clinic hours.
            </p>

            {submitted ? (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 text-center">
                <CheckCircle2 className="mx-auto h-11 w-11 text-emerald-600" />
                <h4 className="mt-3 text-xl font-bold text-slate-900">
                  Appointment Request Received, {patientName}!
                </h4>
                <p className="mt-1.5 text-sm text-slate-600">
                  Selected: <strong>{selectedService.name}</strong> ({preferredSlot}).
                  Want instant WhatsApp or phone confirmation right now?
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Send on WhatsApp Now
                    </a>
                  )}
                  <a
                    href={`tel:${business.phoneTel}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs font-bold text-slate-800"
                  >
                    <Phone className="h-4 w-4" />
                    Call {business.phoneDisplay}
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBook} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">
                      Patient Full Name *
                    </label>
                    <input
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="Your Full Name"
                      className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-slate-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      required
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      placeholder="98XXXXXXXX"
                      className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-slate-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">
                      Selected Treatment
                    </label>
                    <select
                      value={selectedService.id}
                      onChange={(e) => setSelectedServiceId(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:border-slate-900 focus:outline-none"
                    >
                      {business.services.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} (NPR {s.priceNpr.toLocaleString()})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">
                      Preferred Day &amp; Time
                    </label>
                    <input
                      value={preferredSlot}
                      onChange={(e) => setPreferredSlot(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-slate-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Optional Note (e.g. Tooth pain, NRN travel dates, Braces question)
                  </label>
                  <input
                    value={concernNote}
                    onChange={(e) => setConcernNote(e.target.value)}
                    placeholder="Tell our doctor anything helpful before your visit..."
                    className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-slate-900 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`flex-1 rounded-xl px-6 py-3.5 text-sm font-bold transition ${accentBg}`}
                  >
                    {submitting ? "Booking Slot..." : "Confirm Appointment Slot"}
                  </button>
                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-5 py-3.5 text-sm font-bold text-emerald-800 hover:bg-emerald-100"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Book via WhatsApp
                    </a>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Highlights + Reviews */}
      <section id="reviews" className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {business.highlights.map((h) => (
              <div
                key={h.title}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6"
              >
                <h3 className="text-lg font-bold text-slate-950">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {h.description}
                </p>
              </div>
            ))}
          </div>

          <h2 className="mt-14 text-2xl font-bold text-slate-950 sm:text-3xl">
            Verified Patient Experiences
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {business.reviews.map((rev) => (
              <div
                key={rev.author}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  &ldquo;{rev.text}&rdquo;
                </p>
                <p className="mt-4 text-sm font-bold text-slate-900">{rev.author}</p>
                <p className="text-xs text-slate-500">{rev.roleOrSource}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {business.faqs.map((f) => (
              <div
                key={f.q}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <h4 className="text-sm font-bold text-slate-900">{f.q}</h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-950 py-10 text-xs text-slate-400">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-base font-bold text-white">{business.name}</p>
            <p className="mt-1">{business.fullAddress}</p>
          </div>
          <div className="sm:text-right">
            <p>
              Reception: {business.phoneDisplay} · {business.email}
            </p>
            <p className="mt-1">{business.hours}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
