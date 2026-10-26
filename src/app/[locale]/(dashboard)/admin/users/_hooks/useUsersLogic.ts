"use client";

import { useState } from "react";
import useSWR from "swr";
import { useAuth } from "@/hooks/useAuth";
import { userService, type UserStatsData } from "../_services/userService";
import type { QuickTab } from "../_components/UserFilters";
import { canAccessModule } from "@/lib/permissions";
import { exportUsersCsv } from "./exportUsersCsv";
import { useUserActions } from "./useUserActions";
import { buildUserEndpoint } from "./buildUserEndpoint";

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

export const useUsersLogic = () => {
  const { user: currentUser, loading: authLoading } = useAuth();
  const isAdmin = canAccessModule(currentUser, "users");

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [quickTab, setQuickTab] = useState<QuickTab>("all");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortField, setSortField] = useState("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedUserIds, setSelectedUserIds] = useState<(string | number)[]>([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const { data: rolesData } = useSWR(isAdmin ? "/users/roles/" : null, userService.fetcher);
  const availableRoles = Array.isArray(rolesData) ? rolesData : rolesData?.results || [];

  const { data: statsData, mutate: mutateStats } = useSWR<UserStatsData>(
    isAdmin ? "/users/users/stats/" : null,
    userService.fetcher,
    { revalidateOnFocus: false }
  );

  const endpoint = buildUserEndpoint({ page, sortField, sortOrder, searchQuery, quickTab, roleFilter, statusFilter }, isAdmin);
  const { data: userData, isLoading, mutate, isValidating } = useSWR(endpoint, userService.fetcher);

  const isArray = Array.isArray(userData);
  const users: UserItem[] = isArray ? userData : userData?.results || [];
  const totalCount = isArray ? userData.length : userData?.count || 0;
  const hasNext = !isArray && !!userData?.next;
  const hasPrev = !isArray && !!userData?.previous;
  const isFiltered = Boolean(searchQuery) || Boolean(roleFilter) || Boolean(statusFilter) || quickTab !== "all";

  const handleResetFilters = () => {
    setSearchQuery(""); setQuickTab("all"); setRoleFilter(""); setStatusFilter(""); setPage(1); setSelectedUserIds([]);
  };

  const handleSortChange = (field: string) => {
    setSortOrder((prev) => (sortField === field ? (prev === "asc" ? "desc" : "asc") : "asc"));
    setSortField(field);
    setPage(1);
  };

  const actions = useUserActions(mutate, mutateStats, selectedUserIds, setSelectedUserIds);

  return {
    authLoading, isAdmin, users, totalCount, isLoading, isValidating, mutate, mutateStats,
    statsData, searchQuery, setSearchQuery, quickTab, setQuickTab, roleFilter, setRoleFilter,
    statusFilter, setStatusFilter, availableRoles, isFiltered, handleResetFilters, page, setPage,
    hasNext, hasPrev, sortField, sortOrder, handleSortChange, selectedUserIds,
    handleToggleSelectUser: (id: string | number) => setSelectedUserIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id])),
    handleSelectAll: (checked: boolean) => setSelectedUserIds(checked ? users.map((u) => u.id) : []),
    isAddModalOpen, setIsAddModalOpen, isEditModalOpen, setIsEditModalOpen, selectedUser, isDetailOpen, setIsDetailOpen,
    handleOpenEdit: (u: UserItem) => { setSelectedUser(u); setIsEditModalOpen(true); },
    handleOpenDetail: (u: UserItem) => { setSelectedUser(u); setIsDetailOpen(true); },
    handleExportCsv: () => exportUsersCsv(users),
    ...actions,
  };
};
