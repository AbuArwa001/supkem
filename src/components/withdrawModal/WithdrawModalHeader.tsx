import React from "react";
import { Ban } from "lucide-react";

export function WithdrawModalHeader({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100">
        <Ban size={24} />
      </div>
      <div>
        <h3 className="text-xl font-black text-slate-900 font-outfit">
          Withdraw Application{count > 1 ? "s" : ""}
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Confirm withdrawal for {count} selected submission{count > 1 ? "s" : ""}.
        </p>
      </div>
    </div>
  );
}
