import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { deliverySteps } from "@/data/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Food to Your Door",
  description: "Order Lolarshons Gourmet for delivery. Build your order online, then confirm delivery details and payment with us on WhatsApp.",
  path: "/delivery",
});

export default function DeliveryPage() {
  return (
    <>
      <PageHero title="Food to Your Door" description="Order from the menu and we will arrange delivery with you directly on WhatsApp." />
      <Section className="py-14 sm:py-20">
        <Container>
          <SectionHeading title="How delivery works" />
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
              Delivery details and payment are arranged with our team on WhatsApp. We do not take card payments on this website. Delivery areas, fees and timings are confirmed with you in the chat.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/menu/food">Order Now</Link>
              </Button>
              <WhatsAppButton size="lg" variant="outline" label="Chat on WhatsApp" message="Hello Lolarshons Gourmet, I would like to ask about delivery." />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
