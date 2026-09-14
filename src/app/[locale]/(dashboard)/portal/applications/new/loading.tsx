import { Skeleton } from "@/components/ui/skeleton";
import { ServiceSelectionSkeleton } from "./_components/ServiceSelection";
import { SidebarSkeleton } from "./_components/ApplicationSidebar";

export default function NewApplicationLoading() {
  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-24 animate-fadeIn">
      {/* Application Form Header Skeleton */}
      <div className="space-y-8 pb-8 border-b border-slate-200/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <Skeleton className="h-6 w-56 rounded-full bg-slate-200/80" />
            <Skeleton className="h-10 w-72 md:w-96 rounded-2xl bg-slate-200/80" />
            <Skeleton className="h-4 w-full max-w-xl rounded bg-slate-200/60" />
          </div>

          {/* Progress Percent Pill */}
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-slate-200/80 shadow-xs shrink-0 self-start md:self-auto">
            <div className="text-right space-y-1">
              <Skeleton className="h-3 w-16 rounded bg-slate-200/60 ml-auto" />
              <Skeleton className="h-5 w-12 rounded bg-slate-200/80 ml-auto" />
            </div>
            <Skeleton className="w-10 h-10 rounded-xl bg-slate-200/80" />
          </div>
        </div>

        {/* Multi-Step Pipeline Track Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className="flex items-center gap-4 p-3.5 rounded-2xl bg-white border border-slate-200/80"
            >
              <Skeleton className="w-11 h-11 rounded-xl bg-slate-200/80 shrink-0" />
              <div className="space-y-1.5 min-w-0 flex-1">
                <Skeleton className="h-4 w-28 rounded bg-slate-200/80" />
                <Skeleton className="h-3 w-20 rounded bg-slate-200/60" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Service Selection & Sidebar Skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        <div className="lg:col-span-8 space-y-8">
          <ServiceSelectionSkeleton />
        </div>
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-6">
            <SidebarSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
