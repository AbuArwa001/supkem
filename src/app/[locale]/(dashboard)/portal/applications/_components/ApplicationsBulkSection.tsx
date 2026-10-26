"use client";

import { useState } from "react";
import { Ban } from "lucide-react";
import { BulkActionBar } from "@/components/BulkActionBar";
import { WithdrawConfirmModal } from "@/components/WithdrawConfirmModal";

interface ApplicationsBulkSectionProps {
  selectedCount: number;
  onClearSelection: () => void;
  onBulkWithdraw: (reason: string) => Promise<void>;
  isWithdrawing: boolean;
}

export function ApplicationsBulkSection({
  selectedCount,
  onClearSelection,
  onBulkWithdraw,
  isWithdrawing,
}: ApplicationsBulkSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <BulkActionBar selectedCount={selectedCount} onClearSelection={onClearSelection}>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-rose-600/20 transition-all cursor-pointer"
        >
          <Ban size={15} />
          Withdraw Selected
        </button>
      </BulkActionBar>

      <WithdrawConfirmModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={async (reason) => {
          await onBulkWithdraw(reason);
          setIsOpen(false);
        }}
        count={selectedCount}
        isLoading={isWithdrawing}
      />
    </>
  );
}
