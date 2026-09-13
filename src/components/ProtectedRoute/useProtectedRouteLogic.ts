import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { hasRole, getUserRoleName } from "@/lib/permissions";

export interface ProtectedRouteLogicReturn {
  loading: boolean;
  isAuthenticated: boolean;
  user: any;
  tc: (key: string) => string;
}

export const useProtectedRouteLogic = (
  requiredRole?: string | string[]
): ProtectedRouteLogicReturn => {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const tc = useTranslations("Dashboard.common");

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (requiredRole) {
        if (!hasRole(user, requiredRole)) {
          const currentRole = getUserRoleName(user);
          if (currentRole === "Normal User") {
            router.push("/portal");
          } else {
            router.push("/admin");
          }
        }
      }
    }
  }, [loading, isAuthenticated, router, requiredRole, user]);

  return { loading, isAuthenticated, user, tc };
};
