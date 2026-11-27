import { Suspense } from "react";
import { Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { BreadcrumbStructuredData } from "@/components/shared/structured-data";
import { EnquiryForm, type EnquiryField } from "@/components/forms/enquiry-form";
import { corporateOptions } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Corporate Meals, Catering and Private Dining in Surulere",
  description: "Ask Lolar Shon's Gourmet in Surulere about office lunch boxes, meeting platters, private dining and catering for weddings, birthdays and company events.",
  path: "/corporate-meals",
});

const fields: EnquiryField[] = [
  { name: "company", label: "Company name", type: "text", required: true, half: true },
  { name: "contact", label: "Contact person", type: "text", required: true, half: true },
  { name: "phone", label: "Phone number", type: "tel", required: true, half: true },
  { name: "email", label: "Work email", type: "email", half: true },
  { name: "people", label: "Number of people", type: "number", required: true, min: 1, half: true },
  { name: "date", label: "Date needed", type: "date", half: true },
  { name: "frequency", label: "How often", type: "select", options: ["One-off", "Weekly", "Monthly", "Not sure yet"], half: true },
  { name: "location", label: "Delivery address", type: "text", half: true },
  { name: "notes", label: "Details", type: "textarea", placeholder: "Meal type, dietary needs, budget guidance…" },
];

export default function CorporateMealsPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[{ name: "Home", path: "/" }, { name: "Corporate Meals", path: "/corporate-meals" }]} />
      <PageHero title="Corporate Meals and Private Dining in Surulere" description="Plan office meals, meeting platters or a private dining enquiry with Lolar Shon's Gourmet. Tell us your guest count and location so our team can discuss availability and options." />
      <Section className="py-14 sm:py-20">
        <Container>
          <SectionHeading title="Options for your business" description="Packages and pricing are tailored to your numbers and schedule." />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {corporateOptions.map((o) => (
              <li key={o.title} className="rounded-xl border bg-card p-6">
                <h3 className="text-xl font-semibold">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.description}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
            For individual meals, see our <Link className="text-brand underline underline-offset-4" href="/menu/food">current food menu</Link>. For a table at the restaurant, <Link className="text-brand underline underline-offset-4" href="/reservations">send a reservation request</Link>; availability is confirmed by our team.
          </p>
        </Container>
      </Section>
      <Section className="bg-secondary/40 py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeading title="Request a corporate quote" description="Tell us what your team needs. We reply on WhatsApp with options and pricing." />
            <Button asChild variant="outline" className="mt-6">
              <a href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent("Corporate meals enquiry")}`}>
                <Mail /> Prefer email? {siteConfig.contact.email}
              </a>
            </Button>
          </div>
          <Suspense fallback={<p role="status" className="rounded-lg border p-4 text-sm text-muted-foreground">Loading enquiry form…</p>}>
            <EnquiryForm
              heading="Corporate meals enquiry"
              fields={fields}
              submitLabel="Send enquiry on WhatsApp"
              toastTitle="Corporate enquiry ready"
              closing="Please share options and pricing. Thank you!"
              note="Your enquiry is only sent once you press send in WhatsApp."
            />
          </Suspense>
        </Container>
      </Section>
    </>
  );
}
