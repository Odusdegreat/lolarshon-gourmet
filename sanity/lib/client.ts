import "server-only";

import { createImageUrlBuilder } from "@sanity/image-url";
import { createClient } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityConfig } from "@/sanity/lib/config";

export const sanityClient = createClient({
  ...sanityConfig,
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
  perspective: "published",
});

export function getDraftClient() {
  const token = process.env.SANITY_API_READ_TOKEN;
  if (!token) {
    throw new Error("SANITY_API_READ_TOKEN is required to preview draft articles.");
  }

  return sanityClient.withConfig({
    token,
    perspective: "drafts",
    useCdn: false,
  });
}

const imageBuilder = createImageUrlBuilder(sanityClient);

export function sanityImageUrl(source: SanityImageSource | null | undefined, width = 1600): string | null {
  if (!source) return null;
  return imageBuilder.image(source).width(width).auto("format").url();
}
