import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services — Web Design, Booking Systems, SEO & Maintenance | SSJS",
  description:
    "SSJS Web Agency offers custom web design, interactive booking systems, SEO optimization, and monthly maintenance for businesses in Nepal. Starting NPR 10,999.",
};

const SERVICES = [
  {
    href: "/services/web-design",
    icon: "🎨",
    title: "Custom Web Design",
    desc: "Bespoke, mobile-first websites tailored to your brand. No templates, no page builders — just premium hand-crafted design.",
    price: "From NPR 10,999",
    tags: ["Mobile-First", "SEO Built-In", "24h Launch"],
  },
  {
    href: "/services/booking-systems",
    icon: "📱",
    title: "Booking & Reservation Systems",
    desc: "Interactive multi-currency booking engines with direct WhatsApp routing. Zero OTA commission — keep 100% of your revenue.",
    price: "From NPR 12,999",
    tags: ["Zero Commission", "Multi-Currency", "WhatsApp Direct"],
  },
  {
    href: "/services/seo",
    icon: "🔍",
    title: "SEO & Google Visibility",
    desc: "Schema.org structured data, local SEO, Google Rich Results, and content optimization. Get found on page one.",
    price: "Included with every site",
    tags: ["Rich Results", "Local SEO", "Schema.org"],
  },
  {
    href: "/services/maintenance",
    icon: "🔧",
    title: "Website Maintenance",
    desc: "Monthly hosting, SSL renewals, content updates, performance monitoring, and priority support. Cancel anytime.",
    price: "From NPR 1,500/month",
    tags: ["99.99% Uptime", "Priority Support", "No Lock-In"],
  },
];

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "SSJS Web Agency Services",
    itemListElement: SERVICES.map((s, i) => ({
      "@type": "Service",
      position: i + 1,
      name: s.title,
      description: s.desc,
      provider: { "@type": "ProfessionalService", name: "SSJS Web Agency" },
    })),
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
            <a href="/portfolio" className="text-sm text-gray-400 transition hover:text-white">Portfolio</a>
            <a href="/contact" className="rounded-full bg-[#c9a84c] px-5 py-2 text-sm font-semibold text-black">Get Quote</a>
          </div>
        </div>
      </nav>

      <section className="relative py-24">
        <div className="absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[#c9a84c]/5 blur-[150px]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Services That{" "}
            <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d78c] bg-clip-text text-transparent">
              Grow Your Business
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            From custom web design to booking systems, SEO, and ongoing maintenance — everything your business needs to thrive online, all under one roof.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-8">
            {SERVICES.map((s) => (
              <a
                key={s.title}
                href={s.href}
                className="group rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition hover:border-[#c9a84c]/20 hover:bg-white/[0.04]"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <span className="text-3xl">{s.icon}</span>
                      <h2 className="text-2xl font-bold">{s.title}</h2>
                    </div>
                    <p className="mb-4 text-gray-400">{s.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-lg font-bold text-[#c9a84c]">{s.price}</span>
                    <span className="text-sm text-gray-500 transition group-hover:text-[#c9a84c]">Learn more →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold">Not Sure What You Need?</h2>
          <p className="mt-4 text-gray-400">
            Tell us about your business and we&apos;ll recommend the right solution — no pressure, no obligation.
          </p>
          <a href="/contact" className="mt-8 inline-block rounded-full bg-[#c9a84c] px-8 py-3.5 font-bold text-black transition hover:bg-[#d4b85c]">
            Get Free Consultation →
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
