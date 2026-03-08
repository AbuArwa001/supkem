import React from "react";

export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-end gap-6 mb-12">
        <div className="space-y-3">
          <div className="h-10 w-64 bg-slate-200 rounded-2xl" />
          <div className="h-4 w-96 bg-slate-100 rounded-lg" />
        </div>
        <div className="h-14 w-40 bg-slate-200 rounded-2xl" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-32 bg-white border border-slate-100 rounded-[32px] p-6 space-y-3"
          >
            <div className="h-4 w-20 bg-slate-100 rounded" />
            <div className="h-8 w-24 bg-slate-200 rounded opacity-50" />
          </div>
        ))}
      </div>

      {/* Main Content Area Skeleton */}
      <div className="h-[400px] bg-white border border-slate-100 rounded-[40px] p-10 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-100 rounded-2xl" />
          <div className="h-6 w-48 bg-slate-100 rounded-lg" />
        </div>
        <div className="space-y-4">
          <div className="h-4 w-full bg-slate-50 rounded-lg" />
          <div className="h-4 w-full bg-slate-50 rounded-lg" />
          <div className="h-4 w-3/4 bg-slate-50 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
