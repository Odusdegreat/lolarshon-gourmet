import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Photo } from "@/components/shared/photo";
import { formatDate } from "@/lib/format";
import type { BlogPost } from "@/types";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow duration-300 hover:shadow-md">
      <Photo src={post.image} alt={post.title} aspect="aspect-[16/10]" className="rounded-none" imgClassName="transition-transform duration-500 group-hover:scale-[1.04]" sizes="(min-width: 768px) 33vw, 100vw" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <Badge>{post.category}</Badge>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        <h3 className="text-xl leading-snug font-semibold">
          <Link href={`/blog/${post.slug}`} prefetch={true} className="after:absolute after:inset-0 hover:text-brand">
            {post.title}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <p className="mt-auto text-xs text-muted-foreground">{post.readingMinutes} min read</p>
      </div>
    </article>
  );
}
