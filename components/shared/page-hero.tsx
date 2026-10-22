import { Reveal } from "@/components/shared/reveal";

export function PageHero({ title, description, eyebrow }: { title: string; description?: string; eyebrow?: string }) {
  return (
    <section className="border-b border-champagne/30 bg-panel text-panel-foreground">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:py-20 lg:px-8">
        <Reveal>
          {eyebrow && <p className="mb-3 text-sm font-medium tracking-wide text-champagne">{eyebrow}</p>}
          <h1 className="max-w-3xl text-4xl leading-tight font-semibold sm:text-5xl">{title}</h1>
          {description && <p className="mt-5 max-w-2xl text-base leading-relaxed text-panel-foreground/85 sm:text-lg">{description}</p>}
        </Reveal>
      </div>
    </section>
  );
}
