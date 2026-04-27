import Link from "next/link";

import { Button } from "@/components/ui/button";

type StickyCtaProps = {
  text?: string;
};

export function StickyCta({ text = "Speak With an Advisor" }: StickyCtaProps) {
  return (
    <div className="fixed inset-x-0 bottom-4 z-30 px-4 pb-[max(env(safe-area-inset-bottom),0px)] md:hidden">
      <Button asChild className="india-tricolor-button w-full">
        <Link href="/book-consultation">{text}</Link>
      </Button>
    </div>
  );
}
