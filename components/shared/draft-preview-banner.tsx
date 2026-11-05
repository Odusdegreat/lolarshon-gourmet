import Link from "next/link";

export function DraftPreviewBanner() {
  return (
    <div className="flex items-center justify-between gap-4 bg-panel px-5 py-3 text-sm text-panel-foreground">
      <span>Draft preview — only you can see this content.</span>
      <Link href="/api/draft-mode/disable" prefetch={false} className="underline underline-offset-4">
        Exit preview
      </Link>
    </div>
  );
}
