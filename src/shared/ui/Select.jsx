import { forwardRef } from "react";
import { cn } from "@/shared/lib/cn";

export const Select = forwardRef(function Select(
  { className, children, ...props },
  ref
) {
  return (
    <select
      ref={ref}
      className={cn(
        "h-9 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});
