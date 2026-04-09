import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Film, Calendar, User, ArrowRight } from "lucide-react";

/**
 * Skeleton Loading for News Page
 */
export default function NewsLoading() {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Skeleton (Matches NewsHero layout) */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-32 px-6 bg-slate-950">
        <div className="absolute inset-0 z-0 opacity-20">
          <Skeleton className="w-full h-full bg-slate-800" />
        </div>
        <div className="max-w-4xl mx-auto relative z-20 text-center space-y-8 w-full">
          <div className="p-12 lg:p-16 rounded-[60px] bg-white/5 border border-white/10 backdrop-blur-2xl space-y-6 shadow-2xl">
            <Skeleton className="h-8 w-48 mx-auto rounded-full bg-white/10" />
            <Skeleton className="h-20 w-3/4 mx-auto rounded-2xl bg-white/10" />
            <Skeleton className="h-6 w-2/3 mx-auto rounded-xl bg-white/10" />
          </div>
        </div>
      </section>

      {/* Newspaper Section Skeleton */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-primary/5 rounded-2xl">
            <BookOpen className="text-primary/20" size={28} />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-8 w-64 rounded-xl" />
            <Skeleton className="h-5 w-48 rounded-lg" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-border rounded-[24px] overflow-hidden flex flex-col">
              <Skeleton className="aspect-[4/5] w-full" />
              <div className="p-6 space-y-4">
                <Skeleton className="h-6 w-3/4 rounded-lg" />
                <div className="pt-4 border-t border-border/50 flex justify-between">
                  <Skeleton className="h-4 w-24 rounded" />
                  <Skeleton className="h-4 w-12 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Briefings Skeleton */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-primary/5 rounded-2xl">
            <Film className="text-primary/20" size={28} />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-8 w-48 rounded-xl" />
            <Skeleton className="h-5 w-64 rounded-lg" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-border rounded-[16px] overflow-hidden flex flex-col">
              <Skeleton className="aspect-video w-full" />
              <div className="p-6 space-y-4">
                <Skeleton className="h-7 w-5/6 rounded-lg" />
                <Skeleton className="h-4 w-full rounded" />
                <div className="pt-4 border-t border-border/50 flex justify-between">
                  <Skeleton className="h-4 w-20 rounded" />
                  <Skeleton className="h-4 w-16 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured News Skeleton */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-primary/5 rounded-2xl">
            <BookOpen className="text-primary/20" size={28} />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-8 w-56 rounded-xl" />
            <Skeleton className="h-5 w-40 rounded-lg" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Large Feature Skeleton */}
          <div className="p-8 rounded-[24px] bg-white border border-border flex flex-col space-y-8 shadow-lg shadow-primary/5">
            <Skeleton className="aspect-video w-full rounded-[16px]" />
            <div className="space-y-4">
              <div className="flex gap-6">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-4 w-24 rounded" />
              </div>
              <Skeleton className="h-10 w-full rounded-2xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-2/3 rounded" />
              </div>
              <Skeleton className="h-5 w-32 rounded-lg" />
            </div>
          </div>

          {/* List Skeletons */}
          <div className="space-y-8 flex flex-col">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 rounded-[20px] bg-white border border-border flex flex-col sm:flex-row gap-8 shadow-sm shadow-primary/5">
                <Skeleton className="w-full sm:w-48 h-48 rounded-[16px] shrink-0" />
                <div className="space-y-4 py-2 flex-1 flex flex-col justify-center">
                  <Skeleton className="h-3 w-20 rounded" />
                  <Skeleton className="h-6 w-full rounded-lg" />
                  <Skeleton className="h-4 w-5/6 rounded" />
                  <Skeleton className="h-4 w-24 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
