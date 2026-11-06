import { Container, Section } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { Photo } from "@/components/shared/photo";
import { SectionHeading } from "@/components/shared/section-heading";
import { EnquiryForm, type EnquiryField } from "@/components/forms/enquiry-form";
import { galleryEntries } from "@/data/gallery";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Events",
  description: "Discover lively events and experiences at Lolarshons Gourmet in Lagos, and ask about attending.",
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
  const eventVideos = galleryEntries.filter((entry) => entry.category === "events" && entry.video);
  return (
    <>
      <PageHero title="Events" description="Join us for lively events and memorable experiences at Lolarshons Gourmet." />
      <Section className="py-10 sm:py-16">
        <Container>
          <SectionHeading title="Moments from our events" description="Watch highlights from events at Lolarshons Gourmet." />
          <div className="relative mt-8 overflow-hidden rounded-xl border bg-card shadow-sm">
            <Photo
              src="/images/menu/sunset.png"
              alt="Sunset at Lolarshons Gourmet"
              aspect="aspect-[16/7]"
              sizes="(min-width: 1280px) 1184px, calc(100vw - 40px)"
              className="rounded-none bg-black/10"
              imgClassName="object-contain"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/10 to-transparent p-5 sm:p-8">
              <p className="rounded-full border border-white/40 bg-black/35 px-4 py-2 text-sm font-semibold tracking-wide text-white backdrop-blur-sm sm:text-base">
                Upcoming events — coming soon
              </p>
            </div>
          </div>
          {eventVideos.length > 0 ? (
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {eventVideos.map((entry) => (
                <li key={entry.id} className="overflow-hidden rounded-xl border bg-card shadow-sm">
                  <video
                    src={entry.video}
                    poster={entry.image}
                    controls
                    playsInline
                    preload="metadata"
                    aria-label={entry.alt}
                    className="aspect-video w-full bg-black object-cover"
                  />
                  <div className="p-4">
                    <h2 className="font-semibold">{entry.title}</h2>
                  </div>
              </li>
            ))}
          </ul>
          ) : (
            <p className="mt-8 rounded-xl border border-dashed p-8 text-center text-muted-foreground">
              Event videos will be shared here.
            </p>
          )}
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
