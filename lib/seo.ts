import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

export const OG_IMAGE = "/images/og-image.jpg";

export function buildMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [{ url: absoluteUrl(OG_IMAGE), width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [absoluteUrl(OG_IMAGE)],
    },
  };
}
