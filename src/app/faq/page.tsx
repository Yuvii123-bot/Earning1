import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { RevealOnScroll } from "@/components/Animations";

export const metadata: Metadata = {
  title: "FAQ — Web Design Questions Answered | SSJS Web Agency Nepal",
  description: "Everything you need to know about getting a website built by SSJS Web Agency. Pricing, process, timelines, ownership, and more.",
};

const FAQS = [
  { category: "Pricing & Payment", items: [
    { q: "How much does a website cost?", a: "Our websites start at NPR 10,999 for a starter site and go up to NPR 14,999 for premium packages with interactive booking engines and multi-currency support. Optional monthly maintenance starts at NPR 1,500/month. Every price is transparent — no hidden fees." },
    { q: "Do I need to pay upfront?", a: "No. We build your complete website first — fully designed, mobile-responsive, and loaded with features. You review it on your phone. Only when you're happy do we connect your domain and collect payment. Zero upfront risk." },
    { q: "What payment methods do you accept?", a: "We accept eSewa, Khalti, Fonepay, bank transfer (Nabil, Global IME, NIC Asia), and cash. Payment is collected only after you approve the finished website." },
    { q: "Is there a monthly fee?", a: "The website itself is a one-time payment. Optional monthly maintenance (hosting, SSL, updates, support) starts at NPR 1,500/month. You can cancel maintenance anytime — or self-host if you prefer." },
  ]},
  { category: "Process & Timeline", items: [
    { q: "How long does it take to build a website?", a: "Most websites are completed within 3–7 business days. Complex projects with booking engines or multi-language support may take 7–14 days. Once you approve the design, we connect your domain and go live within 24 hours." },
    { q: "What do you need from me to get started?", a: "Just your business name, what you do, your current website (if any), and your goals. We handle everything else — research, design, copywriting, development, and SEO." },
    { q: "Can I request changes?", a: "Absolutely. We include up to 3 rounds of revisions in every project. Most clients need only 1–2 rounds because we nail the design from the start." },
  ]},
  { category: "Technology & Features", items: [
    { q: "Will my website work on mobile phones?", a: "Yes — we design mobile-first. 87% of Nepal's internet users browse on smartphones. Your website will look and work perfectly on every device." },
    { q: "Do you use WordPress or templates?", a: "No. Every website is 100% custom-built using modern web technologies (Next.js, React, Tailwind CSS). No WordPress, no Wix, no templates. This means faster load times, better security, and a unique design." },
    { q: "What about SEO?", a: "Every website includes full technical SEO: Schema.org structured data, XML sitemaps, meta tags, Open Graph, Google Rich Results, and local SEO optimization. You're set up to rank from day one." },
    { q: "Can you build a booking system?", a: "Yes — booking engines are our specialty. We build interactive reservation systems with multi-currency display, direct WhatsApp routing, and zero OTA commission." },
  ]},
  { category: "Ownership & Support", items: [
    { q: "Do I own the website?", a: "Yes — 100%. You own the code, the domain, and all data. We provide full handover with no lock-in. You can self-host or move to any provider anytime." },
    { q: "What happens after the website is live?", a: "Your website includes free support for 1–6 months (depending on your plan). After that, optional monthly maintenance covers hosting, SSL, updates, and priority support." },
    { q: "Can you help me get a domain name?", a: "We guide you through domain registration (.com, .com.np, .np) and handle the entire DNS setup. You own the domain — we just configure it." },
  ]},
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.flatMap((cat) =>
    cat.items.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    }))
  ),
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <SiteNav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="relative py-24 pt-32">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="text-center">
              <span className="text-sm font-medium tracking-wider text-[#c9a84c] uppercase">FAQ</span>
              <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
                Frequently Asked Questions
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
                Everything you need to know about working with SSJS Web Agency. Can&apos;t find your answer? <a href="/contact" className="text-[#c9a84c] underline">Contact us</a>.
              </p>
            </div>
          </RevealOnScroll>

          <div className="mt-16 space-y-12">
            {FAQS.map((category) => (
              <div key={category.category}>
                <RevealOnScroll>
                  <h2 className="mb-6 text-2xl font-bold text-[#c9a84c]">{category.category}</h2>
                </RevealOnScroll>
                <div className="space-y-3">
                  {category.items.map((faq, i) => (
                    <RevealOnScroll key={faq.q} delay={i * 50}>
                      <details className="group rounded-xl border border-white/5 bg-white/[0.02] transition hover:border-[#c9a84c]/10">
                        <summary className="flex cursor-pointer items-center justify-between p-5 text-left font-semibold">
                          {faq.q}
                          <span className="ml-4 shrink-0 text-xl text-[#c9a84c] transition group-open:rotate-45">+</span>
                        </summary>
                        <div className="px-5 pb-5 text-sm leading-relaxed text-gray-400">{faq.a}</div>
                      </details>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>
            ))}
          </div>
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
