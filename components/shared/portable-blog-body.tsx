import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Photo } from "@/components/shared/photo";
import { sanityImageUrl } from "@/sanity/lib/client";
import type { BlogPost } from "@/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-foreground/90">{children}</p>,
    h2: ({ children }) => <h2 className="pt-4 text-2xl font-semibold">{children}</h2>,
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
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "";
      if (!/^(https?:|mailto:|tel:)/i.test(href)) return <>{children}</>;

      return (
        <a href={href} className="text-brand underline underline-offset-4" rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const src = sanityImageUrl(value, 1200);
      if (!src) return null;
      return (
        <Photo
          src={src}
          alt={typeof value.alt === "string" ? value.alt : ""}
          aspect="aspect-[16/9]"
          sizes="(min-width: 768px) 768px, 100vw"
        />
      );
    },
  },
};

export function PortableBlogBody({ body }: { body: BlogPost["body"] }) {
  return <PortableText value={body} components={components} />;
}
