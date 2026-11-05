import { NextRequest, NextResponse } from "next/server";
import { clearBlogManagerSession, isSameOriginRequest } from "@/lib/blog-manager/auth";

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Request origin could not be verified." }, { status: 403 });
  }

  await clearBlogManagerSession(request.nextUrl.protocol === "https:");
  return NextResponse.redirect(new URL("/admin/blog-manager/login", request.nextUrl), 303);
}
