import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Maintenance & Support — Monthly Care Plans | SSJS Web Agency",
  description:
    "Monthly website maintenance, hosting, SSL renewals, content updates, and priority support for Nepal businesses. Starting NPR 1,500/month. Cancel anytime.",
};

export default function MaintenancePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Website Maintenance & Support",
    provider: { "@type": "ProfessionalService", name: "SSJS Web Agency" },
    description: "Monthly website maintenance, hosting, and priority support.",
    areaServed: "Nepal",
    offers: { "@type": "Offer", price: "1500", priceCurrency: "NPR" },
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
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Website Maintenance{" "}
            <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d78c] bg-clip-text text-transparent">
              That Lets You Focus on Your Business
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            We handle hosting, SSL renewals, content updates, performance monitoring, and security patches — so your website stays fast, secure, and up-to-date without you lifting a finger.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Basic Care",
                price: "1,500",
                features: ["99.99% CDN hosting", "Automated SSL renewals", "Monthly content updates (text/images)", "Performance monitoring", "Email support"],
              },
              {
                name: "Business Care",
                price: "2,000",
                popular: true,
                features: ["Everything in Basic", "Weekly content updates", "Seasonal rate/tariff updates", "Priority WhatsApp support", "Monthly visitor analytics report", "Google Business Profile updates"],
              },
              {
                name: "Premium Care",
                price: "3,000",
                features: ["Everything in Business", "Unlimited content updates", "New pages & features (up to 2/mo)", "SEO content optimization", "Competitor monitoring", "Dedicated account manager"],
              },
            ].map((tier) => (
              <div key={tier.name} className={`relative rounded-2xl border p-8 ${tier.popular ? "border-[#c9a84c]/50 bg-[#c9a84c]/5" : "border-white/5 bg-white/[0.02]"}`}>
                {tier.popular && <div className="absolute -top-3 right-6 rounded-full bg-[#c9a84c] px-3 py-1 text-xs font-bold text-black">POPULAR</div>}
                <h3 className="text-xl font-bold">{tier.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-sm text-gray-400">NPR</span>
                  <span className="text-4xl font-extrabold">{tier.price}</span>
                  <span className="text-sm text-gray-400">/month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <span className="text-[#c9a84c]">✓</span>
                      <span className="text-gray-300">{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="/contact" className={`mt-8 block rounded-full py-3 text-center text-sm font-bold transition ${tier.popular ? "bg-[#c9a84c] text-black hover:bg-[#d4b85c]" : "border border-white/10 text-white hover:border-[#c9a84c]/30"}`}>
                  Choose Plan
                </a>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-gray-500">All plans include 100% client ownership. Cancel or self-host anytime — no lock-in.</p>
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
