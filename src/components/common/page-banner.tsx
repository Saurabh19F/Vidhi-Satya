"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { SectionTitle } from "@/components/common/section-title";

type PageBannerProps = {
  title: string;
  description: string;
  logoSrc?: string;
  logoAlt?: string;
};

export function PageBanner({ title, description, logoSrc, logoAlt = "Vidhi Satya logo" }: PageBannerProps) {
  return (
    <motion.section
      className="relative overflow-hidden py-12 sm:py-16 md:py-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(104,186,127,0.2),transparent_36%),radial-gradient(circle_at_88%_12%,rgba(207,255,220,0.14),transparent_34%),radial-gradient(circle_at_62%_88%,rgba(46,111,64,0.14),transparent_35%)]"
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />
      <div className="container">
        {logoSrc ? (
          <div className="relative mb-5 h-10 w-[180px] sm:h-14 sm:w-[260px]">
            <Image src={logoSrc} alt={logoAlt} fill className="object-contain object-left" />
          </div>
        ) : null}
        <SectionTitle
          title={title}
          description={description}
          className="max-w-3xl [&_h2]:text-foreground [&_p]:text-muted-foreground"
        />
      </div>
    </motion.section>
  );
}
