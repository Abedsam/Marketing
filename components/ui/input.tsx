import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 w-full min-w-0 rounded-[2px] border border-[--dl-ink]/20 bg-transparent px-3 py-2 text-base font-sans transition-colors outline-none placeholder:text-[--dl-ink]/40 focus-visible:border-[--dl-burgundy] disabled:pointer-events-none disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Input };
