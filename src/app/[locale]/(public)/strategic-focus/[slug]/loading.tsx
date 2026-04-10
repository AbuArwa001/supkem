import { Skeleton } from "@/components/ui/skeleton";

export default function StrategicFocusLoading() {
  return (
    <main className="bg-slate-50 min-h-screen pb-24">
      {/* Strategic Focus Hero Skeleton */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden bg-slate-900">
        <Skeleton className="absolute inset-0 bg-slate-800" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/40" />
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <Skeleton className="h-4 w-24 rounded-full bg-white/20" />
            <Skeleton className="h-16 w-full rounded-2xl bg-white/20" />
            <Skeleton className="h-6 w-5/6 rounded-lg bg-white/20" />
          </div>
        </div>
      </section>

      {/* Strategic Focus Content Skeleton */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-[24px] p-8 md:p-16 shadow-2xl shadow-primary/5 border border-border space-y-16">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <Skeleton className="h-8 w-48 rounded-xl" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-11/12 rounded" />
                <Skeleton className="h-4 w-5/6 rounded" />
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-6 w-32 rounded-lg" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-12 w-full rounded-xl bg-slate-50" />
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-border/50 pt-16">
            <Skeleton className="h-8 w-64 rounded-xl mx-auto mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4 text-center">
                  <Skeleton className="w-16 h-16 rounded-2xl mx-auto" />
                  <Skeleton className="h-6 w-32 mx-auto rounded-lg" />
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-4/5 mx-auto rounded" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
