export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  keywords: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "why-nepal-businesses-need-website-2026",
    title: "Why Every Nepal Business Needs a Website in 2026",
    excerpt: "In a country where 87% of internet users browse on smartphones, not having a website means being invisible to millions of potential customers.",
    category: "Digital Strategy",
    readTime: "6 min",
    date: "2026-11-10",
    keywords: ["web design Nepal", "business website", "digital presence"],
  },
  {
    slug: "direct-booking-systems-save-hotels-commission",
    title: "How Direct Booking Systems Save Hotels 18% in OTA Commission",
    excerpt: "Booking.com and Agoda charge 15-20% per booking. Here's the math on how a direct booking system pays for itself within weeks.",
    category: "Hotels & Tourism",
    readTime: "8 min",
    date: "2026-11-10",
    keywords: ["hotel booking system", "OTA commission", "direct booking"],
  },
  {
    slug: "seo-guide-nepal-businesses",
    title: "SEO for Nepal Businesses: A Complete Guide to Ranking on Google",
    excerpt: "From Schema.org structured data to local SEO, here's everything Nepal businesses need to know about appearing on Google's first page.",
    category: "SEO",
    readTime: "10 min",
    date: "2026-11-10",
    keywords: ["SEO Nepal", "Google ranking", "local SEO"],
  },
  {
    slug: "wordpress-vs-custom-website-nepal",
    title: "WordPress vs Custom Websites: What's Actually Better for Nepal?",
    excerpt: "WordPress powers 43% of the web — but is it the right choice for your Nepal business? We break down the pros, cons, and hidden costs.",
    category: "Technology",
    readTime: "7 min",
    date: "2026-11-10",
    keywords: ["WordPress Nepal", "custom website", "web development"],
  },
  {
    slug: "rank-google-maps-kathmandu",
    title: "How to Rank on Google Maps in Kathmandu: A Local SEO Playbook",
    excerpt: "Local customers search 'near me' every day. Here's the step-by-step guide to appearing in Google Maps' top 3 results in Kathmandu.",
    category: "Local SEO",
    readTime: "8 min",
    date: "2026-11-10",
    keywords: ["Google Maps Kathmandu", "local SEO", "near me"],
  },
  {
    slug: "cost-of-bad-website-nepal",
    title: "The True Cost of a Bad Website: Real Examples from Nepal Businesses",
    excerpt: "Broken buttons, typos, and $0 room rates — we audited 18 Nepal business websites and found shocking issues losing real revenue.",
    category: "Case Studies",
    readTime: "9 min",
    date: "2026-11-10",
    keywords: ["bad website cost", "website audit", "Nepal business"],
  },
  {
    slug: "booking-com-vs-direct-booking-math",
    title: "Booking.com vs Direct Booking: The Math Every Hotel Owner Should Know",
    excerpt: "A Pokhara hotel paying 18% commission on 50 bookings/month loses $10,800/year. Here's how to keep that money.",
    category: "Hotels & Tourism",
    readTime: "6 min",
    date: "2026-11-10",
    keywords: ["booking.com alternative", "hotel commission", "direct booking"],
  },
  {
    slug: "mobile-first-design-nepal",
    title: "Mobile-First Design: Why 87% of Nepal's Internet Users Demand It",
    excerpt: "Nepal's smartphone penetration is exploding. If your website isn't designed for mobile first, you're losing the majority of your visitors.",
    category: "Design",
    readTime: "5 min",
    date: "2026-11-10",
    keywords: ["mobile-first design", "responsive website", "Nepal mobile"],
  },
  {
    slug: "schema-org-google-rich-results",
    title: "How Schema.org Structured Data Gets You Google Rich Results",
    excerpt: "Star ratings, FAQ accordions, and product carousels in Google search — here's how structured data makes your listing stand out.",
    category: "SEO",
    readTime: "7 min",
    date: "2026-11-10",
    keywords: ["schema.org", "rich results", "structured data"],
  },
  {
    slug: "template-to-custom-website-upgrade",
    title: "From Template to Custom: How to Upgrade Your Nepal Business Website",
    excerpt: "Still using a WordPress template from 2018? Here's the complete guide to upgrading to a modern, fast, custom website.",
    category: "Web Design",
    readTime: "8 min",
    date: "2026-11-10",
    keywords: ["website redesign", "custom website Nepal", "website upgrade"],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
