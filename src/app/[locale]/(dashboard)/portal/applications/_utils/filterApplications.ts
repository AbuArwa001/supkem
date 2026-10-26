import { Application } from "../_components/types";

export function filterAndSortApplications(
  rawApplications: Application[],
  searchTerm: string,
  selectedService: string,
  statusFilter: string,
  sortBy: "newest" | "oldest" | "service_asc" | "status"
): Application[] {
  return rawApplications
    .filter((app) => {
      if (statusFilter !== "all") {
        const appStatus = (app.status || "").toLowerCase();
        const target = statusFilter.toLowerCase();
        if (target === "pending") {
          if (!["submitted", "pending"].includes(appStatus)) return false;
        } else if (appStatus !== target) {
          return false;
        }
      }

      if (selectedService !== "all" && app.service_name?.trim() !== selectedService.trim()) {
        return false;
      }

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
}
