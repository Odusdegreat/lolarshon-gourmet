import { NextRequest, NextResponse } from "next/server";
import { isBlogManagerAuthenticated, isSameOriginRequest } from "@/lib/blog-manager/auth";
import { getBlogManagerReadClient, getBlogManagerWriteClient, getGenerationWebhookConfig } from "@/lib/blog-manager/sanity";

type GenerationRequestDocument = {
  _id: string;
  _rev: string;
  batchId?: string;
  topic: string;
  topicDescription?: string;
  category: string;
  status: string;
};

const isSafeRequestId = (id: string) =>
  /^blog-generation-[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}-[0-4]$/i.test(id);

function getErrorStatusCode(error: unknown) {
  if (error && typeof error === "object" && "statusCode" in error && typeof error.statusCode === "number") {
    return error.statusCode;
  }
  return null;
}

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Request origin could not be verified." }, { status: 403 });
  }
  if (!(await isBlogManagerAuthenticated())) {
    return NextResponse.json({ error: "Sign in to use the Blog Manager." }, { status: 401 });
  }

  const { id } = await context.params;
  if (!isSafeRequestId(id)) {
    return NextResponse.json({ error: "Generation request was not found." }, { status: 404 });
  }

  let webhook;
  try {
    webhook = getGenerationWebhookConfig();
    if (!webhook) {
      return NextResponse.json({ error: "The n8n generation workflow is not configured." }, { status: 503 });
    }

    const readClient = getBlogManagerReadClient();
    const item = await readClient.fetch<GenerationRequestDocument | null>(
      `*[_type == "blogGenerationRequest" && _id == $id][0]{_id, _rev, batchId, topic, topicDescription, category, status}`,
      { id },
      { cache: "no-store" },
    );
    if (!item) return NextResponse.json({ error: "Generation request was not found." }, { status: 404 });
    if (item.status !== "failed") {
      return NextResponse.json({ error: "Only failed requests can be retried." }, { status: 409 });
    }

    await getBlogManagerWriteClient()
      .patch(id)
      .ifRevisionId(item._rev)
      .set({ status: "pending" })
      .unset(["errorMessage"])
      .commit();

    let response: Response;
    try {
      response = await fetch(webhook.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${webhook.secret}`,
          "X-Blog-Manager-Batch-Id": item.batchId ?? id,
        },
        body: JSON.stringify({
          batchId: item.batchId ?? id,
          retry: true,
          requests: [{
            requestId: item._id,
            topic: { title: item.topic, description: item.topicDescription ?? item.topic, category: item.category },
          }],
        }),
        signal: AbortSignal.timeout(20_000),
        cache: "no-store",
      });
    } catch {
      await getBlogManagerWriteClient()
        .patch(id)
        .set({ status: "failed", errorMessage: "Could not reach the configured n8n generation webhook." })
        .commit();
      return NextResponse.json({ error: "The generation workflow could not be reached." }, { status: 502 });
    }

    if (!response.ok) {
      await getBlogManagerWriteClient()
        .patch(id)
        .set({ status: "failed", errorMessage: `The n8n workflow returned HTTP ${response.status}.` })
        .commit();
      return NextResponse.json({ error: "The generation workflow rejected the retry." }, { status: 502 });
    }

    return NextResponse.json({ accepted: true, id, status: "pending" }, { status: 202, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (getErrorStatusCode(error) === 403) {
      return NextResponse.json(
        { error: "Sanity rejected the configured write token. Grant it permission to update generation request records." },
        { status: 503 },
      );
    }
    console.error("Could not retry Blog Manager generation request.", error);
    return NextResponse.json({ error: "The retry could not be recorded." }, { status: 500 });
  }
}
