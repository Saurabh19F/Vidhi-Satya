import { ShieldCheck, Sparkles, Target, Users } from "lucide-react";

import { MotionReveal } from "@/components/common/motion-reveal";
import { SectionTitle } from "@/components/common/section-title";
import { Card, CardContent } from "@/components/ui/card";

const points = [
  {
    title: "Strategic Clarity",
    text: "We simplify complexity into high-confidence decision paths.",
    icon: Target
  },
  {
    title: "Policy + Business Depth",
    text: "Our advisory combines legal, commercial, and governance context.",
    icon: ShieldCheck
  },
  {
    title: "Client-Centered Delivery",
    text: "Every engagement adapts to your domain, timelines, and constraints.",
    icon: Users
  },
  {
    title: "Execution Orientation",
    text: "We translate recommendations into practical, staged action plans.",
    icon: Sparkles
  }
];

export function WhyChooseUs() {
  return (
    <section className="section-padding">
      <div className="container">
        <SectionTitle
          eyebrow="Why Choose Us"
          title="Trusted for Strategic and High-Stakes Decisions"
          description="Vidhi Satya stands for the stakeholders who need actionable insight, policy sensitivity in all high-stake decisions and dependable execution."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point, idx) => (
            <MotionReveal key={point.title} delay={idx * 0.06}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <point.icon className="h-8 w-8 text-accent" />
                  <h3 className="mt-4 font-[family-name:var(--font-newsreader)] text-2xl font-semibold">{point.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{point.text}</p>
                </CardContent>
              </Card>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
