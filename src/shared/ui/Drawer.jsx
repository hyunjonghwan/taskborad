"use client";

import { forwardRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/shared/lib/cn";

export function Drawer({ open, onOpenChange, children }) {
  useEffect(() => {
    if (!open) return undefined;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenChange, open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/40"
        aria-label="닫기"
        onClick={() => onOpenChange(false)}
      />
      {children}
    </div>,
    document.body
  );
}

export const DrawerContent = forwardRef(function DrawerContent(
  { className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-full w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-xl",
        className
      )}
      {...props}
    />
  );
});

export const DrawerHeader = forwardRef(function DrawerHeader(
  { className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-2 border-b border-slate-200 px-6 py-4", className)}
      {...props}
    />
  );
});

export const DrawerTitle = forwardRef(function DrawerTitle(
  { className, ...props },
  ref
) {
  return (
    <h2
      ref={ref}
      className={cn("text-lg font-semibold text-slate-900", className)}
      {...props}
    />
  );
});

export const DrawerDescription = forwardRef(function DrawerDescription(
  { className, ...props },
  ref
) {
  return (
    <p ref={ref} className={cn("text-sm text-slate-500", className)} {...props} />
  );
});

export const DrawerBody = forwardRef(function DrawerBody(
  { className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn("flex-1 overflow-y-auto px-6 py-4", className)}
      {...props}
    />
  );
});

export const DrawerFooter = forwardRef(function DrawerFooter(
  { className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn("border-t border-slate-200 px-6 py-4", className)}
      {...props}
    />
  );
});
