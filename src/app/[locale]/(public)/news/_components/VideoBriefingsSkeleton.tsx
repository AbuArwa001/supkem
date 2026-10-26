import { Skeleton } from "@/components/ui/skeleton";
import { Film } from "lucide-react";

export function VideoBriefingsSkeleton() {
  return (
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
  );
}
