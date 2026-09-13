"use client";

import { useAuth } from "@/hooks/useAuth";
import {
  getUserRoleName,
  hasRole,
  canAccessModule,
  PermissionModule,
} from "@/lib/permissions";

export function usePermissions() {
  const { user, loading, isAuthenticated } = useAuth();

  const roleName = getUserRoleName(user);
  const isSuperAdmin = user?.is_superuser || roleName === "Super Admin";
  const isAdmin = isSuperAdmin || roleName === "Admin";
  const isITOfficer = roleName === "IT Officer";
  const isFinanceOfficer = roleName === "Finance Officer";
  const isAgent = roleName === "Agent";
  const isNormalUser = roleName === "Normal User";

  const checkRole = (allowedRoles: string | string[]) =>
    hasRole(user, allowedRoles);

  const canAccess = (module: PermissionModule) =>
    canAccessModule(user, module);

  return {
    user,
    loading,
    isAuthenticated,
    roleName,
    isSuperAdmin,
    isAdmin,
    isITOfficer,
    isFinanceOfficer,
    isAgent,
    isNormalUser,
    hasRole: checkRole,
    canAccess,
  };
}
