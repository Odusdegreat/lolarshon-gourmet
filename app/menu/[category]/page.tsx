import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MenuBrowser } from "@/components/menu/menu-browser";
import { Container, Section } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { getItemsBySection, menuSections, PRICES_ARE_ILLUSTRATIVE } from "@/data/menu";
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
  return buildMetadata({ title: section.title, description: section.description, path: `/menu/${section.slug}` });
}

export default async function MenuCategoryPage({ params }: PageProps<"/menu/[category]">) {
  const { category } = await params;
  const section = menuSections[category as MenuSection];
  if (!section) notFound();

  return (
    <>
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

          {section.notice && <p className="mb-6 rounded-lg border border-champagne/60 bg-accent/50 px-4 py-3 text-sm">{section.notice}</p>}
          {PRICES_ARE_ILLUSTRATIVE && <p className="mb-8 text-sm text-muted-foreground">Prices are illustrative until confirmed by Lolarshons Gourmet.</p>}

          <Suspense fallback={<p className="py-10 text-center text-muted-foreground">Loading menu…</p>}>
            <MenuBrowser section={section} items={getItemsBySection(section.slug)} />
          </Suspense>

          <div className="mt-14 flex flex-col items-start gap-4 rounded-xl border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm text-muted-foreground">Looking for something that is not listed, or a larger order? Message us and we will help.</p>
            <WhatsAppButton variant="outline" label="Ask on WhatsApp" message="Hello Lolarshons Gourmet, I have a question about your menu." />
          </div>
        </Container>
      </Section>
    </>
  );
}
