import { Skeleton } from "@/components/ui/skeleton";

export default function ArticleLoading() {
  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      {/* Article Hero Skeleton */}
      <header className="relative h-[65vh] min-h-[520px] flex items-end overflow-hidden bg-slate-900">
        <Skeleton className="absolute inset-0 bg-slate-800" />
        <div className="max-w-4xl mx-auto px-6 pb-16 w-full relative z-10 space-y-6">
          <Skeleton className="h-8 w-24 rounded-full bg-white/20" />
          <Skeleton className="h-16 w-full max-w-3xl rounded-2xl bg-white/20" />
          <Skeleton className="h-16 w-2/3 max-w-2xl rounded-2xl bg-white/20" />
          <div className="flex gap-6 pt-2">
            <Skeleton className="h-4 w-32 rounded bg-white/20" />
            <Skeleton className="h-4 w-24 rounded bg-white/20" />
          </div>
        </div>
      </header>

      {/* Article Body Skeleton */}
      <main className="max-w-3xl mx-auto px-6 -mt-12 relative z-20">
        <div className="bg-white rounded-[20px] p-8 lg:p-16 shadow-2xl shadow-black/10 border border-slate-100 space-y-8">
          <Skeleton className="h-8 w-3/4 rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-5/6 rounded" />
          </div>
          
          <Skeleton className="h-64 w-full rounded-3xl my-8" />
          
          <div className="space-y-4">
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-11/12 rounded" />
            <Skeleton className="h-4 w-4/5 rounded" />
          </div>
          
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-[16px] bg-slate-50 border border-border">
            <div className="flex items-center gap-4">
              <Skeleton className="w-12 h-12 rounded-2xl" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-32 rounded-lg" />
                <Skeleton className="h-4 w-48 rounded" />
              </div>
            </div>
            <Skeleton className="h-12 w-32 rounded-2xl" />
          </div>
        </div>
      </main>
    </div>
  );
}
