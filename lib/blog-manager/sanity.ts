import "server-only";

import { createClient } from "next-sanity";
import { sanityConfig } from "@/sanity/lib/config";

export function getBlogManagerReadClient(perspective: "published" | "drafts" = "published") {
  const token = process.env.SANITY_API_READ_TOKEN;
  if (!token) {
    throw new Error("SANITY_API_READ_TOKEN is required to load Blog Manager data.");
  }

  return createClient({
    ...sanityConfig,
    token,
    perspective,
    useCdn: false,
  });
}

export function getBlogManagerWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) {
    throw new Error("SANITY_API_WRITE_TOKEN is required to record generation requests.");
  }

  return createClient({
    ...sanityConfig,
    token,
    perspective: "published",
    useCdn: false,
  });
}

export function getGenerationWebhookConfig() {
  const url = process.env.N8N_BLOG_GENERATION_WEBHOOK_URL;
  const secret = process.env.N8N_BLOG_GENERATION_WEBHOOK_SECRET;
  if (!url || !secret) return null;

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    throw new Error("N8N_BLOG_GENERATION_WEBHOOK_URL must be a valid HTTPS URL.");
  }

  if (parsedUrl.username || parsedUrl.password) {
    throw new Error("Store n8n credentials in the server-side secret setting, not in the webhook URL.");
  }

  const isLocalHttp = parsedUrl.protocol === "http:" && ["localhost", "127.0.0.1", "::1"].includes(parsedUrl.hostname);
  if (parsedUrl.protocol !== "https:" && !isLocalHttp) {
    throw new Error("The n8n generation webhook must use HTTPS outside local development.");
  }

  return { url: parsedUrl.toString(), secret };
}
