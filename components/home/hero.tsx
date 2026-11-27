"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/shared/photo";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import * as anime from "animejs";

const heroPhotos = [
  {
    src: "/images/menu/table-sets.jpeg",
    alt: "Dining tables set for guests at Lolar Shon's Gourmet",
    title: "Table settings",
    width: 817,
    height: 1047,
  },
  {
    src: "/images/menu/gourmet-design.jpg",
    alt: "The dining space at Lolar Shon's Gourmet",
    title: "Lolar Shon's Gourmet",
    width: 828,
    height: 1017,
  },
];

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timeline = anime.createTimeline({
      defaults: {
        duration: 0.8,
        ease: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    });

    // Image: subtle gentle zoom (opacity stays at 1)
    timeline.add(
      heroRef.current.querySelectorAll("div.absolute.inset-0"),
      { scale: [0.95, 1], translateY: [10, 0] }
    );

    // Staggered text entrance: brand label, headline, description, CTA
    timeline.add(
      heroRef.current.querySelectorAll(
        "p.text-brand, h1.text-4xl, p.text-muted-foreground, div.mt-8.flex.flex-col.gap-3.sm\\:flex-row",
      ),
      { opacity: [0, 1], translateY: [20, 0] },
      0.15
    );

    return () => {
      timeline.reverse();
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-secondary">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:px-8 lg:py-24">
        <div>
          <p className="mb-5 text-sm font-medium tracking-wide text-brand">
            Nigerian & International Cuisine · Cocktails · Surulere, Lagos
          </p>
          <h1 className="text-4xl leading-[1.1] font-semibold sm:text-5xl lg:text-6xl">
            Lolar Shon&apos;s <span className="text-brand">Gourmet:</span> Restaurant <span className="text-champagne">&amp; Hangout Spot</span>
          </h1>
          <div className="mt-6 max-w-lg space-y-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              Discover exceptional dining and a vibrant hangout at Lolar Shon’s Gourmet in Surulere, Lagos, where authentic Nigerian flavours meet exquisite intercontinental cuisine.
            </p>
            <p>
              Enjoy freshly prepared gourmet dishes, refreshing drinks, cocktails, alcoholic beverages, exciting games and talented DJs spinning dynamic mixes across diverse music genres in a relaxed, welcoming atmosphere.
            </p>
            <p>
              Perfect for casual hangouts, memorable meals, pre-club nights out, special celebrations and corporate events, we combine great food, drinks, music and entertainment for unforgettable experiences.
            </p>
            <p>
              Takeaway and catering available, with delivery subject to location confirmation.
            </p>
            <p>
              Looking for places to eat in Lagos? Visit us in Surulere for a meal, cocktails or a relaxed group hangout.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/menu/food">Explore Our Menu</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>

        <div className="relative space-y-3">
          <video
            controls
            playsInline
            preload="none"
            poster="/images/menu/intro-pics.jpeg"
            aria-label="Introduction to Lolar Shon's Gourmet"
            className="aspect-video w-full rounded-xl object-cover shadow-lg"
          >
            <source src="/images/menu/passion.mp4" type="video/mp4" />
            Your browser does not support embedded videos.
          </video>
          <div className="grid grid-cols-2 gap-3">
            {heroPhotos.map((photo) => (
              <Dialog key={photo.src}>
                <DialogTrigger asChild>
                  <button type="button" aria-label={`View full image: ${photo.alt}`} className="block w-full rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                    <Photo
                      src={photo.src}
                      alt={photo.alt}
                      aspect="aspect-[4/5]"
                      imgClassName="object-contain transition-transform duration-300 hover:scale-[1.02]"
                      sizes="(min-width: 1024px) 24vw, 50vw"
                    />
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-5xl">
                  <DialogTitle>{photo.title}</DialogTitle>
                  <DialogDescription>{photo.alt}</DialogDescription>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(min-width: 1024px) 80vw, 96vw"
                    className="max-h-[80dvh] w-full rounded-lg object-contain"
                  />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
