import { useState, useEffect, useMemo, useCallback } from "react";
import { applicationService } from "@/app/[locale]/(dashboard)/admin/applications/_services/applicationService";
import { Application } from "@/app/[locale]/(dashboard)/admin/applications/_types";

export function useApplicationsLogic() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filter, setFilter] = useState("all");
  const [selectedService, setSelectedService] = useState("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "service_asc" | "status">("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Multi-select state
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const loadApplications = useCallback(async () => {
    setIsLoading(true);
    const data = await applicationService.fetchApplications();
    setApplications(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  // Extract distinct service names
  const distinctServices = useMemo(() => {
    const set = new Set<string>();
    applications.forEach((app) => {
      if (app.service_name?.trim()) {
        set.add(app.service_name.trim());
      }
    });
    return Array.from(set).sort();
  }, [applications]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, selectedService, searchTerm, sortBy]);

  // Filtered and sorted applications
  const filteredApps = useMemo(() => {
    return applications
      .filter((app) => {
        // Status filter
        const matchesFilter =
          filter === "all" ||
          app.status?.toLowerCase() === filter.toLowerCase() ||
          (filter === "pending" && ["submitted", "pending"].includes(app.status?.toLowerCase() || ""));
        if (!matchesFilter) return false;

        // Service type filter
        if (selectedService !== "all") {
          if (app.service_name?.trim() !== selectedService.trim()) return false;
        }

        // Search term
        if (searchTerm.trim()) {
          const searchLower = searchTerm.toLowerCase();
          const matchesSearch =
            (app.organization_name?.toLowerCase() || "").includes(searchLower) ||
            (app.display_id?.toLowerCase() || "").includes(searchLower) ||
            (app.service_name?.toLowerCase() || "").includes(searchLower) ||
            String(app.id || "").toLowerCase().includes(searchLower);
          if (!matchesSearch) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "newest") {
          const dateA = new Date(a.submitted_at || 0).getTime();
          const dateB = new Date(b.submitted_at || 0).getTime();
          return dateB - dateA;
        }
        if (sortBy === "oldest") {
          const dateA = new Date(a.submitted_at || 0).getTime();
          const dateB = new Date(b.submitted_at || 0).getTime();
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
  }, [applications, filter, selectedService, searchTerm, sortBy]);

  // Paginated list
  const totalPages = Math.ceil(filteredApps.length / pageSize) || 1;
  const paginatedApps = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredApps.slice(start, start + pageSize);
  }, [filteredApps, currentPage, pageSize]);

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

  // Bulk actions
  const handleBulkApprove = async () => {
    if (selectedIds.length === 0) return;
    setIsBulkProcessing(true);
    setFeedbackMessage(null);
    try {
      await applicationService.bulkUpdateStatus(selectedIds, "Approved");
      setFeedbackMessage({
        type: "success",
        text: `Successfully approved ${selectedIds.length} application(s).`,
      });
      clearSelection();
      await loadApplications();
    } catch (err: any) {
      setFeedbackMessage({
        type: "error",
        text: err?.response?.data?.detail || "Failed to approve selected applications.",
      });
    } finally {
      setIsBulkProcessing(false);
    }
  };

  const handleBulkReject = async () => {
    if (selectedIds.length === 0) return;
    setIsBulkProcessing(true);
    setFeedbackMessage(null);
    try {
      await applicationService.bulkUpdateStatus(selectedIds, "Rejected");
      setFeedbackMessage({
        type: "success",
        text: `Successfully rejected ${selectedIds.length} application(s).`,
      });
      clearSelection();
      await loadApplications();
    } catch (err: any) {
      setFeedbackMessage({
        type: "error",
        text: err?.response?.data?.detail || "Failed to reject selected applications.",
      });
    } finally {
      setIsBulkProcessing(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} application(s)? This cannot be undone.`)) {
      return;
    }
    setIsBulkProcessing(true);
    setFeedbackMessage(null);
    try {
      await applicationService.bulkDelete(selectedIds);
      setFeedbackMessage({
        type: "success",
        text: `Successfully deleted ${selectedIds.length} application(s).`,
      });
      clearSelection();
      await loadApplications();
    } catch (err: any) {
      setFeedbackMessage({
        type: "error",
        text: err?.response?.data?.detail || "Failed to delete selected applications.",
      });
    } finally {
      setIsBulkProcessing(false);
    }
  };

  return {
    applications,
    filteredApps,
    paginatedApps,
    filter,
    setFilter,
    selectedService,
    setSelectedService,
    distinctServices,
    sortBy,
    setSortBy,
    searchTerm,
    setSearchTerm,
    isLoading,
    // Pagination
    currentPage,
    setCurrentPage,
    pageSize,
    totalPages,
    // Selection & Bulk
    selectedIds,
    toggleSelectApp,
    toggleSelectAll,
    clearSelection,
    isBulkProcessing,
    feedbackMessage,
    handleBulkApprove,
    handleBulkReject,
    handleBulkDelete,
    reload: loadApplications,
  };
}
