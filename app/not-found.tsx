import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60dvh] flex-col items-center justify-center gap-4 py-20 text-center">
      <h1 className="text-4xl font-semibold">We could not find that page</h1>
      <p className="max-w-md text-muted-foreground">The page may have moved or the link may be wrong. Try the menu or head back home.</p>
      <div className="mt-2 flex gap-3">
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/menu/food">View the menu</Link>
        </Button>
      </div>
    </Container>
  );
}
