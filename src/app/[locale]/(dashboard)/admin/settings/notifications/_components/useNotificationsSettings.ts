import { useState } from "react";
import useSWR from "swr";
import api from "@/lib/api";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { SystemParameter, Role } from "./notificationsTypes";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export function useNotificationsSettings(canAccess: boolean) {
  const t = useTranslations("Dashboard.admin.settings.notifications");
  const [pendingChanges, setPendingChanges] = useState<Record<string, string>>({});
  const [updatingKey, setUpdatingKey] = useState<string | null>(null);

  const { data: rawParams, isLoading: paramsLoading, mutate: mutateParams } = useSWR<any>(
    canAccess ? "/configurations/system-parameters/?category=notifications" : null,
    fetcher
  );

  const { data: rawRoles, isLoading: rolesLoading } = useSWR<any>(
    canAccess ? "/users/roles/" : null,
    fetcher
  );

  const parameters: SystemParameter[] = Array.isArray(rawParams) ? rawParams : rawParams?.results || [];
  const roles: Role[] = Array.isArray(rawRoles) ? rawRoles : rawRoles?.results || [];

  const handleValueChange = (key: string, value: string) => {
    setPendingChanges((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (key: string) => {
    const value = pendingChanges[key];
    if (value === undefined) return;
    setUpdatingKey(key);
    try {
      await api.patch(`/configurations/system-parameters/${key}/`, { value });
      toast.success(t("updateSuccess", { key }));
      const updated = parameters.map((p) => (p.key === key ? { ...p, value } : p));
      mutateParams(rawParams?.results ? { ...rawParams, results: updated } : updated, false);
      setPendingChanges((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    } catch {
      toast.error(t("updateError"));
    } finally {
      setUpdatingKey(null);
    }
  };

  const toggleRole = (currentValue: string, roleName: string) => {
    let selected: string[] = [];
    try {
      selected = JSON.parse(currentValue);
    } catch {
      selected = [];
    }
    const next = selected.includes(roleName) ? selected.filter((r) => r !== roleName) : [...selected, roleName];
    return JSON.stringify(next);
  };

  return {
    parameters, roles, paramsLoading, rolesLoading, mutateParams,
    pendingChanges, updatingKey, handleValueChange, handleSave, toggleRole,
  };
}
