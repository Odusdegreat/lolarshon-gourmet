import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/shared/container";
import { Photo } from "@/components/shared/photo";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

const offerings = [
  { title: "Signature Dishes", description: "Hearty, beautifully plated meals prepared fresh to order.", href: "/menu/food?category=signature-dishes", action: "Order dishes", image: "/images/menu/jollof-grilled-chicken.jpg" },
  { title: "Event Catering", description: "Menus and service planned around your guests and venue.", href: "/events", action: "Plan your event", image: "/images/gallery/events-1.jpg" },
  { title: "Cakes & Desserts", description: "Celebration cakes and sweet treats, made for your occasion.", href: "/menu/food?category=cakes-desserts", action: "Order a cake", image: "/images/menu/red-velvet-cake.jpg" },
  { title: "Food Hampers", description: "Thoughtfully curated gift boxes for birthdays and corporate gifting.", href: "/menu/food?category=hampers", action: "Order a hamper", image: "/images/menu/classic-hamper.jpg" },
];

export function Offerings() {
  return (
    <Section>
      <Container>
        <Reveal>
          <SectionHeading title="Signature Offerings" description="Four ways to enjoy Lolarshons Gourmet, each made with the same attention to detail." />
        </Reveal>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {offerings.map((o, i) => (
            <li key={o.title}>
              <Reveal delay={i * 0.09}>
                <Link href={o.href} className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-md motion-reduce:transform-none">
                  <Photo src={o.image} alt={o.title} aspect="aspect-[4/3]" className="rounded-none" imgClassName="transition-transform duration-700 group-hover:scale-[1.05]" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <h3 className="text-xl font-semibold">{o.title}</h3>
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{o.description}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                      {o.action}
                      <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
