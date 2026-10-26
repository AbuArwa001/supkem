import { useState, useEffect } from "react";
import { mutate } from "swr";
import { toast } from "sonner";
import { createRoleService } from "../RolePermissionsDialog/services";
import { RolePreset } from "../RolePermissionsDialog/permissionsRegistry";
import { useRolePermissionsModules } from "../RolePermissionsDialog/useRolePermissionsModules";

interface UseAddRoleLogicProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const PRESET_MODULE_MAP: Record<string, string[]> = {
  finance_officer: ["finance", "applications"],
  applications_officer: ["applications", "certificates_letters"],
  it_officer: ["users_roles", "configurations"],
  communications_officer: ["news_media"],
};

export function useAddRoleLogic({ isOpen, onClose, onSuccess }: UseAddRoleLogicProps) {
  const [roleName, setRoleName] = useState("");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [expandedModuleIds, setExpandedModuleIds] = useState<string[]>(["finance", "applications"]);
  const [isSaving, setIsSaving] = useState(false);
  const [nameError, setNameError] = useState("");

  const { sanitizedPermissions, modules, isLoadingPerms } = useRolePermissionsModules(isOpen, search);

  useEffect(() => {
    if (search.trim()) setExpandedModuleIds(modules.map((m) => m.meta.id));
  }, [search, modules]);

  const togglePermission = (id: string | number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };
  const handleToggleSection = (ids: (string | number)[], selectAll: boolean) => {
    setSelectedIds((prev) => (selectAll ? Array.from(new Set([...prev, ...ids])) : prev.filter((id) => !ids.includes(id))));
  };
  const handleToggleExpand = (id: string) => {
    setExpandedModuleIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };
  const handleExpandAll = () => {
    setExpandedModuleIds(expandedModuleIds.length === modules.length ? [] : modules.map((m) => m.meta.id));
  };
  const handleSelectAll = () => {
    const all = sanitizedPermissions.map((p) => p.id);
    setSelectedIds(selectedIds.length === all.length ? [] : all);
  };

  const applyRolePreset = (preset: RolePreset) => {
    if (!roleName.trim()) setRoleName(preset.roleName);
    if (nameError) setNameError("");
    const matched = sanitizedPermissions.filter((p) => preset.codenames.includes(p.codename)).map((p) => p.id);
    setSelectedIds(Array.from(new Set([...selectedIds, ...matched])));
    if (PRESET_MODULE_MAP[preset.id]) {
      setExpandedModuleIds((prev) => Array.from(new Set([...prev, ...PRESET_MODULE_MAP[preset.id]])));
    }
    toast.success(`Preset "${preset.roleName}" applied: ${matched.length} permissions assigned.`);
  };

  const handleClose = () => {
    setRoleName(""); setSearch(""); setSelectedIds([]); setNameError("");
    setExpandedModuleIds(["finance", "applications"]);
    onClose();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = roleName.trim();
    if (!trimmed) return setNameError("Please enter a role name.");
    setNameError("");
    setIsSaving(true);
    try {
      await createRoleService(trimmed, selectedIds);
      toast.success(`Role "${trimmed}" created successfully.`);
      mutate("/users/roles/");
      if (onSuccess) onSuccess();
      handleClose();
    } catch (err: any) {
      const msg = err.response?.data?.role_name?.[0] || err.response?.data?.detail || "Failed to create role.";
      setNameError(err.response?.data?.role_name?.[0] || "");
      toast.error(msg);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    roleName, setRoleName, search, setSearch, selectedIds, expandedModuleIds,
    isSaving, nameError, setNameError, sanitizedPermissions, modules, isLoadingPerms,
    togglePermission, handleToggleSection, handleToggleExpand, handleExpandAll,
    handleSelectAll, applyRolePreset, handleClose, handleSave,
    isAllSelected: Boolean(sanitizedPermissions.length > 0 && selectedIds.length === sanitizedPermissions.length),
    isAllExpanded: Boolean(modules.length > 0 && expandedModuleIds.length === modules.length),
  };
}
