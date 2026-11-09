"use client";

import React, { useEffect, useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  X,
  Mail,
  ShieldCheck,
  Globe,
  MessageCircle,
  Phone,
} from "lucide-react";
import type { BusinessConfig } from "@/data/businesses";

const FOUNDER_WHATSAPP = "9779847509025";
const FOUNDER_PHONE_DISPLAY = "+977 9847509025";
const FOUNDER_EMAIL = "imyuvojha@gmail.com";

export function PreviewClaimBanner({
  business,
  isPreview,
  isFounder = false,
}: {
  business: BusinessConfig;
  isPreview: boolean;
  isFounder?: boolean;
}) {
  const [dismissed, setDismissed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (isFounder) return;
    const key = `tracked_${business.slug}_${isPreview ? "p" : "d"}`;
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

  const whatsappHref = `https://wa.me/${FOUNDER_WHATSAPP}?text=${encodeURIComponent(
    `Hi Yuvraj! We just checked the live preview website you built for ${business.name} (${business.neighborhood}, ${business.city}) and would like to discuss connecting it to our domain.`
  )}`;

  const mailtoHref = `mailto:${FOUNDER_EMAIL}?subject=${encodeURIComponent(
    `Interested in activating website for ${business.name}`
  )}&body=${encodeURIComponent(
    `Hi Yuvraj,\n\nWe checked the live preview built for ${business.name} (${business.neighborhood}, ${business.city}) and would like to discuss putting it live on our domain.\n\nBest regards,\n${business.name}`
  )}`;

  return (
    <>
      <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-2xl">
        <div className="flex flex-col gap-3 rounded-2xl border border-white/15 bg-zinc-950/95 p-3.5 text-white shadow-2xl backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex items-start gap-3 sm:items-center">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="text-xs leading-snug sm:text-sm">
              <p className="font-semibold text-white">
                Custom Concept Built for {business.name}
              </p>
              <p className="text-zinc-400">
                Test the interactive booking &amp; menu above · Ready for your domain in 24h
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-3 py-2 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-500/25"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp
            </a>
            <button
              onClick={() => setModalOpen(true)}
              className="rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-zinc-950 transition hover:bg-emerald-400"
            >
              Launch on Our Domain →
            </button>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Hide preview bar"
              className="rounded-lg p-1.5 text-zinc-400 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-white shadow-2xl sm:p-8">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute right-5 top-5 rounded-full p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-400">
              <Globe className="h-3.5 w-3.5" />
              Ready-to-Launch Custom Site
            </div>

            <h3 className="mt-3 text-2xl font-bold tracking-tight">
              Put this live for {business.shortName} in 24 hours
            </h3>
            <p className="mt-2 text-sm text-zinc-400">
              We noticed{" "}
              <span className="text-zinc-200">{business.currentWebsiteStatus}</span>, so
              we crafted this fast mobile experience tailored specifically to{" "}
              {business.name} in {business.neighborhood}.
            </p>

            <div className="mt-5 space-y-2.5 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 text-sm">
              {[
                "Connected to your official .com or .com.np domain with free HTTPS/SSL",
                "100% tailored photos, exact menu/service prices & doctor/team profiles",
                "Direct WhatsApp & instant phone/email booking notifications",
                "Ultra-fast mobile loading + Google Maps & Local SEO schema",
                "Zero upfront risk — pay via eSewa, Fonepay or Bank Transfer only once live",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span className="text-zinc-200">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-emerald-300">
                  Complete Turnkey Setup
                </p>
                <p className="text-xl font-bold text-white">
                  NPR {business.pitchPriceNpr.toLocaleString()}{" "}
                  <span className="text-xs font-normal text-zinc-300">
                    one-time · optional NPR {business.monthlyCareNpr.toLocaleString()}/mo care
                  </span>
                </p>
              </div>
              <ShieldCheck className="h-7 w-7 text-emerald-400" />
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Yuvraj ({FOUNDER_PHONE_DISPLAY})
              </a>
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={`tel:+${FOUNDER_WHATSAPP}`}
                  className="flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-zinc-200 hover:bg-zinc-800"
                >
                  <Phone className="h-3.5 w-3.5 text-emerald-400" />
                  Call {FOUNDER_PHONE_DISPLAY}
                </a>
                <a
                  href={mailtoHref}
                  className="flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-zinc-200 hover:bg-zinc-800"
                >
                  <Mail className="h-3.5 w-3.5 text-emerald-400" />
                  Claim via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
