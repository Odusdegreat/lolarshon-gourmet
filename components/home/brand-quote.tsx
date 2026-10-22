import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";

export function BrandQuote() {
  return (
    <section aria-label="Our philosophy" className="bg-panel text-panel-foreground">
      <Container className="py-16 sm:py-24">
        <Reveal>
          <figure className="mx-auto max-w-3xl text-center">
            <blockquote className="font-serif text-2xl leading-snug sm:text-4xl sm:leading-tight">
              <p>&ldquo;Great food is how we say welcome, thank you and celebrate.&rdquo;</p>
            </blockquote>
            <div aria-hidden className="mx-auto my-7 h-px w-16 bg-champagne" />
            <figcaption className="text-sm tracking-wide text-champagne">Lolarshons Gourmet</figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
