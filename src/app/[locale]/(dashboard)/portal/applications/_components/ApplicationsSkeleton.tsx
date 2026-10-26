export function ApplicationsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white rounded-[24px] border border-slate-100 p-6 animate-pulse space-y-4">
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 bg-slate-100 rounded-2xl" />
            <div className="h-5 w-20 bg-slate-100 rounded-full" />
          </div>
          <div className="space-y-2">
            <div className="h-5 w-3/4 bg-slate-100 rounded-lg" />
            <div className="h-4 w-1/2 bg-slate-50 rounded-lg" />
          </div>
          <div className="border-t border-slate-50 pt-4 space-y-2">
            <div className="h-3 w-2/3 bg-slate-50 rounded" />
            <div className="h-3 w-1/2 bg-slate-50 rounded" />
          </div>
          <div className="h-10 w-full bg-slate-50 rounded-xl" />
        </div>
      ))}
    </div>
  );
}
