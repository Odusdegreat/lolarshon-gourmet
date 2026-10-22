import { Container, Section } from "@/components/shared/container";
import { GalleryGrid } from "@/components/shared/gallery-grid";
import { PageHero } from "@/components/shared/page-hero";
import { galleryEntries } from "@/data/gallery";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Gallery",
  description: "Photos of Lolarshons Gourmet dishes, celebration cakes, gourmet hampers and catered events.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero title="Gallery" description="Dishes, cakes, hampers and events, a look at what we make." />
      <Section className="py-10 sm:py-16">
        <Container>
          <GalleryGrid entries={galleryEntries} />
        </Container>
      </Section>
    </>
  );
}
