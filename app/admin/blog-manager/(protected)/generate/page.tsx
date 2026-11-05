import type { Metadata } from "next";
import { getBlogManagerGenerationSetupIssue, getBlogManagerOverview } from "@/lib/blog-manager/data";
import type { BlogManagerOverview } from "@/types/blog-manager";
import { GenerationDashboard } from "@/components/blog-manager/generation-dashboard";

export const metadata: Metadata = {
  title: "AI Article Generator",
  robots: { index: false, follow: false },
};

export default async function BlogManagerGeneratePage() {
  let overview: BlogManagerOverview;
  try {
    overview = await getBlogManagerOverview();
  } catch (error) {
    console.error("Could not load Blog Manager overview from Sanity.", error);
    overview = {
      generatedArticles: 0,
      draftsAwaitingApproval: 0,
      publishedArticles: 0,
      recentActivity: [],
      available: false,
      unavailableReason: "Dashboard data could not be loaded from Sanity. Check server-side read-token permissions.",
    };
  }

  return (
    <GenerationDashboard
      overview={overview}
      generationSetupIssue={getBlogManagerGenerationSetupIssue()}
    />
  );
}
