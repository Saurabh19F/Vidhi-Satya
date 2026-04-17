import { Building2, Landmark, UserRound } from "lucide-react";

import { MotionReveal } from "@/components/common/motion-reveal";
import { SectionTitle } from "@/components/common/section-title";
import { Card, CardContent } from "@/components/ui/card";

const groups = [
  {
    title: "Individuals",
    text: "Career, compliance, and strategic personal advisory with confidentiality.",
    icon: UserRound
  },
  {
    title: "Corporates",
    text: "Governance, risk, and strategic operations advisory for leadership teams.",
    icon: Building2
  },
  {
    title: "Government Bodies",
    text: "Policy-aligned advisory frameworks for institutional initiatives.",
    icon: Landmark
  }
];

export function WhoWeHelp() {
  return (
    <section className="section-padding">
      <div className="container">
        <SectionTitle eyebrow="Who We Help" title="Built for Diverse Stakeholders" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {groups.map((group, idx) => (
            <MotionReveal key={group.title} delay={idx * 0.06}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <group.icon className="h-10 w-10 text-accent" />
                  <h3 className="mt-4 font-[family-name:var(--font-newsreader)] text-3xl font-semibold">{group.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{group.text}</p>
                </CardContent>
              </Card>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
