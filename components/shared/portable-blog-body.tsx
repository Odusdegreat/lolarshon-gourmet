import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url";
import { isExternalBlogHref, isSafeBlogHref } from "@/lib/blog-links";
import { sanityImageSrcSet, sanityImageUrl } from "@/sanity/lib/client";
import type { BlogPost } from "@/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-foreground/90">{children}</p>,
    h2: ({ children }) => <h2 className="pt-5 text-2xl font-semibold">{children}</h2>,
    h3: ({ children }) => <h3 className="pt-3 text-xl font-semibold">{children}</h3>,
    blockquote: ({ children }) => <blockquote className="border-l-2 border-champagne pl-5 italic">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc space-y-2 pl-6">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal space-y-2 pl-6">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "";
      if (!isSafeBlogHref(href)) return <>{children}</>;

      return (
        <a href={href} className="text-brand underline underline-offset-4" rel={isExternalBlogHref(href) ? "noopener noreferrer" : undefined}>
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const image = value as typeof value & {
        alt?: string;
        caption?: string;
        asset?: { _ref?: string };
        assetMetadata?: { dimensions?: { width?: number; height?: number } };
      };
      const src = sanityImageUrl(value as SanityImageSource, 1200);
      if (!src) return null;
      const intrinsicWidth = image.assetMetadata?.dimensions?.width ?? 1200;
      const intrinsicHeight = image.assetMetadata?.dimensions?.height ?? 800;
      const widths = [320, 480, 768, 1200, 1600].filter((width) => width < intrinsicWidth);
      widths.push(intrinsicWidth);
      return (
        <figure className="my-8">
          {/* Sanity's image builder creates this responsive srcSet; intrinsic dimensions preserve the source aspect ratio. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            srcSet={sanityImageSrcSet(value as SanityImageSource, widths)}
            sizes="(min-width: 768px) 768px, 100vw"
            width={intrinsicWidth}
            height={intrinsicHeight}
            alt={typeof image.alt === "string" ? image.alt : ""}
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded-xl"
          />
          {typeof image.caption === "string" && image.caption.trim() && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">{image.caption}</figcaption>
          )}
        </figure>
      );
    },
  },
};

export function PortableBlogBody({ body }: { body: BlogPost["body"] }) {
  return <PortableText value={body} components={components} />;
}
