"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig } from "motion/react";
import { CartProvider } from "@/components/cart/cart-provider";
import { CartSheet } from "@/components/cart/cart-sheet";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <MotionConfig reducedMotion="user">
        <CartProvider>
          {children}
          <CartSheet />
          <Toaster position="top-center" />
        </CartProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
