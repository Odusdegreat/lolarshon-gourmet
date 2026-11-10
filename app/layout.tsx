import type { Metadata, Viewport } from "next";
import { montserrat, playfair } from "@/app/fonts";
import { Providers } from "@/components/providers";
import { SiteChrome } from "@/components/layout/site-chrome";
import { StructuredData } from "@/components/shared/structured-data";
import { OG_IMAGE } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} | Gourmet Restaurant in Surulere, Lagos`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [{ url: absoluteUrl(OG_IMAGE), width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [absoluteUrl(OG_IMAGE)],
  },
};

export const viewport: Viewport = {
  themeColor: "#160f0e",
};

const { address, contact } = siteConfig;
const socialProfiles = siteConfig.social.flatMap((social) =>
  social.href && social.label !== "WhatsApp" ? [social.href] : [],
);
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/logo.png"),
      },
      sameAs: socialProfiles,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: contact.phoneTel,
        email: contact.email,
        contactType: "reservations and enquiries",
      },
    },
    {
      "@type": "Restaurant",
      "@id": `${siteConfig.url}/#restaurant`,
      name: siteConfig.name,
      url: siteConfig.url,
      image: absoluteUrl(OG_IMAGE),
      telephone: contact.phoneTel,
      email: contact.email,
      parentOrganization: { "@id": `${siteConfig.url}/#organization` },
      address: {
        "@type": "PostalAddress",
        streetAddress: address.streetAddress,
        addressLocality: address.area,
        addressRegion: address.state,
        addressCountry: address.countryCode,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
      inLanguage: "en-NG",
      publisher: { "@id": `${siteConfig.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning className={`dark ${playfair.variable} ${montserrat.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <StructuredData data={jsonLd} />
        <Providers>
          <SiteChrome>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
