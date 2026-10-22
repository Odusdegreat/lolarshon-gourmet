/**
 * Single source of truth for business details.
 * Every component, metadata export, JSON-LD block and WhatsApp link reads from here.
 */

export type SocialLink = { label: string; href: string | null };

export const siteConfig = {
  name: "Lolarshons Gourmet",
  tagline: "More Than Food, It's an Experience",
  description:
    "Premium cuisine, catering, cakes, desserts, mixology and gourmet hampers by Lolarshons Gourmet in Surulere, Lagos.",
  /** Set NEXT_PUBLIC_SITE_URL in production, e.g. https://www.example.com */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, ""),
  locale: "en_NG",

  contact: {
    phoneDisplay: "+234 802 944 7889",
    phoneTel: "+2348029447889",
    /** Override with NEXT_PUBLIC_WHATSAPP_NUMBER. Any format is accepted; it is normalised in lib/whatsapp.ts. */
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+234 802 944 7889",
    email: "lolarshongourmet@gmail.com",
  },

  address: {
    streetAddress: "29 James Robertson Street, off Alhaji Masha Road",
    area: "Surulere",
    city: "Lagos",
    state: "Lagos State",
    country: "Nigeria",
    countryCode: "NG",
  },

  hours: "Daily, 1:00 pm–11:00 pm",

  // TODO: client to supply real social profile URLs. A null href renders a non-clickable label.
  social: [
    { label: "Instagram", href: null },
    { label: "Facebook", href: null },
    { label: "TikTok", href: null },
  ] satisfies SocialLink[],

  /** Illustrative until the client supplies real prices. */
  currency: "NGN",
} as const;

type Address = typeof siteConfig.address;

/** "29 James Robertson Street, off Alhaji Masha Road, Surulere, Lagos, Nigeria" */
export function formatAddress(address: Address = siteConfig.address): string {
  return [address.streetAddress, address.area, address.city, address.country].join(", ");
}

/** Multi-line version for footer and contact page. */
export function addressLines(address: Address = siteConfig.address): string[] {
  return [address.streetAddress, `${address.area}, ${address.city}`, address.country];
}

export function mapsDirectionsUrl(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${siteConfig.name}, ${formatAddress()}`,
  )}`;
}

export function absoluteUrl(path = "/"): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
