import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/shared/container";
import { GalleryVideo } from "@/components/shared/gallery-video";
import { Photo } from "@/components/shared/photo";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { galleryEntries } from "@/data/gallery";

export function GalleryPreview() {
  const imagePicks = galleryEntries.filter((entry) => !entry.video).slice(0, 2);
  const videoPick = galleryEntries.find((entry) => entry.video);
  const picks = videoPick ? [...imagePicks, videoPick] : imagePicks;
  return (
    <Section>
      <Container>
        <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading title="From Our Gallery" description="Food, drinks and moments from the events we have catered." />
          <Button asChild variant="outline">
            <Link href="/gallery">See the gallery</Link>
          </Button>
        </Reveal>
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {picks.map((g, i) => (
            <li key={g.id} className="group overflow-hidden rounded-xl">
              <Reveal delay={i * 0.06}>
                {g.video ? (
                  <GalleryVideo
                    src={g.video}
                    className="aspect-square w-full rounded-xl bg-black object-cover"
                    alt={g.alt}
                  />
                ) : (
                  <Photo src={g.image} alt={g.alt} aspect="aspect-square" imgClassName="transition-transform duration-700 group-hover:scale-[1.05]" sizes="(min-width: 640px) 33vw, 50vw" />
                )}
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
