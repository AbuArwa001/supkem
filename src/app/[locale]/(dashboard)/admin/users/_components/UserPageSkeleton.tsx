export function UserPageSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="flex justify-between items-end gap-6 pb-2">
        <div className="space-y-3">
          <div className="h-4 w-32 bg-slate-200 rounded-full" />
          <div className="h-10 w-72 bg-slate-200 rounded-2xl" />
          <div className="h-4 w-96 bg-slate-100 rounded-lg" />
        </div>
        <div className="flex gap-3">
          <div className="h-12 w-12 bg-slate-100 rounded-2xl" />
          <div className="h-12 w-36 bg-slate-200 rounded-2xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-40 bg-white border border-slate-100 rounded-[2rem] p-6 space-y-4 shadow-sm">
            <div className="flex justify-between">
              <div className="h-12 w-12 bg-slate-100 rounded-2xl" />
              <div className="h-5 w-20 bg-slate-100 rounded-full" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-24 bg-slate-100 rounded" />
              <div className="h-8 w-20 bg-slate-200 rounded" />
            </div>
          </div>
        ))}
      </div>

      <div className="h-[450px] bg-white border border-slate-100 rounded-[2.5rem] p-8 space-y-6 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="h-6 w-48 bg-slate-100 rounded-xl" />
          <div className="h-9 w-64 bg-slate-100 rounded-xl" />
        </div>
        <div className="space-y-4 pt-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 w-full bg-slate-50 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
