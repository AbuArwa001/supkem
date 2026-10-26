"use client";

import { Loader2, AlertTriangle } from "lucide-react";
import { useRouter } from "@/i18n/routing";

export function OrgDetailLoadingState() {
  return (
    <div className="h-96 flex items-center justify-center flex-col gap-4">
      <Loader2 className="animate-spin text-primary" size={40} />
      <p className="text-primary/60 font-medium font-outfit">Loading Institution Profile...</p>
    </div>
  );
}

export function OrgDetailNotFoundState() {
  const router = useRouter();
  return (
    <div className="h-96 flex flex-col items-center justify-center gap-4 text-center">
      <AlertTriangle size={48} className="text-red-500/80" />
      <h2 className="text-2xl font-bold text-slate-800 font-outfit">Institution Not Found</h2>
      <p className="text-slate-500">The requested institution could not be located in your registered profile.</p>
      <button
        onClick={() => router.push("/portal/organizations")}
        className="mt-4 px-6 py-2.5 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-primary/90 transition-all cursor-pointer"
      >
        Return to Institutions
      </button>
    </div>
  );
}
