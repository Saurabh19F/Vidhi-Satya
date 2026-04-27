import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[0.75rem] text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4",
  {
    variants: {
      variant: {
        default:
          "ambient-float bg-gradient-to-r from-primary to-primary-container text-primary-foreground hover:-translate-y-0.5 hover:shadow-ambient",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "bg-surface-low/70 text-foreground shadow-sm ring-1 ring-outline-variant/20 hover:bg-surface-high",
        ghost: "text-muted-foreground hover:bg-surface-high hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        secondary:
          "bg-surface-variant/40 text-foreground backdrop-blur-md ring-1 ring-outline-variant/20 hover:bg-surface-high/70",
        tertiary:
          "relative rounded-none px-0 py-0 font-bold uppercase tracking-[0.18em] text-tertiary hover:text-tertiary-container after:absolute after:-bottom-1.5 after:left-1/2 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:rounded-full after:bg-tertiary after:opacity-0 after:transition-opacity hover:after:opacity-100",
        accent:
          "relative rounded-none px-0 py-0 font-bold uppercase tracking-[0.18em] text-tertiary hover:text-tertiary-container after:absolute after:-bottom-1.5 after:left-1/2 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:rounded-full after:bg-tertiary after:opacity-0 after:transition-opacity hover:after:opacity-100"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-[0.75rem] px-3",
        lg: "h-11 rounded-[0.75rem] px-6",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
