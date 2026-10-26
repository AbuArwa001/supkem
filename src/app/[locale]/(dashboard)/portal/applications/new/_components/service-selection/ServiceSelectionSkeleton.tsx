import { Skeleton } from "@/components/ui/skeleton";

export function ServiceSelectionSkeleton() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-2xl shrink-0 bg-slate-200/80" />
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-7 w-60 rounded-lg bg-slate-200/80" />
            <Skeleton className="h-5 w-16 rounded-md bg-slate-200/60" />
          </div>
          <Skeleton className="h-4 w-72 max-w-full rounded bg-slate-200/60" />
        </div>
      </div>

      <div className="space-y-3 bg-slate-50/70 border border-slate-200/80 p-3 sm:p-4 rounded-2xl">
        <Skeleton className="h-11 w-full rounded-xl bg-slate-200/70" />
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Skeleton className="h-8 w-28 rounded-lg bg-slate-200/80 shrink-0" />
          <Skeleton className="h-8 w-24 rounded-lg bg-slate-200/60 shrink-0" />
          <Skeleton className="h-8 w-32 rounded-lg bg-slate-200/60 shrink-0" />
          <Skeleton className="h-8 w-24 rounded-lg bg-slate-200/60 shrink-0" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div
            key={idx}
            className="p-6 rounded-[22px] border-2 border-slate-200/80 bg-white flex flex-col justify-between gap-5 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="w-12 h-12 rounded-2xl bg-slate-200/80" />
                <Skeleton className="h-6 w-24 rounded-xl bg-slate-200/60" />
              </div>
              <Skeleton className="w-7 h-7 rounded-full bg-slate-200/60" />
            </div>

            <div className="space-y-2.5">
              <Skeleton className="h-6 w-3/4 rounded-lg bg-slate-200/80" />
              <Skeleton className="h-4 w-full rounded bg-slate-200/60" />
              <Skeleton className="h-4 w-4/5 rounded bg-slate-200/50" />
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
              <Skeleton className="h-5 w-16 rounded-lg bg-slate-200/60" />
              <Skeleton className="h-5 w-20 rounded-lg bg-slate-200/60" />
              <Skeleton className="h-5 w-24 rounded-lg bg-slate-200/60 ml-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
