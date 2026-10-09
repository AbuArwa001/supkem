"use client";

interface OrganizationSkeletonProps {
    viewMode: "grid" | "list";
}

export function OrganizationSkeleton({ viewMode }: OrganizationSkeletonProps) {
    if (viewMode === "list") {
        return (
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs p-4 space-y-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/70 border border-slate-100 animate-pulse gap-4"
                    >
                        <div className="flex items-center gap-4 flex-1">
                            <div className="w-11 h-11 bg-slate-200 rounded-xl shrink-0" />
                            <div className="space-y-2 flex-1 max-w-sm">
                                <div className="h-4.5 bg-slate-200 rounded-md w-3/4" />
                                <div className="h-3 bg-slate-100 rounded-md w-1/3" />
                            </div>
                        </div>
                        <div className="h-6 w-24 bg-slate-200 rounded-lg hidden sm:block" />
                        <div className="h-5 w-32 bg-slate-100 rounded-md hidden md:block" />
                        <div className="h-9 w-28 bg-slate-200 rounded-xl shrink-0" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                    key={i}
                    className="bg-white rounded-3xl border border-slate-200/80 p-6 animate-pulse space-y-5"
                >
                    <div className="flex items-start justify-between gap-3">
                        <div className="w-13 h-13 bg-slate-200 rounded-2xl shrink-0" />
                        <div className="h-6 w-24 bg-slate-200 rounded-lg" />
                    </div>

                    <div className="space-y-2.5">
                        <div className="h-5 bg-slate-200 rounded-lg w-4/5" />
                        <div className="flex gap-2">
                            <div className="h-4 bg-slate-100 rounded-md w-20" />
                            <div className="h-4 bg-slate-100 rounded-md w-28" />
                        </div>
                    </div>

                    <div className="h-10 bg-slate-50 rounded-xl border border-slate-100" />

                    <div className="grid grid-cols-2 gap-3">
                        <div className="h-14 bg-slate-100 rounded-xl" />
                        <div className="h-14 bg-slate-100 rounded-xl" />
                    </div>

                    <div className="h-10 bg-slate-200 rounded-xl pt-2" />
                </div>
            ))}
        </div>
    );
}
