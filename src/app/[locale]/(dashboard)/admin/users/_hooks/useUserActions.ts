import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { userService } from "../_services/userService";
import { UserItem } from "./useUsersLogic";

export function useUserActions(
  mutate: any,
  mutateStats: any,
  selectedUserIds: (string | number)[],
  setSelectedUserIds: Dispatch<SetStateAction<(string | number)[]>>
) {
  const handleDelete = async (user: UserItem) => {
    if (confirm(`Are you sure you want to permanently remove ${user.full_name}?`)) {
      try {
        await userService.deleteUser(user.id);
        toast.success("User deleted successfully");
        mutate();
        mutateStats();
      } catch (err) {
        toast.error("Failed to delete user. They might have dependent records.");
      }
    }
  };

  const handleToggleActive = async (user: UserItem) => {
    const targetStatus = !user.is_active;

    mutate((current: any) => {
      if (!current) return current;
      if (Array.isArray(current)) {
        return current.map((u: any) => (u.id === user.id ? { ...u, is_active: targetStatus } : u));
      }
      return {
        ...current,
        results: (current.results || []).map((u: any) =>
          u.id === user.id ? { ...u, is_active: targetStatus } : u
        ),
      };
    }, false);

    try {
      await userService.toggleActive(user.id, targetStatus);
      toast.success(`Account for ${user.full_name} ${targetStatus ? "activated" : "suspended"}.`);
      mutate();
      mutateStats();
    } catch (err) {
      toast.error("Failed to update account status.");
      mutate();
    }
  };

  const handleResendVerification = async (user: UserItem) => {
    try {
      await userService.resendVerification(user.id);
      toast.success(`Verification email sent to ${user.email}.`);
    } catch (err) {
      toast.error("Failed to send verification email.");
    }
  };

  const handleSendPasswordReset = async (user: UserItem) => {
    try {
      await userService.sendPasswordReset(user.email);
      toast.success(`Password reset instructions sent to ${user.email}.`);
    } catch (err) {
      toast.error("Failed to send password reset email.");
    }
  };

  const handleBulkAction = async (action: "activate" | "deactivate" | "delete" | "resend_verification") => {
    if (selectedUserIds.length === 0) return;
    if (action === "delete" && !confirm(`Are you sure you want to permanently delete ${selectedUserIds.length} selected users?`)) return;
    if (action === "resend_verification" && !confirm(`Resend verification email to ${selectedUserIds.length} selected user(s)?`)) return;

    try {
      const res = await userService.bulkAction(selectedUserIds, action);
      toast.success(res.data?.detail || "Bulk operation completed.");
      setSelectedUserIds([]);
      mutate();
      mutateStats();
    } catch (err: any) {
      const msg = err?.response?.data?.detail || err?.response?.data?.message || "Failed to complete bulk operation.";
      toast.error(msg);
    }
  };

  return {
    handleDelete,
    handleToggleActive,
    handleResendVerification,
    handleSendPasswordReset,
    handleBulkAction,
  };
}
