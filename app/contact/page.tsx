import Link from "next/link";
import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container, Section } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { BreadcrumbStructuredData } from "@/components/shared/structured-data";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { EnquiryForm, type EnquiryField } from "@/components/forms/enquiry-form";
import { Button } from "@/components/ui/button";
import { addressLines, mapsDirectionsUrl, siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Restaurant and Bar Location in Surulere, Lagos",
  description: "Find Lolar Shon's Gourmet, a restaurant and bar in Surulere near Aguda, Ojuelegba and Lawanson. View the address, get directions or contact us.",
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
      <BreadcrumbStructuredData items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      <PageHero title="Visit Our Restaurant and Bar in Surulere" description="Get directions to Lolar Shon's Gourmet, near Aguda and Lawanson. Call, email or message us on WhatsApp about food, drinks, reservations and events." />
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
                    <ArrowUpRight aria-hidden className="mr-1 inline size-4 align-text-bottom" />
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
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              If you are looking for restaurants near Aguda or Yaba, our restaurant is at 29 James Robertson Street in Surulere, close to Bode Thomas, Masha, Ojuelegba, Lawanson, Itire, Ijeshatedo and Iponri, with Mushin and Oshodi also in the surrounding area.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton size="lg" label="Message on WhatsApp" message="Hello Lolar Shon's Gourmet, I would like to make an enquiry." />
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${contact.phoneTel}`}>
                  <Phone /> Call us
                </a>
              </Button>
            </div>
            <nav aria-label="Contact page services" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <Link className="text-brand underline underline-offset-4" href="/reservations">Request a reservation</Link>
              <Link className="text-brand underline underline-offset-4" href="/delivery">Ask about food delivery</Link>
              <Link className="text-brand underline underline-offset-4" href="/events">Explore events and entertainment</Link>
            </nav>
          </div>
          <div className="rounded-xl border bg-card p-6 sm:p-8">
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold">
              <MessageCircle aria-hidden className="size-5 text-brand" />
              Send a message
            </h2>
            <EnquiryForm heading="Website enquiry" fields={fields} submitLabel="Send on WhatsApp" toastTitle="Message ready" note="Your message is only sent once you press send in WhatsApp." />
          </div>
        </Container>
      </Section>
    </>
  );
}
