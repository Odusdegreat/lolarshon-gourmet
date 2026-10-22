import Link from "next/link";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Separator } from "@/components/ui/separator";
import { footerExplore, footerServices } from "@/data/navigation";
import { addressLines, mapsDirectionsUrl, siteConfig } from "@/lib/site-config";

const linkClass = "text-sm text-panel-foreground/80 transition-colors hover:text-champagne";

function SocialIcon({ label }: { label: string }) {
  if (label === "Instagram") {
    return (
      <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-[18px]">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (label === "Facebook") {
    return (
      <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
        <path d="M13.5 21v-8.2h2.8l.42-3.2H13.5V7.55c0-.93.26-1.56 1.6-1.56h1.72V3.12A23 23 0 0 0 14.3 3c-2.5 0-4.22 1.53-4.22 4.35V9.6H7.25v3.2h2.83V21h3.42Z" />
      </svg>
    );
  }
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.2V2h-3.56v13.67a2.9 2.9 0 0 1-2.9 2.9 2.9 2.9 0 1 1 2.9-2.9c0-.23-.03-.46-.08-.68v-3.63a6.5 6.5 0 1 0 3.64 5.84V9.86a8.37 8.37 0 0 0 4.9 1.57V7.87c-.39 0-.77-.06-1.13-.18Z" />
    </svg>
  );
}

export function Footer() {
  const { contact } = siteConfig;
  return (
    <footer className="bg-panel text-panel-foreground">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div>
            <Logo footer />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-panel-foreground/80">
              Premium cuisine, catering, cakes, desserts and hampers, made with care in Surulere, Lagos.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Social media">
              {siteConfig.social.map((s) => (
                <li key={s.label}>
                  {s.href ? (
                    <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label} className="inline-flex size-10 items-center justify-center rounded-full border border-panel-foreground/20 text-panel-foreground transition-[color,background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-champagne hover:bg-panel-foreground/10 hover:text-champagne focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne">
                      <SocialIcon label={s.label} />
                    </a>
                  ) : (
                    <span className="inline-flex size-10 items-center justify-center rounded-full border border-panel-foreground/15 text-panel-foreground/75" title={`${s.label} link coming soon`} aria-label={`${s.label}, link coming soon`}>
                      <SocialIcon label={s.label} />
                      <span className="sr-only">{s.label}, link coming soon</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Explore">
            <h2 className="mb-4 font-serif text-lg font-semibold">Explore</h2>
            <ul className="space-y-2.5">
              {footerExplore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <h2 className="mb-4 font-serif text-lg font-semibold">Services</h2>
            <ul className="space-y-2.5">
              {footerServices.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 font-serif text-lg font-semibold">Visit & contact</h2>
            <address className="space-y-3 text-sm not-italic text-panel-foreground/80">
              <p className="flex gap-3">
                <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-champagne" />
                <span>
                  {addressLines().map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  <a href={mapsDirectionsUrl()} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block underline underline-offset-4 hover:text-champagne">
                    Get directions<span className="sr-only"> (opens Google Maps)</span>
                  </a>
                </span>
              </p>
              <p className="flex gap-3">
                <Phone aria-hidden className="size-4 shrink-0 text-champagne" />
                <a href={`tel:${contact.phoneTel}`} className="hover:text-champagne">
                  {contact.phoneDisplay}
                </a>
              </p>
              <p className="flex gap-3">
                <Mail aria-hidden className="size-4 shrink-0 text-champagne" />
                <a href={`mailto:${contact.email}`} className="break-all hover:text-champagne">
                  {contact.email}
                </a>
              </p>
              <p className="flex gap-3">
                <Clock aria-hidden className="size-4 shrink-0 text-champagne" />
                <span>{siteConfig.hours}</span>
              </p>
            </address>
          </div>
        </div>

        <Separator className="my-10 bg-panel-foreground/15" />
        <div className="flex flex-col gap-2 text-xs text-panel-foreground/65 sm:flex-row sm:justify-between">
          <p>© {siteConfig.name}. All rights reserved.</p>
          <p>Orders and enquiries are confirmed through WhatsApp. Prices shown are illustrative until confirmed.</p>
        </div>
      </div>
    </footer>
  );
}
