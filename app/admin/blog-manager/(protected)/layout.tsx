import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { isBlogManagerAuthenticated, isBlogManagerAuthConfigured } from "@/lib/blog-manager/auth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export const metadata: Metadata = {
  title: "AI Blog Manager",
  robots: { index: false, follow: false },
};

const navigation = [
  { href: "/admin/blog-manager", label: "Overview" },
  { href: "/admin/blog-manager/articles", label: "All Articles" },
  { href: "/admin/blog-manager/create", label: "Create Article" },
  { href: "/admin/blog-manager/generate", label: "AI Article Generator" },
  { href: "/admin/blog-manager/history", label: "Article History" },
  { href: "/admin/blog-manager/settings", label: "Settings" },
];

function AuthenticationSetupMessage() {
  return (
    <div className="mx-auto my-16 max-w-2xl rounded-xl border bg-card p-8 shadow-sm">
      <h1 className="text-2xl font-semibold">AI Blog Manager setup required</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Admin access is locked until the server has a <code>BLOG_MANAGER_PASSWORD</code> of at least 8 characters and a
        <code> BLOG_MANAGER_SESSION_SECRET</code> containing at least 32 characters.
      </p>
    </div>
  );
}

export default async function BlogManagerLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await connection();
  if (!isBlogManagerAuthConfigured()) {
    return <AuthenticationSetupMessage />;
  }
  if (!(await isBlogManagerAuthenticated())) {
    redirect("/admin/blog-manager/login");
  }

  return (
    <section className="min-h-[65dvh] bg-background">
      <header className="border-b border-champagne/40 bg-card">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:px-8">
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">Lolarshons Gourmet</p>
            <p className="mt-1 truncate font-serif text-lg sm:text-xl">AI Blog Manager</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <nav aria-label="Blog Manager" className="hidden items-center gap-1 xl:flex">
              {navigation.map((item) => (
                <Button key={item.href} asChild size="sm" variant="ghost">
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}
              <Button asChild size="sm" variant="outline">
                <Link href="/studio">Sanity Studio</Link>
              </Button>
              <form action="/api/admin/blog-manager/auth/logout" method="post">
                <Button size="sm" variant="secondary" type="submit">Sign out</Button>
              </form>
            </nav>
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button type="button" size="icon-sm" variant="outline" className="xl:hidden" aria-label="Open Blog Manager navigation">
                  <Menu aria-hidden className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="gap-0 px-0 sm:max-w-sm">
                <SheetHeader>
                  <SheetTitle>Blog Manager</SheetTitle>
                  <SheetDescription>Navigate articles and tools.</SheetDescription>
                </SheetHeader>
                <nav aria-label="Blog Manager mobile" className="flex flex-col gap-1 px-4">
                  {navigation.map((item) => (
                    <SheetClose key={item.href} asChild>
                      <Link href={item.href} className="rounded-md px-3 py-3 text-sm font-medium hover:bg-secondary focus-visible:outline-2 focus-visible:outline-ring">
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Link href="/studio" className="rounded-md px-3 py-3 text-sm font-medium hover:bg-secondary focus-visible:outline-2 focus-visible:outline-ring">
                      Sanity Studio
                    </Link>
                  </SheetClose>
                </nav>
                <div className="mt-auto border-t p-4">
                  <form action="/api/admin/blog-manager/auth/logout" method="post">
                    <Button className="w-full" variant="secondary" type="submit">Sign out</Button>
                  </form>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">{children}</div>
    </section>
  );
}
