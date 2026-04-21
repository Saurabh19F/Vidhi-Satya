import { buildPageMetadata } from "@/lib/seo";
import { getPublicFaqData } from "@/lib/public-cache";
import { CTASection } from "@/components/common/cta-section";
import { StructuredData } from "@/components/common/structured-data";
import { SectionTitle } from "@/components/common/section-title";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { buildFaqPageJsonLd, buildWebPageJsonLd } from "@/lib/structured-data";

type FaqItem = {
  _id: string;
  category: string;
  question: string;
  answer: string;
};

export async function generateMetadata() {
  return buildPageMetadata("faq", {
    pathname: "/faq",
    ogImage: "/brand/vidhi-satya-logo.png"
  });
}

export default async function FAQPage() {
  const faqs = (await getPublicFaqData()) as unknown as FaqItem[];
  const categories = Array.from(new Set(faqs.map((item) => item.category)));
  const faqPageSchema = buildWebPageJsonLd({
    pathname: "/faq",
    type: "FAQPage",
    title: "Frequently Asked Questions",
    description: "Clear answers to common advisory and engagement questions."
  });
  const faqSchema = buildFaqPageJsonLd({
    pathname: "/faq",
    title: "Frequently Asked Questions",
    description: "Clear answers to common advisory and engagement questions.",
    faqs: faqs.map((faq) => ({ question: faq.question, answer: faq.answer }))
  });

  return (
    <>
      <StructuredData data={[faqPageSchema, faqSchema]} />
      <section className="section-padding">
        <div className="container space-y-10">
          <SectionTitle
            title="Frequently Asked Questions"
            description="Clear answers to common advisory and engagement questions."
            className="max-w-3xl"
          />
          {categories.map((category) => (
            <div key={category}>
              <h2 className="font-[family-name:var(--font-newsreader)] text-4xl font-semibold">{category}</h2>
              <Accordion type="single" collapsible className="mt-5 space-y-3">
                {faqs
                  .filter((faq) => faq.category === category)
                  .map((faq) => (
                    <AccordionItem key={String(faq._id)} value={String(faq._id)}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
