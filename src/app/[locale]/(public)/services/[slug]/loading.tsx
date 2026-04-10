import { Skeleton } from "@/components/ui/skeleton";

export default function ServiceDetailLoading() {
  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      {/* Service Detail Hero Skeleton */}
      <section className="relative h-[55vh] min-h-[450px] flex items-center justify-center overflow-hidden bg-slate-900">
        <Skeleton className="absolute inset-0 bg-slate-800" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 w-full text-center space-y-6 pt-16">
          <Skeleton className="h-6 w-24 mx-auto rounded-full bg-white/10" />
          <Skeleton className="h-14 w-3/4 max-w-2xl mx-auto rounded-xl bg-white/10" />
        </div>
      </section>

      {/* Main Content Split */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Prose Content Skeleton */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-2xl shadow-primary/5 border border-border space-y-6">
              <Skeleton className="h-8 w-1/2 rounded-xl" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-5/6 rounded" />
                <Skeleton className="h-4 w-5/6 rounded" />
                <Skeleton className="h-4 w-3/4 rounded" />
              </div>
              <Skeleton className="h-6 w-1/3 rounded-lg pt-4 mt-8" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-11/12 rounded" />
                <Skeleton className="h-4 w-4/5 rounded" />
              </div>
              <Skeleton className="h-64 w-full rounded-2xl mt-8" />
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-[24px] p-8 shadow-xl shadow-primary/5 border border-border space-y-6">
              <Skeleton className="h-6 w-1/2 rounded-lg" />
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-12 w-full rounded-xl bg-slate-50" />
                ))}
              </div>
            </div>

            <div className="bg-primary/5 rounded-[24px] p-8 border border-primary/10 space-y-6">
              <Skeleton className="w-16 h-16 rounded-full mx-auto" />
              <div className="space-y-3">
                <Skeleton className="h-6 w-3/4 mx-auto rounded-lg" />
                <Skeleton className="h-4 w-5/6 mx-auto rounded" />
              </div>
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
