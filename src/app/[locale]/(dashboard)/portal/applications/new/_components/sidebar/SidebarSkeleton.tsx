import { Skeleton } from "@/components/ui/skeleton";

export function SidebarSkeleton() {
  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="p-7 sm:p-8 rounded-[24px] bg-white border border-slate-200/90 shadow-xl shadow-slate-200/50 space-y-6">
        <div className="flex items-center gap-3">
          <Skeleton className="w-6 h-6 rounded-lg bg-slate-200/80" />
          <Skeleton className="h-6 w-36 rounded-lg bg-slate-200/80" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-14 w-full rounded-2xl bg-slate-200/60" />
          <Skeleton className="h-14 w-full rounded-2xl bg-slate-200/60" />
        </div>
      </div>

      <div className="p-6 rounded-[24px] bg-white border border-slate-200/90 shadow-xl shadow-slate-200/60 space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-24 rounded-full bg-slate-200/80" />
          <Skeleton className="h-4 w-20 rounded bg-slate-200/60" />
        </div>
        <Skeleton className="h-14 w-full rounded-2xl bg-slate-200/80" />
        <Skeleton className="h-3 w-44 rounded-full mx-auto bg-slate-200/60" />
      </div>
    </div>
  );
}
