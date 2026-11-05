import { NextRequest, NextResponse } from "next/server";
import {
  createBlogManagerSession,
  isBlogManagerAuthConfigured,
  isSameOriginRequest,
  verifyBlogManagerPassword,
} from "@/lib/blog-manager/auth";

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Request origin could not be verified." }, { status: 403 });
  }
  if (!isBlogManagerAuthConfigured()) {
    return NextResponse.json(
      { error: "Set a 16-character BLOG_MANAGER_PASSWORD and a 32-character BLOG_MANAGER_SESSION_SECRET on the server." },
      { status: 503 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 4096) {
    return NextResponse.json({ error: "Request is too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || !("password" in body) || typeof body.password !== "string" || body.password.length > 1024) {
    return NextResponse.json({ error: "Enter the Blog Manager password." }, { status: 400 });
  }
  if (!verifyBlogManagerPassword(body.password)) {
    return NextResponse.json({ error: "The password is incorrect." }, { status: 401 });
  }

  await createBlogManagerSession(request.nextUrl.protocol === "https:");
  return NextResponse.json({ authenticated: true }, { headers: { "Cache-Control": "no-store" } });
}
