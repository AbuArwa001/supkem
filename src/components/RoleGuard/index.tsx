"use client";

import React from "react";
import { ShieldAlert, ArrowLeft, Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { usePermissions } from "@/hooks/usePermissions";
import { PermissionModule } from "@/lib/permissions";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles?: string | string[];
  module?: PermissionModule;
  fallback?: React.ReactNode;
}

export function RoleGuard({
  children,
  allowedRoles,
  module,
  fallback,
}: RoleGuardProps) {
  const { loading, isAuthenticated, roleName, hasRole, canAccess } =
    usePermissions();
  const tc = useTranslations("Dashboard.common");

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  let isAuthorized = true;

  if (allowedRoles) {
    isAuthorized = hasRole(allowedRoles);
  }

  if (isAuthorized && module) {
    isAuthorized = canAccess(module);
  }

  if (isAuthorized) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-3xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shadow-xl shadow-rose-600/5">
          <ShieldAlert size={40} />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white p-1.5 rounded-xl shadow-md">
          <Lock size={14} />
        </div>
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-black uppercase tracking-wider mb-3">
        <span>Current Role:</span>
        <span className="text-primary font-bold">{roleName || "Unassigned"}</span>
      </div>

      <h2 className="text-2xl md:text-3xl font-black font-outfit text-slate-900 uppercase tracking-tight mb-2">
        {tc("accessRestricted")}
      </h2>

      <p className="text-slate-500 font-medium max-w-md text-sm md:text-base mb-8 leading-relaxed">
        {tc("accessRestrictedDesc")}
      </p>

      <Link
        href={roleName === "Normal User" ? "/portal" : "/admin"}
        className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95"
      >
        <ArrowLeft size={16} />
        {tc("returnToOverview")}
      </Link>
    </div>
  );
}

export default RoleGuard;
