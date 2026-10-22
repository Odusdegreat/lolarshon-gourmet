import { Hero } from "@/components/home/hero";
import { ServicesStrip } from "@/components/home/services-strip";
import { Offerings } from "@/components/home/offerings";
import { StoryPreview } from "@/components/home/story-preview";
import { BrandQuote } from "@/components/home/brand-quote";
import { FeaturedMenu } from "@/components/home/featured-menu";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { BlogPreview } from "@/components/home/blog-preview";
import { ContactCta } from "@/components/home/contact-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesStrip />
      <Offerings />
      <StoryPreview />
      <BrandQuote />
      <FeaturedMenu />
      <GalleryPreview />
      <BlogPreview />
      <ContactCta />
    </>
  );
}
