/**
 * Single source of truth for business details.
 * Every component, metadata export, JSON-LD block and WhatsApp link reads from here.
 */

export type SocialLink = { label: string; href: string | null };

function getCanonicalSiteUrl(value: string): string {
  const url = new URL(value);
  if (url.hostname === "lolarshonsgourmet.com") {
    url.hostname = "www.lolarshonsgourmet.com";
  }
  return url.origin;
}

export const siteConfig = {
  name: "Lolar Shon's Gourmet",
  tagline: "More Than Food, It's an Experience",
  description:
    "Discover an exceptional dining experience at Lolar Shon's Gourmet in Surulere, Lagos, where authentic Nigerian flavours meet exquisite intercontinental cuisine. Enjoy a carefully curated selection of freshly prepared gourmet dishes, crafted with premium ingredients, creativity and a passion for exceptional taste. Whether you're planning a delightful meal, a special celebration or a corporate event, we bring quality, flavour and elegance to every occasion. Takeaway and catering services are available, with delivery subject to confirmation for your location.",
  /** The apex domain redirects to www; keep generated SEO URLs on the destination host. */
  url: getCanonicalSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lolarshonsgourmet.com"),
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
    { label: "Instagram", href: "https://www.instagram.com/lolarshongourmet?utm_source=ig_web_button_share_sheet&obrf=ZDNlZDc0MzIxNw==" },
    { label: "WhatsApp", href: "https://wa.me/+2348029447889" },
  ] satisfies SocialLink[],

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
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return normalizedPath === "/" ? siteConfig.url : `${siteConfig.url}${normalizedPath}`;
}
