import { QuickTab } from "../_components/UserFilters";

interface BuildUserQueryParams {
  page: number;
  sortField: string;
  sortOrder: "asc" | "desc";
  searchQuery: string;
  quickTab: QuickTab;
  roleFilter: string;
  statusFilter: string;
}

export function buildUserEndpoint(params: BuildUserQueryParams, isAdmin: boolean): string | null {
  if (!isAdmin) return null;
  const { page, sortField, sortOrder, searchQuery, quickTab, roleFilter, statusFilter } = params;
  const ordering = sortOrder === "desc" ? `-${sortField}` : sortField;
  const q = new URLSearchParams();
  q.set("page", page.toString());
  q.set("ordering", ordering);

  if (searchQuery.trim()) q.set("search", searchQuery.trim());
  if (quickTab === "active") q.set("is_active", "true");
  else if (quickTab === "pending") q.set("is_active", "false");
  else if (quickTab === "staff") q.set("role__role_name", "Admin");

  if (roleFilter) q.set("role__role_name", roleFilter);
  if (statusFilter) q.set("is_active", statusFilter);

  return `/users/users/?${q.toString()}`;
}
