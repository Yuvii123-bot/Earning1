import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { RevealOnScroll } from "@/components/Animations";
import { BLOG_POSTS, getPostBySlug } from "@/data/blog-posts";
import { ESSAY_CONTENTS } from "@/data/blog-contents";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: `${post.title} | SSJS Web Agency Blog`,
    description: post.excerpt,
    keywords: post.keywords.join(", "),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const essay = ESSAY_CONTENTS[slug];

  if (!post || !essay) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030712] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Article Not Found</h1>
          <a href="/blog" className="mt-4 inline-block text-[#c9a84c]">← Back to Blog</a>
        </div>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: "YuvRajOjha" },
    publisher: { "@type": "Organization", name: "SSJS Web Agency" },
    keywords: post.keywords.join(", "),
    mainEntityOfPage: `https://ssjs-web-agency.vercel.app/blog/${post.slug}`,
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <SiteNav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="mx-auto max-w-3xl px-6 pt-32 pb-20">
        <RevealOnScroll>
          <a href="/blog" className="text-sm text-[#c9a84c] hover:underline">← Back to Blog</a>
          <div className="mt-6 flex items-center gap-3">
            <span className="rounded-full border border-[#c9a84c]/20 bg-[#c9a84c]/5 px-3 py-1 text-xs text-[#c9a84c]">{post.category}</span>
            <span className="text-xs text-gray-500">{post.readTime} read</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">{post.title}</h1>
          <p className="mt-4 text-lg text-gray-400">{post.excerpt}</p>
        </RevealOnScroll>

        <div className="mt-12 space-y-10">
          {essay.sections.map((section, i) => (
            <RevealOnScroll key={section.heading} delay={i * 50}>
              <h2 className="text-2xl font-bold text-[#c9a84c]">{section.heading}</h2>
              {section.content.split("\n\n").map((para, j) => (
                <p key={j} className="mt-3 leading-relaxed text-gray-300">{para}</p>
              ))}
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll>
          <div className="mt-16 rounded-2xl border border-[#c9a84c]/20 bg-[#c9a84c]/5 p-8 text-center">
            <h3 className="text-xl font-bold">Ready to Upgrade Your Website?</h3>
            <p className="mt-2 text-gray-400">Get a free custom preview built for your business. No obligation.</p>
            <a href="/contact" className="mt-6 inline-block rounded-full bg-[#c9a84c] px-8 py-3 font-bold text-black transition hover:bg-[#d4b85c]">
              Start Your Free Preview →
            </a>
          </div>
        </RevealOnScroll>
      </article>

      <footer className="border-t border-white/5 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} SSJS Web Agency · Built by <span className="text-gray-400">YuvRajOjha</span> · <a href="mailto:hello@yuvrajojha.com.np" className="text-[#c9a84c]">hello@yuvrajojha.com.np</a>
        </div>
      </footer>
    </div>
  );
}
