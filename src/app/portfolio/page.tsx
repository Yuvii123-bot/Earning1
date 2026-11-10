import { BUSINESSES } from "@/data/businesses";
import { KORA_BUSINESSES } from "@/data/kora-businesses";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — 22+ Client Websites Built by SSJS Web Agency",
  description:
    "Browse real websites built by SSJS Web Agency for hotels, clinics, tour operators, restaurants & exporters across Nepal. Click any project to see the live preview.",
};

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
    sector: b.neighborhood,
    city: b.city,
    image: b.heroImage,
    tagline: b.tagline,
  })),
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
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

      <section className="relative py-20">
        <div className="absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[#c9a84c]/5 blur-[150px]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <span className="text-sm font-medium tracking-wider text-[#c9a84c] uppercase">Our Work</span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
            Client Portfolio
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            {PORTFOLIO.length}+ real websites built for businesses across Nepal. Click any project to see the live preview.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
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
                    alt={`${p.name} — website by SSJS Web Agency`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/30 to-transparent" />
                </div>
                <div className="absolute right-0 bottom-0 left-0 p-5">
                  <div className="mb-1 text-xs font-medium text-[#c9a84c]">
                    {p.sector} · {p.city}
                  </div>
                  <h2 className="text-lg font-bold text-white">{p.name}</h2>
                  <p className="mt-1 line-clamp-2 text-xs text-gray-400">{p.tagline}</p>
                  <div className="mt-2 text-xs text-[#c9a84c] opacity-0 transition group-hover:opacity-100">
                    View Live Preview →
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-[#060b18] py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold">Want a Website Like These?</h2>
          <p className="mt-4 text-gray-400">
            We&apos;ll build a free custom preview for your business — no obligation, no upfront cost.
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
