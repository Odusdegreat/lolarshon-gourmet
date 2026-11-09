import type { Metadata, Viewport } from "next";
import { montserrat, playfair } from "@/app/fonts";
import { Providers } from "@/components/providers";
import { SiteChrome } from "@/components/layout/site-chrome";
import { OG_IMAGE } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} | Premium Food, Catering & Events in Lagos`, template: `%s | ${siteConfig.name}` },
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
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: siteConfig.name,
  url: siteConfig.url,
  image: absoluteUrl("/images/logo.png"),
  telephone: contact.phoneTel,
  email: contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: address.streetAddress,
    addressLocality: `${address.area}, ${address.city}`,
    addressRegion: address.state,
    addressCountry: address.countryCode,
  },
  sameAs: siteConfig.social.flatMap((s) => (s.href ? [s.href] : [])),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning className={`dark ${playfair.variable} ${montserrat.variable}`}>
      <body className="flex min-h-dvh flex-col">
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        <Providers>
          <SiteChrome>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
