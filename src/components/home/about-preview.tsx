import Image from "next/image";
import Link from "next/link";

import { MotionReveal } from "@/components/common/motion-reveal";
import { SectionTitle } from "@/components/common/section-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type AboutPreviewProps = {
  about: {
    heading: string;
    description: string;
    imageUrl: string;
  } | null;
};

export function AboutPreview({ about }: AboutPreviewProps) {
  if (!about) return null;

  return (
    <section className="section-padding">
      <div className="container grid gap-8 md:grid-cols-2 md:items-center md:gap-10">
        <MotionReveal>
          <SectionTitle eyebrow="About" title={about.heading} description={about.description} />
          <Button asChild className="mt-6">
            <Link href="/about">Explore About Us</Link>
          </Button>
        </MotionReveal>
        <MotionReveal delay={0.1}>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-[260px] sm:h-[320px] md:h-[340px]">
                <Image src="/uploads/about-main.jpeg" alt={about.heading} fill className="object-cover" />
              </div>
            </CardContent>
          </Card>
        </MotionReveal>
      </div>
    </section>
  );
}
