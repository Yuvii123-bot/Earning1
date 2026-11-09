import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BUSINESSES, getBusinessBySlug } from "@/data/businesses";
import {
  KORA_BUSINESSES,
  getKoraBusinessBySlug,
  type KoraBusinessConfig,
} from "@/data/kora-businesses";
import { EvokeBistroSite } from "@/components/sites/EvokeBistroSite";
import { DentalClinicSite } from "@/components/sites/DentalClinicSite";
import { ParaglidingSite } from "@/components/sites/ParaglidingSite";
import { SpaAndSkinSite } from "@/components/sites/SpaAndSkinSite";
import { PreviewClaimBanner } from "@/components/PreviewClaimBanner";
import { KoraPreviewConcierge } from "@/components/kora/KoraPreviewConcierge";
import { LuxuryStayEngine } from "@/components/kora/LuxuryStayEngine";
import { ArchitectureAtelierEngine } from "@/components/kora/ArchitectureAtelierEngine";
import { ClinicalAestheticEngine } from "@/components/kora/ClinicalAestheticEngine";
import { HimalayanExpeditionEngine } from "@/components/kora/HimalayanExpeditionEngine";
import { ArtisanalExportEngine } from "@/components/kora/ArtisanalExportEngine";

export function generateStaticParams() {
  return [
    ...KORA_BUSINESSES.map((b) => ({ slug: b.slug })),
    ...BUSINESSES.map((b) => ({ slug: b.slug })),
  ];
}

function buildKoraJsonLd(biz: KoraBusinessConfig) {
  const schemaType =
    biz.engine === "kora-stay"
      ? "Hotel"
      : biz.engine === "kora-clinical"
      ? "MedicalClinic"
      : biz.engine === "kora-expedition"
      ? "TravelAgency"
      : biz.engine === "kora-architecture"
      ? "ProfessionalService"
      : "Organization";

  return {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: biz.name,
    description: biz.editorialIntro,
    telephone: biz.phoneDisplay,
    email: biz.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: biz.fullAddress,
      addressLocality: biz.city,
      addressCountry: "NP",
    },
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const koraBiz = getKoraBusinessBySlug(slug);
  if (koraBiz) {
    return {
      title: `${koraBiz.name} — ${koraBiz.sectorLabel} | ${koraBiz.city}`,
      description: `${koraBiz.tagline} ${koraBiz.fullAddress} · ${koraBiz.phoneDisplay}`,
      openGraph: {
        title: `${koraBiz.name} | ${koraBiz.neighborhood}, ${koraBiz.city}`,
        description: koraBiz.tagline,
        images: [koraBiz.heroImage],
      },
    };
  }

  const biz = getBusinessBySlug(slug);
  if (!biz) return { title: "Site Not Found" };

  return {
    title: `${biz.name} — ${biz.neighborhood}, ${biz.city}`,
    description: `${biz.tagline} Located at ${biz.fullAddress}. Call ${biz.phoneDisplay}.`,
    openGraph: {
      title: `${biz.name} | ${biz.neighborhood}, ${biz.city}`,
      description: biz.tagline,
      images: [biz.heroImage],
    },
  };
}

export default async function BusinessSitePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const isFounder = query.founder === "1" || query.founder === "true";
  const isPreview =
    isFounder || query.preview === "1" || query.preview === "true";

  // 1. Check Batch-2 Atelier Kora Luxury Builds first
  const koraBusiness = getKoraBusinessBySlug(slug);
  if (koraBusiness) {
    const jsonLd = buildKoraJsonLd(koraBusiness);
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {koraBusiness.engine === "kora-stay" && (
          <LuxuryStayEngine business={koraBusiness} isPreview={isPreview} />
        )}
        {koraBusiness.engine === "kora-architecture" && (
          <ArchitectureAtelierEngine
            business={koraBusiness}
            isPreview={isPreview}
          />
        )}
        {koraBusiness.engine === "kora-clinical" && (
          <ClinicalAestheticEngine
            business={koraBusiness}
            isPreview={isPreview}
          />
        )}
        {koraBusiness.engine === "kora-expedition" && (
          <HimalayanExpeditionEngine
            business={koraBusiness}
            isPreview={isPreview}
          />
        )}
        {koraBusiness.engine === "kora-export" && (
          <ArtisanalExportEngine
            business={koraBusiness}
            isPreview={isPreview}
          />
        )}
        <KoraPreviewConcierge
          business={koraBusiness}
          isPreview={isPreview}
          isFounder={isFounder}
        />
      </>
    );
  }

  // 2. Fallback to Batch-1 Builds
  const business = getBusinessBySlug(slug);
  if (!business) {
    notFound();
  }

  return (
    <>
      {business.template === "bistro" && (
        <EvokeBistroSite business={business} isPreview={isPreview} />
      )}
      {(business.template === "dental-ortho" ||
        business.template === "dental-prostho") && (
        <DentalClinicSite business={business} isPreview={isPreview} />
      )}
      {business.template === "paragliding" && (
        <ParaglidingSite business={business} isPreview={isPreview} />
      )}
      {(business.template === "spa-emerald" ||
        business.template === "spa-luxury" ||
        business.template === "spa-heritage" ||
        business.template === "dermatology") && (
        <SpaAndSkinSite business={business} isPreview={isPreview} />
      )}
      <PreviewClaimBanner
        business={business}
        isPreview={isPreview}
        isFounder={isFounder}
      />
    </>
  );
}
