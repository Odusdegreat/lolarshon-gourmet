import { Container, Section } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { Photo } from "@/components/shared/photo";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { EnquiryForm, type EnquiryField } from "@/components/forms/enquiry-form";
import { eventTypes } from "@/data/services";
import { galleryEntries } from "@/data/gallery";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Events & Catering",
  description: "Catering for weddings, birthdays, private dining and receptions in Lagos. Send an event enquiry on WhatsApp.",
  path: "/events",
});

const fields: EnquiryField[] = [
  { name: "name", label: "Your name", type: "text", required: true, half: true },
  { name: "phone", label: "Phone number", type: "tel", required: true, half: true },
  { name: "type", label: "Event type", type: "select", required: true, options: [...eventTypes.map((e) => e.title), "Other"], half: true },
  { name: "guests", label: "Estimated guests", type: "number", required: true, min: 1, half: true },
  { name: "date", label: "Event date", type: "date", required: true, half: true },
  { name: "venue", label: "Venue or area", type: "text", half: true },
  { name: "notes", label: "Tell us about your event", type: "textarea", placeholder: "Menu ideas, drinks, cakes, service style…" },
];

export default function EventsPage() {
  const photos = galleryEntries.filter((g) => g.category === "events");
  return (
    <>
      <PageHero title="Events & Catering" description="From intimate dinners to large celebrations, we plan the food and drinks around your guests." />
      <Section className="py-14 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading title="What we cater" />
          </Reveal>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {eventTypes.map((e) => (
              <li key={e.title} className="rounded-xl border bg-card p-6">
                <h3 className="text-xl font-semibold">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.description}</p>
              </li>
            ))}
          </ul>
          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {photos.map((p) => (
              <li key={p.id}>
                <Photo src={p.image} alt={p.alt} aspect="aspect-[4/3]" />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <Section className="bg-secondary/40 py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeading title="Plan your event with us" description="Share the details and we will come back with menu suggestions and next steps on WhatsApp." />
          </div>
          <EnquiryForm
            heading="Event enquiry"
            fields={fields}
            submitLabel="Send enquiry on WhatsApp"
            toastTitle="Event enquiry ready"
            closing="Please share menu options and next steps. Thank you!"
            note="Your enquiry is only sent once you press send in WhatsApp. We then reply with options and pricing."
          />
        </Container>
      </Section>
    </>
  );
}
