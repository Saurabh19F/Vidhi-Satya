"use client";

import type { ComponentProps } from "react";
import { Toaster as Sonner } from "sonner";

type ToasterProps = ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "bg-surface-high text-foreground ring-1 ring-outline-variant/15 shadow-ambient"
        }
      }}
      {...props}
    />
  );
};

export { Toaster };
