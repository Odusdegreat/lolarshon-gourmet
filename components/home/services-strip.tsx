import Link from "next/link";
import { Building2, CalendarCheck, Truck } from "lucide-react";
import { Container } from "@/components/shared/container";

const services = [
  { title: "Book a Reservation", description: "Reserve a table for your next occasion.", href: "/reservations", icon: CalendarCheck },
  { title: "Food to Your Door", description: "Order for delivery, confirmed on WhatsApp.", href: "/delivery", icon: Truck },
  { title: "Corporate Meals", description: "Lunch boxes, platters and staff events.", href: "/corporate-meals", icon: Building2 },
];

export function ServicesStrip() {
  return (
    <section aria-label="Services" className="border-y bg-secondary/50">
      <Container className="grid gap-px py-2 sm:grid-cols-3">
        {services.map(({ title, description, href, icon: Icon }) => (
          <Link key={href} href={href} className="group flex items-start gap-4 rounded-lg p-5 transition-colors hover:bg-card">
            <span className="mt-0.5 inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Icon aria-hidden className="size-5" />
            </span>
            <span>
              <span className="block font-serif text-lg font-semibold group-hover:text-brand">{title}</span>
              <span className="text-sm text-muted-foreground">{description}</span>
            </span>
          </Link>
        ))}
      </Container>
    </section>
  );
}
