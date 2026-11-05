import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Blog Manager Settings", robots: { index: false, follow: false } };

export default function BlogManagerSettingsPage() {
  const sanityReady = Boolean(process.env.SANITY_API_READ_TOKEN && process.env.SANITY_API_WRITE_TOKEN);
  const generationReady = Boolean(
    process.env.N8N_BLOG_GENERATION_WEBHOOK_URL && process.env.N8N_BLOG_GENERATION_WEBHOOK_SECRET,
  );

  return (
    <div className="max-w-3xl">
      <p className="text-sm text-muted-foreground">Blog Manager</p>
      <h1 className="mt-1 text-3xl font-semibold">Settings</h1>
      <p className="mt-2 text-sm text-muted-foreground">Integration status is checked on the server. Secrets are never shown here.</p>
      <div className="mt-6 space-y-3">
        <section className="rounded-xl border border-champagne/50 bg-card p-5">
          <h2 className="font-semibold">Sanity</h2>
          <p className="mt-1 text-sm text-muted-foreground">{sanityReady ? "Read and write credentials are configured." : "One or more server-side Sanity credentials are not configured."}</p>
          <Link className="mt-3 inline-block text-sm text-brand underline underline-offset-4" href="/studio">Open Sanity Studio</Link>
        </section>
        <section className="rounded-xl border border-champagne/50 bg-card p-5">
          <h2 className="font-semibold">AI generation</h2>
          <p className="mt-1 text-sm text-muted-foreground">{generationReady ? "n8n webhook settings are present." : "Generation is unavailable until both server-side n8n webhook settings are configured."}</p>
        </section>
      </div>
    </div>
  );
}
