import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { RevealOnScroll, GlowCard, StaggerReveal, ScrollProgress, Tilt3D } from "@/components/Animations";
import { BLOG_POSTS } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Blog & Guides — Web Design, SEO & Digital Strategy for Nepal | SSJS",
  description: "Expert articles on web design, SEO, booking systems, and digital strategy for Nepal businesses. Learn how to grow your business online.",
};

export default function BlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "SSJS Web Agency Blog",
    description: "Expert articles on web design, SEO, and digital strategy for Nepal businesses.",
    url: "https://ssjs-web-agency.vercel.app/blog",
    blogPost: BLOG_POSTS.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      url: `https://ssjs-web-agency.vercel.app/blog/${post.slug}`,
      keywords: post.keywords.join(", "),
    })),
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <ScrollProgress />
      <SiteNav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative py-24 pt-32">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="text-center">
              <span className="text-sm font-medium tracking-wider text-[#c9a84c] uppercase">Blog & Guides</span>
              <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
                Expert Guides for{" "}
                <span className="bg-gradient-to-r from-[#c9a84c] to-[#f0d78c] bg-clip-text text-transparent animate-gradient">
                  Nepal Businesses
                </span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
                Practical articles on web design, SEO, booking systems, and digital strategy — written specifically for Nepal&apos;s market.
              </p>
            </div>
          </RevealOnScroll>

          <StaggerReveal className="mt-16 grid gap-8 md:grid-cols-2" staggerMs={80}>
            {BLOG_POSTS.map((post) => (
              <Tilt3D key={post.slug} maxTilt={3}>
                <GlowCard className="h-full rounded-2xl border border-white/5 bg-white/[0.02] transition-all duration-300 hover:border-[#c9a84c]/20 hover-lift">
                  <a href={`/blog/${post.slug}`} className="group block p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="rounded-full border border-[#c9a84c]/20 bg-[#c9a84c]/5 px-3 py-1 text-xs text-[#c9a84c]">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500">{post.readTime} read</span>
                    </div>
                    <h2 className="mb-2 text-xl font-bold leading-tight transition group-hover:text-[#c9a84c]">
                      {post.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-gray-400">{post.excerpt}</p>
                    <div className="mt-4 text-sm font-semibold text-[#c9a84c] opacity-0 transition group-hover:opacity-100">
                      Read Article →
                    </div>
                  </a>
                </GlowCard>
              </Tilt3D>
            ))}
          </StaggerReveal>
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
