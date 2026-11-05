import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/sanity/lib/blog";
import { absoluteUrl } from "@/lib/site-config";
import type { BlogPost } from "@/types";

const staticRoutes = ["/", "/menu/food", "/menu/beverages", "/menu/mixology", "/reservations", "/gallery", "/delivery", "/events", "/corporate-meals", "/blog", "/our-story", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: BlogPost[] = [];
  try {
    posts = await getBlogPosts();
  } catch (error) {
    console.error("Could not load blog articles for sitemap.", error);
    posts = [];
  }

  return [
    ...staticRoutes.map((path) => ({ url: absoluteUrl(path), changeFrequency: "monthly" as const, priority: path === "/" ? 1 : 0.7 })),
    ...posts.map((p) => ({ url: absoluteUrl(`/blog/${p.slug}`), lastModified: new Date(p.date), changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
