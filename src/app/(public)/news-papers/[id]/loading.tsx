import React from "react";
import { ChevronLeft, BookOpen, Download, Calendar } from "lucide-react";

export default function NewsPaperLoading() {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Section Skeleton */}
      <header className="relative h-[60vh] min-h-[480px] flex items-end overflow-hidden bg-slate-200 animate-pulse">
        <div className="max-w-7xl mx-auto px-6 pb-24 w-full relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="h-8 w-32 bg-white/20 rounded-full backdrop-blur-md" />
            <div className="h-16 w-3/4 bg-white/20 rounded-2xl" />
            <div className="flex gap-6">
              <div className="h-6 w-40 bg-white/20 rounded-lg" />
              <div className="h-6 w-24 bg-white/20 rounded-full" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="flex flex-col gap-8">
          {/* Actions Bar Skeleton */}
          <div className="bg-white rounded-[16px] p-6 shadow-2xl shadow-black/5 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl" />
              <div className="space-y-2">
                <div className="h-5 w-40 bg-slate-100 rounded-lg" />
                <div className="h-4 w-60 bg-slate-50 rounded-lg" />
              </div>
            </div>
            <div className="h-14 w-full md:w-48 bg-slate-100 rounded-xl" />
          </div>

          {/* PDF Viewer Skeleton */}
          <div className="bg-white border border-border/50 rounded-[20px] p-2 md:p-6 shadow-2xl shadow-black/5 h-[80vh] min-h-[600px] animate-pulse">
            <div className="w-full h-full bg-slate-50 rounded-[16px]" />
          </div>
        </div>
      </main>
    </div>
  );
}
