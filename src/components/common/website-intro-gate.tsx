"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type WebsiteIntroGateProps = {
  children: React.ReactNode;
};

const INTRO_FALLBACK_DURATION_MS = 15000;

export function WebsiteIntroGate({ children }: WebsiteIntroGateProps) {
  const [showIntro, setShowIntro] = useState(true);
  const introVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!showIntro) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      setShowIntro(false);
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
              preload="auto"
              onLoadedMetadata={() => {
                if (!introVideoRef.current) {
                  return;
                }
                introVideoRef.current.defaultPlaybackRate = 3;
                introVideoRef.current.playbackRate = 3;
              }}
              onEnded={() => setShowIntro(false)}
              onError={() => setShowIntro(false)}
            >
              <source src="/videos/welcome-to-vidhi-mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
              <source src="/videos/welcome-to-vidhi.mp4" type="video/mp4" />
            </video>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
