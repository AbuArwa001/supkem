"use client";

import { useMemo, useState, useEffect } from "react";
import useSWR from "swr";
import { fetchApplications } from "./services";
import { filterAndSortApplications } from "../_utils/filterApplications";
import { getApplicationStatusStyles, getApplicationStatusIcon } from "../_utils/statusConfig";
import { executeBulkWithdraw } from "../_utils/bulkWithdrawHelper";

export function useApplicationsLogic() {
  const { data, error, isLoading, mutate } = useSWR("/applications/applications/", fetchApplications);
  const rawApplications = useMemo(() => data || [], [data]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "service_asc" | "status">("newest");
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawMessage, setWithdrawMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const distinctServices = useMemo(() => {
    const set = new Set<string>();
    rawApplications.forEach((app) => { if (app.service_name?.trim()) set.add(app.service_name.trim()); });
    return Array.from(set).sort();
  }, [rawApplications]);

  useEffect(() => { setCurrentPage(1); }, [searchTerm, selectedService, statusFilter, sortBy]);

  const filteredAndSortedApps = useMemo(
    () => filterAndSortApplications(rawApplications, searchTerm, selectedService, statusFilter, sortBy),
    [rawApplications, searchTerm, selectedService, statusFilter, sortBy]
  );

  const totalPages = Math.ceil(filteredAndSortedApps.length / pageSize) || 1;
  const paginatedApps = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAndSortedApps.slice(start, start + pageSize);
  }, [filteredAndSortedApps, currentPage, pageSize]);

  const toggleSelectApp = (id: string | number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const toggleSelectAll = () => {
    setSelectedIds(selectedIds.length === paginatedApps.length && paginatedApps.length > 0 ? [] : paginatedApps.map((a) => a.id));
  };

  const clearSelection = () => setSelectedIds([]);

  const handleBulkWithdraw = async (reason?: string) => {
    if (selectedIds.length === 0) return;
    setIsWithdrawing(true);
    setWithdrawMessage(null);
    try {
      const res = await executeBulkWithdraw(selectedIds, reason);
      setWithdrawMessage({ type: res.success ? "success" : "error", text: res.message });
      if (res.success) { clearSelection(); await mutate(); }
    } finally {
      setIsWithdrawing(false);
    }
  };

  return {
    applications: rawApplications,
    filteredAndSortedApps,
    paginatedApps,
    error,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedService,
    setSelectedService,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    distinctServices,
    selectedIds,
    toggleSelectApp,
    toggleSelectAll,
    clearSelection,
    currentPage,
    setCurrentPage,
    pageSize,
    totalPages,
    isWithdrawing,
    withdrawMessage,
    handleBulkWithdraw,
    getStatusStyles: getApplicationStatusStyles,
    getStatusIcon: getApplicationStatusIcon,
    mutate,
  };
}
