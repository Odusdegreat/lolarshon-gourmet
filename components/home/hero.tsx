"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/shared/photo";

const ease = [0.22, 1, 0.36, 1] as const;
const item = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease, delay },
});

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:px-8 lg:py-24">
        <div>
          <motion.p {...item(0)} className="mb-5 text-sm font-medium tracking-wide text-brand">
            Premium Cuisine · Catering · Events
          </motion.p>
          <motion.h1 {...item(0.08)} className="text-4xl leading-[1.1] font-semibold sm:text-5xl lg:text-6xl">
            More Than Food, It&rsquo;s an Experience
          </motion.h1>
          <motion.p {...item(0.16)} className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            From signature dishes and celebration cakes to full-service catering and gourmet hampers, Lolarshons Gourmet brings carefully prepared food to your table, your event and your door.
          </motion.p>
          <motion.div {...item(0.24)} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/menu/food">Explore Our Menu</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97, clipPath: "inset(6% 6% 6% 6% round 1rem)" }}
          animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 1rem)" }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          className="relative"
        >
          <div aria-hidden className="absolute -right-3 -bottom-3 hidden h-full w-full rounded-2xl border border-champagne/70 sm:block" />
          <Photo src="/images/hero/hero.jpg" alt="A plated gourmet dish prepared by Lolarshons Gourmet" aspect="aspect-[4/4] sm:aspect-[5/4] lg:aspect-[4/5]" priority sizes="(min-width: 1024px) 45vw, 100vw" className="relative rounded-2xl shadow-lg" />
        </motion.div>
      </div>
    </section>
  );
}
