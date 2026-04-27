"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect } from "react";

type PageMotionWrapperProps = {
  children: ReactNode;
};

export function PageMotionWrapper({ children }: PageMotionWrapperProps) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  }, [pathname, reducedMotion]);

  return (
    <div className="relative isolate">
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(104,186,127,0.12),transparent_40%),radial-gradient(circle_at_86%_32%,rgba(46,111,64,0.08),transparent_42%)]"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
      />

      <motion.div
        key={pathname}
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
        animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0.1 : 0.32, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
