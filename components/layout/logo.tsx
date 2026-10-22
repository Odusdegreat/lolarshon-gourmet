import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

/** The supplied logo artwork already includes the crest and Lolarshons Gourmet wordmark. */
export function Logo({ className, priority = false, asLink = true, footer = false }: { className?: string; priority?: boolean; asLink?: boolean; footer?: boolean }) {
  const image = (
    <span className={cn("inline-flex items-center rounded-md", className)}>
      <Image
        src="/images/lolarshonpic.png"
        alt={siteConfig.name}
        width={250}
        height={103}
        priority={priority}
        className={cn(
          "h-10 w-auto sm:h-11",
          (footer ? "brightness-0 invert" : "dark:brightness-0 dark:invert"),
        )}
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
