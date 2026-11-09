import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BUSINESSES, getBusinessBySlug } from "@/data/businesses";
import { EvokeBistroSite } from "@/components/sites/EvokeBistroSite";
import { DentalClinicSite } from "@/components/sites/DentalClinicSite";
import { ParaglidingSite } from "@/components/sites/ParaglidingSite";
import { SpaAndSkinSite } from "@/components/sites/SpaAndSkinSite";
import { PreviewClaimBanner } from "@/components/PreviewClaimBanner";

export function generateStaticParams() {
  return BUSINESSES.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
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
  const business = getBusinessBySlug(slug);

  if (!business) {
    notFound();
  }

  const isPreview = query.preview === "1" || query.preview === "true";

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
      <PreviewClaimBanner business={business} isPreview={isPreview} />
    </>
  );
}
