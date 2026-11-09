import { Suspense } from "react";
import { Container, Section } from "@/components/shared/container";
import { GalleryGrid } from "@/components/shared/gallery-grid";
import { PageHero } from "@/components/shared/page-hero";
import { galleryEntries } from "@/data/gallery";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Gallery",
  description: "Photos and videos of Lolar Shon's Gourmet food, drinks and catered events.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero title="Gallery" description="Food, drinks, events and videos from Lolar Shon's Gourmet." />
      <Section className="py-10 sm:py-16">
        <Container>
          <Suspense fallback={<p className="py-10 text-center text-muted-foreground">Loading gallery…</p>}>
            <GalleryGrid entries={galleryEntries} />
          </Suspense>
        </Container>
      </Section>
    </>
  );
}
