import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking & Reservation Systems — Direct Booking Engines for Nepal | SSJS",
  description:
    "Custom booking systems with multi-currency display, direct WhatsApp routing, and zero OTA commission. For hotels, tour operators & service businesses in Nepal.",
};

export default function BookingSystemsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Booking & Reservation Systems",
    provider: { "@type": "ProfessionalService", name: "SSJS Web Agency" },
    description: "Custom interactive booking systems with direct WhatsApp routing and zero OTA commission.",
    areaServed: "Nepal",
    offers: { "@type": "Offer", price: "12999", priceCurrency: "NPR" },
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
            <span className="text-xs font-medium tracking-wider text-[#c9a84c] uppercase">Zero Commission Bookings</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Booking Systems That{" "}
            <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d78c] bg-clip-text text-transparent">
              Keep 100% of Your Revenue
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Stop paying 15–20% commission to Booking.com, Agoda, and TripAdvisor. Our custom booking engines route reservations directly to your WhatsApp — zero middleman fees.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold">What&apos;s Included</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "💰", title: "Multi-Currency Display", desc: "Show prices in USD, EUR, GBP, INR, and NPR simultaneously. International guests see familiar currencies." },
              { icon: "📲", title: "Direct WhatsApp Booking", desc: "Every booking goes straight to your WhatsApp with pre-filled guest details, dates, and room selection." },
              { icon: "📊", title: "Interactive Configurators", desc: "Stay builders, group-size calculators, altitude profiles — custom interactive tools for your industry." },
              { icon: "🏷️", title: "OTA Comparison Badges", desc: "Show guests how much they save booking direct vs Booking.com — proven to increase direct bookings by 23%." },
              { icon: "📧", title: "Email Notifications", desc: "Instant email alerts for every new inquiry and booking. Never miss a reservation." },
              { icon: "📈", title: "Analytics Dashboard", desc: "Track visitor counts, booking conversion rates, and popular services in your private dashboard." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition hover:border-[#c9a84c]/20">
                <div className="mb-3 text-3xl">{f.icon}</div>
                <h3 className="mb-2 text-lg font-bold">{f.title}</h3>
                <p className="text-sm text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#060b18] py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold">The Math Is Simple</h2>
          <p className="mt-4 text-gray-400">If Booking.com takes 18% commission on a $100/night room, you lose $18 per booking. With 50 bookings per month, that&apos;s $10,800/year in commission alone.</p>
          <div className="mt-8 rounded-2xl border border-[#c9a84c]/30 bg-[#c9a84c]/5 p-8">
            <div className="text-4xl font-bold text-[#c9a84c]">$0</div>
            <div className="mt-2 text-gray-300">Commission per booking with SSJS direct booking</div>
          </div>
          <a href="/contact" className="mt-8 inline-block rounded-full bg-[#c9a84c] px-8 py-3.5 font-bold text-black transition hover:bg-[#d4b85c]">
            Get Your Booking System →
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
