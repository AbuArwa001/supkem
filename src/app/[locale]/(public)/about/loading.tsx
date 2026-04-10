import { Skeleton } from "@/components/ui/skeleton";

export default function AboutLoading() {
  return (
    <div className="bg-white pb-24">
      {/* Hero Skeleton */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Skeleton className="absolute inset-0 bg-slate-100" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40 backdrop-blur-sm" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center space-y-6">
          <Skeleton className="h-4 w-32 mx-auto rounded-full bg-white/20" />
          <Skeleton className="h-16 w-3/4 max-w-2xl mx-auto rounded-2xl bg-white/20" />
          <Skeleton className="h-6 w-1/2 max-w-lg mx-auto rounded-xl bg-white/20" />
        </div>
      </section>

      {/* History Skeleton */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <Skeleton className="h-4 w-32 rounded-full" />
            <Skeleton className="h-12 w-3/4 rounded-xl" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-5/6 rounded" />
              <Skeleton className="h-4 w-4/6 rounded" />
            </div>
            <div className="pt-4 flex gap-4">
              <Skeleton className="h-12 w-32 rounded-xl" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 relative">
            <Skeleton className="aspect-[4/5] w-full rounded-2xl shadow-xl transform translate-y-12" />
            <Skeleton className="aspect-[4/5] w-full rounded-2xl shadow-xl" />
          </div>
        </div>
      </section>

      {/* Leadership Skeleton */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <Skeleton className="h-4 w-40 mx-auto rounded-full" />
            <Skeleton className="h-10 w-2/3 mx-auto rounded-xl" />
            <Skeleton className="h-6 w-3/4 mx-auto rounded-lg" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-6">
                <Skeleton className="w-48 h-48 rounded-full shadow-lg" />
                <div className="space-y-2 w-full">
                  <Skeleton className="h-6 w-3/4 mx-auto rounded-lg" />
                  <Skeleton className="h-4 w-1/2 mx-auto rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
