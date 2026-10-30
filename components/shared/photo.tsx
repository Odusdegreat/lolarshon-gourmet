"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type PhotoProps = {
  src: string;
  alt: string;
  aspect?: string;
  className?: string;
  imgClassName?: string;
  [key: string]: any;
};

export function Photo({
  src,
  alt,
  aspect = "aspect-[4/3]",
  className,
  imgClassName,
}: PhotoProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // Check if image failed before hydration (naturalWidth === 0 on mount)
    if (imgRef.current?.complete && imgRef.current.naturalWidth === 0) {
      setShowFallback(true);
    }
  }, []);

  useEffect(() => {
    // Reset fallback state when src changes, allowing image to try again
    setShowFallback(false);
  }, [src]);

  return (
    <div
      className={cn("relative overflow-hidden rounded-xl bg-secondary", aspect, className)}
      style={{ backgroundImage: showFallback ? `url("/images/placeholder-food.jpg")` : `url("${src}")` }}
    >
      {showFallback ? (
        <div
          className="flex size-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-panel via-primary/80 to-champagne/50 p-4 text-center text-panel-foreground"
        >
          <span className="text-sm opacity-70">
            {alt || "Menu Item"}
          </span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className={cn("object-cover", imgClassName)}
          ref={imgRef}
        />
      )}
    </div>
  );
}