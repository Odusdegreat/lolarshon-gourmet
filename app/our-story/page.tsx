import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { Photo } from "@/components/shared/photo";
import { SectionHeading } from "@/components/shared/section-heading";
import { BreadcrumbStructuredData } from "@/components/shared/structured-data";
import { buildMetadata } from "@/lib/seo";
import { ContactRound } from "lucide-react";

export const metadata = buildMetadata({
  title: "Our Story and Values",
  description: "The story and values behind Lolar Shon's Gourmet, a restaurant serving a varied menu in Surulere, Lagos.",
  path: "/our-story",
});

const values = [
  { title: "Fresh and carefully prepared", description: "We cook to order and pay attention to ingredients, seasoning and presentation." },
  { title: "Made for your occasion", description: "Every menu is shaped around your guests, your venue and the moment you are celebrating." },
  { title: "Warm hospitality", description: "We treat every order, large or small, as a chance to make someone feel welcome." },
];

export default function OurStoryPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[{ name: "Home", path: "/" }, { name: "Our Story", path: "/our-story" }]} />
      <PageHero title="A Passion for Great Food" description="The thinking behind Lolar Shon's Gourmet." />
      <Section className="py-14 sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Photo src="/images/hero/kitchen.jpg" alt="Preparing food in the Lolar Shon's Gourmet kitchen" aspect="aspect-[4/3]" className="shadow-md" sizes="(min-width: 1024px) 50vw, 100vw" />
          <div className="space-y-5 leading-relaxed text-muted-foreground">
            {/* TODO: client to supply their real brand story. This is placeholder copy. */}
            <p>Lolar Shon&apos;s Gourmet serves a varied menu for everyday meals and special occasions in Lagos, with local favourites, global dishes, cakes and drinks.</p>
            <p>Our approach is simple: use good ingredients, cook with care and present every dish as if it were for our own table. Whether you are dining in or ordering takeaway, you deal directly with our team.</p>
            <p>We are based in Surulere, Lagos, and take orders, reservations and enquiries through WhatsApp so you can speak to a real person.</p>
          </div>
        </Container>
      </Section>
      <Section className="bg-secondary/40 py-14 sm:py-20">
        <Container>
          <SectionHeading title="What we value" />
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <li key={v.title} className="rounded-xl border bg-card p-6">
                <h3 className="text-xl font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/menu/food">Explore Our Menu</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">
                <ContactRound aria-hidden />
                Contact Us
              </Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
