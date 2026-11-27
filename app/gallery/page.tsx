import { Suspense } from "react";
import Link from "next/link";
import { Container, Section } from "@/components/shared/container";
import { GalleryGrid } from "@/components/shared/gallery-grid";
import { PageHero } from "@/components/shared/page-hero";
import { BreadcrumbStructuredData } from "@/components/shared/structured-data";
import { galleryEntries } from "@/data/gallery";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Restaurant, Cocktail and Event Gallery in Surulere",
  description: "View Nigerian and intercontinental dishes, cocktails, karaoke, Paint & Sip and party moments from Lolar Shon's Gourmet in Surulere, Lagos.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery" }]} />
      <PageHero title="Food, Drinks and Events at Our Surulere Restaurant" description="Browse photos and videos of dishes, cocktails, karaoke, Paint & Sip and gatherings at Lolar Shon's Gourmet." />
      <Section className="py-10 sm:py-16">
        <Container>
          <Suspense fallback={<p className="py-10 text-center text-muted-foreground">Loading gallery…</p>}>
            <GalleryGrid entries={galleryEntries} />
          </Suspense>
          <p className="mt-10 text-sm leading-relaxed text-muted-foreground">
            Browse our <Link className="text-brand underline underline-offset-4" href="/menu/food">Nigerian and intercontinental food menu</Link>, explore <Link className="text-brand underline underline-offset-4" href="/menu/mixology">cocktails and drinks</Link>, or see <Link className="text-brand underline underline-offset-4" href="/events">events at our Surulere hangout</Link>.
          </p>
        </Container>
      </Section>
    </>
  );
}
