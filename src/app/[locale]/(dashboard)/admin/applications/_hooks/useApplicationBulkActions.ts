import { useState } from "react";
import { applicationService } from "../_services/applicationService";
import { Application } from "../_types";

export function useApplicationBulkActions(reload: () => Promise<void>) {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const toggleSelectApp = (id: string | number) => {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  };

  const toggleSelectAll = (paginatedApps: Application[]) => {
    if (selectedIds.length === paginatedApps.length && paginatedApps.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedApps.map((a) => a.id));
    }
  };

  const clearSelection = () => setSelectedIds([]);

  const executeBulkStatus = async (status: string, label: string) => {
    if (selectedIds.length === 0) return;
    setIsBulkProcessing(true);
    setFeedbackMessage(null);
    try {
      await applicationService.bulkUpdateStatus(selectedIds, status);
      setFeedbackMessage({ type: "success", text: `Successfully ${label} ${selectedIds.length} application(s).` });
      clearSelection();
      await reload();
    } catch (err: any) {
      setFeedbackMessage({ type: "error", text: err?.response?.data?.detail || `Failed to ${label.toLowerCase()} selected applications.` });
    } finally {
      setIsBulkProcessing(false);
    }
  };

  const handleBulkApprove = () => executeBulkStatus("Approved", "approved");
  const handleBulkReject = () => executeBulkStatus("Rejected", "rejected");

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} application(s)? This cannot be undone.`)) return;
    setIsBulkProcessing(true);
    setFeedbackMessage(null);
    try {
      await applicationService.bulkDelete(selectedIds);
      setFeedbackMessage({ type: "success", text: `Successfully deleted ${selectedIds.length} application(s).` });
      clearSelection();
      await reload();
    } catch (err: any) {
      setFeedbackMessage({ type: "error", text: err?.response?.data?.detail || "Failed to delete selected applications." });
    } finally {
      setIsBulkProcessing(false);
    }
  };

  return {
    selectedIds,
    toggleSelectApp,
    toggleSelectAll,
    clearSelection,
    isBulkProcessing,
    feedbackMessage,
    handleBulkApprove,
    handleBulkReject,
    handleBulkDelete,
  };
}
