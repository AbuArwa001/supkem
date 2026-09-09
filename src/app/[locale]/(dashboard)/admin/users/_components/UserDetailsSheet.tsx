"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Shield,
  Calendar,
  CheckCircle2,
  XCircle,
  Hash,
  Copy,
  Check,
  Send,
  KeyRound,
  Building2,
  Lock,
} from "lucide-react";
import useSWR from "swr";
import { userService } from "../_services/userService";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { UserAvatar } from "./UserAvatar";

interface UserDetailsSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: any;
  onEdit?: (user: any) => void;
  onToggleActive?: (user: any) => void;
}

export const UserDetailsSheet = ({
  isOpen,
  onOpenChange,
  user: initialUser,
  onEdit,
  onToggleActive,
}: UserDetailsSheetProps) => {
  const t = useTranslations("Dashboard.admin.users.details");
  const tr = useTranslations("Dashboard.admin.users.row");

  const [activeTab, setActiveTab] = useState<"overview" | "permissions" | "organizations">("overview");
  const [isCopied, setIsCopied] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isSendingReset, setIsSendingReset] = useState(false);

  // Fetch full user data to get all fields
  const { data: fullUser, isLoading, mutate } = useSWR(
    isOpen && initialUser?.id ? `/users/users/${initialUser.id}/` : null,
    userService.fetcher
  );

  const displayUser = fullUser || initialUser;

  const handleCopyId = () => {
    if (displayUser?.id) {
      navigator.clipboard.writeText(String(displayUser.id));
      setIsCopied(true);
      toast.success(t("idCopied"));
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleResend = async () => {
    if (!displayUser?.id) return;
    setIsResending(true);
    try {
      await userService.resendVerification(displayUser.id);
      toast.success(`Verification email sent to ${displayUser.email}`);
    } catch {
      toast.error("Failed to resend verification email");
    } finally {
      setIsResending(false);
    }
  };

  const handleSendReset = async () => {
    if (!displayUser?.email) return;
    setIsSendingReset(true);
    try {
      await userService.sendPasswordReset(displayUser.email);
      toast.success(`Password reset link sent to ${displayUser.email}`);
    } catch {
      toast.error("Failed to send password reset email");
    } finally {
      setIsSendingReset(false);
    }
  };

  const DetailRow = ({ icon: Icon, label, value, action, className = "" }: any) => (
    <div
      className={`flex items-start justify-between gap-3 p-3.5 rounded-2xl hover:bg-slate-50 transition-colors ${className}`}
    >
      <div className="flex items-start gap-3.5 min-w-0">
        <div className="bg-slate-100 p-2.5 rounded-xl text-slate-500 shrink-0 mt-0.5">
          <Icon size={16} />
        </div>
        <div className="space-y-0.5 text-start min-w-0">
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            {label}
          </p>
          <p className="text-sm font-bold text-slate-800 break-all">
            {value || "N/A"}
          </p>
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[580px] rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden bg-white text-slate-800">
        {/* Dossier Header Banner */}
        <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-8 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl -mt-20 -mr-20 pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-start">
            <UserAvatar
              name={displayUser?.full_name || ""}
              email={displayUser?.email || ""}
              isActive={displayUser?.is_active}
              isVerified={displayUser?.is_email_verified}
              size="xl"
            />

            <div className="space-y-2 flex-1 min-w-0">
              <DialogTitle className="text-2xl md:text-3xl font-black tracking-tight uppercase font-outfit truncate">
                {displayUser?.full_name || t("title")}
              </DialogTitle>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-xl border-none">
                  {displayUser?.role?.role_name || displayUser?.role_name || tr("member")}
                </Badge>
                <Badge
                  variant={displayUser?.is_active ? "default" : "secondary"}
                  className={`rounded-xl px-3 py-1 text-[10px] font-black uppercase tracking-wider ${
                    displayUser?.is_active
                      ? "bg-emerald-500 text-white"
                      : "bg-white/10 text-white/70"
                  }`}
                >
                  {displayUser?.is_active ? tr("active") : tr("disabled")}
                </Badge>
                {displayUser?.is_email_verified && (
                  <Badge className="bg-white/15 text-emerald-300 font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-xl border-none flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    {t("verified")}
                  </Badge>
                )}
              </div>

              {/* ID & Copy */}
              <div className="flex items-center justify-center sm:justify-start gap-2 pt-1 text-[11px] text-slate-400 font-mono">
                <Hash className="h-3 w-3 text-slate-500" />
                <span className="truncate max-w-[220px]">{displayUser?.id}</span>
                <button
                  type="button"
                  onClick={handleCopyId}
                  title={t("copyId")}
                  className="p-1 hover:text-white rounded transition-colors"
                >
                  {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons Toolbar */}
          <div className="flex items-center justify-center sm:justify-start gap-2 mt-6 pt-4 border-t border-white/10 flex-wrap">
            <Button
              size="sm"
              variant="outline"
              onClick={handleResend}
              disabled={isResending}
              className="h-8 rounded-xl bg-white/10 hover:bg-white/20 border-white/10 text-white font-black text-[10px] uppercase tracking-wider flex items-center gap-1.5"
            >
              <Send className="h-3 w-3" />
              {t("emailVerified")}
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={handleSendReset}
              disabled={isSendingReset}
              className="h-8 rounded-xl bg-white/10 hover:bg-white/20 border-white/10 text-white font-black text-[10px] uppercase tracking-wider flex items-center gap-1.5"
            >
              <KeyRound className="h-3 w-3" />
              {tr("sendPasswordReset")}
            </Button>

            {onEdit && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  onOpenChange(false);
                  onEdit(displayUser);
                }}
                className="h-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 border-none text-white font-black text-[10px] uppercase tracking-wider flex items-center gap-1.5"
              >
                {tr("editAccount")}
              </Button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-100 px-6 pt-2 bg-slate-50/50">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-3 text-xs font-black uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
              activeTab === "overview"
                ? "border-emerald-600 text-emerald-700"
                : "border-transparent text-slate-400 hover:text-slate-700"
            }`}
          >
            {t("overviewTab")}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("permissions")}
            className={`px-4 py-3 text-xs font-black uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
              activeTab === "permissions"
                ? "border-emerald-600 text-emerald-700"
                : "border-transparent text-slate-400 hover:text-slate-700"
            }`}
          >
            {t("permissionsTab")}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("organizations")}
            className={`px-4 py-3 text-xs font-black uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
              activeTab === "organizations"
                ? "border-emerald-600 text-emerald-700"
                : "border-transparent text-slate-400 hover:text-slate-700"
            }`}
          >
            {t("organizationsTab")}
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 max-h-[50vh] overflow-y-auto custom-scrollbar">
          {isLoading ? (
            <div className="space-y-4 p-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-10 w-10 rounded-xl" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : activeTab === "overview" ? (
            <div className="grid grid-cols-1 gap-1">
              <DetailRow icon={Mail} label={t("email")} value={displayUser?.email} />
              <DetailRow icon={Phone} label={t("phone")} value={displayUser?.phone_number} />
              <DetailRow
                icon={MapPin}
                label={t("locationBranch")}
                value={displayUser?.location || "Nairobi"}
              />
              <DetailRow
                icon={Calendar}
                label={t("memberSince")}
                value={
                  displayUser?.created_at
                    ? format(new Date(displayUser.created_at), "MMMM dd, yyyy")
                    : null
                }
              />
              <DetailRow
                icon={displayUser?.is_email_verified ? CheckCircle2 : XCircle}
                label={t("emailVerified")}
                value={displayUser?.is_email_verified ? t("verified") : t("unverified")}
                className={displayUser?.is_email_verified ? "text-emerald-700" : "text-amber-700"}
              />
              <DetailRow
                icon={displayUser?.is_active ? CheckCircle2 : XCircle}
                label={t("accountStatus")}
                value={displayUser?.is_active ? t("verifiedActive") : t("suspendedDisabled")}
                className={displayUser?.is_active ? "text-emerald-700" : "text-rose-700"}
              />
            </div>
          ) : activeTab === "permissions" ? (
            <div className="space-y-4 p-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex items-center gap-2 text-slate-800 font-black text-xs uppercase tracking-wider">
                  <Shield className="h-4 w-4 text-emerald-600" />
                  {t("clearanceLevel")}
                </div>
                <p className="text-sm font-bold text-slate-900">
                  {displayUser?.is_superuser
                    ? t("superuserClearance")
                    : displayUser?.is_staff
                    ? t("staffClearance")
                    : t("standardClearance")}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                  Assigned Privileges
                </p>
                <div className="flex flex-wrap gap-2">
                  {displayUser?.role?.permissions && displayUser.role.permissions.length > 0 ? (
                    displayUser.role.permissions.map((p: any) => (
                      <Badge
                        key={p.id}
                        variant="outline"
                        className="rounded-xl border-slate-200 bg-white font-bold text-[10px] text-slate-700 px-3 py-1"
                      >
                        <Lock className="h-3 w-3 mr-1 text-slate-400" />
                        {p.name || p.codename}
                      </Badge>
                    ))
                  ) : (
                    <Badge
                      variant="outline"
                      className="rounded-xl border-slate-200 bg-white font-bold text-[10px] text-slate-600 px-3 py-1"
                    >
                      Standard Member Permissions
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 p-2">
              {displayUser?.organizations && displayUser.organizations.length > 0 ? (
                displayUser.organizations.map((org: any) => (
                  <div
                    key={org.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded-xl text-emerald-600 shadow-sm border border-slate-100">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-black text-xs uppercase tracking-wider text-slate-900">
                          {org.name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium capitalize">
                          {org.type || "Institution"} • Joined{" "}
                          {org.joined_at ? format(new Date(org.joined_at), "MMM yyyy") : "N/A"}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-black text-[10px] uppercase">
                      {org.status || "Member"}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 space-y-2">
                  <Building2 className="h-10 w-10 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                    {t("noOrgs")}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-black uppercase tracking-widest px-6">
          <span>{t("systemName")}</span>
          <span>SUPKEM GOVERNANCE</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
