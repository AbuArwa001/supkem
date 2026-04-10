import { Skeleton } from "@/components/ui/skeleton";

export default function ServicesLoading() {
  return (
    <div className="space-y-24 pb-24 bg-slate-50">
      {/* Services Hero Skeleton */}
      <section className="relative h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-slate-900">
        <Skeleton className="absolute inset-0 bg-slate-800" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 w-full text-center space-y-6 pt-16">
          <Skeleton className="h-6 w-32 mx-auto rounded-full bg-white/10" />
          <Skeleton className="h-16 w-3/4 mx-auto rounded-2xl bg-white/10" />
          <Skeleton className="h-6 w-2/3 mx-auto rounded-xl bg-white/10" />
        </div>
      </section>

      {/* Services Grid Skeleton */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-[24px] border border-border p-8 space-y-6 shadow-sm">
              <Skeleton className="w-16 h-16 rounded-2xl" />
              <div className="space-y-3">
                <Skeleton className="h-6 w-3/4 rounded-lg" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-5/6 rounded" />
              </div>
              <div className="pt-4 border-t border-border/50">
                <Skeleton className="h-4 w-24 rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services CTA Skeleton */}
      <section className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="bg-primary rounded-[32px] p-12 text-center space-y-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-20 space-y-6 max-w-2xl mx-auto">
            <Skeleton className="h-10 w-3/4 mx-auto rounded-xl bg-white/20" />
            <Skeleton className="h-5 w-full mx-auto rounded-lg bg-white/20" />
            <Skeleton className="h-14 w-48 mx-auto rounded-xl bg-white/20 mt-8" />
          </div>
        </div>
      </section>
    </div>
  );
}
