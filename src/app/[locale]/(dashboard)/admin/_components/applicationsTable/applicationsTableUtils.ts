export function getInitials(name: string): string {
  if (!name) return "AP";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export function filterApplications(
  applications: Array<{ organization_name?: string; service_name?: string; display_id?: string; status?: string }>,
  filterStatus: string,
  searchTerm: string
) {
  return applications.filter((app) => {
    if (filterStatus === "approved" && app.status !== "Approved") return false;
    if (filterStatus === "review" && app.status !== "Under Review") return false;
    if (filterStatus === "pending" && !["Submitted", "Pending"].includes(app.status || "")) return false;

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchName = app.organization_name?.toLowerCase().includes(term);
      const matchService = app.service_name?.toLowerCase().includes(term);
      const matchId = app.display_id?.toLowerCase().includes(term);
      return matchName || matchService || matchId;
    }
    return true;
  });
}
