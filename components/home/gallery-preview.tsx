import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/shared/container";
import { Photo } from "@/components/shared/photo";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { galleryEntries } from "@/data/gallery";

export function GalleryPreview() {
  const picks = [galleryEntries[0], galleryEntries[3], galleryEntries[5], galleryEntries[8], galleryEntries[1], galleryEntries[4]];
  return (
    <Section>
      <Container>
        <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading title="From Our Gallery" description="Food, cakes, hampers and moments from the events we have catered." />
          <Button asChild variant="outline">
            <Link href="/gallery">See the gallery</Link>
          </Button>
        </Reveal>
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {picks.map((g, i) => (
            <li key={g.id} className={i === 0 ? "group col-span-2 overflow-hidden rounded-xl lg:col-span-1" : "group overflow-hidden rounded-xl"}>
              <Reveal delay={i * 0.06}>
                <Photo src={g.image} alt={g.alt} aspect={i === 0 ? "aspect-[2/1] lg:aspect-square" : "aspect-square"} imgClassName="transition-transform duration-700 group-hover:scale-[1.05]" sizes="(min-width: 1024px) 33vw, 50vw" />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
