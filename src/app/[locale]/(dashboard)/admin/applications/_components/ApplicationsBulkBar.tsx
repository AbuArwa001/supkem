import React from "react";
import { CheckCircle2, XCircle, Trash2, Loader2 } from "lucide-react";
import { BulkActionBar } from "@/components/BulkActionBar";

interface ApplicationsBulkBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  isBulkProcessing: boolean;
  handleBulkApprove: () => void;
  handleBulkReject: () => void;
  handleBulkDelete: () => void;
}

export function ApplicationsBulkBar({
  selectedCount,
  onClearSelection,
  isBulkProcessing,
  handleBulkApprove,
  handleBulkReject,
  handleBulkDelete,
}: ApplicationsBulkBarProps) {
  return (
    <BulkActionBar selectedCount={selectedCount} onClearSelection={onClearSelection}>
      <button
        type="button"
        onClick={handleBulkApprove}
        disabled={isBulkProcessing}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-50"
      >
        {isBulkProcessing ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
        Approve
      </button>

      <button
        type="button"
        onClick={handleBulkReject}
        disabled={isBulkProcessing}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-amber-600/20 transition-all cursor-pointer disabled:opacity-50"
      >
        {isBulkProcessing ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} />}
        Reject
      </button>

      <button
        type="button"
        onClick={handleBulkDelete}
        disabled={isBulkProcessing}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-rose-600/20 transition-all cursor-pointer disabled:opacity-50"
      >
        {isBulkProcessing ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
        Delete
      </button>
    </BulkActionBar>
  );
}
