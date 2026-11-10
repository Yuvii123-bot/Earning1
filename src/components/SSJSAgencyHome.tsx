import Image from "next/image";
import { BUSINESSES } from "@/data/businesses";
import { KORA_BUSINESSES } from "@/data/kora-businesses";
import { SiteNav } from "@/components/SiteNav";
import { RevealOnScroll, AnimatedCounter, FloatingOrbs } from "@/components/Animations";

const PORTFOLIO = [
  ...KORA_BUSINESSES.map((b) => ({
    slug: b.slug,
    name: b.name,
    sector: b.sectorLabel,
    city: b.city,
    image: b.heroImage,
    tagline: b.tagline,
  })),
  ...BUSINESSES.map((b) => ({
    slug: b.slug,
    name: b.name,
    sector: b.tagline.split("—")[0]?.trim() || b.neighborhood,
    city: b.city,
    image: b.heroImage,
    tagline: b.tagline,
  })),
];

const SERVICES = [
  {
    icon: "🌐",
    title: "Custom Website Design",
    desc: "Bespoke, mobile-first websites tailored to your brand identity — never generic templates.",
  },
  {
    icon: "📱",
    title: "Booking & Reservation Systems",
    desc: "Interactive multi-currency booking engines with direct WhatsApp routing — zero OTA commission.",
  },
  {
    icon: "🔍",
    title: "SEO & Google Visibility",
    desc: "Schema.org structured data, Google Rich Results, and local SEO so customers find you first.",
  },
  {
    icon: "⚡",
    title: "Speed & Performance",
    desc: "Sub-second load times on global CDN, automated SSL security, and 99.99% uptime hosting.",
  },
  {
    icon: "🛒",
    title: "E-Commerce & Export",
    desc: "B2B RFQ configurators, multi-currency pricing, and international shipping calculators.",
  },
  {
    icon: "🔧",
    title: "Ongoing Maintenance",
    desc: "Monthly content updates, performance monitoring, and priority support — cancel anytime.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Discovery & Audit",
    desc: "We analyze your current digital presence, competitors, and target customers to identify opportunities.",
  },
  {
    step: "02",
    title: "Design & Build",
    desc: "We design and develop your custom website with interactive features tailored to your industry.",
  },
  {
    step: "03",
    title: "Review & Refine",
    desc: "You review the complete preview on your phone. We refine until you're thrilled.",
  },
  {
    step: "04",
    title: "Launch & Grow",
    desc: "We connect your domain, configure SEO, and hand over within 24 hours. Ongoing care available.",
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "10,999",
    desc: "Perfect for cafes, salons & small businesses",
    features: [
      "Custom responsive website",
      "Mobile-first design",
      "WhatsApp integration",
      "Basic SEO setup",
      "1 month free support",
    ],
  },
  {
    name: "Business",
    price: "12,999",
    desc: "Ideal for clinics, agencies & service businesses",
    features: [
      "Everything in Starter",
      "Interactive calculators",
      "Google Rich Results SEO",
      "Multi-page website",
      "3 months free support",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "14,999",
    desc: "For hotels, tour operators & exporters",
    features: [
      "Everything in Business",
      "Booking/reservation engine",
      "Multi-currency display",
      "B2B export configurator",
      "6 months free support",
    ],
  },
];

export function SSJSAgencyHome() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "SSJS Web Agency",
    description:
      "Premium web design agency in Nepal crafting custom websites, booking systems, and digital solutions for hotels, clinics, tour operators, and businesses across Kathmandu, Pokhara, and beyond.",
    url: "https://ssjs-web-agency.vercel.app",
    email: "hello@yuvrajojha.com.np",
    telephone: "+977-9847509025",
    founder: { "@type": "Person", name: "YuvRajOjha" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kathmandu",
      addressRegion: "Bagmati Province",
      addressCountry: "NP",
    },
    areaServed: "Nepal",
    priceRange: "NPR 10,999 – 14,999",
    sameAs: [],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Design Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Web Design" }, price: "10999", priceCurrency: "NPR" },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Booking & Reservation Systems" }, price: "12999", priceCurrency: "NPR" },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO & Google Visibility" }, price: "10999", priceCurrency: "NPR" },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Maintenance" }, price: "1500", priceCurrency: "NPR" },
      ],
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How much does a website cost?", acceptedAnswer: { "@type": "Answer", text: "Our websites start at NPR 10,999 for a starter site and go up to NPR 14,999 for premium packages with booking engines and multi-currency support. Optional monthly maintenance starts at NPR 1,500/month. You only pay after approving the finished website." } },
      { "@type": "Question", name: "Do I need to pay upfront?", acceptedAnswer: { "@type": "Answer", text: "No. We build your complete website first — custom-designed, mobile-responsive, and loaded with interactive features. You review it on your phone. Only when you're happy do we connect your domain and collect payment. Zero upfront risk." } },
      { "@type": "Question", name: "How long does it take to build a website?", acceptedAnswer: { "@type": "Answer", text: "Most websites are completed within 3-7 business days. Once you approve the design, we connect your domain and go live within 24 hours. Simple sites can be done even faster." } },
      { "@type": "Question", name: "Will my website work on mobile phones?", acceptedAnswer: { "@type": "Answer", text: "Absolutely. 87% of Nepal's internet users browse on smartphones. We design mobile-first — your website will look perfect on every device, from budget Android phones to desktop monitors." } },
      { "@type": "Question", name: "Can you help me get on Google?", acceptedAnswer: { "@type": "Answer", text: "Yes. Every website includes technical SEO (Schema.org structured data, sitemaps, meta tags), local SEO optimization, and Google Rich Results markup so your business appears prominently in search results." } },
      { "@type": "Question", name: "Do I own the website after it's built?", acceptedAnswer: { "@type": "Answer", text: "Yes — 100%. You own the code, the domain, and all the data. We provide full handover with no lock-in. You can self-host or switch to any other provider anytime." } },
      { "@type": "Question", name: "What if I already have a website?", acceptedAnswer: { "@type": "Answer", text: "We can redesign your existing website with a modern, faster, mobile-optimized version while keeping your domain and improving your SEO." } },
      { "@type": "Question", name: "Do you build booking systems for hotels and tour operators?", acceptedAnswer: { "@type": "Answer", text: "Yes — interactive booking engines are our specialty. We build multi-currency reservation systems with direct WhatsApp routing, so bookings go straight to your phone with zero OTA commission." } },
    ],
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Navigation */}
      <SiteNav />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
        <FloatingOrbs />
        <div className="absolute inset-0 bg-gradient-to-b from-[#c9a84c]/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a84c]/5 blur-[150px]" />
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c9a84c]/20 bg-[#c9a84c]/5 px-4 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#c9a84c]" />
            <span className="text-xs font-medium tracking-wider text-[#c9a84c] uppercase">
              Nepal&apos;s Premium Web Agency
            </span>
          </div>
          <h1 className="mb-6 text-5xl leading-tight font-extrabold tracking-tight md:text-7xl md:leading-tight">
            We Build Websites That{" "}
            <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d78c] bg-clip-text text-transparent">
              Generate Revenue
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-400 md:text-xl">
            Custom websites, interactive booking systems, and digital solutions
            for Nepal&apos;s most ambitious businesses. From Kathmandu to
            Pokhara — we engineer your digital growth.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#portfolio"
              className="rounded-full bg-[#c9a84c] px-8 py-3.5 text-base font-bold text-black transition hover:bg-[#d4b85c] hover:shadow-lg hover:shadow-[#c9a84c]/20"
            >
              View Our Work
            </a>
            <a
              href="https://wa.me/9779847509025?text=Hello%20SSJS%20Web%20Agency!%20I%27d%20like%20to%20discuss%20a%20website%20project."
              className="rounded-full border border-white/10 px-8 py-3.5 text-base font-semibold text-white transition hover:border-[#c9a84c]/50 hover:bg-white/5"
            >
              WhatsApp Us →
            </a>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/5 pt-10">
            <div>
              <div className="text-3xl font-bold text-[#c9a84c]">
                <AnimatedCounter end={22} suffix="+" />
              </div>
              <div className="text-sm text-gray-500">Websites Built</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#c9a84c]">24h</div>
              <div className="text-sm text-gray-500">Domain Handover</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#c9a84c]">0%</div>
              <div className="text-sm text-gray-500">OTA Commission</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <RevealOnScroll>
            <div className="mb-16 text-center">
              <span className="text-sm font-medium tracking-wider text-[#c9a84c] uppercase">
                What We Do
              </span>
              <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                Services Built for Growth
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                Every website we build is engineered to convert visitors into
                paying customers — with features your current site is missing.
              </p>
            </div>
          </RevealOnScroll>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="group rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition hover:border-[#c9a84c]/20 hover:bg-white/[0.04]"
              >
                <div className="mb-4 text-3xl">{s.icon}</div>
                <h3 className="mb-2 text-xl font-bold">{s.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="bg-[#060b18] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <RevealOnScroll>
            <div className="mb-16 text-center">
              <span className="text-sm font-medium tracking-wider text-[#c9a84c] uppercase">
                Our Work
              </span>
              <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                Client Portfolio
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                Real websites built for real businesses across Nepal. Click any
                project to see the live preview.
              </p>
            </div>
          </RevealOnScroll>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PORTFOLIO.map((p) => (
              <a
                key={p.slug}
                href={`/${p.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] transition hover:border-[#c9a84c]/30 hover:shadow-xl hover:shadow-[#c9a84c]/5"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/30 to-transparent" />
                </div>
                <div className="absolute right-0 bottom-0 left-0 p-5">
                  <div className="mb-1 text-xs font-medium text-[#c9a84c]">
                    {p.sector} · {p.city}
                  </div>
                  <h3 className="text-lg font-bold text-white">{p.name}</h3>
                  <div className="mt-2 flex items-center gap-1 text-xs text-gray-400 opacity-0 transition group-hover:opacity-100">
                    View Live Preview →
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <RevealOnScroll>
            <div className="mb-16 text-center">
              <span className="text-sm font-medium tracking-wider text-[#c9a84c] uppercase">
                How It Works
              </span>
              <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                Our Process
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                From first conversation to live website in days — not months.
                Transparent, efficient, and built around your schedule.
              </p>
            </div>
          </RevealOnScroll>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p) => (
              <div key={p.step} className="relative">
                <div className="mb-4 text-5xl font-black text-[#c9a84c]/20">
                  {p.step}
                </div>
                <h3 className="mb-2 text-xl font-bold">{p.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-[#060b18] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <RevealOnScroll>
            <div className="mb-16 text-center">
              <span className="text-sm font-medium tracking-wider text-[#c9a84c] uppercase">
                Transparent Pricing
              </span>
              <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                Simple, Fair Pricing
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                No hidden fees. No long-term contracts. Pay only after you approve
                the finished website.
              </p>
            </div>
          </RevealOnScroll>
          <div className="grid gap-8 md:grid-cols-3">
            {PRICING.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl border p-8 transition ${
                  tier.popular
                    ? "border-[#c9a84c]/50 bg-[#c9a84c]/5 shadow-xl shadow-[#c9a84c]/5"
                    : "border-white/5 bg-white/[0.02] hover:border-white/10"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 right-6 rounded-full bg-[#c9a84c] px-3 py-1 text-xs font-bold text-black">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-xl font-bold">{tier.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-sm text-gray-400">NPR</span>
                  <span className="text-4xl font-extrabold">{tier.price}</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">{tier.desc}</p>
                <ul className="mt-8 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 text-[#c9a84c]">✓</span>
                      <span className="text-gray-300">{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`mt-8 block w-full rounded-full py-3 text-center text-sm font-bold transition ${
                    tier.popular
                      ? "bg-[#c9a84c] text-black hover:bg-[#d4b85c]"
                      : "border border-white/10 text-white hover:border-[#c9a84c]/30 hover:bg-white/5"
                  }`}
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-gray-500">
            Optional monthly maintenance from NPR 1,500/mo — includes hosting,
            SSL, content updates & priority support. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <span className="text-sm font-medium tracking-wider text-[#c9a84c] uppercase">
                Why SSJS
              </span>
              <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                Build First.
                <br />
                Pay After Approval.
              </h2>
              <p className="mt-6 leading-relaxed text-gray-400">
                We don&apos;t ask for money upfront. We build your complete
                website first — custom-designed, mobile-responsive, and loaded
                with interactive features. You review it on your phone. Only
                when you&apos;re happy do we connect your domain and collect
                payment.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "100% custom design — no WordPress templates",
                  "Interactive calculators & booking engines",
                  "Mobile-first for Nepal&apos;s smartphone users",
                  "24-hour domain handover after approval",
                  "Full ownership — your code, your domain, your data",
                  "Pay via bank transfer, eSewa, Khalti or Fonepay",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1 text-[#c9a84c]">◆</span>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
              <div className="mb-6 text-sm font-medium tracking-wider text-[#c9a84c] uppercase">
                Client Testimonial
              </div>
              <blockquote className="text-lg leading-relaxed text-gray-300 italic">
                &ldquo;SSJS built our complete hotel booking website with
                multi-currency rates and direct WhatsApp reservations. We saved
                thousands in OTA commissions within the first month.&rdquo;
              </blockquote>
              <div className="mt-6 border-t border-white/5 pt-4">
                <div className="font-semibold text-white">
                  Boutique Heritage Home
                </div>
                <div className="text-sm text-gray-500">
                  150-Year Heritage Hotel · Patan, Lalitpur
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <span className="text-sm font-medium tracking-wider text-[#c9a84c] uppercase">
              Common Questions
            </span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "How much does a website cost?",
                a: "Our websites start at NPR 10,999 for a starter site and go up to NPR 14,999 for premium packages with booking engines and multi-currency support. Optional monthly maintenance starts at NPR 1,500/month. You only pay after approving the finished website.",
              },
              {
                q: "Do I need to pay upfront?",
                a: "No. We build your complete website first — custom-designed, mobile-responsive, and loaded with interactive features. You review it on your phone. Only when you're happy do we connect your domain and collect payment. Zero upfront risk.",
              },
              {
                q: "How long does it take to build a website?",
                a: "Most websites are completed within 3-7 business days. Once you approve the design, we connect your domain and go live within 24 hours. Simple sites can be done even faster.",
              },
              {
                q: "Will my website work on mobile phones?",
                a: "Absolutely. 87% of Nepal's internet users browse on smartphones. We design mobile-first — your website will look perfect on every device, from budget Android phones to desktop monitors.",
              },
              {
                q: "Can you help me get on Google?",
                a: "Yes. Every website includes technical SEO (Schema.org structured data, sitemaps, meta tags), local SEO optimization, and Google Rich Results markup so your business appears prominently in search results.",
              },
              {
                q: "Do I own the website after it's built?",
                a: "Yes — 100%. You own the code, the domain, and all the data. We provide full handover with no lock-in. You can self-host or switch to any other provider anytime. Optional monthly maintenance is always cancel-anytime.",
              },
              {
                q: "What if I already have a website?",
                a: "We can redesign your existing website with a modern, faster, mobile-optimized version while keeping your domain and improving your SEO. Many of our clients started with outdated WordPress sites or broken templates.",
              },
              {
                q: "Do you build booking systems for hotels and tour operators?",
                a: "Yes — interactive booking engines are our specialty. We build multi-currency reservation systems with direct WhatsApp routing, so bookings go straight to your phone with zero OTA commission (no Booking.com or Agoda fees).",
              },
            ].map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border border-white/5 bg-white/[0.02] transition hover:border-[#c9a84c]/10"
              >
                <summary className="flex cursor-pointer items-center justify-between p-5 text-left font-semibold">
                  {faq.q}
                  <span className="ml-4 text-[#c9a84c] transition group-open:rotate-45">+</span>
                </summary>
                <div className="px-5 pb-5 text-sm leading-relaxed text-gray-400">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="contact" className="bg-[#060b18] py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="text-sm font-medium tracking-wider text-[#c9a84c] uppercase">
            Start Your Project
          </span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Ready to Transform Your
            <br />
            Digital Presence?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-gray-400">
            Tell us about your business. We&apos;ll build a custom preview —
            free, no obligation — so you can see exactly what your new website
            will look like.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://wa.me/9779847509025?text=Hello%20SSJS%20Web%20Agency!%20I%27d%20like%20to%20discuss%20a%20website%20for%20my%20business."
              className="flex items-center gap-2 rounded-full bg-green-600 px-8 py-3.5 text-base font-bold text-white transition hover:bg-green-500"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
            <a
              href="mailto:hello@yuvrajojha.com.np?subject=SSJS%20Web%20Agency%20%E2%80%94%20Website%20Project%20Inquiry"
              className="rounded-full border border-white/10 px-8 py-3.5 text-base font-semibold text-white transition hover:border-[#c9a84c]/30 hover:bg-white/5"
            >
              hello@yuvrajojha.com.np
            </a>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            📞 +977 9847509025 · Kathmandu, Nepal
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-3">
                <Image
                  src="/ssjs-logo.png"
                  alt="SSJS Web Agency"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <div>
                  <span className="text-base font-bold text-white">SSJS</span>
                  <span className="ml-1 text-xs font-medium tracking-wider text-[#c9a84c] uppercase">
                    Web Agency
                  </span>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-gray-500">
                Premium web design & development agency based in Nepal. Building
                revenue-generating websites for ambitious businesses.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-bold tracking-wider text-white uppercase">
                Services
              </h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>Custom Website Design</li>
                <li>Booking & Reservation Systems</li>
                <li>SEO & Google Visibility</li>
                <li>E-Commerce Solutions</li>
                <li>Monthly Maintenance</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-bold tracking-wider text-white uppercase">
                Contact
              </h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <a
                    href="mailto:hello@yuvrajojha.com.np"
                    className="transition hover:text-[#c9a84c]"
                  >
                    hello@yuvrajojha.com.np
                  </a>
                </li>
                <li>+977 9847509025</li>
                <li>Kathmandu, Nepal</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} SSJS Web Agency. All rights
              reserved.
            </p>
            <p className="text-xs text-gray-600">
              Built by{" "}
              <span className="font-semibold text-gray-400">YuvRajOjha</span> ·{" "}
              <a
                href="mailto:hello@yuvrajojha.com.np"
                className="text-[#c9a84c] transition hover:text-[#d4b85c]"
              >
                hello@yuvrajojha.com.np
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
