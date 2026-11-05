import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GenerationHistory } from "@/components/blog-manager/generation-history";
import { getGenerationHistory } from "@/lib/blog-manager/data";
import { getBlogManagerGenerationSetupIssue } from "@/lib/blog-manager/data";
import type { BlogGenerationRecord } from "@/types/blog-manager";

export const metadata: Metadata = {
  title: "Generation History",
  robots: { index: false, follow: false },
};

export default async function BlogManagerHistoryPage() {
  let requests: BlogGenerationRecord[] = [];
  let unavailableReason: string | null = null;
  try {
    requests = await getGenerationHistory();
  } catch (error) {
    console.error("Could not load Blog Manager history from Sanity.", error);
    unavailableReason = "Generation history could not be loaded from Sanity. Check server-side read-token permissions.";
  }

  return (
    <div>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">AI Blog Manager</p>
          <h1 className="mt-1 text-3xl font-semibold">Generation history</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Track requested topics and the workflow status recorded in Sanity.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/blog-manager">Back to dashboard</Link>
        </Button>
      </div>
      <GenerationHistory
        initialRequests={requests}
        unavailableReason={unavailableReason}
        retryAvailable={!getBlogManagerGenerationSetupIssue()}
      />
    </div>
  );
}
