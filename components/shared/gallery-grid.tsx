"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/shared/photo";
import { GalleryVideo } from "@/components/shared/gallery-video";
import { galleryCategories } from "@/data/gallery";
import { cn } from "@/lib/utils";
import * as anime from "animejs";
import type { GalleryCategory, GalleryEntry } from "@/types";

export function GalleryGrid({ entries }: { entries: GalleryEntry[] }) {
  const searchParams = useSearchParams();
  const requestedCategory = searchParams.get("galleryCategory");
  const category = galleryCategories.find((item) => item.id === requestedCategory)?.id ?? "all";
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const visible = category === "all" ? entries : entries.filter((e) => e.category === category || e.additionalCategories?.includes(category));
  const current = openIndex !== null ? visible[openIndex] : null;
  const step = (delta: number) => setOpenIndex((i) => (i === null ? i : (i + delta + visible.length) % visible.length));
  const selectCategory = (nextCategory: GalleryCategory | "all") => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextCategory === "all") {
      params.delete("galleryCategory");
    } else {
      params.set("galleryCategory", nextCategory);
    }

    const query = params.toString();
    window.history.pushState(null, "", query ? `?${query}` : window.location.pathname);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timeline = anime.createTimeline({
      defaults: {
        ease: "ease-out",
        duration: 0.7,
      },
    });

    // Staggered image reveal with subtle zoom
    timeline.add(
      containerRef.current.querySelectorAll("img, video"),
      { opacity: [0, 1], translateY: [20, 0], scale: [0.95, 1] }
    );
  }, [visible]);

  return (
    <div>
      <div role="group" aria-label="Filter gallery" className="-mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {galleryCategories.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={category === c.id}
            onClick={() => selectCategory(c.id)}
            className={cn("min-h-11 shrink-0 cursor-pointer rounded-full border px-5 text-sm font-medium transition-[color,background-color,border-color,transform] duration-200 active:scale-[0.98]", category === c.id ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:bg-secondary")}
          >
            {c.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">No items in this category yet.</p>
      ) : (
        <ul className="columns-2 gap-3 sm:gap-4 lg:columns-3">
          {visible.map((entry, i) => (
            <li key={entry.id} className="mb-3 break-inside-avoid overflow-hidden rounded-xl border bg-card sm:mb-4">
              <figure>
                {entry.video ? (
                  <GalleryVideo
                    src={entry.video}
                    className="aspect-[4/3] w-full bg-black object-cover"
                    alt={entry.alt}
                  />
                ) : (
                  <button type="button" onClick={() => setOpenIndex(i)} className="group block w-full cursor-zoom-in overflow-hidden text-left focus-visible:ring-2 focus-visible:ring-ring" aria-label={`View larger: ${entry.title}`}>
                    <Photo src={entry.image} alt={entry.alt} aspect={i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/3]"} imgClassName="transition-transform duration-500 group-hover:scale-[1.04]" sizes="(min-width: 1024px) 33vw, 50vw" />
                  </button>
                )}
                <figcaption className="space-y-1 px-3 py-3">
                  <h2 className="text-sm font-semibold">{entry.title}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">{entry.alt}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={current !== null} onOpenChange={(o) => !o && setOpenIndex(null)}>
        <DialogContent
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") step(1);
            if (e.key === "ArrowLeft") step(-1);
          }}
        >
          {current && !current.video && (
            <>
              <Photo src={current.image} alt={current.alt} aspect="aspect-[4/3]" sizes="(min-width: 768px) 768px, 100vw" imgClassName="object-contain bg-black/5" className="max-h-[70dvh] w-full" />
              <div className="flex items-center justify-between gap-3 px-1 pb-1">
                <div>
                  <DialogTitle>{current.title}</DialogTitle>
                  <DialogDescription>{current.alt}</DialogDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => step(-1)} aria-label="Previous photo">
                    <ChevronLeft />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => step(1)} aria-label="Next photo">
                    <ChevronRight />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}