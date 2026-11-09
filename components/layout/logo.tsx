import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

/** The supplied logo artwork already includes the crest and Lolar Shon's Gourmet wordmark. */
export function Logo({ className, priority = false, asLink = true }: { className?: string; priority?: boolean; asLink?: boolean }) {
  const image = (
    <span className={cn("inline-flex items-center rounded-md", className)}>
      <Image
        src="/images/lolarshonpic.png"
        alt={siteConfig.name}
        width={250}
        height={103}
        priority={priority}
        className="h-10 w-auto brightness-0 invert sm:h-11"
      />
    </span>
  );
  if (!asLink) return image;
  return (
    <Link href="/" aria-label={`${siteConfig.name} home`} className="inline-flex cursor-pointer rounded-md">
      {image}
    </Link>
  );
}
