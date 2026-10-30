"use client";

import { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { cn } from "@/lib/utils";

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
      className="fixed bottom-6 right-6 z-30 rounded-full bg-primary p-3 hover:bg-primary/90 focus:outline-none focus:ring-3 focus:ring-primary focus:ring-offset-2 bg-primary/10 transition-colors duration-200 cursor-pointer shadow-lg"
      aria-label="Back to top"
    >
      <FaChevronUp className="size-6 text-primary" />
    </button>
  );
}