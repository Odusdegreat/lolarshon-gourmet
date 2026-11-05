import { NextRequest, NextResponse } from "next/server";
import { blogIdeaCategories } from "@/data/blog-ideas";
import { isBlogManagerAuthenticated, isSameOriginRequest } from "@/lib/blog-manager/auth";
import { getBlogManagerWriteClient, getGenerationWebhookConfig } from "@/lib/blog-manager/sanity";
import type { BlogTopic } from "@/types/blog-manager";

type GenerationRequestBody = {
  batchId: string;
  topics: BlogTopic[];
};

const isUuid = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

function isValidBody(value: unknown): value is GenerationRequestBody {
  if (!value || typeof value !== "object") return false;
  const body = value as Record<string, unknown>;
  if (typeof body.batchId !== "string" || !isUuid(body.batchId)) return false;
  if (!Array.isArray(body.topics) || body.topics.length < 1 || body.topics.length > 5) return false;
  const seenTopics = new Set<string>();

  return body.topics.every((topic) => {
    if (!topic || typeof topic !== "object") return false;
    const item = topic as Record<string, unknown>;
    if (
      typeof item.title !== "string" ||
      item.title.trim().length < 3 ||
      item.title.trim().length > 180 ||
      typeof item.description !== "string" ||
      item.description.trim().length < 3 ||
      item.description.trim().length > 500 ||
      typeof item.category !== "string" ||
      !blogIdeaCategories.includes(item.category as (typeof blogIdeaCategories)[number])
    ) return false;

    const normalizedTitle = item.title.trim().toLocaleLowerCase();
    if (seenTopics.has(normalizedTitle)) return false;
    seenTopics.add(normalizedTitle);
    return true;
  });
}

function requestDocumentId(batchId: string, index: number) {
  return `blog-generation-${batchId}-${index}`;
}

function getErrorStatusCode(error: unknown) {
  if (error && typeof error === "object" && "statusCode" in error && typeof error.statusCode === "number") {
    return error.statusCode;
  }
  return null;
}

async function updateRequests(batchId: string, count: number, patch: Record<string, unknown>) {
  const client = getBlogManagerWriteClient();
  const transaction = client.transaction();
  for (let index = 0; index < count; index += 1) {
    transaction.patch(requestDocumentId(batchId, index), (current) => current.set(patch));
  }
  await transaction.commit();
}

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Request origin could not be verified." }, { status: 403 });
  }
  if (!(await isBlogManagerAuthenticated())) {
    return NextResponse.json({ error: "Sign in to use the Blog Manager." }, { status: 401 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 16_384) {
    return NextResponse.json({ error: "Request is too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (!isValidBody(body)) {
    return NextResponse.json({ error: "Choose between one and five unique article topics." }, { status: 400 });
  }

  let webhook;
  try {
    webhook = getGenerationWebhookConfig();
    if (!webhook) {
      return NextResponse.json(
        { error: "Article generation is not configured. Set the n8n webhook URL and secret." },
        { status: 503 },
      );
    }

    const client = getBlogManagerWriteClient();
    const requestedAt = new Date().toISOString();
    const transaction = client.transaction();
    const requests = body.topics.map((topic, index) => ({
      _id: requestDocumentId(body.batchId, index),
      _type: "blogGenerationRequest",
      batchId: body.batchId,
      topicIndex: index,
      topic: topic.title.trim(),
      topicDescription: topic.description.trim(),
      category: topic.category,
      status: "pending",
      requestedAt,
    }));
    for (const generationRequest of requests) transaction.create(generationRequest);
    await transaction.commit();

    let response: Response;
    try {
      response = await fetch(webhook.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${webhook.secret}`,
          "X-Blog-Manager-Batch-Id": body.batchId,
        },
        body: JSON.stringify({
          batchId: body.batchId,
          requestedAt,
          requests: requests.map((generationRequest, index) => ({
            requestId: generationRequest._id,
            topic: body.topics[index],
          })),
        }),
        signal: AbortSignal.timeout(20_000),
        cache: "no-store",
      });
    } catch {
      await updateRequests(body.batchId, body.topics.length, {
        status: "failed",
        errorMessage: "Could not reach the configured n8n generation webhook.",
      });
      return NextResponse.json(
        { error: "The generation workflow could not be reached. You can retry these requests from History." },
        { status: 502 },
      );
    }

    if (!response.ok) {
      await updateRequests(body.batchId, body.topics.length, {
        status: "failed",
        errorMessage: `The n8n workflow returned HTTP ${response.status}.`,
      });
      return NextResponse.json(
        { error: "The generation workflow rejected the request. You can retry it from History." },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        accepted: true,
        batchId: body.batchId,
        requests: requests.map((generationRequest) => generationRequest._id),
        status: "pending",
      },
      { status: 202, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    if (error instanceof Error && error.message.includes("SANITY_API_WRITE_TOKEN")) {
      return NextResponse.json(
        { error: "Generation history is unavailable. Configure a Sanity write token with permission to create request records." },
        { status: 503 },
      );
    }
    if (getErrorStatusCode(error) === 403) {
      return NextResponse.json(
        { error: "Sanity rejected the configured write token. Grant it create and update access to blog generation request records." },
        { status: 503 },
      );
    }
    if (getErrorStatusCode(error) === 409) {
      return NextResponse.json(
        { error: "This batch was already recorded. Check generation history before submitting again." },
        { status: 409 },
      );
    }
    console.error("Could not submit Blog Manager generation request.", error);
    return NextResponse.json({ error: "The generation request could not be recorded." }, { status: 500 });
  }
}
