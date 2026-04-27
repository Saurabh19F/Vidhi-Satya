"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionTitle({ eyebrow, title, description, align = "left", className }: SectionTitleProps) {
  return (
    <motion.div
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow ? (
        <motion.p
          className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-tertiary"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, delay: 0.04 }}
        >
          {eyebrow}
        </motion.p>
      ) : null}
      <motion.h2
        className="font-[family-name:var(--font-newsreader)] text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.52, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.48, delay: 0.13, ease: [0.22, 1, 0.36, 1] }}
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
