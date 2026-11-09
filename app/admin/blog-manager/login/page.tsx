import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { isBlogManagerAuthenticated, isBlogManagerAuthConfigured } from "@/lib/blog-manager/auth";
import { BlogManagerLoginForm } from "@/components/blog-manager/login-form";

export const metadata: Metadata = {
  title: "Sign in to AI Blog Manager",
  robots: { index: false, follow: false },
};

export default async function BlogManagerLoginPage() {
  await connection();
  if (isBlogManagerAuthConfigured() && (await isBlogManagerAuthenticated())) {
    redirect("/admin/blog-manager");
  }

  return (
    <section className="mx-auto flex min-h-[65dvh] max-w-lg flex-col justify-center px-4 py-12">
      <div className="rounded-xl border bg-card p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">Lolar Shon&apos;s Gourmet</p>
        <h1 className="mt-3 text-3xl font-semibold">AI Blog Manager</h1>
        {isBlogManagerAuthConfigured() ? (
          <>
            <p className="mt-2 text-sm text-muted-foreground">Sign in to manage article ideas and generation requests.</p>
            <BlogManagerLoginForm />
          </>
        ) : (
          <div className="mt-5 rounded-lg border border-champagne/60 bg-secondary/50 p-4 text-sm leading-6">
            <p>Admin sign-in is unavailable until the server is configured with:</p>
            <ul className="mt-2 list-inside list-disc">
              <li><code>BLOG_MANAGER_PASSWORD</code> (at least 8 characters)</li>
              <li><code>BLOG_MANAGER_SESSION_SECRET</code> (at least 32 characters)</li>
            </ul>
            <p className="mt-3 text-muted-foreground">Set both as server-only environment variables, then redeploy.</p>
          </div>
        )}
        <Link href="/blog" className="mt-6 inline-block text-sm text-brand underline underline-offset-4">
          Return to the public blog
        </Link>
      </div>
    </section>
  );
}
