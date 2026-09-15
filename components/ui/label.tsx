"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[--dl-ink]/60 select-none",
        className
      )}
      {...props}
    />
  );
}

export { Label };
