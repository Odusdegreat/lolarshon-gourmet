import "server-only";

import type { BlogGenerationRecord, BlogManagerOverview, BlogManagerStatus } from "@/types/blog-manager";
import { getBlogManagerReadClient } from "@/lib/blog-manager/sanity";

type SanityGenerationRequest = {
  _id: string;
  topic: string;
  category: string;
  status: string;
  requestedAt: string;
  articleTitle?: string;
  articleSlug?: string;
  errorMessage?: string;
};

const requestsQuery = `*[_type == "blogGenerationRequest"] | order(requestedAt desc) {
  "_id": _id,
  topic,
  category,
  status,
  requestedAt,
  articleTitle,
  articleSlug,
  errorMessage
}`;

const publishedCountQuery = `count(*[_type == "blogPost" && !(_id in path("drafts.**")) && defined(publishedAt) && publishedAt <= now()])`;
const publishedSlugsQuery = `*[_type == "blogPost" && !(_id in path("drafts.**")) && defined(publishedAt) && publishedAt <= now()]{ "slug": slug.current }`;
const draftCountQuery = `count(*[_type == "blogPost" && _id in path("drafts.**")])`;
const generatedCountQuery = `count(*[_type == "blogGenerationRequest" && status in ["draftCreated", "published"]])`;

function mapRequest(document: SanityGenerationRequest): BlogGenerationRecord {
  const statuses: BlogManagerStatus[] = ["pending", "processing", "draftCreated", "failed", "published"];
  if (
    !document._id ||
    !document.topic ||
    !document.category ||
    !document.requestedAt ||
    !statuses.includes(document.status as BlogManagerStatus)
  ) {
    throw new Error("Sanity returned an invalid Blog Manager generation record.");
  }

  return {
    id: document._id,
    topic: document.topic,
    category: document.category,
    status: document.status as BlogManagerStatus,
    requestedAt: document.requestedAt,
    articleTitle: document.articleTitle,
    articleSlug: document.articleSlug,
    errorMessage: document.errorMessage,
  };
}

export async function getGenerationHistory() {
  const client = getBlogManagerReadClient();
  const [documents, publishedSlugs] = await Promise.all([
    client.fetch<SanityGenerationRequest[]>(requestsQuery, {}, { cache: "no-store" }),
    client.fetch<{ slug?: string }[]>(publishedSlugsQuery, {}, { cache: "no-store" }),
  ]);
  const publishedSlugSet = new Set(publishedSlugs.map((post) => post.slug).filter(Boolean));

  return documents.map((document) => {
    const record = mapRequest(document);
    if (record.articleSlug && publishedSlugSet.has(record.articleSlug)) {
      return { ...record, status: "published" as const };
    }
    return record;
  });
}

export async function getBlogManagerOverview(): Promise<BlogManagerOverview> {
  const publishedClient = getBlogManagerReadClient();
  const draftClient = getBlogManagerReadClient("drafts");
  const [generatedArticles, publishedArticles, draftsAwaitingApproval, recentActivity] = await Promise.all([
    publishedClient.fetch<number>(generatedCountQuery, {}, { cache: "no-store" }),
    publishedClient.fetch<number>(publishedCountQuery, {}, { cache: "no-store" }),
    draftClient.fetch<number>(draftCountQuery, {}, { cache: "no-store" }),
    getGenerationHistory(),
  ]);

  return {
    generatedArticles,
    draftsAwaitingApproval,
    publishedArticles,
    recentActivity: recentActivity.slice(0, 5),
    available: true,
  };
}

export function getBlogManagerGenerationSetupIssue() {
  if (!process.env.SANITY_API_READ_TOKEN) return "Configure SANITY_API_READ_TOKEN to load real dashboard statistics.";
  if (!process.env.SANITY_API_WRITE_TOKEN) return "Configure SANITY_API_WRITE_TOKEN to record requests securely.";
  const webhookUrl = process.env.N8N_BLOG_GENERATION_WEBHOOK_URL;
  const webhookSecret = process.env.N8N_BLOG_GENERATION_WEBHOOK_SECRET;
  if (!webhookUrl || !webhookSecret) {
    return "Configure the n8n webhook URL and secret before requesting article generation.";
  }
  try {
    const url = new URL(webhookUrl);
    if (url.username || url.password) {
      return "Store n8n credentials in the server-side secret setting, not in the webhook URL.";
    }
    if (url.protocol !== "https:" && !(url.protocol === "http:" && ["localhost", "127.0.0.1", "::1"].includes(url.hostname))) {
      return "The n8n generation webhook must use HTTPS outside local development.";
    }
  } catch {
    return "N8N_BLOG_GENERATION_WEBHOOK_URL must be a valid HTTPS URL.";
  }
  return null;
}
