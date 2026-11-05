import { NextRequest, NextResponse } from "next/server";
import { isBlogManagerAuthenticated, isSameOriginRequest } from "@/lib/blog-manager/auth";
import { getBlogManagerWriteClient } from "@/lib/blog-manager/sanity";

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const acceptedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Request origin could not be verified." }, { status: 403 });
  }
  if (!(await isBlogManagerAuthenticated())) {
    return NextResponse.json({ error: "Sign in to use the Blog Manager." }, { status: 401 });
  }
  if (Number(request.headers.get("content-length") ?? 0) > MAX_IMAGE_BYTES + 32_000) {
    return NextResponse.json({ error: "Image must be 8 MB or smaller." }, { status: 413 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Choose a valid image file." }, { status: 400 });
  }
  const file = form.get("file");
  if (!(file instanceof File) || !acceptedImageTypes.has(file.type) || file.size < 1 || file.size > MAX_IMAGE_BYTES) {
    return NextResponse.json({ error: "Upload a JPEG, PNG, or WebP image up to 8 MB." }, { status: 400 });
  }

  try {
    const asset = await getBlogManagerWriteClient().assets.upload("image", Buffer.from(await file.arrayBuffer()), {
      filename: file.name.slice(0, 200) || "article-image",
      contentType: file.type,
    });
    return NextResponse.json(
      { assetId: asset._id, url: asset.url },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    const statusCode =
      error && typeof error === "object" && "statusCode" in error && typeof error.statusCode === "number"
        ? error.statusCode
        : null;
    if (statusCode === 403) {
      return NextResponse.json({ error: "Sanity rejected the write token. Grant it permission to upload images." }, { status: 503 });
    }
    if (error instanceof Error && error.message.includes("SANITY_API_WRITE_TOKEN")) {
      return NextResponse.json({ error: "Image uploads are not configured. Add SANITY_API_WRITE_TOKEN on the server." }, { status: 503 });
    }
    console.error("Could not upload Blog Manager image to Sanity.", error);
    return NextResponse.json({ error: "The image could not be uploaded to Sanity." }, { status: 500 });
  }
}
