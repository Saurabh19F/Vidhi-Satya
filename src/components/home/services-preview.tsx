import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MotionReveal } from "@/components/common/motion-reveal";
import { SectionTitle } from "@/components/common/section-title";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Service = {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  category: string;
};

type ServicesPreviewProps = {
  services: Service[];
};

export function ServicesPreview({ services }: ServicesPreviewProps) {
  return (
    <section className="section-padding bg-surface-low">
      <div className="container">
        <SectionTitle
          eyebrow="Core Services"
          title="Advisory Programs Designed for Real-World Outcomes"
          description="From individual decisions to institutional strategy, we provide advisory frameworks that are ethical, practical, and execution-ready."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <MotionReveal key={service._id} delay={idx * 0.05}>
              <Card className="h-full transition hover:-translate-y-1 hover:bg-surface-high">
                <CardHeader>
                  <Badge variant="outline" className="w-fit">
                    {service.category}
                  </Badge>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.shortDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </MotionReveal>
          ))}
        </div>
        <div className="mt-8">
          <Button asChild variant="default">
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
