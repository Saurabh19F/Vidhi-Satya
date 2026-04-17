import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "min-h-24 w-full rounded-[0.75rem] border-0 bg-surface-lowest px-3 py-2 text-sm text-foreground ring-1 ring-outline-variant/15 ring-offset-background placeholder:text-muted-foreground/75 focus-visible:bg-surface-low focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70 focus-visible:shadow-glow disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
