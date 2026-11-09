import { Container, Section } from "@/components/shared/container";
import { EventTabs } from "@/components/events/event-tabs";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { BreadcrumbStructuredData } from "@/components/shared/structured-data";
import { EnquiryForm, type EnquiryField } from "@/components/forms/enquiry-form";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Restaurant Events in Surulere, Lagos",
  description: "Discover lively events and experiences at Lolar Shon's Gourmet in Lagos, and ask about attending.",
  path: "/events",
});

const attendanceFields: EnquiryField[] = [
  { name: "name", label: "Your name", type: "text", required: true, half: true },
  { name: "phone", label: "Phone number", type: "tel", required: true, half: true },
  { name: "event", label: "Event you are interested in", type: "text", required: true, placeholder: "Event name or type" },
  { name: "attendees", label: "Number attending", type: "number", required: true, min: 1, half: true },
  { name: "notes", label: "Questions or additional details", type: "textarea", placeholder: "Ask us about upcoming events or attending…" },
];

export default function EventsPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[{ name: "Home", path: "/" }, { name: "Events", path: "/events" }]} />
      <PageHero title="Events" description="Join us for lively events and memorable experiences at Lolar Shon's Gourmet." />
      <Section className="py-10 sm:py-16">
        <Container>
          <SectionHeading title="Explore our events" description="Choose an event to see highlights and moments from Lolar Shon's Gourmet." />
          <EventTabs />
        </Container>
      </Section>
      <Section className="bg-secondary/40 py-12 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeading
              title="Plan your event"
              description="Interested in joining us? Ask about upcoming events and attendance. Sending a request does not reserve a place; our team will confirm details with you."
            />
          </div>
          <EnquiryForm
            heading="Event attendance enquiry"
            fields={attendanceFields}
            submitLabel="Ask about attending on WhatsApp"
            toastTitle="Event enquiry ready"
            closing="Please share details about upcoming events and how I can attend. Thank you!"
            note="Your enquiry opens in WhatsApp and is only sent when you press send. Attendance is not confirmed until our team replies."
          />
        </Container>
      </Section>
    </>
  );
}
