import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { RevealOnScroll, GlowCard, StaggerReveal, ScrollProgress } from "@/components/Animations";

export const metadata: Metadata = {
  title: "Contact SSJS Web Agency — Get a Free Website Audit | Nepal",
  description:
    "Contact SSJS Web Agency for a free website audit and custom quote. WhatsApp, email, or fill out our form. Based in Kathmandu, serving all of Nepal.",
  openGraph: {
    title: "Contact SSJS Web Agency — Free Website Audit",
    description:
      "Get a free website audit and custom quote for your business. WhatsApp, email, or fill out our contact form.",
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact SSJS Web Agency",
    description:
      "Get in touch with SSJS Web Agency for a free website audit and custom quote.",
    url: "https://ssjs-web-agency.vercel.app/contact",
    mainEntity: {
      "@type": "ProfessionalService",
      name: "SSJS Web Agency",
      email: "hello@yuvrajojha.com.np",
      telephone: "+977-9847509025",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kathmandu",
        addressRegion: "Bagmati Province",
        addressCountry: "NP",
      },
      openingHours: "Mo-Sa 09:00-18:00",
    },
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <ScrollProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteNav brand={true} />

      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-16 text-center">
          <span className="text-sm font-medium tracking-wider text-[#c9a84c] uppercase">
            Get in Touch
          </span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
            Let&apos;s Build Something{" "}
            <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d78c] bg-clip-text text-transparent">
              Remarkable
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Tell us about your business and we&apos;ll build a free custom
            preview — no obligation, no upfront cost. You only pay when
            you&apos;re happy.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
            <h2 className="mb-6 text-2xl font-bold">Send Us a Message</h2>
            <form
              action="/api/contact"
              method="POST"
              className="space-y-5"
            >
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Rajesh Sharma"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-[#c9a84c]/50 focus:ring-1 focus:ring-[#c9a84c]/30"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">
                  Business Name *
                </label>
                <input
                  type="text"
                  name="business"
                  required
                  placeholder="e.g. Himalayan Heritage Hotel"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-[#c9a84c]/50 focus:ring-1 focus:ring-[#c9a84c]/30"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@business.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-[#c9a84c]/50 focus:ring-1 focus:ring-[#c9a84c]/30"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+977 98XXXXXXXX"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-[#c9a84c]/50 focus:ring-1 focus:ring-[#c9a84c]/30"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">
                  What do you need? *
                </label>
                <select
                  name="service"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#c9a84c]/50"
                >
                  <option value="" className="bg-gray-900">
                    Select a service...
                  </option>
                  <option value="new-website" className="bg-gray-900">
                    New Website
                  </option>
                  <option value="redesign" className="bg-gray-900">
                    Website Redesign
                  </option>
                  <option value="booking-system" className="bg-gray-900">
                    Booking / Reservation System
                  </option>
                  <option value="ecommerce" className="bg-gray-900">
                    E-Commerce / Online Store
                  </option>
                  <option value="seo" className="bg-gray-900">
                    SEO & Google Visibility
                  </option>
                  <option value="maintenance" className="bg-gray-900">
                    Website Maintenance
                  </option>
                  <option value="other" className="bg-gray-900">
                    Other
                  </option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">
                  Tell us about your project
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Describe your business, current website (if any), and what you'd like to achieve..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-[#c9a84c]/50 focus:ring-1 focus:ring-[#c9a84c]/30"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-[#c9a84c] py-3.5 text-base font-bold text-black transition hover:bg-[#d4b85c] hover:shadow-lg hover:shadow-[#c9a84c]/20"
              >
                Send Message & Get Free Preview
              </button>
              <p className="text-center text-xs text-gray-500">
                We&apos;ll respond within 24 hours with a free custom preview.
              </p>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
              <h3 className="mb-6 text-xl font-bold">
                Direct Contact
              </h3>
              <div className="space-y-5">
                <a
                  href="https://wa.me/9779847509025?text=Hello%20SSJS%20Web%20Agency!%20I%27d%20like%20to%20discuss%20a%20website%20project."
                  className="flex items-center gap-4 rounded-xl border border-green-500/20 bg-green-500/5 p-4 transition hover:border-green-500/40"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      WhatsApp (Fastest)
                    </div>
                    <div className="text-sm text-gray-400">
                      +977 9847509025
                    </div>
                  </div>
                </a>
                <a
                  href="mailto:hello@yuvrajojha.com.np?subject=SSJS%20Web%20Agency%20%E2%80%94%20Project%20Inquiry"
                  className="flex items-center gap-4 rounded-xl border border-[#c9a84c]/20 bg-[#c9a84c]/5 p-4 transition hover:border-[#c9a84c]/40"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c9a84c]/20 text-[#c9a84c]">
                    ✉️
                  </div>
                  <div>
                    <div className="font-semibold text-white">Email</div>
                    <div className="text-sm text-gray-400">
                      hello@yuvrajojha.com.np
                    </div>
                  </div>
                </a>
                <a
                  href="tel:+9779847509025"
                  className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-white/10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white">
                    📞
                  </div>
                  <div>
                    <div className="font-semibold text-white">Phone</div>
                    <div className="text-sm text-gray-400">
                      +977 9847509025
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
              <h3 className="mb-4 text-xl font-bold">
                Why Work With Us?
              </h3>
              <div className="space-y-3">
                {[
                  "Free custom preview before you pay anything",
                  "100% tailored — no WordPress templates",
                  "Built by YuvRajOjha with 22+ projects delivered",
                  "Pay only after you approve the finished website",
                  "24-hour domain handover after launch",
                  "Full ownership — your code, your domain, your data",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 text-[#c9a84c]">✓</span>
                    <span className="text-sm text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
              <h3 className="mb-4 text-xl font-bold">
                Office Hours
              </h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex justify-between">
                  <span>Sunday – Friday</span>
                  <span className="text-white">9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-white">By appointment</span>
                </div>
                <div className="mt-4 border-t border-white/5 pt-4">
                  <span className="text-gray-500">
                    📍 Kathmandu, Bagmati Province, Nepal
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} SSJS Web Agency. Built by{" "}
          <span className="font-semibold text-gray-400">YuvRajOjha</span> ·{" "}
          <a
            href="mailto:hello@yuvrajojha.com.np"
            className="text-[#c9a84c]"
          >
            hello@yuvrajojha.com.np
          </a>
        </div>
      </footer>
    </div>
  );
}
