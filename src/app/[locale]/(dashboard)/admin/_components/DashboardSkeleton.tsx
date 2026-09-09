"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-8 md:space-y-12 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 blur-[80px] -z-10 rounded-full" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-40 rounded-full bg-primary/10" />
          <Skeleton className="h-12 w-72 rounded-[20px] bg-primary/10" />
          <Skeleton className="h-5 w-96 rounded-lg bg-primary/5" />
        </div>
        <Skeleton className="h-14 w-48 rounded-[24px] bg-primary/10" />
      </div>

      {/* Stat Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-8 rounded-[24px] glass border border-primary/10 space-y-5 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
            <div className="relative z-10 flex items-start justify-between">
              <div className="space-y-4">
                <Skeleton className="h-4 w-24 rounded bg-primary/10" />
                <Skeleton className="h-10 w-20 rounded-xl bg-primary/10" />
              </div>
              <Skeleton className="h-16 w-16 rounded-2xl bg-primary/10" />
            </div>
            <Skeleton className="relative z-10 h-5 w-32 rounded-full bg-primary/5 mt-4" />
          </div>
        ))}
      </div>

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 md:gap-12">
        {/* Recent Applications Table */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-7 w-48 rounded-xl" />
            <Skeleton className="h-5 w-24 rounded-lg" />
          </div>
          <div className="glass border border-primary/10 rounded-[32px] overflow-hidden">
            {/* Table Header */}
            <div className="flex items-center gap-6 px-8 py-6 border-b border-primary/5 bg-primary/[0.02]">
              <Skeleton className="h-4 w-28 rounded bg-primary/10" />
              <Skeleton className="h-4 w-40 rounded bg-primary/10" />
              <Skeleton className="h-4 w-28 rounded bg-primary/10" />
              <Skeleton className="h-4 w-20 rounded bg-primary/10 ml-auto" />
            </div>
            {/* Table Rows */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center gap-6 px-8 py-7 border-b border-primary/5 last:border-0 hover:bg-white/50 transition-colors"
              >
                <Skeleton className="h-5 w-24 rounded-lg bg-primary/5" />
                <div className="space-y-2.5 flex-1">
                  <Skeleton className="h-5 w-40 rounded bg-primary/10" />
                  <Skeleton className="h-4 w-28 rounded bg-primary/5" />
                </div>
                <Skeleton className="h-8 w-24 rounded-full bg-primary/10" />
                <Skeleton className="h-10 w-10 rounded-2xl ml-auto bg-primary/10" />
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-8 w-48 rounded-xl bg-primary/10" />
          <div className="glass border border-primary/10 rounded-[32px] overflow-hidden divide-y divide-primary/5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-5 px-8 py-6 hover:bg-white/50 transition-colors">
                <Skeleton className="h-12 w-12 rounded-[20px] shrink-0 bg-primary/10" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full rounded bg-primary/10" />
                  <Skeleton className="h-3.5 w-2/3 rounded bg-primary/5" />
                </div>
                <Skeleton className="h-8 w-16 rounded-full shrink-0 bg-primary/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
