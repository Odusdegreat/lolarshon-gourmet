import { revalidatePath } from "next/cache";
import { parseBody } from "next-sanity/webhook";
import { NextRequest, NextResponse } from "next/server";

type SanityWebhookPayload = {
  _id?: string;
  _type?: string;
  slug?: string | { current?: string };
};

const safeSlug = (slug: unknown): slug is string =>
  typeof slug === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "SANITY_WEBHOOK_SECRET is not configured." }, { status: 503 });
  }

  let parsed: Awaited<ReturnType<typeof parseBody<SanityWebhookPayload>>>;
  try {
    parsed = await parseBody<SanityWebhookPayload>(request, secret, false);
  } catch (error) {
    console.error("Could not parse Sanity webhook payload.", error);
    return NextResponse.json({ error: "Invalid webhook payload." }, { status: 400 });
  }

  if (parsed.isValidSignature !== true || !parsed.body) {
    return NextResponse.json({ error: "Invalid Sanity webhook signature." }, { status: 401 });
  }

  if (parsed.body._type !== "blogPost") {
    return NextResponse.json({ revalidated: false, reason: "Not a blog post." });
  }

  if (!parsed.body._id) {
    return NextResponse.json({ error: "Missing Sanity document id." }, { status: 400 });
  }

  if (parsed.body._id.startsWith("drafts.")) {
    return NextResponse.json({ revalidated: false, reason: "Draft changes are not public." });
  }

  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");

  const slugValue =
    typeof parsed.body.slug === "string" ? parsed.body.slug : parsed.body.slug?.current;
  if (safeSlug(slugValue)) {
    revalidatePath(`/blog/${slugValue}`);
  }

  return NextResponse.json({ revalidated: true });
}
