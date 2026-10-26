import { Application } from "../_types";

export type ApplicationSortBy = "newest" | "oldest" | "service_asc" | "status";

export function filterApplications(
  applications: Application[],
  filter: string,
  selectedService: string,
  searchTerm: string
): Application[] {
  return applications.filter((app) => {
    const statusLower = app.status?.toLowerCase() || "";
    const matchesFilter =
      filter === "all" ||
      statusLower === filter.toLowerCase() ||
      (filter === "pending" && ["submitted", "pending"].includes(statusLower));
    if (!matchesFilter) return false;

    if (selectedService !== "all" && app.service_name?.trim() !== selectedService.trim()) {
      return false;
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        (app.organization_name?.toLowerCase() || "").includes(q) ||
        (app.display_id?.toLowerCase() || "").includes(q) ||
        (app.service_name?.toLowerCase() || "").includes(q) ||
        String(app.id || "").toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }

    return true;
  });
}

export function sortApplications(
  applications: Application[],
  sortBy: ApplicationSortBy
): Application[] {
  return [...applications].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.submitted_at || 0).getTime() - new Date(a.submitted_at || 0).getTime();
    }
    if (sortBy === "oldest") {
      return new Date(a.submitted_at || 0).getTime() - new Date(b.submitted_at || 0).getTime();
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
