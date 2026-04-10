import { Skeleton } from "@/components/ui/skeleton";

export default function ContactLoading() {
  return (
    <div className="bg-white pb-32">
      {/* Contact Hero Skeleton */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-slate-900">
        <Skeleton className="absolute inset-0 bg-slate-800" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center space-y-6 pt-16">
          <Skeleton className="h-14 w-3/4 max-w-2xl mx-auto rounded-xl bg-white/10" />
          <Skeleton className="h-5 w-1/2 max-w-lg mx-auto rounded-lg bg-white/10" />
        </div>
      </section>

      {/* Contact Content Skeleton */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          
          {/* Contact Info Sidebar Skeleton */}
          <div className="space-y-12">
            <div className="space-y-4">
              <Skeleton className="h-10 w-2/3 rounded-xl" />
              <Skeleton className="h-4 w-5/6 rounded" />
              <Skeleton className="h-4 w-4/6 rounded" />
            </div>
            
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-6 items-start">
                  <Skeleton className="w-12 h-12 rounded-full shrink-0" />
                  <div className="space-y-2 flex-1 pt-1">
                    <Skeleton className="h-5 w-32 rounded-lg" />
                    <Skeleton className="h-4 w-48 rounded" />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 space-y-4">
              <Skeleton className="h-6 w-40 rounded-lg" />
              <div className="flex gap-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <Skeleton className="w-12 h-12 rounded-full" />
                <Skeleton className="w-12 h-12 rounded-full" />
              </div>
            </div>
          </div>

          {/* Contact Form Skeleton */}
          <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-2xl shadow-primary/5 border border-border space-y-8">
            <div className="space-y-2">
              <Skeleton className="h-8 w-48 rounded-xl" />
              <Skeleton className="h-4 w-64 rounded" />
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20 rounded" />
                  <Skeleton className="h-12 w-full rounded-xl bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20 rounded" />
                  <Skeleton className="h-12 w-full rounded-xl bg-slate-50" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-12 w-full rounded-xl bg-slate-50" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-32 w-full rounded-xl bg-slate-50" />
              </div>
              
              <Skeleton className="h-14 w-full rounded-xl" />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
