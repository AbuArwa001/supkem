"use client";

import { useMemo, useState, useEffect } from "react";
import useSWR from "swr";
import { Clock, CheckCircle2, ShieldAlert, HelpCircle, Ban } from "lucide-react";
import { fetchApplications } from "./services";
import { Application } from "./types";
import api from "@/lib/api";

export function useApplicationsLogic() {
  const { data, error, isLoading, mutate } = useSWR(
    "/applications/applications/",
    fetchApplications
  );

  const rawApplications = useMemo(() => data || [], [data]);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "service_asc" | "status">("newest");

  // Multi-select State
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawMessage, setWithdrawMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  // Extract distinct service names
  const distinctServices = useMemo(() => {
    const set = new Set<string>();
    rawApplications.forEach((app) => {
      if (app.service_name?.trim()) {
        set.add(app.service_name.trim());
      }
    });
    return Array.from(set).sort();
  }, [rawApplications]);

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedService, statusFilter, sortBy]);

  // Filtered & Sorted applications
  const filteredAndSortedApps = useMemo(() => {
    return rawApplications
      .filter((app) => {
        // Status filter
        if (statusFilter !== "all") {
          const appStatus = (app.status || "").toLowerCase();
          const target = statusFilter.toLowerCase();
          if (target === "pending") {
            if (!["submitted", "pending"].includes(appStatus)) return false;
          } else if (appStatus !== target) {
            return false;
          }
        }

        // Service type filter
        if (selectedService !== "all") {
          if (app.service_name?.trim() !== selectedService.trim()) return false;
        }

        // Search term
        if (searchTerm.trim()) {
          const term = searchTerm.toLowerCase();
          const matchId = String(app.id || "").toLowerCase().includes(term);
          const matchDisplayId = (app.display_id || "").toLowerCase().includes(term);
          const matchService = (app.service_name || "").toLowerCase().includes(term);
          const matchOrg = (app.organization_name || "").toLowerCase().includes(term);
          const matchUser = (app.user_name || "").toLowerCase().includes(term);
          if (!matchId && !matchDisplayId && !matchService && !matchOrg && !matchUser) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "newest") {
          const dateA = new Date(a.submitted_at || a.created_at || 0).getTime();
          const dateB = new Date(b.submitted_at || b.created_at || 0).getTime();
          return dateB - dateA;
        }
        if (sortBy === "oldest") {
          const dateA = new Date(a.submitted_at || a.created_at || 0).getTime();
          const dateB = new Date(b.submitted_at || b.created_at || 0).getTime();
          return dateA - dateB;
        }
        if (sortBy === "service_asc") {
          return (a.service_name || "").localeCompare(b.service_name || "");
        }
        if (sortBy === "status") {
          return (a.status || "").localeCompare(b.status || "");
        }
        return 0;
      });
  }, [rawApplications, searchTerm, selectedService, statusFilter, sortBy]);

  // Paginated slice
  const totalPages = Math.ceil(filteredAndSortedApps.length / pageSize) || 1;
  const paginatedApps = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAndSortedApps.slice(start, start + pageSize);
  }, [filteredAndSortedApps, currentPage, pageSize]);

  // Multi-select helpers
  const toggleSelectApp = (id: string | number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedApps.length && paginatedApps.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedApps.map((a) => a.id));
    }
  };

  const clearSelection = () => {
    setSelectedIds([]);
  };

  // Bulk withdraw
  const handleBulkWithdraw = async (reason?: string) => {
    if (selectedIds.length === 0) return;
    setIsWithdrawing(true);
    setWithdrawMessage(null);
    try {
      // Call bulk_withdraw endpoint
      await api.post("/applications/applications/bulk_withdraw/", {
        ids: selectedIds,
        reason: reason || "Bulk withdrawal requested by applicant",
      });
      setWithdrawMessage({
        type: "success",
        text: `Successfully withdrew ${selectedIds.length} application(s).`,
      });
      clearSelection();
      await mutate();
    } catch (err: any) {
      // Fallback to individual calls if bulk_withdraw endpoint isn't available yet
      try {
        await Promise.all(
          selectedIds.map((id) =>
            api.post(`/applications/applications/${id}/withdraw/`, {
              reason: reason || "Bulk withdrawal requested by applicant",
            })
          )
        );
        setWithdrawMessage({
          type: "success",
          text: `Successfully withdrew ${selectedIds.length} application(s).`,
        });
        clearSelection();
        await mutate();
      } catch (fallbackErr: any) {
        setWithdrawMessage({
          type: "error",
          text: fallbackErr?.response?.data?.detail || "Failed to withdraw selected applications.",
        });
      }
    } finally {
      setIsWithdrawing(false);
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "Rejected":
        return "bg-red-50 text-red-600 border-red-100";
      case "Withdrawn":
        return "bg-slate-100 text-slate-600 border-slate-200";
      case "Under Review":
        return "bg-amber-50 text-amber-600 border-amber-100";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return CheckCircle2;
      case "Rejected":
        return ShieldAlert;
      case "Withdrawn":
        return Ban;
      case "Under Review":
        return HelpCircle;
      default:
        return Clock;
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
    getStatusStyles,
    getStatusIcon,
    mutate,
  };
}
