"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, Send, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/forms/date-picker";
import { TimePicker } from "@/components/forms/time-picker";
import { Separator } from "@/components/ui/separator";
import { Photo } from "@/components/shared/photo";
import { useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/format";
import { buildOrderMessage, openWhatsApp } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import type { Fulfilment } from "@/types";

type Errors = Partial<Record<"name" | "phone" | "address" | "date", string>>;

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p id={id} role="alert" className="text-sm text-destructive">
      {message}
    </p>
  ) : null;
}

export function CartSheet() {
  const { lines, count, subtotal, open, setOpen, setQuantity, remove, clear } = useCart();
  const [step, setStep] = useState<"cart" | "details">("cart");
  const [fulfilment, setFulfilment] = useState<Fulfilment>("pickup");
  const [form, setForm] = useState({ name: "", phone: "", address: "", date: "", time: "", notes: "" });
  const [errors, setErrors] = useState<Errors>({});

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) setStep("cart");
  }

  function validate(): Errors {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Enter your name so we know who the order is for.";
    if (form.phone.trim() && !/^\+?[\d\s()-]{7,20}$/.test(form.phone.trim())) e.phone = "Enter a valid phone number, or leave it blank.";
    if (fulfilment === "delivery" && !form.address.trim()) e.address = "Enter the delivery address.";
    if (form.date) {
      const chosen = new Date(`${form.date}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (chosen < today) e.date = "Choose today or a future date.";
    }
    return e;
  }

  function handleSend() {
    if (lines.length === 0) return;
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      toast.error("Please check the highlighted fields.");
      return;
    }
    const message = buildOrderMessage(lines, {
      name: form.name,
      phone: form.phone,
      fulfilment,
      address: form.address,
      date: form.date,
      time: form.time,
      notes: form.notes,
    });
    if (!openWhatsApp(message)) {
      toast.error("WhatsApp ordering is not set up yet. Please call us instead.");
      return;
    }
    toast.info("WhatsApp opened", {
      description: "Your order has not been sent yet. Press send in WhatsApp to complete it.",
      duration: 9000,
    });
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side="right" className="gap-0 p-0">
        <SheetHeader className="border-b">
          <SheetTitle>{step === "cart" ? "Your order" : "Order details"}</SheetTitle>
          <SheetDescription>
            {step === "cart" ? "Review your items, then continue to add your details." : "Check your order, then send it to us on WhatsApp."}
          </SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <p className="font-serif text-lg">Your order is empty</p>
            <p className="max-w-xs text-sm text-muted-foreground">Add dishes, cakes, hampers or drinks from the menu to start an order.</p>
            <Button asChild onClick={() => handleOpenChange(false)}>
              <Link href="/menu/food">Browse the menu</Link>
            </Button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {step === "cart" ? (
              <ul className="divide-y px-5">
                {lines.map(({ item, quantity }) => (
                  <li key={item.id} className="flex gap-3 py-4">
                    <Photo src={item.image} alt={item.name} aspect="aspect-square" className="w-20 shrink-0 rounded-lg" sizes="80px" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-serif leading-snug font-semibold">{item.name}</p>
                        <button
                          type="button"
                          onClick={() => remove(item.id)}
                          className="-mt-1 -mr-1 inline-flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-destructive"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground">{formatPrice(item.price)} each</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-md border">
                          <Button variant="ghost" size="icon-sm" onClick={() => setQuantity(item.id, quantity - 1)} aria-label={`Decrease quantity of ${item.name}`}>
                            <Minus />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium tabular-nums" aria-live="polite">
                            {quantity}
                          </span>
                          <Button variant="ghost" size="icon-sm" onClick={() => setQuantity(item.id, quantity + 1)} aria-label={`Increase quantity of ${item.name}`}>
                            <Plus />
                          </Button>
                        </div>
                        <p className="font-medium tabular-nums">{formatPrice(item.price * quantity)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col gap-5 p-5">
                <div className="grid gap-2">
                  <Label htmlFor="order-name">Your name *</Label>
                  <Input id="order-name" autoComplete="name" value={form.name} onChange={update("name")} aria-invalid={!!errors.name} aria-describedby="order-name-err" />
                  <FieldError id="order-name-err" message={errors.name} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="order-phone">Phone number (optional)</Label>
                  <Input id="order-phone" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={update("phone")} aria-invalid={!!errors.phone} aria-describedby="order-phone-err" />
                  <FieldError id="order-phone-err" message={errors.phone} />
                </div>

                <fieldset className="grid gap-2">
                  <legend className="mb-2 text-sm font-medium">Delivery or pickup</legend>
                  <div className="grid grid-cols-2 gap-2">
                    {(["pickup", "delivery"] as const).map((value) => (
                      <label
                        key={value}
                        className={cn(
                          "flex min-h-11 cursor-pointer items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
                          fulfilment === value ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:bg-secondary",
                        )}
                      >
                        <input type="radio" name="fulfilment" value={value} checked={fulfilment === value} onChange={() => setFulfilment(value)} className="sr-only" />
                        {value === "pickup" ? "Pickup" : "Delivery"}
                      </label>
                    ))}
                  </div>
                </fieldset>

                {fulfilment === "delivery" && (
                  <div className="grid gap-2">
                    <Label htmlFor="order-address">Delivery address *</Label>
                    <Textarea id="order-address" autoComplete="street-address" value={form.address} onChange={update("address")} aria-invalid={!!errors.address} aria-describedby="order-address-err" className="min-h-20" />
                    <FieldError id="order-address-err" message={errors.address} />
                    <p className="text-xs text-muted-foreground">Delivery fee and payment are confirmed with our team on WhatsApp.</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="order-date">Preferred date</Label>
                    <DatePicker id="order-date" name="order-date" value={form.date} onChange={(date) => setForm((current) => ({ ...current, date }))} aria-invalid={!!errors.date} aria-describedby="order-date-err" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="order-time">Preferred time</Label>
                    <TimePicker id="order-time" name="order-time" value={form.time} onChange={(time) => setForm((current) => ({ ...current, time }))} />
                  </div>
                  <div className="col-span-2">
                    <FieldError id="order-date-err" message={errors.date} />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="order-notes">Notes (optional)</Label>
                  <Textarea id="order-notes" placeholder="Allergies, spice level, message on a cake…" value={form.notes} onChange={update("notes")} maxLength={600} />
                </div>

                <Separator />

                <section aria-label="Order summary" className="rounded-lg bg-secondary/60 p-4">
                  <h3 className="mb-3 font-serif text-base font-semibold">Order summary</h3>
                  <ul className="space-y-1.5 text-sm">
                    {lines.map(({ item, quantity }) => (
                      <li key={item.id} className="flex justify-between gap-3">
                        <span>
                          {quantity} × {item.name}
                        </span>
                        <span className="tabular-nums">{formatPrice(item.price * quantity)}</span>
                      </li>
                    ))}
                  </ul>
                  <Separator className="my-3" />
                  <p className="flex justify-between font-medium">
                    <span>Subtotal</span>
                    <span className="tabular-nums">{formatPrice(subtotal)}</span>
                  </p>
                </section>
              </div>
            )}
          </div>
        )}

        {lines.length > 0 && (
          <SheetFooter className="border-t bg-card">
            <p className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Subtotal ({count} {count === 1 ? "item" : "items"})</span>
              <span className="font-serif text-xl font-semibold tabular-nums">{formatPrice(subtotal)}</span>
            </p>
            <p className="text-xs text-muted-foreground">Prices are illustrative until confirmed. Delivery fee, if any, is added when we confirm your order.</p>
            {step === "cart" ? (
              <>
                <Button size="lg" onClick={() => setStep("details")}>
                  Continue
                </Button>
                <Button variant="ghost" size="sm" onClick={clear}>
                  <Trash2 /> Clear order
                </Button>
              </>
            ) : (
              <>
                <Button size="lg" onClick={handleSend}>
                  <Send /> Send Order to WhatsApp
                </Button>
                <p className="text-xs text-muted-foreground">
                  This opens WhatsApp with your order ready to send. <strong className="font-semibold text-foreground">Your order is not sent until you press send in WhatsApp.</strong> We then confirm details and payment with you in the chat.
                </p>
                <Button variant="ghost" size="sm" onClick={() => setStep("cart")}>
                  <ArrowLeft /> Back to items
                </Button>
              </>
            )}
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
