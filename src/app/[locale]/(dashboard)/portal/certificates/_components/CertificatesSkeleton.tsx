export default function CertificatesSkeleton() {
  return (
    <div className="bg-white border border-border/50 shadow-sm rounded-[16px] overflow-hidden p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((skeleton) => (
          <div
            key={skeleton}
            className="border border-border/50 rounded-2xl p-6 h-48 animate-pulse bg-slate-50/50"
          >
            <div className="w-12 h-12 bg-slate-200 rounded-xl mb-4" />
            <div className="space-y-3">
              <div className="h-5 w-3/4 bg-slate-200 rounded-lg" />
              <div className="h-4 w-1/2 bg-slate-100 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
