"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-8 md:space-y-12 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <Skeleton className="h-5 w-32 rounded-full" />
          <Skeleton className="h-10 w-64 rounded-2xl" />
          <Skeleton className="h-4 w-96 rounded-lg" />
        </div>
        <Skeleton className="h-12 w-40 rounded-[20px]" />
      </div>

      {/* Stat Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-8 rounded-[32px] bg-white border border-slate-100 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <Skeleton className="h-3 w-24 rounded" />
                <Skeleton className="h-9 w-16 rounded-xl" />
              </div>
              <Skeleton className="h-14 w-14 rounded-2xl" />
            </div>
            <Skeleton className="h-5 w-28 rounded-full" />
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
          <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden">
            {/* Table Header */}
            <div className="flex items-center gap-6 px-8 py-5 border-b border-slate-100 bg-slate-50/50">
              <Skeleton className="h-3 w-24 rounded" />
              <Skeleton className="h-3 w-32 rounded" />
              <Skeleton className="h-3 w-24 rounded" />
              <Skeleton className="h-3 w-16 rounded ml-auto" />
            </div>
            {/* Table Rows */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center gap-6 px-8 py-6 border-b border-slate-50"
              >
                <Skeleton className="h-4 w-20 rounded-lg" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-4 w-32 rounded" />
                  <Skeleton className="h-3 w-24 rounded" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-xl ml-auto" />
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-7 w-40 rounded-xl" />
          <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden divide-y divide-slate-50">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-5">
                <Skeleton className="h-10 w-10 rounded-2xl shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-3.5 w-full rounded" />
                  <Skeleton className="h-3 w-2/3 rounded" />
                </div>
                <Skeleton className="h-6 w-14 rounded-full shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
