export const BLOG_MANAGER_STATUSES = [
  "pending",
  "processing",
  "draftCreated",
  "failed",
  "published",
] as const;

export type BlogManagerStatus = (typeof BLOG_MANAGER_STATUSES)[number];

export type BlogTopic = {
  title: string;
  description: string;
  category: string;
};

export type BlogGenerationRecord = {
  id: string;
  topic: string;
  category: string;
  status: BlogManagerStatus;
  requestedAt: string;
  articleTitle?: string;
  articleSlug?: string;
  errorMessage?: string;
};

export type BlogManagerOverview = {
  generatedArticles: number;
  draftsAwaitingApproval: number;
  publishedArticles: number;
  recentActivity: BlogGenerationRecord[];
  available: boolean;
  unavailableReason?: string;
};
