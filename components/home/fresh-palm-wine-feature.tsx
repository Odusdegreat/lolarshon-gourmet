import Image from "next/image";
import { Container, Section } from "@/components/shared/container";

export function FreshPalmWineFeature() {
  return (
    <Section className="bg-secondary/40">
      <Container>
        <figure className="mx-auto max-w-xl text-center">
          <Image
            src="/images/menu/freshly-palm-wine.jpeg"
            alt="Freshly tapped palm wine, now available at Lolar Shon's Gourmet"
            width={1080}
            height={1350}
            sizes="(min-width: 640px) 576px, 100vw"
            className="h-auto w-full rounded-xl shadow-sm"
          />
          <figcaption className="mt-5 text-lg font-semibold tracking-wide text-brand sm:text-xl">
            FRESH...No sweeteners or Preservatives!
          </figcaption>
        </figure>
      </Container>
    </Section>
  );
}
