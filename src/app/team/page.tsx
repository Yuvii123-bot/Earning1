import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { RevealOnScroll, FloatingOrbs, GlowCard, Tilt3D, ScrollProgress, StaggerReveal, MagneticButton } from "@/components/Animations";

export const metadata: Metadata = {
  title: "Our Team — YuvRajOjha, Founder of SSJS Web Agency",
  description: "Meet YuvRajOjha — the founder and lead developer behind SSJS Web Agency. Building premium websites for Nepal's businesses since day one.",
};

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <ScrollProgress />
      <SiteNav />

      <section className="relative min-h-[70vh] overflow-hidden pt-32">
        <FloatingOrbs />
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="text-center">
              <span className="text-sm font-medium tracking-wider text-[#c9a84c] uppercase">Our Team</span>
              <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
                Built by{" "}
                <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d78c] bg-clip-text text-transparent animate-gradient">
                  YuvRajOjha
                </span>
              </h1>
            </div>
          </RevealOnScroll>

          <div className="mt-16 grid gap-12 lg:grid-cols-5">
            <RevealOnScroll direction="left" className="lg:col-span-2">
              <Tilt3D className="mx-auto max-w-xs" maxTilt={8}>
                <div className="aspect-square overflow-hidden rounded-3xl border border-[#c9a84c]/20 bg-gradient-to-br from-[#c9a84c]/10 to-transparent">
                  <div className="flex h-full items-center justify-center">
                    <span className="text-8xl font-black text-[#c9a84c]/30">YR</span>
                  </div>
                </div>
              </Tilt3D>
              <RevealOnScroll delay={200}>
                <div className="mt-6 text-center">
                  <h2 className="text-2xl font-bold">YuvRajOjha</h2>
                  <p className="text-sm text-[#c9a84c]">Founder & Lead Developer</p>
                  <p className="mt-2 text-xs text-gray-500">Kathmandu, Nepal</p>
                </div>
              </RevealOnScroll>
            </RevealOnScroll>

            <RevealOnScroll direction="right" className="lg:col-span-3">
              <div className="space-y-6">
                <GlowCard className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
                  <h3 className="text-xl font-bold">The Story</h3>
                  <p className="mt-2 leading-relaxed text-gray-400">
                    SSJS Web Agency was founded by YuvRajOjha with a clear vision: bring world-class web development to Nepal&apos;s local businesses. After seeing too many incredible hotels, clinics, and tour operators lose customers to broken, outdated websites, he decided to build a different kind of agency — one that builds first and charges only after the client is thrilled.
                  </p>
                </GlowCard>

                <GlowCard className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
                  <h3 className="text-xl font-bold">Technical Expertise</h3>
                  <StaggerReveal className="mt-3 flex flex-wrap gap-2" staggerMs={50}>
                    {["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Vercel", "Node.js", "Schema.org SEO", "Figma", "REST APIs"].map((skill) => (
                      <span key={skill} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300 transition hover:border-[#c9a84c]/30 hover:text-[#c9a84c]">{skill}</span>
                    ))}
                  </StaggerReveal>
                </GlowCard>

                <GlowCard className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
                  <h3 className="text-xl font-bold">What Drives Us</h3>
                  <p className="mt-2 leading-relaxed text-gray-400">
                    Every business in Nepal — from a 150-year heritage hotel in Patan to a paragliding company in Pokhara — deserves a website that matches the quality of their service. We use the same modern technologies as Silicon Valley startups, but at prices that work for Nepal&apos;s market.
                  </p>
                </GlowCard>

                <RevealOnScroll delay={200}>
                  <div className="flex flex-wrap gap-3">
                    <MagneticButton href="mailto:hello@yuvrajojha.com.np" className="rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/10 px-5 py-2 text-sm font-semibold text-[#c9a84c] transition hover:bg-[#c9a84c]/20">
                      hello@yuvrajojha.com.np
                    </MagneticButton>
                    <MagneticButton href="https://wa.me/9779847509025" className="rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/5">
                      WhatsApp
                    </MagneticButton>
                  </div>
                </RevealOnScroll>
              </div>
            </RevealOnScroll>
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
