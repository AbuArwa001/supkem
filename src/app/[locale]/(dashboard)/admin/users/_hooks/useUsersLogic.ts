"use client";

import { useState } from "react";
import useSWR from "swr";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { userService, type UserStatsData } from "../_services/userService";
import type { QuickTab } from "../_components/UserFilters";

export interface UserItem {
  id: string | number;
  full_name: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  email: string;
  phone_number?: string;
  role?: { id?: string; role_name: string };
  role_name?: string;
  location?: string;
  is_active: boolean;
  is_email_verified?: boolean;
  is_staff?: boolean;
  is_superuser?: boolean;
  organizations?: any[];
  created_at?: string;
}

/**
 * Custom hook for Team Management business logic.
 */
export const useUsersLogic = () => {
  const { user: currentUser } = useAuth();
  const isAdmin =
    currentUser?.is_superuser ||
    currentUser?.is_staff ||
    currentUser?.role?.role_name?.toLowerCase().includes("admin") ||
    currentUser?.role_name?.toLowerCase().includes("admin");

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [quickTab, setQuickTab] = useState<QuickTab>("all");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortField, setSortField] = useState("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Selection state
  const [selectedUserIds, setSelectedUserIds] = useState<(string | number)[]>([]);

  // Modals & Sheets
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Fetch available roles
  const { data: rolesData } = useSWR(
    isAdmin ? "/users/roles/" : null,
    userService.fetcher
  );
  const availableRoles = Array.isArray(rolesData)
    ? rolesData
    : rolesData?.results || [];

  // Fetch live stats
  const { data: statsData, mutate: mutateStats } = useSWR<UserStatsData>(
    isAdmin ? "/users/users/stats/" : null,
    userService.fetcher,
    { revalidateOnFocus: false }
  );

  // Construct query string with filters
  const ordering = sortOrder === "desc" ? `-${sortField}` : sortField;
  const queryParams = new URLSearchParams();
  queryParams.set("page", page.toString());
  queryParams.set("ordering", ordering);

  if (searchQuery.trim()) {
    queryParams.set("search", searchQuery.trim());
  }

  // Quick tab logic
  if (quickTab === "active") {
    queryParams.set("is_active", "true");
  } else if (quickTab === "pending") {
    queryParams.set("is_active", "false");
  } else if (quickTab === "staff") {
    queryParams.set("role__role_name", "Admin");
  }

  // Explicit dropdown filters (override tab if selected)
  if (roleFilter) {
    queryParams.set("role__role_name", roleFilter);
  }
  if (statusFilter) {
    queryParams.set("is_active", statusFilter);
  }

  const endpoint = isAdmin
    ? `/users/users/?${queryParams.toString()}`
    : null;

  const {
    data: userData,
    isLoading,
    mutate,
    isValidating,
  } = useSWR(endpoint, userService.fetcher);

  const isArray = Array.isArray(userData);
  const users: UserItem[] = isArray ? userData : userData?.results || [];
  const totalCount = isArray ? userData.length : userData?.count || 0;
  const hasNext = !isArray && !!userData?.next;
  const hasPrev = !isArray && !!userData?.previous;

  const isFiltered =
    Boolean(searchQuery) ||
    Boolean(roleFilter) ||
    Boolean(statusFilter) ||
    quickTab !== "all";

  const handleResetFilters = () => {
    setSearchQuery("");
    setQuickTab("all");
    setRoleFilter("");
    setStatusFilter("");
    setPage(1);
    setSelectedUserIds([]);
  };

  const handleSortChange = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setPage(1);
  };

  // Multi-selection handlers
  const handleToggleSelectUser = (id: string | number) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = users.map((u) => u.id);
      setSelectedUserIds(allIds);
    } else {
      setSelectedUserIds([]);
    }
  };

  // Actions
  const handleDelete = async (user: UserItem) => {
    if (confirm(`Are you sure you want to permanently remove ${user.full_name}?`)) {
      try {
        await userService.deleteUser(user.id);
        toast.success("User deleted successfully");
        mutate();
        mutateStats();
      } catch (err) {
        toast.error("Failed to delete user. They might have dependent records.");
      }
    }
  };

  const handleToggleActive = async (user: UserItem) => {
    const targetStatus = !user.is_active;

    // Optimistic cache update
    mutate(
      (current: any) => {
        if (!current) return current;
        if (Array.isArray(current)) {
          return current.map((u: any) =>
            u.id === user.id ? { ...u, is_active: targetStatus } : u
          );
        }
        return {
          ...current,
          results: (current.results || []).map((u: any) =>
            u.id === user.id ? { ...u, is_active: targetStatus } : u
          ),
        };
      },
      false
    );

    try {
      await userService.toggleActive(user.id, targetStatus);
      toast.success(
        `Account for ${user.full_name} ${targetStatus ? "activated" : "suspended"}.`
      );
      mutate();
      mutateStats();
    } catch (err) {
      toast.error("Failed to update account status.");
      mutate();
    }
  };

  const handleResendVerification = async (user: UserItem) => {
    try {
      await userService.resendVerification(user.id);
      toast.success(`Verification email sent to ${user.email}.`);
    } catch (err) {
      toast.error("Failed to send verification email.");
    }
  };

  const handleSendPasswordReset = async (user: UserItem) => {
    try {
      await userService.sendPasswordReset(user.email);
      toast.success(`Password reset instructions sent to ${user.email}.`);
    } catch (err) {
      toast.error("Failed to send password reset email.");
    }
  };

  const handleBulkAction = async (action: "activate" | "deactivate" | "delete") => {
    if (selectedUserIds.length === 0) return;

    if (
      action === "delete" &&
      !confirm(
        `Are you sure you want to permanently delete ${selectedUserIds.length} selected users?`
      )
    ) {
      return;
    }

    try {
      const res = await userService.bulkAction(selectedUserIds, action);
      toast.success(res.data?.detail || "Bulk operation completed.");
      setSelectedUserIds([]);
      mutate();
      mutateStats();
    } catch (err) {
      toast.error("Failed to complete bulk operation.");
    }
  };

  const handleExportCsv = () => {
    if (!users || users.length === 0) {
      toast.error("No user records available to export.");
      return;
    }

    const headers = [
      "User ID",
      "Full Name",
      "Email Address",
      "Phone Number",
      "System Role",
      "Operational Location",
      "Active Status",
      "Email Verified",
      "Date Registered",
    ];

    const rows = users.map((u) => [
      u.id,
      `"${(u.full_name || "").replace(/"/g, '""')}"`,
      u.email,
      u.phone_number || "N/A",
      u.role?.role_name || u.role_name || "Member",
      `"${(u.location || "").replace(/"/g, '""')}"`,
      u.is_active ? "Active" : "Disabled",
      u.is_email_verified ? "Verified" : "Unverified",
      u.created_at ? new Date(u.created_at).toLocaleDateString() : "N/A",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `supkem_team_directory_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Team directory exported successfully.");
  };

  const handleOpenEdit = (user: UserItem) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleOpenDetail = (user: UserItem) => {
    setSelectedUser(user);
    setIsDetailOpen(true);
  };

  return {
    isAdmin,
    users,
    totalCount,
    isLoading,
    isValidating,
    mutate,
    mutateStats,
    statsData,
    searchQuery,
    setSearchQuery,
    quickTab,
    setQuickTab,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    availableRoles,
    isFiltered,
    handleResetFilters,
    page,
    setPage,
    hasNext,
    hasPrev,
    sortField,
    sortOrder,
    handleSortChange,
    selectedUserIds,
    handleToggleSelectUser,
    handleSelectAll,
    isAddModalOpen,
    setIsAddModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    selectedUser,
    isDetailOpen,
    setIsDetailOpen,
    handleOpenDetail,
    handleOpenEdit,
    handleDelete,
    handleToggleActive,
    handleResendVerification,
    handleSendPasswordReset,
    handleBulkAction,
    handleExportCsv,
  };
};
