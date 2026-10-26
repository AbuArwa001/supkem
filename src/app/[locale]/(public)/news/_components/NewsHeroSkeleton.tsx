import { Skeleton } from "@/components/ui/skeleton";

export function NewsHeroSkeleton() {
  return (
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
  );
}
