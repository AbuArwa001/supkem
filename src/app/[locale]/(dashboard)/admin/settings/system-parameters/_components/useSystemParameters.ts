import { useState, useMemo } from "react";
import useSWR from "swr";
import api from "@/lib/api";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { SystemParameter } from "./systemParamTypes";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export function useSystemParameters(canAccess: boolean) {
  const t = useTranslations("Dashboard.admin.settings.systemParams");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [pendingChanges, setPendingChanges] = useState<Record<string, string>>({});
  const [updatingKey, setUpdatingKey] = useState<string | null>(null);

  const { data: rawData, mutate, isLoading } = useSWR<any>(
    canAccess ? "/configurations/system-parameters/" : null,
    fetcher
  );

  const parameters: SystemParameter[] = Array.isArray(rawData) ? rawData : rawData?.results || [];

  const handleValueChange = (key: string, value: string) => {
    setPendingChanges((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (key: string) => {
    const value = pendingChanges[key];
    if (value === undefined) return;
    setUpdatingKey(key);
    try {
      await api.patch(`/configurations/system-parameters/${key}/`, { value });
      const updated = parameters.map((p) => (p.key === key ? { ...p, value } : p));
      mutate(rawData?.results ? { ...rawData, results: updated } : updated, false);
      setPendingChanges((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      toast.success(t("updateSuccess"));
    } catch {
      toast.error(t("updateError"));
    } finally {
      setUpdatingKey(null);
    }
  };

  const filteredParameters = useMemo(() => {
    return parameters.filter((p) => {
      const trName = t.has(`items.${p.key}.name`) ? t(`items.${p.key}.name`) : p.name;
      const trDesc = t.has(`items.${p.key}.description`) ? t(`items.${p.key}.description`) : p.description;
      const q = search.toLowerCase();
      const matchesSearch =
        (p.name || "").toLowerCase().includes(q) ||
        (p.key || "").toLowerCase().includes(q) ||
        (trName || "").toLowerCase().includes(q) ||
        (trDesc || "").toLowerCase().includes(q);
      const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [parameters, search, selectedCategory, t]);

  return {
    search, setSearch, selectedCategory, setSelectedCategory,
    pendingChanges, updatingKey, isLoading, mutate,
    handleValueChange, handleSave, filteredParameters,
  };
}
