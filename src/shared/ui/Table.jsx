import { forwardRef } from "react";
import { cn } from "@/shared/lib/cn";

export const Table = forwardRef(function Table(
  { className, ...props },
  ref
) {
  return (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
});

export const TableHeader = forwardRef(function TableHeader(
  { className, ...props },
  ref
) {
  return (
    <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
  );
});

export const TableBody = forwardRef(function TableBody(
  { className, ...props },
  ref
) {
  return (
    <tbody
      ref={ref}
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
});

export const TableFooter = forwardRef(function TableFooter(
  { className, ...props },
  ref
) {
  return (
    <tfoot
      ref={ref}
      className={cn("border-t bg-slate-50 font-medium", className)}
      {...props}
    />
  );
});

export const TableRow = forwardRef(function TableRow(
  { className, ...props },
  ref
) {
  return (
    <tr
      ref={ref}
      className={cn(
        "border-b transition-colors hover:bg-slate-50 data-[state=selected]:bg-slate-100",
        className
      )}
      {...props}
    />
  );
});

export const TableHead = forwardRef(function TableHead(
  { className, ...props },
  ref
) {
  return (
    <th
      ref={ref}
      className={cn(
        "h-10 px-4 text-left align-middle text-xs font-semibold uppercase tracking-wide text-slate-500",
        className
      )}
      {...props}
    />
  );
});

export const TableCell = forwardRef(function TableCell(
  { className, ...props },
  ref
) {
  return (
    <td ref={ref} className={cn("p-4 align-middle", className)} {...props} />
  );
});

export const TableCaption = forwardRef(function TableCaption(
  { className, ...props },
  ref
) {
  return (
    <caption
      ref={ref}
      className={cn("mt-4 text-sm text-slate-500", className)}
      {...props}
    />
  );
});
