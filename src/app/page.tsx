import React from "react";
import { headers } from "next/headers";
import type { Metadata } from "next";
import { getBusinessBySlug } from "@/data/businesses";
import { getKoraBusinessBySlug } from "@/data/kora-businesses";
import { getSupabaseAdmin } from "@/lib/supabase";
import { EvokeBistroSite } from "@/components/sites/EvokeBistroSite";
import { DentalClinicSite } from "@/components/sites/DentalClinicSite";
import { ParaglidingSite } from "@/components/sites/ParaglidingSite";
import { SpaAndSkinSite } from "@/components/sites/SpaAndSkinSite";
import { LuxuryStayEngine } from "@/components/kora/LuxuryStayEngine";
import { ArchitectureAtelierEngine } from "@/components/kora/ArchitectureAtelierEngine";
import { ClinicalAestheticEngine } from "@/components/kora/ClinicalAestheticEngine";
import { HimalayanExpeditionEngine } from "@/components/kora/HimalayanExpeditionEngine";
import { ArtisanalExportEngine } from "@/components/kora/ArtisanalExportEngine";
import { AtelierKoraShowcase } from "@/components/kora/AtelierKoraShowcase";

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
    const koraBiz = getKoraBusinessBySlug(matchedSlug);
    if (koraBiz) {
      return {
        title: `${koraBiz.name} — ${koraBiz.sectorLabel} | ${koraBiz.city}`,
        description: koraBiz.tagline,
        openGraph: {
          title: `${koraBiz.name} | ${koraBiz.city}`,
          description: koraBiz.tagline,
          images: [koraBiz.heroImage],
        },
      };
    }

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
    title: "Atelier Kora — Bespoke Digital Architecture & Booking Systems (Nepal)",
    description:
      "Bespoke digital flagships, multi-currency booking engines, architectural BOQ calculators, and global export portals crafted for Nepal's most discerning brands.",
  };
}

export default async function HomePage() {
  const matchedSlug = await resolveCustomDomainSlug();
  if (matchedSlug) {
    const koraBiz = getKoraBusinessBySlug(matchedSlug);
    if (koraBiz) {
      if (koraBiz.engine === "kora-stay") {
        return <LuxuryStayEngine business={koraBiz} isPreview={false} />;
      }
      if (koraBiz.engine === "kora-architecture") {
        return <ArchitectureAtelierEngine business={koraBiz} isPreview={false} />;
      }
      if (koraBiz.engine === "kora-clinical") {
        return <ClinicalAestheticEngine business={koraBiz} isPreview={false} />;
      }
      if (koraBiz.engine === "kora-expedition") {
        return <HimalayanExpeditionEngine business={koraBiz} isPreview={false} />;
      }
      return <ArtisanalExportEngine business={koraBiz} isPreview={false} />;
    }

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

  return <AtelierKoraShowcase />;
}
