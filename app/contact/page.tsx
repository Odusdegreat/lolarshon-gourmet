import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container, Section } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { EnquiryForm, type EnquiryField } from "@/components/forms/enquiry-form";
import { Button } from "@/components/ui/button";
import { addressLines, mapsDirectionsUrl, siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Contact Lolarshons Gourmet: phone, email, WhatsApp and address in Surulere, Lagos.",
  path: "/contact",
});

const fields: EnquiryField[] = [
  { name: "name", label: "Your name", type: "text", required: true, half: true },
  { name: "phone", label: "Phone number", type: "tel", half: true },
  { name: "message", label: "Message", type: "textarea", required: true, placeholder: "How can we help?" },
];

export default function ContactPage() {
  const { contact } = siteConfig;
  return (
    <>
      <PageHero title="Contact Us" description="Call, email or message us on WhatsApp. We are happy to help with orders, events and questions." />
      <Section className="py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-8">
            <address className="space-y-5 not-italic">
              <p className="flex gap-4">
                <MapPin aria-hidden className="mt-1 size-5 shrink-0 text-brand" />
                <span>
                  <span className="block font-serif text-lg font-semibold">Address</span>
                  {addressLines().map((l) => (
                    <span key={l} className="block text-muted-foreground">
                      {l}
                    </span>
                  ))}
                  <a href={mapsDirectionsUrl()} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-brand underline underline-offset-4">
                    Get directions<span className="sr-only"> (opens Google Maps)</span>
                  </a>
                </span>
              </p>
              <p className="flex gap-4">
                <Phone aria-hidden className="mt-1 size-5 shrink-0 text-brand" />
                <span>
                  <span className="block font-serif text-lg font-semibold">Phone & WhatsApp</span>
                  <a href={`tel:${contact.phoneTel}`} className="text-muted-foreground hover:text-brand">
                    {contact.phoneDisplay}
                  </a>
                </span>
              </p>
              <p className="flex gap-4">
                <Mail aria-hidden className="mt-1 size-5 shrink-0 text-brand" />
                <span>
                  <span className="block font-serif text-lg font-semibold">Email</span>
                  <a href={`mailto:${contact.email}`} className="break-all text-muted-foreground hover:text-brand">
                    {contact.email}
                  </a>
                </span>
              </p>
              <p className="flex gap-4">
                <Clock aria-hidden className="mt-1 size-5 shrink-0 text-brand" />
                <span>
                  <span className="block font-serif text-lg font-semibold">Opening hours</span>
                  <span className="text-muted-foreground">{siteConfig.hours}</span>
                </span>
              </p>
            </address>
            <div className="flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton size="lg" label="Message on WhatsApp" message="Hello Lolarshons Gourmet, I would like to make an enquiry." />
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${contact.phoneTel}`}>
                  <Phone /> Call us
                </a>
              </Button>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 sm:p-8">
            <h2 className="mb-6 text-2xl font-semibold">Send a message</h2>
            <EnquiryForm heading="Website enquiry" fields={fields} submitLabel="Send on WhatsApp" toastTitle="Message ready" note="Your message is only sent once you press send in WhatsApp." />
          </div>
        </Container>
      </Section>
    </>
  );
}
