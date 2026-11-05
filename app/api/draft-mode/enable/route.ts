import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { sanityClient } from "@/sanity/lib/client";

const readToken = process.env.SANITY_API_READ_TOKEN;

const enableDraftMode = readToken
  ? defineEnableDraftMode({ client: sanityClient.withConfig({ token: readToken, useCdn: false }) })
  : null;

export async function GET(request: Request) {
  if (!enableDraftMode) {
    return new Response("SANITY_API_READ_TOKEN is not configured.", { status: 503 });
  }

  return enableDraftMode.GET(request);
}
