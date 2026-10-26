import { useState, useEffect } from "react";
import { usePermissions } from "@/hooks/usePermissions";
import type { Role } from "./types";
import { getModuleForPermission } from "./permissionsRegistry";
import { useRolePermissionsModules } from "./useRolePermissionsModules";
import { useRoleMutationActions } from "./useRoleMutationActions";

export function useRolePermissionsLogic(isOpen: boolean, role: Role | null, onClose: () => void) {
  const { isSuperAdmin } = usePermissions();
  const [roleName, setRoleName] = useState("");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [expandedModuleIds, setExpandedModuleIds] = useState<string[]>([]);

  useEffect(() => {
    if (role) {
      setSelectedIds(role.permissions.map((p) => p.id));
      setRoleName(role.role_name);
      const activeModuleIds = new Set<string>();
      role.permissions.forEach((perm) => {
        const mod = getModuleForPermission(perm);
        if (mod) activeModuleIds.add(mod.id);
      });
      if (activeModuleIds.size === 0) {
        setExpandedModuleIds(["finance", "applications"]);
      } else {
        setExpandedModuleIds(Array.from(activeModuleIds));
      }
    }
  }, [role]);

  const { sanitizedPermissions, modules, isLoadingPerms } = useRolePermissionsModules(isOpen, search);

  useEffect(() => {
    if (search.trim()) {
      setExpandedModuleIds(modules.map((m) => m.meta.id));
    }
  }, [search, modules]);

  const togglePermission = (id: string | number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleToggleSection = (ids: (string | number)[], selectAll: boolean) => {
    setSelectedIds((prev) => (selectAll ? Array.from(new Set([...prev, ...ids])) : prev.filter((id) => !ids.includes(id))));
  };

  const handleToggleExpand = (moduleId: string) => {
    setExpandedModuleIds((prev) => (prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]));
  };

  const handleExpandAll = () => {
    setExpandedModuleIds(expandedModuleIds.length === modules.length ? [] : modules.map((m) => m.meta.id));
  };

  const handleSelectAll = () => {
    const allIds = sanitizedPermissions.map((p) => p.id);
    setSelectedIds(selectedIds.length === allIds.length ? [] : allIds);
  };

  const { isSaving, isDeleting, handleSave, handleDelete } = useRoleMutationActions({
    role,
    roleName,
    selectedIds,
    onClose,
  });

  return {
    roleName, setRoleName, search, setSearch, selectedIds, isSaving, isDeleting, isLoadingPerms,
    modules, expandedModuleIds, isAllExpanded: Boolean(modules.length > 0 && expandedModuleIds.length === modules.length),
    handleToggleExpand, handleExpandAll, handleToggleSection, togglePermission, handleSave, handleDelete,
    handleSelectAll, isAllSelected: Boolean(sanitizedPermissions.length > 0 && selectedIds.length === sanitizedPermissions.length),
    isSuperAdmin, totalPermissionsCount: sanitizedPermissions.length,
  };
}
