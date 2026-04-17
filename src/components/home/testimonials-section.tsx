"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { SectionTitle } from "@/components/common/section-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Testimonial = {
  _id: string;
  name: string;
  designation: string;
  company: string;
  message: string;
  rating: number;
};

type TestimonialsSectionProps = {
  testimonials: Testimonial[];
};

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const items = useMemo(() => testimonials.slice(0, 6), [testimonials]);
  const [index, setIndex] = useState(0);
  const current = items[index];

  if (!current) return null;

  const prev = () => setIndex((p) => (p === 0 ? items.length - 1 : p - 1));
  const next = () => setIndex((p) => (p + 1) % items.length);

  return (
    <section className="section-padding bg-surface-low">
      <div className="container">
        <SectionTitle eyebrow="Testimonials" title="What Our Clients Value Most" align="center" />
        <div className="mx-auto mt-10 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="mb-4 flex justify-center gap-1">
                    {Array.from({ length: current.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-highlight text-highlight" />
                    ))}
                  </div>
                  <p className="text-lg leading-relaxed text-foreground/90">&ldquo;{current.message}&rdquo;</p>
                  <p className="mt-6 font-semibold">{current.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {current.designation}, {current.company}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="secondary" size="icon" onClick={prev}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" onClick={next}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
