import React from "react";
import { cn } from "@/lib/utils";

interface UploadProgressProps {
  percent: number;
  label: string;
  detail?: string;
  tone?: "primary" | "warning";
  className?: string;
}

/** Accessible, animated progress bar used across upload forms. */
export function UploadProgress({
  percent,
  label,
  detail,
  tone = "primary",
  className,
}: UploadProgressProps) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div
      className={cn("rounded-2xl border border-primary/10 bg-primary/[0.03] p-4 space-y-2", className)}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center justify-between gap-3 text-sm font-semibold text-primary">
        <span>{label}</span>
        <span className="tabular-nums">{clamped}%</span>
      </div>
      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-primary/10"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
      >
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-300 ease-out",
            tone === "warning" ? "bg-amber-500" : "bg-primary"
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {detail && <p className="text-xs font-medium text-primary/60">{detail}</p>}
    </div>
  );
}
