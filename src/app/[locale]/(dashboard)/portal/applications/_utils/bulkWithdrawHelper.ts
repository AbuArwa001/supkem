import api from "@/lib/api";

export async function executeBulkWithdraw(
  selectedIds: (string | number)[],
  reason?: string
): Promise<{ success: boolean; message: string }> {
  try {
    await api.post("/applications/applications/bulk_withdraw/", {
      ids: selectedIds,
      reason: reason || "Bulk withdrawal requested by applicant",
    });
    return { success: true, message: `Successfully withdrew ${selectedIds.length} application(s).` };
  } catch {
    try {
      await Promise.all(
        selectedIds.map((id) =>
          api.post(`/applications/applications/${id}/withdraw/`, {
            reason: reason || "Bulk withdrawal requested by applicant",
          })
        )
      );
      return { success: true, message: `Successfully withdrew ${selectedIds.length} application(s).` };
    } catch (fallbackErr: any) {
      return {
        success: false,
        message: fallbackErr?.response?.data?.detail || "Failed to withdraw selected applications.",
      };
    }
  }
}
