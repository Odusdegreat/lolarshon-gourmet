import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { EnquiryForm, type EnquiryField } from "@/components/forms/enquiry-form";
import { corporateOptions } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Corporate Meals",
  description: "Office lunch boxes, boardroom platters and staff event catering from Lolarshons Gourmet in Lagos.",
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
      <PageHero title="Corporate Meals" description="Reliable, well-presented food for your team, your meetings and your company events." />
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
          <EnquiryForm
            heading="Corporate meals enquiry"
            fields={fields}
            submitLabel="Send enquiry on WhatsApp"
            toastTitle="Corporate enquiry ready"
            closing="Please share options and pricing. Thank you!"
            note="Your enquiry is only sent once you press send in WhatsApp."
          />
        </Container>
      </Section>
    </>
  );
}
