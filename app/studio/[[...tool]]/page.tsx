import { SanityStudio } from "@/components/sanity/studio";
import { metadata, viewport } from "next-sanity/studio";

export { metadata, viewport };

export const instant = false;

export default function StudioPage() {
  return (
    <div className="fixed inset-0 z-[100] h-dvh w-screen overflow-hidden bg-background">
      <SanityStudio />
    </div>
  );
}
