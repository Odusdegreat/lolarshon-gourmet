import type { BlogPost } from "@/types";

/** Sample articles. Replace with real content or connect a CMS later. */
export const blogPosts: BlogPost[] = [
  {
    slug: "planning-a-menu-for-your-celebration",
    title: "Planning a Menu for Your Celebration",
    excerpt: "A simple way to choose dishes your guests will enjoy, whether you are hosting ten people or a hundred.",
    date: "2026-09-02",
    category: "Events",
    image: "/images/blog/celebration-menu.jpg",
    readingMinutes: 4,
    body: [
      { type: "p", text: "A good celebration menu feels generous without feeling crowded. Start with the guest list and the time of day, then build the menu around how people will actually eat." },
      { type: "h2", text: "Start with the mood" },
      { type: "p", text: "A seated dinner calls for fewer, richer dishes. A standing reception works better with bite-sized options that are easy to eat with one hand." },
      { type: "h2", text: "Balance the table" },
      { type: "p", text: "Offer a rice or starch, a protein, something fresh and a sweet finish. Include at least one option for guests who do not eat meat, and tell your caterer about any allergies early." },
      { type: "h2", text: "Talk to us early" },
      { type: "p", text: "Share your date, guest count and venue and we will suggest a menu and quantities. Send an event enquiry on WhatsApp to begin." },
    ],
  },
  {
    slug: "choosing-the-right-gourmet-hamper",
    title: "Choosing the Right Gourmet Hamper",
    excerpt: "What to consider when a hamper is the gift: who it is for, what is in it, and how it arrives.",
    date: "2026-09-16",
    category: "Hampers",
    image: "/images/blog/gourmet-hamper.jpg",
    readingMinutes: 3,
    body: [
      { type: "p", text: "A hamper is a gift of choice and care. The best ones feel personal rather than generic." },
      { type: "h2", text: "Think about the recipient" },
      { type: "p", text: "Consider their tastes, dietary needs and the occasion. A birthday hamper can be playful, while a corporate gift usually suits a more refined selection." },
      { type: "h2", text: "Presentation matters" },
      { type: "p", text: "Ask about packaging, a handwritten card and delivery timing so the gift arrives fresh and on the day." },
    ],
  },
  {
    slug: "feeding-your-team-well",
    title: "Feeding Your Team Well: Corporate Meal Ideas",
    excerpt: "Lunch boxes, boardroom platters and staff events: simple ways to keep your team well fed.",
    date: "2026-10-01",
    category: "Corporate",
    image: "/images/blog/corporate-meals.jpg",
    readingMinutes: 4,
    body: [
      { type: "p", text: "Good food makes meetings smoother and staff events more memorable. A little planning goes a long way." },
      { type: "h2", text: "Match the meal to the moment" },
      { type: "p", text: "Individual lunch boxes suit busy office days. Shared platters work well for workshops and boardroom sessions." },
      { type: "h2", text: "Plan ahead for regular orders" },
      { type: "p", text: "If you need meals on a recurring basis, tell us your numbers and schedule so we can agree a routine that works for your team." },
    ],
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
export const getRelatedPosts = (slug: string, count = 2) => blogPosts.filter((p) => p.slug !== slug).slice(0, count);
