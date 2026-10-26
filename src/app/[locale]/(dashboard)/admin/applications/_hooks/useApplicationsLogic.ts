import { useState, useEffect, useMemo, useCallback } from "react";
import { applicationService } from "../_services/applicationService";
import { Application } from "../_types";
import { filterApplications, sortApplications, ApplicationSortBy } from "./applicationFilterUtils";
import { useApplicationBulkActions } from "./useApplicationBulkActions";

export function useApplicationsLogic() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filter, setFilter] = useState("all");
  const [selectedService, setSelectedService] = useState("all");
  const [sortBy, setSortBy] = useState<ApplicationSortBy>("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
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

  const bulk = useApplicationBulkActions(loadApplications);

  const distinctServices = useMemo(() => {
    const set = new Set<string>();
    applications.forEach((app) => {
      if (app.service_name?.trim()) set.add(app.service_name.trim());
    });
    return Array.from(set).sort();
  }, [applications]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, selectedService, searchTerm, sortBy]);

  const filteredApps = useMemo(() => {
    const filtered = filterApplications(applications, filter, selectedService, searchTerm);
    return sortApplications(filtered, sortBy);
  }, [applications, filter, selectedService, searchTerm, sortBy]);

  const totalPages = Math.ceil(filteredApps.length / pageSize) || 1;
  const paginatedApps = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredApps.slice(start, start + pageSize);
  }, [filteredApps, currentPage, pageSize]);

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
    currentPage,
    setCurrentPage,
    pageSize,
    totalPages,
    selectedIds: bulk.selectedIds,
    toggleSelectApp: bulk.toggleSelectApp,
    toggleSelectAll: () => bulk.toggleSelectAll(paginatedApps),
    clearSelection: bulk.clearSelection,
    isBulkProcessing: bulk.isBulkProcessing,
    feedbackMessage: bulk.feedbackMessage,
    handleBulkApprove: bulk.handleBulkApprove,
    handleBulkReject: bulk.handleBulkReject,
    handleBulkDelete: bulk.handleBulkDelete,
    reload: loadApplications,
  };
}
