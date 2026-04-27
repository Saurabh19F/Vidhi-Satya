import Link from "next/link";

import { SectionTitle } from "@/components/common/section-title";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

type FAQPreviewProps = {
  faqs: Array<{
    _id: string;
    question: string;
    answer: string;
  }>;
};

export function FAQPreview({ faqs }: FAQPreviewProps) {
  return (
    <section className="section-padding bg-surface-low">
      <div className="container">
        <SectionTitle
          eyebrow="FAQ"
          title="Common Questions, Clearly Answered"
          description="If you have a unique scenario, our advisors are available for a focused consultation."
        />
        <div className="mt-10 space-y-4">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq) => (
              <AccordionItem key={faq._id} value={faq._id}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="mt-8">
          <Button asChild variant="default">
            <Link href="/faq">Browse All FAQs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
