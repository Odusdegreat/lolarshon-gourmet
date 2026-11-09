import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { ServicesStrip } from "@/components/home/services-strip";
import { Offerings } from "@/components/home/offerings";
import { StoryPreview } from "@/components/home/story-preview";
import { BrandQuote } from "@/components/home/brand-quote";
import { FeaturedMenu } from "@/components/home/featured-menu";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { BlogPreview } from "@/components/home/blog-preview";
import { ContactCta } from "@/components/home/contact-cta";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { getBlogPosts } from "@/sanity/lib/blog";
import type { BlogPost } from "@/types";

const homeTitle = "Nigerian Restaurant in Surulere, Lagos";

export const metadata: Metadata = {
  ...buildMetadata({
    title: homeTitle,
    description:
      "Enjoy Nigerian food, jollof rice and takeaway at Lolar Shon's Gourmet in Surulere, Lagos. Ask us to confirm delivery availability for your address.",
    path: "/",
  }),
  title: { absolute: `${homeTitle} | ${siteConfig.name}` },
};

export default async function HomePage() {
  let posts: BlogPost[] = [];
  try {
    posts = await getBlogPosts();
  } catch (error) {
    console.error("Could not load homepage blog articles from Sanity.", error);
  }

  return (
    <>
      <Hero />
      <ServicesStrip />
      <Offerings />
      <StoryPreview />
      <BrandQuote />
      <FeaturedMenu />
      <GalleryPreview />
      <BlogPreview posts={posts} />
      <ContactCta />
    </>
  );
}
