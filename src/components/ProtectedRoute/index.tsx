"use client";

import { useProtectedRouteLogic, isAllowed } from "./useProtectedRouteLogic";
import { LoadingSpinner } from "./_components/LoadingSpinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string | string[];
  /** Require access to the staff dashboard, derived from role permissions. */
  requireStaff?: boolean;
}

const ProtectedRoute = ({ children, requiredRole, requireStaff }: ProtectedRouteProps) => {
  const logic = useProtectedRouteLogic(requiredRole, requireStaff);
  const { loading, isAuthenticated, user } = logic;

  if (loading) {
    return <LoadingSpinner logic={logic} />;
  }

  if (!isAuthenticated) return null;

  if (!isAllowed(user, requiredRole, requireStaff)) {
    return <LoadingSpinner logic={logic} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
