import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { BreadcrumbStructuredData } from "@/components/shared/structured-data";
import { deliverySteps } from "@/data/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Food Delivery in Surulere, Lagos",
  description: "Ask about food and drinks delivery from Lolar Shon's Gourmet in Surulere. Send your address on WhatsApp so our team can confirm coverage, fees and timing.",
  path: "/delivery",
});

export default function DeliveryPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[{ name: "Home", path: "/" }, { name: "Delivery", path: "/delivery" }]} />
      <PageHero title="Food and Drinks Delivery" description="Order dishes, beverages or cocktails from our Surulere menu. We confirm delivery availability for your address on WhatsApp." />
      <Section className="py-14 sm:py-20">
        <Container>
          <div className="grid items-center gap-8 sm:grid-cols-[minmax(0,1fr)_auto]">
            <SectionHeading
              title="How delivery works"
              description="Choose food or drinks from our menu and our team will help arrange delivery to your location."
            />
            <Image
              src="/images/menu/delivery-bag.jpeg"
              alt="Lolar Shon's Gourmet branded takeaway bag"
              width={1920}
              height={2560}
              sizes="(min-width: 640px) 240px, 100vw"
              className="mx-auto h-auto max-h-[22rem] w-full max-w-60 rounded-xl object-contain sm:max-h-[28rem]"
            />
          </div>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {deliverySteps.map((s, i) => (
              <li key={s.title} className="rounded-xl border bg-card p-6">
                <span className="mb-4 inline-flex size-9 items-center justify-center rounded-full bg-primary font-serif text-primary-foreground">{i + 1}</span>
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 rounded-xl border border-champagne/60 bg-accent/40 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">Communication and payment on WhatsApp</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
              Delivery details and payment are arranged with our team on WhatsApp. If you are in Surulere or nearby areas such as Yaba, Mushin or Oshodi, send us your address and we will confirm availability, fees and timing. We do not take card payments on this website.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/menu/food">Order Now</Link>
              </Button>
              <WhatsAppButton size="lg" variant="outline" label="Chat on WhatsApp" message="Hello Lolar Shon's Gourmet, I would like to ask about delivery." />
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Browse the <Link className="text-brand underline underline-offset-4" href="/menu/beverages">beverages menu</Link> or <Link className="text-brand underline underline-offset-4" href="/menu/mixology">cocktails and mocktails</Link> as well. Delivery depends on address confirmation.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
