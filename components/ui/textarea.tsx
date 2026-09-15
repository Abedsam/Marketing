import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-24 w-full rounded-[2px] border border-dl-ink/20 bg-transparent px-3 py-2 text-base font-sans transition-colors outline-none placeholder:text-dl-ink/40 focus-visible:border-dl-burgundy disabled:pointer-events-none disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
