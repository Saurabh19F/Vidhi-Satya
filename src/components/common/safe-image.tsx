"use client";

import { useEffect, useMemo, useState } from "react";
import Image, { type ImageProps } from "next/image";

import { resolveImageUrl } from "@/lib/image-url";

type SafeImageProps = Omit<ImageProps, "src"> & {
  src?: string | null;
  fallbackSrc: string;
  alt: string;
};

export function SafeImage({ src, fallbackSrc, alt, onError, ...props }: SafeImageProps) {
  const resolvedFallbackSrc = useMemo(() => resolveImageUrl(fallbackSrc, fallbackSrc), [fallbackSrc]);
  const [currentSrc, setCurrentSrc] = useState(() => resolveImageUrl(src, resolvedFallbackSrc));

  useEffect(() => {
    setCurrentSrc(resolveImageUrl(src, resolvedFallbackSrc));
  }, [src, resolvedFallbackSrc]);

  const handleError: NonNullable<ImageProps["onError"]> = (event) => {
    if (currentSrc !== resolvedFallbackSrc) {
      setCurrentSrc(resolvedFallbackSrc);
    }
    onError?.(event);
  };

  return <Image {...props} src={currentSrc} alt={alt} onError={handleError} />;
}
