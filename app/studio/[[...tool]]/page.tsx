import { SanityStudio } from "@/components/sanity/studio";
import type { Metadata } from "next";
import { metadata as studioMetadata, viewport } from "next-sanity/studio";

export const metadata: Metadata = {
  ...studioMetadata,
  robots: { index: false, follow: false },
};

export { viewport };

export const instant = false;

export default function StudioPage() {
  return (
    <div className="fixed inset-0 z-[100] h-dvh w-screen overflow-hidden bg-background">
      <SanityStudio />
    </div>
  );
}
