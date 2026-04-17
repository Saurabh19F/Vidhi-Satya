import { MotionReveal } from "@/components/common/motion-reveal";
import { SectionTitle } from "@/components/common/section-title";
import { Card, CardContent } from "@/components/ui/card";

const process = [
  {
    step: "01",
    title: "Discovery Session",
    description: "We map context, constraints, and outcomes that matter."
  },
  {
    step: "02",
    title: "Strategic Blueprint",
    description: "We define options, evaluate risk, and design execution tracks."
  },
  {
    step: "03",
    title: "Implementation Support",
    description: "We guide your team through practical rollout checkpoints."
  },
  {
    step: "04",
    title: "Review and Optimization",
    description: "We monitor outcomes and refine recommendations as needed."
  }
];

export function ProcessSection() {
  return (
    <section className="section-padding bg-surface-low">
      <div className="container">
        <SectionTitle eyebrow="Our Process" title="A Structured Advisory Journey" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((item, idx) => (
            <MotionReveal key={item.step} delay={idx * 0.05} className="h-full">
              <Card className="h-full">
                <CardContent className="flex h-full flex-col p-6">
                  <p className="text-3xl font-extrabold text-accent">{item.step}</p>
                  <h3 className="mt-3 font-[family-name:var(--font-newsreader)] text-2xl font-semibold md:min-h-[5rem]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
