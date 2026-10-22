"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/shared/photo";
import { galleryCategories } from "@/data/gallery";
import { cn } from "@/lib/utils";
import type { GalleryEntry } from "@/types";

export function GalleryGrid({ entries }: { entries: GalleryEntry[] }) {
  const [category, setCategory] = useState<string>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = category === "all" ? entries : entries.filter((e) => e.category === category);
  const current = openIndex !== null ? visible[openIndex] : null;
  const step = (delta: number) => setOpenIndex((i) => (i === null ? i : (i + delta + visible.length) % visible.length));

  return (
    <div>
      <div role="group" aria-label="Filter gallery" className="-mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {galleryCategories.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={category === c.id}
            onClick={() => setCategory(c.id)}
            className={cn("min-h-11 shrink-0 cursor-pointer rounded-full border px-5 text-sm font-medium transition-[color,background-color,border-color,transform] duration-200 active:scale-[0.98]", category === c.id ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:bg-secondary")}
          >
            {c.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">No photos in this category yet.</p>
      ) : (
        <ul className="columns-2 gap-3 sm:gap-4 lg:columns-3">
          {visible.map((entry, i) => (
            <li key={entry.id} className="mb-3 break-inside-avoid sm:mb-4">
              <button type="button" onClick={() => setOpenIndex(i)} className="group block w-full cursor-zoom-in overflow-hidden rounded-xl text-left focus-visible:ring-2 focus-visible:ring-ring" aria-label={`View larger: ${entry.title}`}>
                <Photo src={entry.image} alt={entry.alt} aspect={i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/3]"} imgClassName="transition-transform duration-500 group-hover:scale-[1.04]" sizes="(min-width: 1024px) 33vw, 50vw" />
              </button>
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
          {current && (
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
