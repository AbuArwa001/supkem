import { Skeleton } from "@/components/ui/skeleton";

export default function VideoBriefingLoading() {
  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      {/* Dark Hero Section for Video Skeleton */}
      <header className="relative bg-black pt-20 pb-12 lg:pt-32 lg:pb-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 space-y-8">
          <Skeleton className="h-8 w-32 rounded-full bg-white/10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-12 space-y-6">
              <Skeleton className="h-6 w-32 rounded-full bg-white/10" />
              <Skeleton className="h-16 lg:h-24 w-full max-w-4xl rounded-3xl bg-white/10" />
              <div className="flex flex-wrap items-center gap-8 pt-4">
                <Skeleton className="h-4 w-40 rounded bg-white/10" />
                <Skeleton className="h-4 w-32 rounded bg-white/10" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Video Content Section Skeleton */}
      <main className="max-w-5xl mx-auto px-6 -mt-10 lg:-mt-20 relative z-20">
        <div className="space-y-12">
          {/* Premium Video Container Skeleton */}
          <div className="aspect-video bg-slate-900 rounded-[20px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border-4 border-white/5 relative flex flex-col justify-end p-6">
            <Skeleton className="w-full h-full absolute inset-0 bg-slate-800" />
            <div className="relative z-10 space-y-4 w-full">
              <Skeleton className="h-2 w-full rounded-full bg-white/20" />
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <Skeleton className="w-8 h-8 rounded-full bg-white/20" />
                  <Skeleton className="w-8 h-8 rounded-full bg-white/20" />
                </div>
                <Skeleton className="w-8 h-8 rounded-full bg-white/20" />
              </div>
            </div>
          </div>

          {/* Meta & Description Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-[16px] p-8 lg:p-12 shadow-xl shadow-black/5 border border-slate-100 space-y-6">
                <Skeleton className="h-8 w-64 rounded-xl" />
                <div className="space-y-4 pt-2">
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-5/6 rounded" />
                  <Skeleton className="h-4 w-4/6 rounded" />
                </div>
              </div>
            </div>

            {/* Sidebar / Actions Skeleton */}
            <div className="space-y-6">
              <div className="bg-white rounded-[16px] p-6 shadow-xl shadow-black/5 border border-slate-100 space-y-6">
                <Skeleton className="h-4 w-16 rounded" />
                <div className="flex gap-4">
                  <Skeleton className="h-10 w-full rounded-xl" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
                <Skeleton className="h-14 w-full rounded-[20px]" />
              </div>

              <div className="bg-slate-100 rounded-[16px] p-8 shadow-xl shadow-primary/5 space-y-4 border border-border">
                <Skeleton className="h-6 w-32 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-5/6 rounded" />
                </div>
                <Skeleton className="h-4 w-32 rounded pt-4" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
