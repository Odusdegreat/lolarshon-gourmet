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

const homeTitle = "Gourmet Restaurant in Surulere, Lagos";

export const metadata: Metadata = {
  ...buildMetadata({
    title: homeTitle,
    description:
      "Discover exceptional dining at Lolar Shon's Gourmet in Surulere, Lagos, where authentic Nigerian flavours meet exquisite intercontinental cuisine. Savour freshly prepared gourmet dishes crafted with premium ingredients, creativity and passion. Whether for a memorable meal, special celebration or corporate event, we bring quality, flavour and elegance to every occasion. Takeaway and catering services are available, with delivery subject to confirmation for your location",
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
