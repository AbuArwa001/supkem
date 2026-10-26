import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen } from "lucide-react";

export function NewsPaperSkeleton() {
  return (
    <section className="max-w-7xl mx-auto px-6 space-y-12">
      <div className="flex items-center gap-4">
        <div className="p-4 bg-primary/5 rounded-2xl">
          <BookOpen className="text-primary/20" size={28} />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-8 w-64 rounded-xl" />
          <Skeleton className="h-5 w-48 rounded-lg" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white border border-border rounded-[24px] overflow-hidden flex flex-col">
            <Skeleton className="aspect-[4/5] w-full" />
            <div className="p-6 space-y-4">
              <Skeleton className="h-6 w-3/4 rounded-lg" />
              <div className="pt-4 border-t border-border/50 flex justify-between">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-4 w-12 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
