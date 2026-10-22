"use client";

import { useState } from "react";
import Image from "next/image";
import { UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";

type PhotoProps = {
  src?: string;
  alt: string;
  /** Tailwind aspect utility, e.g. "aspect-[4/3]". Ignored when the parent controls height via `fill`. */
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
};

/**
 * Image with a food photography fallback while the local brand photography is gathered.
 */
export function Photo({ src, alt, aspect = "aspect-[4/3]", sizes = "(min-width: 1024px) 33vw, 100vw", priority, className, imgClassName }: PhotoProps) {
  const [failed, setFailed] = useState(false);
  const [placeholderFailed, setPlaceholderFailed] = useState(false);
  const showFallback = !src || failed;
  const fallbackImage = placeholderPhotos[alt] ?? placeholderPhotos.default;

  return (
    <div className={cn("relative overflow-hidden rounded-xl bg-secondary", aspect, className)}>
      {showFallback ? (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0"
        >
          {placeholderFailed ? (
            <div className="flex size-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-panel via-primary/80 to-champagne/50 p-4 text-center text-panel-foreground">
              <UtensilsCrossed aria-hidden className="size-7 opacity-80" />
              <span className="max-w-[18ch] font-serif text-sm leading-snug opacity-90">{alt}</span>
            </div>
          ) : (
            <Image
              src={fallbackImage}
              alt={alt}
              fill
              sizes={sizes}
              priority={priority}
              className={cn("object-cover", imgClassName)}
              onError={() => setPlaceholderFailed(true)}
            />
          )}
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imgClassName)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

const placeholderPhotos: Record<string, string> = {
  default: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
  "A plated gourmet dish prepared by Lolarshons Gourmet": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85",
  "Food being prepared in the Lolarshons Gourmet kitchen": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
  "Preparing food in the Lolarshons Gourmet kitchen": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
};
