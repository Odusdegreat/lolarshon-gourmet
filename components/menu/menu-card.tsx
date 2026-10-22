"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/shared/photo";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/format";
import { buildEnquiryMessage } from "@/lib/whatsapp";
import type { MenuItem } from "@/types";

export function MenuCard({ item }: { item: MenuItem }) {
  const { add, setOpen } = useCart();
  const [quantity, setQuantity] = useState(1);

  function handleAdd() {
    add(item, quantity);
    toast.success(`${quantity} × ${item.name} added`, { action: { label: "View order", onClick: () => setOpen(true) } });
    setQuantity(1);
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="overflow-hidden">
        <Photo src={item.image} alt={item.name} aspect="aspect-[4/3]" className="rounded-none" imgClassName="transition-transform duration-500 group-hover:scale-[1.04]" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg leading-snug font-semibold">{item.name}</h3>
          <p className="shrink-0 font-medium text-brand tabular-nums">{formatPrice(item.price)}</p>
        </div>
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>

        {item.orderable ? (
          <div className="mt-1 flex min-w-0 items-center gap-2">
            <div className="inline-flex items-center rounded-md border" role="group" aria-label={`Quantity for ${item.name}`}>
              <Button variant="ghost" size="icon-sm" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label={`Decrease quantity of ${item.name}`} disabled={quantity <= 1}>
                <Minus />
              </Button>
              <span className="w-6 text-center text-sm font-medium tabular-nums" aria-live="polite">
                {quantity}
              </span>
              <Button variant="ghost" size="icon-sm" onClick={() => setQuantity((q) => Math.min(20, q + 1))} aria-label={`Increase quantity of ${item.name}`} disabled={quantity >= 20}>
                <Plus />
              </Button>
            </div>
            <Button size="sm" className="min-w-0 flex-1 px-2 text-xs sm:px-3 sm:text-sm" onClick={handleAdd} aria-label={`Add ${item.name} to your order`}>
              <ShoppingBag />
              <span className="min-[1200px]:hidden">Add</span>
              <span className="hidden min-[1200px]:inline">Add to order</span>
            </Button>
          </div>
        ) : (
          <WhatsAppButton
            variant="outline"
            label="Enquire on WhatsApp"
            className="mt-1 w-full"
            message={buildEnquiryMessage("Menu enquiry", [{ label: "Item", value: item.name }], "Hello, I would like to enquire about this item. Please share availability and details.")}
          />
        )}
      </div>
    </article>
  );
}
