import { Skeleton } from "@/components/ui/skeleton";

export default function NewsPaperLoading() {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Newspaper Hero Skeleton */}
      <header className="relative h-[60vh] min-h-[480px] flex items-end overflow-hidden bg-slate-900">
        <Skeleton className="absolute inset-0 bg-slate-800" />
        <div className="max-w-7xl mx-auto px-6 pb-24 w-full relative z-10">
          <div className="max-w-4xl space-y-6">
            <Skeleton className="h-8 w-32 rounded-full bg-white/20" />
            <Skeleton className="h-16 w-full max-w-2xl rounded-2xl bg-white/20" />
            <Skeleton className="h-16 w-3/4 max-w-xl rounded-2xl bg-white/20" />
            <div className="flex gap-6 pt-2">
              <Skeleton className="h-4 w-32 rounded bg-white/20" />
              <Skeleton className="h-6 w-24 rounded-full bg-white/20" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="flex flex-col gap-8">
          
          {/* Actions Bar Skeleton */}
          <div className="bg-white rounded-[16px] p-6 shadow-2xl shadow-black/5 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Skeleton className="w-12 h-12 rounded-2xl" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-32 rounded-lg" />
                <Skeleton className="h-4 w-48 rounded" />
              </div>
            </div>
            <Skeleton className="h-14 w-full md:w-48 rounded-xl" />
          </div>

          {/* PDF Viewer Skeleton */}
          <div className="bg-white border border-border/50 rounded-[20px] p-2 md:p-6 shadow-2xl shadow-black/5 h-[80vh] min-h-[600px] flex flex-col">
            <Skeleton className="w-full h-full rounded-[16px]" />
          </div>

        </div>
      </main>
    </div>
  );
}
