import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

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
        const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
        if (!roles.includes(user?.role?.role_name)) {
          // If user is authenticated but doesn't have the required role,
          // redirect to their default home page
          if (user?.role?.role_name === "Normal User") {
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
