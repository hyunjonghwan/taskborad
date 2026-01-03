import { cn } from "@/shared/lib/cn";

const badgeVariants = {
  default: "border-slate-200 bg-slate-50 text-slate-600",
  info: "border-blue-100 bg-blue-50 text-blue-600",
  warning: "border-amber-100 bg-amber-50 text-amber-700",
  success: "border-emerald-100 bg-emerald-50 text-emerald-700",
};

export function Badge({ className, variant = "default", ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}
