import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/shared/container";
import { MenuCard } from "@/components/menu/menu-card";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { getFeaturedItems } from "@/data/menu";

export function FeaturedMenu() {
  return (
    <Section className="bg-secondary/40">
      <Container>
        <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading title="Featured from the Menu" description="A taste of what we prepare. Prices shown are illustrative until confirmed." />
          <Button asChild variant="outline">
            <Link href="/menu/food">View full menu</Link>
          </Button>
        </Reveal>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {getFeaturedItems().map((item, i) => (
            <li key={item.id}>
              <Reveal delay={i * 0.08}>
                <MenuCard item={item} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
