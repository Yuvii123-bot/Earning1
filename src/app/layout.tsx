import type { Metadata } from "next";
import "./globals.css";

const isKoraDefault = process.env.NEXT_PUBLIC_STUDIO_BRAND !== "legacy";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://atelier-kora.vercel.app"
  ),
  title: isKoraDefault
    ? "ATELIER KORA — Bespoke Digital Architecture & Booking Systems · Nepal"
    : "Kathmandu & Pokhara Digital Studio — Instant Booking Websites for Nepal",
  description: isKoraDefault
    ? "Commission-grade digital flagships, interactive reservation & BOQ configurators, and global export portals crafted for Nepal's finest hospitality, architecture, clinical, and expedition houses."
    : "Bespoke mobile-first websites, interactive calculators, and instant WhatsApp booking systems built for leading businesses in Kathmandu and Pokhara, Nepal.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-amber-500/25">{children}</body>
    </html>
  );
}
