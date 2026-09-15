import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[3px] text-sm font-medium font-mono uppercase tracking-[0.14em] transition-colors disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-[--dl-burgundy] text-[--dl-cream] hover:bg-[--dl-burgundy-hover]",
        outline:
          "border border-current bg-transparent hover:bg-[--dl-ink]/5",
        ghost: "bg-transparent hover:bg-[--dl-ink]/5",
        dark: "bg-[--dl-rose] text-[--dl-plum] hover:bg-[--dl-rose]/90",
      },
      size: {
        default: "h-11 px-6 py-2 text-xs",
        sm: "h-9 px-4 text-[11px]",
        lg: "h-12 px-8 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
