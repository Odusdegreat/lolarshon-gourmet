import "server-only";

import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const BLOG_MANAGER_SESSION_COOKIE = "lolarshons-blog-manager-session";
const SESSION_LIFETIME_SECONDS = 8 * 60 * 60;
const MIN_PASSWORD_LENGTH = 8;

export function isBlogManagerAuthConfigured() {
  return Boolean(
    process.env.BLOG_MANAGER_PASSWORD &&
    process.env.BLOG_MANAGER_PASSWORD.length >= MIN_PASSWORD_LENGTH &&
      process.env.BLOG_MANAGER_SESSION_SECRET &&
      process.env.BLOG_MANAGER_SESSION_SECRET.length >= 32,
  );
}

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export async function isBlogManagerAuthenticated() {
  const secret = process.env.BLOG_MANAGER_SESSION_SECRET;
  if (!secret || secret.length < 32) return false;

  const cookieStore = await cookies();
  const token = cookieStore.get(BLOG_MANAGER_SESSION_COOKIE)?.value;
  if (!token) return false;

  const [expiresAt, nonce, signature, ...rest] = token.split(".");
  if (!expiresAt || !nonce || !signature || rest.length > 0) return false;

  const expiresAtSeconds = Number(expiresAt);
  if (!Number.isSafeInteger(expiresAtSeconds) || expiresAtSeconds <= Date.now() / 1000) return false;

  const payload = `${expiresAt}.${nonce}`;
  const expected = Buffer.from(sign(payload, secret));
  const provided = Buffer.from(signature);
  return expected.length === provided.length && timingSafeEqual(expected, provided);
}

export async function createBlogManagerSession(secure: boolean) {
  const secret = process.env.BLOG_MANAGER_SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("Blog Manager session authentication is not configured.");

  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_LIFETIME_SECONDS;
  const nonce = randomBytes(18).toString("base64url");
  const payload = `${expiresAt}.${nonce}`;
  const cookieStore = await cookies();
  cookieStore.set(BLOG_MANAGER_SESSION_COOKIE, `${payload}.${sign(payload, secret)}`, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_LIFETIME_SECONDS,
  });
}

export async function clearBlogManagerSession(secure: boolean) {
  const cookieStore = await cookies();
  cookieStore.set(BLOG_MANAGER_SESSION_COOKIE, "", {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export function verifyBlogManagerPassword(candidate: string) {
  const expectedPassword = process.env.BLOG_MANAGER_PASSWORD;
  if (!expectedPassword) return false;

  const expected = createHash("sha256").update(expectedPassword).digest();
  const provided = createHash("sha256").update(candidate).digest();
  return timingSafeEqual(expected, provided);
}

export function isSameOriginRequest(request: Request & { nextUrl?: URL }) {
  const origin = request.headers.get("origin");
  return origin !== null && origin === request.nextUrl?.origin;
}
