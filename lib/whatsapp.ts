import { siteConfig } from "@/lib/site-config";
import { formatPrice } from "@/lib/format";
import type { CartLine, OrderDetails } from "@/types";

/** Digits only, international format, no "+". Returns null when the number is unusable. */
export function normalizePhone(input: string | undefined | null): string | null {
  if (!input) return null;
  let digits = input.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  // Nigerian local format, e.g. 08029447889 -> 2348029447889
  if (/^0\d{10}$/.test(digits)) digits = `234${digits.slice(1)}`;
  return digits.length >= 10 && digits.length <= 15 ? digits : null;
}

export function getWhatsAppNumber(): string | null {
  const number = normalizePhone(siteConfig.contact.whatsappNumber);
  if (!number && process.env.NODE_ENV !== "production") {
    console.warn(
      "[whatsapp] No valid business WhatsApp number configured. Set NEXT_PUBLIC_WHATSAPP_NUMBER or edit lib/site-config.ts.",
    );
  }
  return number;
}

/** Remove control characters, collapse excess whitespace and cap length. */
export function sanitize(value: string | undefined | null, max = 500): string {
  if (!value) return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, max);
}

export function buildWhatsAppUrl(message: string): string | null {
  const number = getWhatsAppNumber();
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Opens WhatsApp (app on mobile, WhatsApp Web on desktop). Returns false when no valid number is configured. */
export function openWhatsApp(message: string): boolean {
  const url = buildWhatsAppUrl(message);
  if (!url) return false;
  window.open(url, "_blank", "noopener,noreferrer");
  return true;
}

export function buildOrderMessage(lines: CartLine[], details: OrderDetails): string {
  const subtotal = lines.reduce((sum, l) => sum + l.item.price * l.quantity, 0);
  const out: string[] = [`*New order — ${siteConfig.name}*`, ""];

  out.push("*Items*");
  lines.forEach((l, i) => {
    out.push(
      `${i + 1}. ${l.item.name} × ${l.quantity} — ${formatPrice(l.item.price)} each (${formatPrice(l.item.price * l.quantity)})`,
    );
  });
  out.push("", `*Subtotal:* ${formatPrice(subtotal)}`, "_Delivery fee (if any) to be confirmed. Prices shown are subject to confirmation._", "");

  out.push("*Customer details*", `Name: ${sanitize(details.name, 80)}`);
  if (details.phone) out.push(`Phone: ${sanitize(details.phone, 30)}`);
  out.push(`Fulfilment: ${details.fulfilment === "delivery" ? "Delivery" : "Pickup"}`);
  if (details.fulfilment === "delivery") out.push(`Delivery address: ${sanitize(details.address, 250)}`);
  if (details.date || details.time) {
    out.push(`Preferred date/time: ${[sanitize(details.date, 20), sanitize(details.time, 20)].filter(Boolean).join(" ")}`);
  }
  if (details.notes) out.push("", "*Notes*", sanitize(details.notes, 600));

  out.push("", "Please confirm availability, delivery details and payment. Thank you!");
  return out.join("\n");
}

export type EnquiryEntry = { label: string; value: string };

/** Generic enquiry/reservation message builder used by every form. */
export function buildEnquiryMessage(heading: string, entries: EnquiryEntry[], closing?: string): string {
  const out: string[] = [`*${heading} — ${siteConfig.name}*`, ""];
  for (const { label, value } of entries) {
    const clean = sanitize(value, 700);
    if (clean) out.push(`${label}: ${clean}`);
  }
  if (closing) out.push("", closing);
  return out.join("\n");
}
