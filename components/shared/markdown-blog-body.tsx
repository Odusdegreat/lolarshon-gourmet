import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { isExternalBlogHref, isSafeBlogHref, isSafeBlogImageSrc } from "@/lib/blog-links";

function inlineMarkdown(text: string, keyPrefix: string): ReactNode[] {
  const tokenPattern = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)|\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)|\*\*(.+?)\*\*|__(.+?)__|~~(.+?)~~|\*(.+?)\*|_(.+?)_|`([^`]+)`/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let tokenIndex = 0;

  for (const match of text.matchAll(tokenPattern)) {
    const index = match.index ?? 0;
    if (index > lastIndex) nodes.push(text.slice(lastIndex, index));
    const key = `${keyPrefix}-${tokenIndex++}`;
    const [token, imageAlt, imageHref, imageTitle, linkText, linkHref, linkTitle, boldStar, boldUnderscore, deleted, italicStar, italicUnderscore, code] = match;

    if (imageAlt !== undefined && isSafeBlogImageSrc(imageHref)) {
      nodes.push(
        <Image
          key={key}
          src={imageHref}
          alt={imageAlt}
          title={imageTitle}
          width={1200}
          height={800}
          unoptimized
          sizes="(min-width: 768px) 768px, 100vw"
          className="my-4 h-auto w-full rounded-xl"
        />,
      );
    } else if (linkText !== undefined && isSafeBlogHref(linkHref)) {
      const children = inlineMarkdown(linkText, key);
      nodes.push(
        linkHref.startsWith("/") && !linkHref.startsWith("//") ? (
          <Link key={key} href={linkHref} className="text-brand underline underline-offset-4">{children}</Link>
        ) : (
          <a key={key} href={linkHref} title={linkTitle} className="text-brand underline underline-offset-4" rel={isExternalBlogHref(linkHref) ? "noopener noreferrer" : undefined}>
            {children}
          </a>
        ),
      );
    } else if (boldStar ?? boldUnderscore) {
      nodes.push(<strong key={key}>{inlineMarkdown(boldStar ?? boldUnderscore, key)}</strong>);
    } else if (deleted !== undefined) {
      nodes.push(<del key={key}>{inlineMarkdown(deleted, key)}</del>);
    } else if (italicStar ?? italicUnderscore) {
      nodes.push(<em key={key}>{inlineMarkdown(italicStar ?? italicUnderscore, key)}</em>);
    } else if (code !== undefined) {
      nodes.push(<code key={key} className="rounded bg-secondary px-1.5 py-0.5 text-[0.9em]">{code}</code>);
    } else {
      nodes.push(token);
    }
    lastIndex = index + token.length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

function isBlockStart(line: string): boolean {
  return /^\s*(#{1,6}\s|>|```|~~~|([-*_]\s*){3,}$|!\[[^\]]*\]\(|(?:[-+*]|\d+[.)])\s+)/.test(line);
}

function standaloneImage(line: string) {
  return /^\s*!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)\s*$/.exec(line);
}

export function MarkdownBlogBody({ markdown }: { markdown: string }) {
  const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index++;
      continue;
    }

    const fence = /^\s*(```|~~~)/.exec(line);
    if (fence) {
      const marker = fence[1];
      const codeLines: string[] = [];
      index++;
      while (index < lines.length && !lines[index].trimStart().startsWith(marker)) codeLines.push(lines[index++]);
      if (index < lines.length) index++;
      blocks.push(<pre key={`markdown-${blocks.length}`} className="overflow-x-auto rounded-lg bg-secondary p-4 text-sm"><code>{codeLines.join("\n")}</code></pre>);
      continue;
    }

    const heading = /^\s{0,3}(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (heading) {
      const children = inlineMarkdown(heading[2], `heading-${blocks.length}`);
      const key = `markdown-${blocks.length}`;
      const level = heading[1].length;
      if (level <= 2) blocks.push(<h2 key={key} className="pt-5 text-2xl font-semibold">{children}</h2>);
      else if (level === 3) blocks.push(<h3 key={key} className="pt-3 text-xl font-semibold">{children}</h3>);
      else blocks.push(<h4 key={key} className="pt-3 text-lg font-semibold">{children}</h4>);
      index++;
      continue;
    }

    const image = standaloneImage(line);
    if (image && isSafeBlogImageSrc(image[2])) {
      blocks.push(
        <figure key={`markdown-${blocks.length}`} className="my-8">
          <Image src={image[2]} alt={image[1]} width={1200} height={800} unoptimized sizes="(min-width: 768px) 768px, 100vw" className="h-auto w-full rounded-xl" />
          {image[3] && <figcaption className="mt-2 text-center text-sm text-muted-foreground">{image[3]}</figcaption>}
        </figure>,
      );
      index++;
      continue;
    }

    if (/^\s*>/.test(line)) {
      const quote: string[] = [];
      while (index < lines.length && /^\s*>/.test(lines[index])) quote.push(lines[index++].replace(/^\s*>\s?/, ""));
      blocks.push(<blockquote key={`markdown-${blocks.length}`} className="border-l-2 border-champagne pl-5 italic">{inlineMarkdown(quote.join(" "), `quote-${blocks.length}`)}</blockquote>);
      continue;
    }

    const listMatch = /^\s*((?:[-+*])|(\d+)[.)])\s+(.+)$/.exec(line);
    if (listMatch) {
      const ordered = Boolean(listMatch[2]);
      const items: string[] = [];
      while (index < lines.length) {
        const item = /^\s*((?:[-+*])|(\d+)[.)])\s+(.+)$/.exec(lines[index]);
        if (!item || Boolean(item[2]) !== ordered) break;
        items.push(item[3]);
        index++;
      }
      const children = items.map((item, itemIndex) => <li key={`item-${itemIndex}`}>{inlineMarkdown(item, `list-${blocks.length}-${itemIndex}`)}</li>);
      blocks.push(ordered
        ? <ol key={`markdown-${blocks.length}`} className="list-decimal space-y-2 pl-6">{children}</ol>
        : <ul key={`markdown-${blocks.length}`} className="list-disc space-y-2 pl-6">{children}</ul>);
      continue;
    }

    if (/^\s*([-*_]\s*){3,}$/.test(line)) {
      blocks.push(<hr key={`markdown-${blocks.length}`} className="border-border" />);
      index++;
      continue;
    }

    const paragraph = [line.trim()];
    index++;
    while (index < lines.length && lines[index].trim() && !isBlockStart(lines[index])) paragraph.push(lines[index++].trim());
    blocks.push(<p key={`markdown-${blocks.length}`} className="text-foreground/90">{inlineMarkdown(paragraph.join(" "), `paragraph-${blocks.length}`)}</p>);
  }

  return <>{blocks}</>;
}
