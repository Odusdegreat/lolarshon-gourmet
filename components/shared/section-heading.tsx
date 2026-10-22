import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description?: string;
  eyebrow?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({ title, description, eyebrow, align = "left", as: Tag = "h2", className }: Props) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="mb-3 text-sm font-medium tracking-wide text-brand">{eyebrow}</p>}
      <Tag className="text-3xl leading-tight font-semibold sm:text-4xl">{title}</Tag>
      <div className={cn("mt-4 h-px w-16 bg-champagne", align === "center" && "mx-auto")} aria-hidden />
      {description && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>}
    </div>
  );
}
