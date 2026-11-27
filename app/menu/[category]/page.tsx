import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MenuBrowser } from "@/components/menu/menu-browser";
import { Container, Section } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { BreadcrumbStructuredData } from "@/components/shared/structured-data";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { getItemsBySection, menuSections } from "@/data/menu";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { MenuSection } from "@/types";

const slugs = Object.keys(menuSections) as MenuSection[];

export function generateStaticParams() {
  return slugs.map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps<"/menu/[category]">): Promise<Metadata> {
  const { category } = await params;
  const section = menuSections[category as MenuSection];
  if (!section) return {};
  const seoContent: Record<MenuSection, { title: string; description: string }> = {
    food: {
      title: "Nigerian and Intercontinental Food Menu in Surulere",
      description: "See Nigerian favourites and intercontinental meals at Lolar Shon's Gourmet, a Surulere restaurant serving rice, soups, grills, seafood, pasta and desserts.",
    },
    beverages: {
      title: "Drinks, Zobo and Beverages in Surulere",
      description: "Browse palm wine, zobo, soft drinks, juices, tea, coffee and energy drinks at Lolar Shon's Gourmet in Surulere, Lagos.",
    },
    mixology: {
      title: "Cocktails, Mocktails and Bar Menu in Surulere",
      description: "Explore cocktails, mocktails, beer, wine and spirits at Lolar Shon's Gourmet, a restaurant and bar in Surulere, Lagos.",
    },
  };
  return buildMetadata({ ...seoContent[section.slug], path: `/menu/${section.slug}` });
}

export default async function MenuCategoryPage({ params }: PageProps<"/menu/[category]">) {
  const { category } = await params;
  const section = menuSections[category as MenuSection];
  if (!section) notFound();

  return (
    <>
      <BreadcrumbStructuredData items={[{ name: "Home", path: "/" }, { name: section.title, path: `/menu/${section.slug}` }]} />
      <PageHero title={section.title} description={section.description} eyebrow="Menus" />
      <Section className="py-10 sm:py-16">
        <Container>
          <nav aria-label="Menus" className="mb-8 flex flex-wrap gap-2">
            {slugs.map((slug) => (
              <Link
                key={slug}
                href={`/menu/${slug}`}
                aria-current={slug === section.slug ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 cursor-pointer items-center rounded-full border px-5 text-sm font-medium transition-colors",
                  slug === section.slug ? "border-champagne bg-accent text-accent-foreground" : "hover:bg-secondary",
                )}
              >
                {menuSections[slug].title}
              </Link>
            ))}
          </nav>

          <p className="mb-8 max-w-3xl leading-relaxed text-muted-foreground">
            {section.slug === "food" && <>Looking for a Nigerian restaurant in Surulere or intercontinental food nearby? Browse our current dishes, then <Link className="text-brand underline underline-offset-4" href="/reservations">request a table</Link> or <Link className="text-brand underline underline-offset-4" href="/delivery">ask about food delivery in Surulere</Link>.</>}
            {section.slug === "beverages" && <>Pair your meal with a refreshing drink, or explore our <Link className="text-brand underline underline-offset-4" href="/menu/mixology">cocktail and mocktail menu</Link>. Visit our <Link className="text-brand underline underline-offset-4" href="/contact">Surulere restaurant and bar</Link> or ask about delivery availability.</>}
            {section.slug === "mixology" && <>Explore the drinks menu at our Surulere restaurant and bar. For a table or group visit, <Link className="text-brand underline underline-offset-4" href="/reservations">send a reservation request</Link>; our team will confirm availability.</>}
          </p>

          {section.notice && <p className="mb-6 rounded-lg border border-champagne/60 bg-accent/50 px-4 py-3 text-sm">{section.notice}</p>}
          <Suspense fallback={<p className="py-10 text-center text-muted-foreground">Loading menu…</p>}>
            <MenuBrowser section={section} items={getItemsBySection(section.slug)} />
          </Suspense>

          <div className="mt-14 flex flex-col items-start gap-4 rounded-xl border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm text-muted-foreground">Looking for something that is not listed, or a larger order? Message us and we will help.</p>
            <WhatsAppButton variant="outline" label="Ask on WhatsApp" message="Hello Lolar Shon's Gourmet, I have a question about your menu." />
          </div>
        </Container>
      </Section>
    </>
  );
}
