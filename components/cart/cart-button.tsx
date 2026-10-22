"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useCart } from "@/components/cart/cart-provider";

export function CartButton() {
  const { count, setOpen } = useCart();
  const itemLabel = `${count} ${count === 1 ? "item" : "items"}`;
  return (
    <TooltipProvider delayDuration={250}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="relative" onClick={() => setOpen(true)} aria-label={`Open your order, ${itemLabel}`}>
            <ShoppingCart className="size-5" />
            {count > 0 && (
              <span aria-hidden className="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Open your order · {itemLabel}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
