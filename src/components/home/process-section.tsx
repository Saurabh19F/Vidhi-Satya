import { MotionReveal } from "@/components/common/motion-reveal";
import { SectionTitle } from "@/components/common/section-title";
import { Card, CardContent } from "@/components/ui/card";

const process = [
  {
    step: "01",
    title: "Need a Identification and Assessment",
    description: "We map constraints."
  },
  {
    step: "02",
    title: "Working Methodology",
    description: "We define options, evaluate risk, and design execution tracks."
  },
  {
    step: "03",
    title: "Methodology we finalize",
    description: "We Final out, minimizing delays on any checkpoints."
  },
  {
    step: "04",
    title: "Review and Optimization",
    description: "We monitor outcomes and refine recommendations as needed."
  },
  {
    step: "05",
    title: "Everything in time bound",
    description: "Our engagement is assignment-based, limited to policy making/ project based. So, we strictly confirmed to timelines and deadlines.",
    emphasis: "subject to Force Majeure"
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
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                    {item.emphasis ? (
                      <>
                        {" "}
                        <strong className="font-semibold text-foreground">{item.emphasis}</strong>
                      </>
                    ) : null}
                  </p>
                </CardContent>
              </Card>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
