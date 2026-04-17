"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { SectionTitle } from "@/components/common/section-title";
import { Button } from "@/components/ui/button";

type CTASectionProps = {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
};

export function CTASection({
  title = "Ready for a More Certain Strategic Direction?",
  description = "Partner with Vidhi Satya for focused advisory support aligned to your personal, corporate, or public-sector goals.",
  ctaText = "Book Consultation",
  ctaLink = "/book-consultation"
}: CTASectionProps) {
  return (
    <section className="section-padding">
      <div className="container">
        <motion.div
          className="ambient-float relative overflow-hidden rounded-[0.75rem] bg-gradient-to-r from-primary/85 to-primary-container/85 p-6 text-primary-foreground sm:p-8 md:p-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_12%,rgba(207,255,220,0.2),transparent_28%),radial-gradient(circle_at_10%_88%,rgba(104,186,127,0.2),transparent_26%)]"
            animate={{ opacity: 0.9 }}
            transition={{ duration: 0.35 }}
          />
          <SectionTitle
            title={title}
            description={description}
            className="relative z-10 max-w-3xl [&_h2]:text-primary-foreground [&_p]:text-primary-foreground/80"
          />
          <motion.div
            className="relative z-10 mt-8"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            <Button asChild variant="secondary" size="lg" className="india-tricolor-button w-full sm:w-auto">
              <Link href={ctaLink}>{ctaText}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
