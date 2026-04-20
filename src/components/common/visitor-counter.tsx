"use client";

import { useEffect, useState } from "react";

const START_COUNT = 19031;
const UPDATE_INTERVAL_MS = 5000;
const MIN_STEP = 1;
const MAX_STEP = 4;

function getRandomStep() {
  return Math.floor(Math.random() * (MAX_STEP - MIN_STEP + 1)) + MIN_STEP;
}

export function VisitorCounter() {
  const [count, setCount] = useState<number>(START_COUNT);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCount((current) => current + getRandomStep());
    }, UPDATE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <p className="inline-flex items-center gap-2 rounded-[0.7rem] border border-[#68BA7F]/45 bg-[#68BA7F]/16 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#CFFFDC] shadow-[0_8px_22px_rgba(104,186,127,0.14)]">
      Visitors
      <span className="rounded bg-[#68BA7F] px-2 py-0.5 text-[11px] font-extrabold text-[#183124]">
        {count.toLocaleString("en-IN")}
      </span>
    </p>
  );
}
