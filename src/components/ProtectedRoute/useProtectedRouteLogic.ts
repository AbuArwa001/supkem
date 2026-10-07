import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { hasRole, getHomePath, isStaff } from "@/lib/permissions";

export interface ProtectedRouteLogicReturn {
  loading: boolean;
  isAuthenticated: boolean;
  user: any;
  tc: (key: string) => string;
}

/**
 * Returns true when the user satisfies the route's access requirements.
 */
export const isAllowed = (
  user: any,
  requiredRole?: string | string[],
  requireStaff?: boolean
): boolean => {
  if (requireStaff && !isStaff(user)) return false;
  if (requiredRole && !hasRole(user, requiredRole)) return false;
  return true;
};

export const useProtectedRouteLogic = (
  requiredRole?: string | string[],
  requireStaff?: boolean
): ProtectedRouteLogicReturn => {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const tc = useTranslations("Dashboard.common");

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (!isAllowed(user, requiredRole, requireStaff)) {
        router.replace(getHomePath(user));
      }
    }
  }, [loading, isAuthenticated, router, requiredRole, requireStaff, user]);

  return { loading, isAuthenticated, user, tc };
};
