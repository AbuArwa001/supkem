"use client";

import { useProtectedRouteLogic } from "./useProtectedRouteLogic";
import { LoadingSpinner } from "./_components/LoadingSpinner";
import { hasRole } from "@/lib/permissions";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string | string[];
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const logic = useProtectedRouteLogic(requiredRole);
  const { loading, isAuthenticated, user } = logic;

  if (loading) {
    return <LoadingSpinner logic={logic} />;
  }

  if (!isAuthenticated) return null;

  if (requiredRole && !hasRole(user, requiredRole)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
