"use client";

import { useState } from "react";
import useSWR from "swr";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { userService } from "../_services/userService";

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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const {
    data: userData,
    error,
    isLoading,
    mutate,
    isValidating
  } = useSWR(isAdmin ? `/users/users/?search=${searchQuery}&page=${page}` : null, userService.fetcher);

  const isArray = Array.isArray(userData);
  const users = isArray ? userData : (userData?.results || []);
  const totalCount = isArray ? userData.length : (userData?.count || 0);
  const hasNext = !isArray && !!userData?.next;
  const hasPrev = !isArray && !!userData?.previous;

  const handleDelete = async (user: any) => {
    if (confirm(`Are you sure you want to permanently remove ${user.full_name}?`)) {
      try {
        await userService.deleteUser(user.id);
        toast.success("User deleted successfully");
        mutate();
      } catch (err) {
        toast.error("Failed to delete user. They might have dependent records.");
      }
    }
  };

  const handleOpenEdit = (user: any) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  return {
    isAdmin,
    users,
    totalCount,
    isLoading,
    isValidating,
    mutate,
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    hasNext,
    hasPrev,
    isAddModalOpen,
    setIsAddModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    selectedUser,
    handleDelete,
    handleOpenEdit
  };
};
