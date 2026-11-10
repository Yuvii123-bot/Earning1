import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://atelier-kora-xi.vercel.app"
  ),
  title: {
    default:
      "SSJS Web Agency — Premium Web Design & Development | Nepal",
    template: "%s | SSJS Web Agency",
  },
  description:
    "SSJS Web Agency builds custom, revenue-generating websites for Nepal's most ambitious businesses. Hotels, clinics, tour operators, restaurants & exporters — bespoke websites with booking systems, SEO, and zero OTA commission. Starting NPR 10,999.",
  keywords: [
    "web design Nepal",
    "website development Kathmandu",
    "web agency Nepal",
    "hotel website Nepal",
    "booking system Nepal",
    "SEO Nepal",
    "custom website Pokhara",
    "web design agency Kathmandu",
    "e-commerce Nepal",
    "WordPress alternative Nepal",
  ],
  authors: [{ name: "YuvRajOjha", url: "https://atelier-kora-xi.vercel.app" }],
  creator: "YuvRajOjha",
  publisher: "SSJS Web Agency",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "SSJS Web Agency",
    title: "SSJS Web Agency — Premium Web Design & Development | Nepal",
    description:
      "Custom websites, interactive booking systems, and digital solutions for Nepal's most ambitious businesses. Starting NPR 10,999.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SSJS Web Agency — Premium Web Design & Development | Nepal",
    description:
      "Custom websites, interactive booking systems, and digital solutions for Nepal's most ambitious businesses.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/ssjs-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/ssjs-logo.png" />
        <meta name="theme-color" content="#030712" />
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
      <body className="antialiased selection:bg-[#c9a84c]/25">{children}</body>
    </html>
  );
}
