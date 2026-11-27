import { Suspense } from "react";
import Link from "next/link";
import { Container, Section } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { BreadcrumbStructuredData } from "@/components/shared/structured-data";
import { EnquiryForm, type EnquiryField } from "@/components/forms/enquiry-form";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Restaurant Table Reservations in Surulere",
  description: "Request a table for a meal, celebration or group visit at Lolar Shon's Gourmet in Surulere, Lagos. Share your preferred date and time on WhatsApp for confirmation.",
  path: "/reservations",
});

const fields: EnquiryField[] = [
  { name: "name", label: "Full name", type: "text", required: true, half: true },
  { name: "phone", label: "Phone number", type: "tel", required: true, half: true },
  { name: "guests", label: "Number of guests", type: "number", required: true, min: 1, half: true },
  { name: "occasion", label: "Occasion", type: "select", options: ["Birthday", "Anniversary", "Date night", "Family meal", "Business meal", "Other"], half: true },
  { name: "date", label: "Preferred date", type: "date", required: true, half: true },
  { name: "time", label: "Preferred time", type: "time", required: true, half: true },
  { name: "requests", label: "Special requests", type: "textarea", placeholder: "Seating preferences, allergies, celebrations…" },
];

export default function ReservationsPage() {
  return (
    <>
      <BreadcrumbStructuredData items={[{ name: "Home", path: "/" }, { name: "Reservations", path: "/reservations" }]} />
      <PageHero title="Book a Restaurant Reservation in Surulere" description="Request a table for a meal, celebration or group visit at Lolar Shon's Gourmet. Tell us your preferred date and time; our team will confirm availability on WhatsApp." />
      <Section className="py-12 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Suspense fallback={<p role="status" className="rounded-lg border p-4 text-sm text-muted-foreground">Loading reservation form…</p>}>
              <EnquiryForm
                heading="Reservation request"
                fields={fields}
                submitLabel="Send request on WhatsApp"
                closing="Please confirm availability. Thank you!"
                toastTitle="Reservation request ready"
                note="This is a request, not a confirmed booking. Your table is only reserved once our team replies and confirms on WhatsApp."
              />
            </Suspense>
          </div>
          <aside className="h-fit rounded-xl border bg-card p-6">
            <h2 className="text-xl font-semibold">How it works</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground">
              <li>Fill in the form with your preferred date and time.</li>
              <li>WhatsApp opens with your request already written.</li>
              <li>Press send in WhatsApp. We reply to confirm or suggest another time.</li>
            </ol>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Planning a group occasion? Ask about <Link className="text-brand underline underline-offset-4" href="/corporate-meals">private dining and corporate meals</Link>, or view <Link className="text-brand underline underline-offset-4" href="/events">upcoming events at our Surulere lounge</Link>.
            </p>
          </aside>
        </Container>
      </Section>
    </>
  );
}
