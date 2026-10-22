import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { absoluteUrl } from "@/lib/site-config";

const staticRoutes = ["/", "/menu/food", "/menu/beverages", "/menu/mixology", "/reservations", "/gallery", "/delivery", "/events", "/corporate-meals", "/blog", "/our-story", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((path) => ({ url: absoluteUrl(path), changeFrequency: "monthly" as const, priority: path === "/" ? 1 : 0.7 })),
    ...blogPosts.map((p) => ({ url: absoluteUrl(`/blog/${p.slug}`), lastModified: new Date(p.date), changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
