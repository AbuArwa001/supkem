import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen } from "lucide-react";

export function FeaturedNewsSkeleton() {
  return (
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
  );
}
