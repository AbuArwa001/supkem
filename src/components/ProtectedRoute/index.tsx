"use client";

import { useProtectedRouteLogic } from "./useProtectedRouteLogic";
import { LoadingSpinner } from "./_components/LoadingSpinner";

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

  if (requiredRole) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!roles.includes(user?.role?.role_name)) return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
