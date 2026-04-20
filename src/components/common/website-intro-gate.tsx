"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type WebsiteIntroGateProps = {
  children: React.ReactNode;
};

const INTRO_FALLBACK_DURATION_MS = 6000;
const DESKTOP_VIDEO_SRC = "/videos/welcome-to-vidhi.mp4";
const MOBILE_VIDEO_SRC = "/videos/welcome-to-vidhi-mobile.mp4";

export function WebsiteIntroGate({ children }: WebsiteIntroGateProps) {
  const [showIntro, setShowIntro] = useState(false);
  const [videoSrc, setVideoSrc] = useState(DESKTOP_VIDEO_SRC);
  const introVideoRef = useRef<HTMLVideoElement | null>(null);

  const closeIntro = () => {
    setShowIntro(false);
  };

  useEffect(() => {
    if (window.location.pathname !== "/") {
      setShowIntro(false);
      return;
    }

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    setVideoSrc(isMobile ? MOBILE_VIDEO_SRC : DESKTOP_VIDEO_SRC);

    const navigationEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    const navigationType = navigationEntries[0]?.type;
    const legacyType = (performance as Performance & { navigation?: { type?: number } }).navigation?.type;
    const isDocumentLoad =
      navigationType === "reload" ||
      navigationType === "navigate" ||
      (!navigationType && (legacyType === undefined || legacyType === 0 || legacyType === 1));
    setShowIntro(isDocumentLoad);
  }, []);

  useEffect(() => {
    if (!showIntro) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      closeIntro();
    }, INTRO_FALLBACK_DURATION_MS);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, [showIntro]);

  return (
    <>
      {children}

      <AnimatePresence>
        {showIntro ? (
          <motion.div
            className="fixed inset-0 z-[120] overflow-hidden bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <video
              ref={introVideoRef}
              className="h-full w-full object-cover"
              autoPlay
              muted
              playsInline
              preload="metadata"
              poster="/brand/vidhi-satya-logo-tight.png"
              onEnded={closeIntro}
              onError={closeIntro}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
            <button
              type="button"
              onClick={closeIntro}
              className="absolute right-4 top-4 rounded-[0.6rem] bg-black/60 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white ring-1 ring-white/20 transition hover:bg-black/80"
            >
              Skip Intro
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
