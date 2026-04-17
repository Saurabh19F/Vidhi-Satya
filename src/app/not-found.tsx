import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tertiary">404</p>
      <h1 className="mt-3 font-[family-name:var(--font-newsreader)] text-5xl font-semibold">Page Not Found</h1>
      <p className="mt-4 max-w-md text-muted-foreground">The page you requested does not exist. Let us bring you back to Vidhi Satya.</p>
      <Button asChild className="mt-8">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
