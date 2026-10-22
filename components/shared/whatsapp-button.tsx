import { MessageCircle } from "lucide-react";
import type { VariantProps } from "class-variance-authority";
import { Button, type buttonVariants } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type Props = {
  message: string;
  label?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  className?: string;
};

/** Link to a prefilled WhatsApp chat. Renders disabled (not a broken link) if no valid number is configured. */
export function WhatsAppButton({ message, label = "Chat on WhatsApp", variant = "default", size = "default", className }: Props) {
  const url = buildWhatsAppUrl(message);
  if (!url) {
    return (
      <Button variant={variant} size={size} className={className} disabled title="WhatsApp number not configured">
        <MessageCircle /> {label}
      </Button>
    );
  }
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <MessageCircle /> {label}
        <span className="sr-only"> (opens WhatsApp in a new tab)</span>
      </a>
    </Button>
  );
}
