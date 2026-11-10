"use client";

import { useState } from "react";
import { Mic2, Palette, Zap } from "lucide-react";
import { GalleryVideo } from "@/components/shared/gallery-video";
import { Photo } from "@/components/shared/photo";
import { cn } from "@/lib/utils";

const events = [
  {
    id: "karaoke",
    label: "Karaoke",
    description: "Karaoke highlights at Lolar Shon's Gourmet.",
    icon: Mic2,
    media: [
      {
        type: "video",
        src: "/images/menu/singing.mp4",
        poster: "/images/menu/lolar-smile.webp",
        alt: "Karaoke and singing at Lolar Shon's Gourmet",
        caption: "A lively karaoke moment at Lolar Shon's Gourmet.",
      },
    ],
  },
  {
    id: "paint-and-sip",
    label: "Paint & Sip",
    description: "See Paint & Sip moments from Lolar Shon's Gourmet.",
    icon: Palette,
    media: [
      {
        type: "image",
        src: "/images/menu/look-paint.webp",
        alt: "A guest painting at Lolar Shon's Gourmet",
        caption: "A guest enjoying the creative side of Paint & Sip.",
      },
      {
        type: "image",
        src: "/images/menu/snap.webp",
        alt: "Guests enjoying a Paint & Sip event",
        caption: "Good company and creative moments at Paint & Sip.",
      },
    ],
  },
  {
    id: "high-voltage-friday",
    label: "High Voltage Friday",
    description: "Catch the energy of Friday events at Lolar Shon's Gourmet.",
    icon: Zap,
    media: [
      {
        type: "video",
        src: "/images/menu/hype.MP4",
        poster: "/images/gallery/video-hype.jpg",
        alt: "High-energy event at Lolar Shon's Gourmet",
        caption: "A high-energy moment from Friday night.",
      },
      {
        type: "video",
        src: "/images/menu/party.mp4",
        poster: "/images/gallery/video-party.jpg",
        alt: "Party at Lolar Shon's Gourmet",
        caption: "Party highlights from Lolar Shon's Gourmet.",
      },
    ],
  },
] as const;

export function EventTabs() {
  const [selectedId, setSelectedId] = useState<(typeof events)[number]["id"]>(events[0].id);
  const selectedEvent = events.find((event) => event.id === selectedId) ?? events[0];

  return (
    <section aria-label="Explore our events" className="mt-10">
      <div role="group" aria-label="Event types" className="mb-6 flex flex-wrap gap-2">
        {events.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            aria-pressed={selectedId === id}
            onClick={() => setSelectedId(id)}
            className={cn(
              "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-5 text-sm font-medium transition-colors",
              selectedId === id
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-card hover:bg-secondary",
            )}
          >
            <Icon aria-hidden="true" className="size-4" />
            {label}
          </button>
        ))}
      </div>

      <div aria-live="polite">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{selectedEvent.label}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{selectedEvent.description}</p>
        {selectedEvent.media.length > 0 ? (
          <ul className="mt-6 grid gap-6 sm:grid-cols-2">
            {selectedEvent.media.map((media) => (
              <li key={media.src} className="overflow-hidden rounded-xl border bg-card shadow-sm">
                <figure>
                  {media.type === "video" ? (
                    <GalleryVideo
                      src={media.src}
                      poster={media.poster}
                      className="aspect-video w-full bg-black object-cover"
                      alt={media.alt}
                    />
                  ) : (
                    <Photo
                      src={media.src}
                      alt={media.alt}
                      aspect="aspect-video"
                      sizes="(min-width: 640px) 50vw, 100vw"
                    />
                  )}
                  <figcaption className="px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                    {media.caption}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 rounded-xl border border-dashed p-8 text-center text-muted-foreground">
            Photos and videos will be shared here.
          </p>
        )}
      </div>
    </section>
  );
}
