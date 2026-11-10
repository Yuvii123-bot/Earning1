import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { RevealOnScroll, AnimatedCounter, FloatingOrbs } from "@/components/Animations";

export const metadata: Metadata = {
  title: "About SSJS Web Agency — Our Story, Mission & Values",
  description: "Learn about SSJS Web Agency — Nepal's premium web design studio founded by YuvRajOjha. Our mission: make world-class websites accessible to every Nepal business.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <SiteNav />

      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden pt-20">
        <FloatingOrbs />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <RevealOnScroll>
            <span className="text-sm font-medium tracking-wider text-[#c9a84c] uppercase">Our Story</span>
            <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-7xl">
              Built for Nepal&apos;s{" "}
              <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d78c] bg-clip-text text-transparent">
                Ambitious Businesses
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
              SSJS Web Agency was founded with a simple belief: every business in Nepal deserves a website as good as the best in the world — not a generic template from 2015.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
          {[
            { value: 22, suffix: "+", label: "Websites Built" },
            { value: 6, suffix: "", label: "Industries Served" },
            { value: 24, suffix: "h", label: "Launch Time" },
            { value: 0, suffix: "%", label: "Upfront Payment" },
          ].map((stat) => (
            <RevealOnScroll key={stat.label}>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#c9a84c]">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-sm text-gray-400">{stat.label}</div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="bg-[#060b18] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <RevealOnScroll direction="left">
              <span className="text-sm font-medium tracking-wider text-[#c9a84c] uppercase">Our Mission</span>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                World-Class Websites for Every Nepal Business
              </h2>
              <p className="mt-4 text-gray-400">
                We saw too many incredible Nepal businesses — heritage hotels, expert trekking guides, renowned clinics — losing customers because their websites looked broken, outdated, or simply didn&apos;t exist.
              </p>
              <p className="mt-3 text-gray-400">
                SSJS Web Agency exists to fix that. We build premium, custom-designed websites that convert visitors into paying customers — at prices that make sense for Nepal&apos;s market.
              </p>
            </RevealOnScroll>
            <RevealOnScroll direction="right">
              <div className="space-y-6">
                {[
                  { title: "Build First, Pay Later", desc: "We never ask for money upfront. We build your complete website first. You only pay when you're thrilled with the result." },
                  { title: "Zero Templates", desc: "Every pixel is custom-designed for your brand. No WordPress themes, no Wix drag-and-drop, no cookie-cutter solutions." },
                  { title: "Nepal-First Expertise", desc: "We understand Nepal's market — from WhatsApp-first booking to NPR/USD multi-currency to mobile-first for 87% smartphone users." },
                ].map((v) => (
                  <div key={v.title} className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                    <h3 className="font-bold text-[#c9a84c]">{v.title}</h3>
                    <p className="mt-1 text-sm text-gray-400">{v.desc}</p>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Our Values</h2>
          </RevealOnScroll>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: "💎", title: "Quality Over Quantity", desc: "We'd rather build 5 exceptional websites than 50 mediocre ones. Every project gets our full attention." },
              { icon: "🤝", title: "Transparent Pricing", desc: "No hidden fees, no surprise charges. You see the price before we start, and you only pay after approval." },
              { icon: "🚀", title: "Speed & Efficiency", desc: "Days, not months. We respect your time and deliver fast without cutting corners." },
              { icon: "🔒", title: "Full Ownership", desc: "Your code, your domain, your data. We never lock you in. Cancel maintenance anytime." },
              { icon: "📱", title: "Mobile-First Always", desc: "Every website is designed for smartphones first, then scaled up. Because that's how Nepal browses." },
              { icon: "🌍", title: "Global Standards", desc: "We use the same technologies as Silicon Valley startups — Next.js, edge computing, and modern web standards." },
            ].map((v, i) => (
              <RevealOnScroll key={v.title} delay={i * 100}>
                <div className="h-full rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition hover:border-[#c9a84c]/20">
                  <div className="mb-3 text-3xl">{v.icon}</div>
                  <h3 className="mb-2 text-lg font-bold">{v.title}</h3>
                  <p className="text-sm text-gray-400">{v.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 bg-[#060b18] py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <h2 className="text-3xl font-bold md:text-4xl">Ready to Work With Us?</h2>
            <p className="mt-4 text-gray-400">
              Let&apos;s build something remarkable for your business. Free preview, zero risk.
            </p>
            <a href="/contact" className="mt-8 inline-block rounded-full bg-[#c9a84c] px-8 py-3.5 font-bold text-black transition hover:bg-[#d4b85c]">
              Start Your Project →
            </a>
          </RevealOnScroll>
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
