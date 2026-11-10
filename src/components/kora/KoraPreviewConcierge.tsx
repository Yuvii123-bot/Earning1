"use client";

import React, { useEffect, useState } from "react";
import {
  Sparkles,
  Check,
  X,
  Mail,
  ShieldCheck,
  Globe,
  MessageCircle,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import type { KoraBusinessConfig } from "@/data/kora-businesses";

const CONCIERGE_WHATSAPP = "9779847509025";
const CONCIERGE_PHONE_DISPLAY = "+977 9847509025";
const CONCIERGE_EMAIL = "imyuvojha@gmail.com";

export function KoraPreviewConcierge({
  business,
  isPreview,
  isFounder = false,
}: {
  business: KoraBusinessConfig;
  isPreview: boolean;
  isFounder?: boolean;
}) {
  const [dismissed, setDismissed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (isFounder) return;
    const key = `kora_tracked_${business.slug}_${isPreview ? "p" : "d"}`;
    if (typeof window !== "undefined" && !sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, "1");
      fetch("/api/track-view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_slug: business.slug,
          source: isPreview ? "email_preview" : "direct",
        }),
      }).catch(() => {});
    }
  }, [business.slug, isPreview, isFounder]);

  if (!isPreview || dismissed) return null;

  const whatsappHref = `https://wa.me/${CONCIERGE_WHATSAPP}?text=${encodeURIComponent(
    `Hello Atelier Kora (Yuvraj) — We just reviewed the custom flagship preview built for ${business.name} (${business.neighborhood}) and would like to discuss deploying it on our official domain.`
  )}`;

  const mailtoHref = `mailto:${CONCIERGE_EMAIL}?subject=${encodeURIComponent(
    `Domain Launch — ${business.name} (Atelier Kora Preview)`
  )}&body=${encodeURIComponent(
    `Hello Yuvraj / Atelier Kora,\n\nWe reviewed the custom digital flagship built for ${business.name} and would like to discuss connecting it to our official domain.\n\nWarm regards,\n${business.name}`
  )}`;

  return (
    <>
      <div className="fixed bottom-4 left-3 right-3 z-50 mx-auto max-w-3xl">
        <div className="flex flex-col gap-3 rounded-2xl border border-amber-200/20 bg-stone-950/95 p-3.5 text-stone-100 shadow-[0_24px_60px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex items-start gap-3.5 sm:items-center">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-300/30 bg-amber-400/10 font-display text-sm font-semibold tracking-widest text-amber-300">
              AK
            </div>
            <div className="text-xs leading-snug sm:text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300/90">
                  Atelier Kora · Private Preview
                </span>
                <span className="hidden text-stone-600 sm:inline">•</span>
                <span className="font-medium text-white">{business.shortName}</span>
              </div>
              <p className="mt-0.5 text-xs text-stone-400">
                Test the interactive configurator above · Ready for your official domain in 24h
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-stone-700 bg-stone-900 px-3.5 py-2 text-xs font-medium text-stone-200 transition hover:border-amber-300/40 hover:text-white"
            >
              <MessageCircle className="h-3.5 w-3.5 text-amber-300" />
              WhatsApp
            </a>
            <button
              onClick={() => setDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 px-4 py-2 text-xs font-semibold text-stone-950 transition hover:brightness-105"
            >
              Activate on Our Domain
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Minimize preview bar"
              className="rounded-lg p-1.5 text-stone-500 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md">
          <div className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-stone-800 bg-stone-950 p-6 text-stone-100 shadow-2xl sm:p-8">
            <button
              onClick={() => setDrawerOpen(false)}
              className="absolute right-5 top-5 rounded-full p-2 text-stone-400 transition hover:bg-stone-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-amber-400/10 px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-amber-300">
              <Sparkles className="h-3.5 w-3.5" />
              Atelier Kora · Bespoke Handover
            </div>

            <h3 className="mt-3.5 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Deploy this flagship onto {business.shortName}&apos;s official domain
            </h3>

            <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-400/[0.04] p-4 text-xs leading-relaxed text-stone-300">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-300">
                Why We Engineered This Commission
              </p>
              <p className="mt-1 text-stone-300">{business.currentWebsiteFlaw}</p>
            </div>

            <div className="mt-5 space-y-2.5 rounded-2xl border border-stone-800/90 bg-stone-900/60 p-4 text-xs sm:text-sm">
              {[
                "Connected directly to your official .com or .com.np domain with full SSL/HTTPS",
                "Tailored with your exact photography, rates, team credentials & brand palette",
                "Interactive calculator + direct WhatsApp & inbox lead capture included",
                "Sub-second global CDN edge speed (for both Nepal 4G & overseas clients)",
                "Zero upfront risk — settle via Bank Transfer, Fonepay or eSewa only after launch",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber-300/15 text-amber-300">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-stone-200">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between rounded-2xl border border-stone-800 bg-stone-900 px-5 py-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300">
                  Turnkey Flagship Handover
                </p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-white">
                  NPR {business.pitchPriceNpr.toLocaleString()}{" "}
                  <span className="text-xs font-normal text-stone-400">
                    one-time · optional NPR {business.monthlyCareNpr.toLocaleString()}/mo priority care
                  </span>
                </p>
              </div>
              <ShieldCheck className="h-8 w-8 shrink-0 text-amber-300" />
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 px-5 py-3.5 text-sm font-semibold text-stone-950 transition hover:brightness-105"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Concierge ({CONCIERGE_PHONE_DISPLAY})
              </a>
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={`tel:+${CONCIERGE_WHATSAPP}`}
                  className="flex items-center justify-center gap-2 rounded-xl border border-stone-700 bg-stone-900 px-4 py-2.5 text-xs font-medium text-stone-200 hover:bg-stone-800"
                >
                  <Phone className="h-3.5 w-3.5 text-amber-300" />
                  Call {CONCIERGE_PHONE_DISPLAY}
                </a>
                <a
                  href={mailtoHref}
                  className="flex items-center justify-center gap-2 rounded-xl border border-stone-700 bg-stone-900 px-4 py-2.5 text-xs font-medium text-stone-200 hover:bg-stone-800"
                >
                  <Mail className="h-3.5 w-3.5 text-amber-300" />
                  Confirm via Email
                </a>
              </div>
            </div>

            <p className="mt-4 text-center font-mono text-[11px] text-stone-500">
              <Globe className="mr-1 inline h-3 w-3" />
              Atelier Kora · Digital Architecture Studio · Kathmandu, Nepal
            </p>
          </div>
        </div>
      )}
    </>
  );
}
