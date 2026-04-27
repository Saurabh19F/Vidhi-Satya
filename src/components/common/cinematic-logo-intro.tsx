"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const particles = [
  { x: 8, y: 18, size: 2.2, delay: 0.1, duration: 6.5, drift: -8, blur: 0.3, color: "#68BA7F" },
  { x: 14, y: 76, size: 2.8, delay: 0.6, duration: 7.2, drift: -10, blur: 0.4, color: "#2E6F40" },
  { x: 21, y: 54, size: 1.8, delay: 1.1, duration: 5.8, drift: -7, blur: 0, color: "#68BA7F" },
  { x: 28, y: 26, size: 2.6, delay: 0.7, duration: 7.8, drift: -12, blur: 0.5, color: "#CFFFDC" },
  { x: 33, y: 62, size: 1.7, delay: 1.5, duration: 6.1, drift: -9, blur: 0, color: "#2E6F40" },
  { x: 40, y: 34, size: 2.5, delay: 0.2, duration: 6.9, drift: -11, blur: 0.4, color: "#68BA7F" },
  { x: 47, y: 82, size: 2.2, delay: 0.9, duration: 8, drift: -10, blur: 0.3, color: "#CFFFDC" },
  { x: 56, y: 22, size: 2, delay: 0.35, duration: 5.6, drift: -8, blur: 0, color: "#68BA7F" },
  { x: 63, y: 70, size: 2.4, delay: 1.2, duration: 7.3, drift: -9, blur: 0.5, color: "#2E6F40" },
  { x: 69, y: 40, size: 2.1, delay: 0.5, duration: 6.4, drift: -8, blur: 0.2, color: "#CFFFDC" },
  { x: 77, y: 20, size: 2.6, delay: 0.8, duration: 7.5, drift: -12, blur: 0.4, color: "#68BA7F" },
  { x: 84, y: 58, size: 1.9, delay: 1.6, duration: 6.2, drift: -9, blur: 0, color: "#2E6F40" },
  { x: 91, y: 32, size: 2.3, delay: 0.4, duration: 6.8, drift: -10, blur: 0.3, color: "#68BA7F" },
  { x: 95, y: 74, size: 1.8, delay: 1.3, duration: 7, drift: -11, blur: 0.5, color: "#CFFFDC" }
];

export function CinematicLogoIntro() {
  return (
    <section className="relative isolate overflow-hidden bg-[#CFFFDC]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(104,186,127,0.26),transparent_42%),radial-gradient(circle_at_75%_65%,rgba(37,61,44,0.14),transparent_48%),radial-gradient(circle_at_80%_18%,rgba(207,255,220,0.7),transparent_36%)]" />

      {particles.map((particle, idx) => (
        <motion.span
          key={`${particle.x}-${idx}`}
          className="pointer-events-none absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size * 4,
            height: particle.size * 4,
            backgroundColor: particle.color,
            filter: `blur(${particle.blur}px)`
          }}
          animate={{ y: [0, particle.drift, 0], opacity: [0.08, 0.35, 0.08] }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      <motion.div
        className="container relative py-20 md:py-28"
        initial={{ scale: 0.965, opacity: 0.85 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative mx-auto aspect-[16/9] w-full max-w-6xl overflow-hidden rounded-[1.25rem] bg-white/26 shadow-[0_20px_60px_-26px_rgba(37,61,44,0.3)] ring-1 ring-[#2E6F40]/20 backdrop-blur-[2px]">
          <motion.div
            className="absolute inset-y-0 -left-1/4 w-1/3 bg-gradient-to-r from-transparent via-[#68BA7F]/35 to-[#CFFFDC]/0 blur-xl"
            animate={{ x: ["-10%", "290%"] }}
            transition={{ duration: 4.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.4 }}
          />
          <motion.div
            className="relative h-full w-full"
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/brand/vidhi-satya-logo.png"
              alt="Vidhi Satya brand logo"
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
              className="object-cover object-center"
            />
          </motion.div>

          <motion.div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_52%,rgba(207,255,220,0.22),transparent_36%),radial-gradient(circle_at_28%_62%,rgba(104,186,127,0.18),transparent_42%)]"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
