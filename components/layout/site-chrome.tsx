"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Logo } from "@/components/layout/logo";
import { BackToTop } from "@/components/ui/back-to-top";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isBlogManager = pathname.startsWith("/admin/blog-manager");
  const isBlogManagerLogin = pathname === "/admin/blog-manager/login";

  return (
    <>
      {isBlogManager ? (
        <header className="border-b border-champagne/40 bg-background px-4 py-3">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between gap-3">
              <Logo priority />
            </div>
          </div>
        </header>
      ) : (
        <Header />
      )}
      <main
        id="main"
        className={`flex-1${isBlogManagerLogin ? " px-4 pb-8" : ""}`}
      >
        {children}
      </main>
      {!isBlogManager && <Footer />}
      {!isBlogManager && <BackToTop />}
    </>
  );
}
