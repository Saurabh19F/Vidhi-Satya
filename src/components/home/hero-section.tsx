"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";

type Slide = {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
};

type HeroSectionProps = {
  slides: Slide[];
};

export function HeroSection({ slides }: HeroSectionProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const current = slides[index];

  if (!current) {
    return null;
  }

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(104,186,127,0.24),transparent_34%),radial-gradient(circle_at_92%_20%,rgba(207,255,220,0.16),transparent_36%),radial-gradient(circle_at_65%_84%,rgba(46,111,64,0.16),transparent_32%)]" />
      <div className="container grid min-h-[calc(100svh-4rem)] items-center gap-10 py-10 sm:py-14 md:min-h-[80vh] md:grid-cols-[1.15fr_0.85fr] md:gap-12 md:py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={current._id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45 }}
            className="relative z-10 space-y-5 sm:space-y-7"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-tertiary sm:text-xs sm:tracking-[0.28em]">
              {current.subtitle}
            </p>
            <h1 className="font-[family-name:var(--font-newsreader)] text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="text-foreground">{current.title}</span>
            </h1>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">{current.description}</p>
            <Button asChild size="lg" variant="default" className="w-full sm:w-auto">
              <Link href={current.buttonLink}>{current.buttonText}</Link>
            </Button>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`image-${current._id}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.45 }}
            className="relative h-[280px] overflow-hidden rounded-[0.75rem] bg-surface-high/85 shadow-ambient ring-1 ring-outline-variant/15 sm:h-[360px] md:h-[520px]"
          >
            <Image src={current.imageUrl} alt={current.title} fill className="object-cover" priority />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
