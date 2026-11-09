import React from "react";
import { headers } from "next/headers";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  Zap,
  Globe,
  Smartphone,
  MessageCircle,
  ShieldCheck,
  Mail,
  MapPin,
} from "lucide-react";
import { BUSINESSES, getBusinessBySlug } from "@/data/businesses";
import { getSupabaseAdmin } from "@/lib/supabase";
import { EvokeBistroSite } from "@/components/sites/EvokeBistroSite";
import { DentalClinicSite } from "@/components/sites/DentalClinicSite";
import { ParaglidingSite } from "@/components/sites/ParaglidingSite";
import { SpaAndSkinSite } from "@/components/sites/SpaAndSkinSite";

async function resolveCustomDomainSlug(): Promise<string | null> {
  try {
    const hdrs = await headers();
    const rawHost = (hdrs.get("x-forwarded-host") || hdrs.get("host") || "")
      .split(":")[0]
      .toLowerCase()
      .replace(/^www\./, "");

    if (
      !rawHost ||
      rawHost === "localhost" ||
      rawHost === "127.0.0.1" ||
      rawHost.endsWith(".e2b.app") ||
      rawHost.endsWith(".vercel.app")
    ) {
      return null;
    }

    const supabase = getSupabaseAdmin();
    const { data } = await supabase
      .from("earning1_businesses")
      .select("slug")
      .or(`custom_domain.eq.${rawHost},custom_domain.eq.www.${rawHost}`)
      .maybeSingle();

    return data?.slug || null;
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const matchedSlug = await resolveCustomDomainSlug();
  if (matchedSlug) {
    const biz = getBusinessBySlug(matchedSlug);
    if (biz) {
      return {
        title: `${biz.name} — ${biz.neighborhood}, ${biz.city}`,
        description: biz.tagline,
        openGraph: {
          title: `${biz.name} | ${biz.city}`,
          description: biz.tagline,
          images: [biz.heroImage],
        },
      };
    }
  }

  return {
    title: "Yuvraj Digital Studio · Kathmandu & Pokhara Web & Booking Systems",
    description:
      "Turnkey mobile-first websites, interactive price calculators, and instant WhatsApp booking flows for leading clinics, hospitality, spas & adventure brands in Nepal.",
  };
}

export default async function HomePage() {
  const matchedSlug = await resolveCustomDomainSlug();
  if (matchedSlug) {
    const biz = getBusinessBySlug(matchedSlug);
    if (biz) {
      if (biz.template === "bistro") {
        return <EvokeBistroSite business={biz} isPreview={false} />;
      }
      if (biz.template === "dental-ortho" || biz.template === "dental-prostho") {
        return <DentalClinicSite business={biz} isPreview={false} />;
      }
      if (biz.template === "paragliding") {
        return <ParaglidingSite business={biz} isPreview={false} />;
      }
      return <SpaAndSkinSite business={biz} isPreview={false} />;
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 font-black text-zinc-950">
              Y
            </span>
            <div>
              <p className="text-sm font-bold tracking-tight text-white">
                Yuvraj Digital Studio
              </p>
              <p className="text-[11px] text-zinc-400">
                Kathmandu &amp; Pokhara · Build-First Web Engineering
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#showcase"
              className="hidden text-xs font-medium text-zinc-300 hover:text-white sm:inline"
            >
              Live Nepal Builds
            </a>
            <a
              href="#pricing"
              className="hidden text-xs font-medium text-zinc-300 hover:text-white sm:inline"
            >
              NPR Packages
            </a>
            <a
              href="https://wa.me/9779847509025?text=Hi%20Yuvraj!%20Interested%20in%20a%20custom%20website%20for%20our%20business."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-zinc-950 transition hover:bg-emerald-400"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp +977 9847509025
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" />
            Built First, Paid After Launch · Kathmandu &amp; Pokhara, Nepal
          </div>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl">
            We Build Your Business&apos;s New Booking Website{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Before You Pay a Single Rupee.
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Most clinics, restaurants, spas, and tour operators in Kathmandu &amp; Pokhara lose high-intent customers to broken `.com.np` links, slow WordPress templates, or missing WhatsApp booking flows. We engineer ultra-fast mobile sites tailored to your brand—and you only pay once it&apos;s live on your domain.
          </p>

          <div className="mt-8 flex flex-wrap gap-3.5">
            <a
              href="#showcase"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-zinc-950 transition hover:bg-emerald-400"
            >
              Explore Live Kathmandu &amp; Pokhara Demos
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="https://wa.me/9779847509025?text=Hi%20Yuvraj!%20Interested%20in%20a%20custom%20website%20preview."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-zinc-200 hover:border-zinc-700"
            >
              <MessageCircle className="h-4 w-4 text-emerald-400" />
              WhatsApp: +977 9847509025
            </a>
          </div>
        </div>

        {/* 4 Value Pillars */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Smartphone,
              title: "Sub-Second on Nepal 4G",
              desc: "Engineered on modern edge infrastructure so guests on Ncell & NTC load your menu or booking form instantly.",
            },
            {
              icon: MessageCircle,
              title: "1-Tap WhatsApp & Direct Leads",
              desc: "Interactive fare, EMI, and package calculators that send pre-filled bookings straight to your WhatsApp & reception.",
            },
            {
              icon: Globe,
              title: "Custom .com / .com.np + SSL",
              desc: "Full DNS setup, automatic HTTPS security certificates, and Google Maps LocalBusiness SEO schema.",
            },
            {
              icon: ShieldCheck,
              title: "Zero Upfront Risk",
              desc: "Preview your exact site live on your phone first. Settle via eSewa, Khalti, Fonepay or Bank Transfer after launch.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-zinc-800/90 bg-zinc-900/50 p-5"
            >
              <item.icon className="h-5 w-5 text-emerald-400" />
              <h3 className="mt-3 text-sm font-bold text-white">{item.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Live Builds Showcase */}
      <section id="showcase" className="border-t border-zinc-800/80 bg-zinc-900/30 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Live Custom Previews · Kathmandu &amp; Pokhara
              </p>
              <h2 className="mt-1.5 text-3xl font-extrabold text-white">
                Recent Bespoke Builds Ready for Activation
              </h2>
            </div>
            <p className="text-xs text-zinc-400">
              Click any concept below to test its live interactive calculator &amp; booking flow
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BUSINESSES.map((biz) => (
              <Link
                key={biz.slug}
                href={`/${biz.slug}?preview=1`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition hover:border-emerald-500/50"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={biz.heroImage}
                    alt={biz.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-zinc-950/85 px-2.5 py-1 text-[10px] font-bold text-emerald-400 backdrop-blur">
                    {biz.city}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <p className="text-[11px] font-medium text-zinc-400">
                      <MapPin className="mr-1 inline h-3 w-3 text-emerald-400" />
                      {biz.neighborhood}
                    </p>
                    <h3 className="mt-1 text-sm font-bold text-white group-hover:text-emerald-300">
                      {biz.name}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-xs text-zinc-400">
                      {biz.tagline}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-3 text-xs font-semibold text-emerald-400">
                    <span>Open Live Preview</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Transparent Nepal Pricing */}
      <section id="pricing" className="border-t border-zinc-800/80 py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Simple, Honest Nepal Pricing
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-white">
              Launch in 24 Hours — Pay Only Once Live on Your Domain
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-7">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Turnkey Launch
              </p>
              <p className="mt-2 text-3xl font-extrabold text-white">
                NPR 9,999 – 14,999{" "}
                <span className="text-sm font-normal text-zinc-400">one-time</span>
              </p>
              <p className="mt-2 text-xs text-zinc-400">
                Complete custom mobile website connected to your `.com` or `.com.np` domain.
              </p>
              <ul className="mt-5 space-y-2.5 text-xs text-zinc-200">
                {[
                  "Custom design tailored to your clinic, cafe, spa or adventure brand",
                  "Interactive treatment/package calculator & 1-tap WhatsApp booking",
                  "Custom domain DNS + automatic SSL/HTTPS security setup",
                  "Google Maps & Local Search SEO optimization",
                  "Pay via eSewa, Khalti, Fonepay or Bank Transfer after delivery",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-emerald-500/40 bg-emerald-500/5 p-7">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Managed Hosting, Edits &amp; Priority Care
                </p>
                <Zap className="h-4 w-4 text-emerald-400" />
              </div>
              <p className="mt-2 text-3xl font-extrabold text-white">
                NPR 1,500{" "}
                <span className="text-sm font-normal text-zinc-400">/ month (optional)</span>
              </p>
              <p className="mt-2 text-xs text-zinc-300">
                Hands-free cloud hosting, unlimited seasonal menu/price updates, and uptime monitoring.
              </p>
              <ul className="mt-5 space-y-2.5 text-xs text-zinc-200">
                {[
                  "Global CDN hosting + automatic SSL renewal",
                  "Same-day WhatsApp edits whenever your prices, doctors, or offers change",
                  "Monthly inquiry & visitor summary",
                  "Cancel or self-host anytime — you own 100% of your site",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-800/80 py-10 text-xs text-zinc-500">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
          <p>© 2026 Yuvraj Digital Studio · Kathmandu &amp; Pokhara, Nepal</p>
          <div className="flex items-center gap-5">
            <a href="mailto:imyuvojha@gmail.com" className="hover:text-zinc-300">
              imyuvojha@gmail.com
            </a>
            <Link href="/dashboard" className="text-zinc-600 hover:text-zinc-400">
              Founder Console
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
