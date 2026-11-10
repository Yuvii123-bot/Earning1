import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Services Nepal — Rank #1 on Google | SSJS Web Agency",
  description:
    "Local SEO, Schema.org structured data, Google Rich Results, and content optimization for Nepal businesses. Get found by customers searching on Google.",
};

export default function SEOPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "SEO & Google Visibility",
    provider: { "@type": "ProfessionalService", name: "SSJS Web Agency" },
    description: "Local SEO, Schema.org structured data, and Google Rich Results for Nepal businesses.",
    areaServed: "Nepal",
    offers: { "@type": "Offer", price: "10999", priceCurrency: "NPR" },
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="border-b border-white/5 bg-[#030712]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold text-white">SSJS</span>
            <span className="text-xs font-medium tracking-[0.2em] text-[#c9a84c] uppercase">Web Agency</span>
          </a>
          <div className="flex items-center gap-6">
            <a href="/services" className="text-sm text-gray-400 transition hover:text-white">Services</a>
            <a href="/contact" className="rounded-full bg-[#c9a84c] px-5 py-2 text-sm font-semibold text-black">Get Quote</a>
          </div>
        </div>
      </nav>

      <section className="relative py-24">
        <div className="absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[#c9a84c]/5 blur-[150px]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c9a84c]/20 bg-[#c9a84c]/5 px-4 py-1.5">
            <span className="text-xs font-medium tracking-wider text-[#c9a84c] uppercase">Google First-Page Results</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Get Found on Google by{" "}
            <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d78c] bg-clip-text text-transparent">
              Customers Who Are Ready to Buy
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            93% of online experiences start with a search engine. If your business doesn&apos;t appear on Google&apos;s first page, you&apos;re invisible to customers actively looking for your services.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold">Our SEO Approach</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { icon: "🏗️", title: "Technical SEO Foundation", desc: "Schema.org structured data, XML sitemaps, robots.txt, canonical URLs, mobile optimization, Core Web Vitals — the invisible infrastructure that makes Google love your site.", items: ["Schema.org JSON-LD markup", "XML sitemap generation", "Mobile-first responsive design", "Core Web Vitals optimization", "HTTPS/SSL security", "Image optimization & lazy loading"] },
              { icon: "📍", title: "Local SEO Dominance", desc: "Google Business Profile optimization, local citations, NAP consistency, and location-specific content so customers in your area find you first.", items: ["Google Business Profile setup", "Local citation building", "NAP consistency audit", "Location-specific landing pages", "Google Maps integration", "Review generation strategy"] },
              { icon: "📝", title: "Content & On-Page SEO", desc: "Keyword research, meta tag optimization, heading structure, internal linking, and content that answers your customers' questions.", items: ["Keyword research & mapping", "Title & meta description optimization", "H1-H6 heading structure", "Internal linking strategy", "FAQ sections with schema", "Blog content planning"] },
              { icon: "📊", title: "Rich Results & SERP Features", desc: "Star ratings, FAQ accordions, product carousels, and other Google Rich Results that make your listing stand out from competitors.", items: ["FAQ rich results", "Review star ratings", "Product schema markup", "Breadcrumb navigation", "Event schema", "Organization knowledge panel"] },
            ].map((s) => (
              <div key={s.title} className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
                <div className="mb-3 text-3xl">{s.icon}</div>
                <h3 className="mb-2 text-xl font-bold">{s.title}</h3>
                <p className="mb-4 text-sm text-gray-400">{s.desc}</p>
                <ul className="space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="text-[#c9a84c]">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold">Every SSJS Website Includes SEO</h2>
          <p className="mt-4 text-gray-400">Unlike agencies that charge extra for SEO, we include technical SEO, local SEO, and structured data in every website we build — at no additional cost.</p>
          <a href="/contact" className="mt-8 inline-block rounded-full bg-[#c9a84c] px-8 py-3.5 font-bold text-black transition hover:bg-[#d4b85c]">
            Get Your SEO Audit →
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
