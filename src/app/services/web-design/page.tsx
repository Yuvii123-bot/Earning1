import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design Services — Custom Websites for Nepal Businesses | SSJS",
  description:
    "Professional custom web design for hotels, clinics, tour operators, restaurants & exporters in Nepal. Mobile-first, fast-loading, SEO-optimized websites starting NPR 10,999.",
};

const WEB_DESIGN_FEATURES = [
  {
    title: "Bespoke Design",
    desc: "Every website is custom-designed for your brand — no WordPress templates, no Wix drag-and-drop. Your site looks like it cost NPR 100,000+.",
    icon: "🎨",
  },
  {
    title: "Mobile-First",
    desc: "87% of Nepal's internet users browse on smartphones. We design for mobile first, then scale up to desktop — not the other way around.",
    icon: "📱",
  },
  {
    title: "Lightning Fast",
    desc: "Sub-second load times on global CDN. Google ranks fast sites higher. Your visitors don't wait — neither should your website.",
    icon: "⚡",
  },
  {
    title: "SEO Built-In",
    desc: "Schema.org structured data, meta tags, Open Graph, sitemaps, and Google Rich Results — all included from day one.",
    icon: "🔍",
  },
  {
    title: "SSL Security",
    desc: "Free HTTPS/SSL certificate with automated renewals. Your visitors see the padlock icon that builds trust.",
    icon: "🔒",
  },
  {
    title: "24-Hour Launch",
    desc: "Once you approve the design, we connect your domain and go live within 24 hours. No month-long waits.",
    icon: "🚀",
  },
];

const INDUSTRIES = [
  { name: "Hotels & Resorts", desc: "Multi-currency booking engines, room configurators, direct reservation systems" },
  { name: "Tour Operators & Trekking", desc: "Itinerary builders, altitude profiles, group-size calculators, bilingual content" },
  { name: "Dental & Medical Clinics", desc: "Treatment showcases, appointment booking, doctor profiles, patient testimonials" },
  { name: "Restaurants & Cafes", desc: "Digital menus, table reservations, location maps, online ordering" },
  { name: "Architecture & Interiors", desc: "Portfolio galleries, BOQ estimators, project showcases, client portals" },
  { name: "Exporters & Manufacturers", desc: "B2B RFQ configurators, product catalogs, sample request systems, FOB pricing" },
];

export default function WebDesignPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Custom Web Design",
    provider: {
      "@type": "ProfessionalService",
      name: "SSJS Web Agency",
      url: "https://ssjs-web-agency.vercel.app",
    },
    description:
      "Professional custom web design for hotels, clinics, tour operators, restaurants & exporters in Nepal.",
    areaServed: "Nepal",
    offers: {
      "@type": "Offer",
      price: "10999",
      priceCurrency: "NPR",
    },
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Nav */}
      <nav className="border-b border-white/5 bg-[#030712]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight text-white">SSJS</span>
            <span className="text-xs font-medium tracking-[0.2em] text-[#c9a84c] uppercase">Web Agency</span>
          </a>
          <div className="flex items-center gap-6">
            <a href="/services" className="text-sm text-gray-400 transition hover:text-white">Services</a>
            <a href="/contact" className="rounded-full bg-[#c9a84c] px-5 py-2 text-sm font-semibold text-black transition hover:bg-[#d4b85c]">Get Quote</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-24">
        <div className="absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[#c9a84c]/5 blur-[150px]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c9a84c]/20 bg-[#c9a84c]/5 px-4 py-1.5">
            <span className="text-xs font-medium tracking-wider text-[#c9a84c] uppercase">Our Core Service</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Custom Web Design for{" "}
            <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d78c] bg-clip-text text-transparent">
              Nepal&apos;s Best Businesses
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Premium, hand-crafted websites that convert visitors into paying customers. No templates. No page builders. Just beautiful, fast, revenue-generating websites.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a href="/contact" className="rounded-full bg-[#c9a84c] px-8 py-3.5 font-bold text-black transition hover:bg-[#d4b85c]">
              Get Free Preview
            </a>
            <a href="/portfolio" className="rounded-full border border-white/10 px-8 py-3.5 font-semibold text-white transition hover:border-[#c9a84c]/30">
              View Portfolio →
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold">What Makes Our Websites Different</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {WEB_DESIGN_FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition hover:border-[#c9a84c]/20">
                <div className="mb-3 text-3xl">{f.icon}</div>
                <h3 className="mb-2 text-lg font-bold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-[#060b18] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-4 text-center text-3xl font-bold">Industries We Serve</h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-gray-400">
            We specialize in Nepal&apos;s most important business sectors — with deep understanding of each industry&apos;s unique needs.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind) => (
              <div key={ind.name} className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                <h3 className="mb-1 font-bold text-[#c9a84c]">{ind.name}</h3>
                <p className="text-sm text-gray-400">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Ready to Upgrade Your Website?</h2>
          <p className="mt-4 text-gray-400">
            We&apos;ll build a free custom preview for your business. No obligation — you only pay if you love it.
          </p>
          <a href="/contact" className="mt-8 inline-block rounded-full bg-[#c9a84c] px-8 py-3.5 font-bold text-black transition hover:bg-[#d4b85c]">
            Start Your Free Preview →
          </a>
        </div>
      </section>

      <footer className="border-t border-white/5 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} SSJS Web Agency · Built by <span className="text-gray-400">YuvRajOjha</span> · <a href="mailto:hello@yuvrajojha.com.np" className="text-[#c9a84c]">hello@yuvrajojha.com.np</a>
        </div>
      </footer>
    </div>
  );
}
