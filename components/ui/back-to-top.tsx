"use client";

import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!visible) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleClick = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    const button = document.getElementById("back-to-top");
    if (button) {
      button.addEventListener("click", handleClick);
      return () => button.removeEventListener("click", handleClick);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <button
      id="back-to-top"
      className="fixed bottom-6 right-6 z-30 flex size-14 cursor-pointer items-center justify-center rounded-full bg-primary shadow-lg transition-colors duration-200 hover:bg-primary/90 focus:outline-none focus:ring-3 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
      aria-label="Back to top"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-7"
        fill="none"
        stroke="var(--primary-foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="5"
      >
        <path d="m4 14 8-8 8 8" />
      </svg>
    </button>
  );
}