import { useState } from "react";
import { mutate } from "swr";
import { toast } from "sonner";
import { updateRolePermissionsService, updateRoleService, deleteRoleService } from "./services";
import type { Role } from "./types";

interface UseRoleMutationActionsProps {
  role: Role | null;
  roleName: string;
  selectedIds: (string | number)[];
  onClose: () => void;
}

export function useRoleMutationActions({
  role,
  roleName,
  selectedIds,
  onClose,
}: UseRoleMutationActionsProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSave = async () => {
    if (!role) return;
    const trimmedName = roleName.trim();
    if (!trimmedName) {
      toast.error("Role name cannot be empty.");
      return;
    }

    setIsSaving(true);
    try {
      if (!role.is_system_role && trimmedName !== role.role_name) {
        await updateRoleService(role.id, trimmedName, selectedIds);
        toast.success(`Role "${trimmedName}" updated successfully`);
      } else {
        await updateRolePermissionsService(role.id, selectedIds);
        toast.success(`Permissions for "${role.role_name}" updated successfully`);
      }
      mutate("/users/roles/");
      onClose();
    } catch (error: any) {
      const msg = error.response?.data?.detail || error.response?.data?.role_name?.[0] || "Failed to update role";
      toast.error(msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!role) return;
    if (role.is_system_role) {
      toast.error("Core system roles cannot be deleted.");
      return;
    }
    if (role.users_count && role.users_count > 0) {
      toast.error(`Cannot delete role: ${role.users_count} active user(s) are assigned to it.`);
      return;
    }

    setIsDeleting(true);
    try {
      await deleteRoleService(role.id);
      toast.success(`Role "${role.role_name}" deleted successfully.`);
      mutate("/users/roles/");
      onClose();
    } catch (error: any) {
      const msg = error.response?.data?.detail || "Failed to delete role.";
      toast.error(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  return { isSaving, isDeleting, handleSave, handleDelete };
}
