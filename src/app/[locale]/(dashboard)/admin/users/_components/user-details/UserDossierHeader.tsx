"use client";

import { useState } from "react";
import { DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Hash, Copy, Check, Send, KeyRound } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { UserAvatar } from "../UserAvatar";
import { userService } from "../../_services/userService";

interface UserDossierHeaderProps {
  user: any;
  onEdit?: (user: any) => void;
  onClose: () => void;
}

export function UserDossierHeader({ user, onEdit, onClose }: UserDossierHeaderProps) {
  const t = useTranslations("Dashboard.admin.users.details");
  const tr = useTranslations("Dashboard.admin.users.row");
  const [isCopied, setIsCopied] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isSendingReset, setIsSendingReset] = useState(false);

  const handleCopyId = () => {
    if (user?.id) {
      navigator.clipboard.writeText(String(user.id));
      setIsCopied(true);
      toast.success(t("idCopied"));
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleResend = async () => {
    if (!user?.id) return;
    setIsResending(true);
    try {
      await userService.resendVerification(user.id);
      toast.success(`Verification email sent to ${user.email}`);
    } catch { toast.error("Failed to resend verification email"); } finally { setIsResending(false); }
  };

  const handleSendReset = async () => {
    if (!user?.email) return;
    setIsSendingReset(true);
    try {
      await userService.sendPasswordReset(user.email);
      toast.success(`Password reset link sent to ${user.email}`);
    } catch { toast.error("Failed to send password reset email"); } finally { setIsSendingReset(false); }
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-8 text-white overflow-hidden">
      <div className="absolute top-0 right-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl -mt-20 -mr-20 pointer-events-none" />

      <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-start">
        <UserAvatar name={user?.full_name || ""} email={user?.email || ""} isActive={user?.is_active} isVerified={user?.is_email_verified} size="xl" />

        <div className="space-y-2 flex-1 min-w-0">
          <DialogTitle className="text-2xl md:text-3xl font-black tracking-tight uppercase font-outfit truncate">
            {user?.full_name || t("title")}
          </DialogTitle>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-xl border-none">
              {user?.role?.role_name || user?.role_name || tr("member")}
            </Badge>
            <Badge variant={user?.is_active ? "default" : "secondary"} className={`rounded-xl px-3 py-1 text-[10px] font-black uppercase tracking-wider ${user?.is_active ? "bg-emerald-500 text-white" : "bg-white/10 text-white/70"}`}>
              {user?.is_active ? tr("active") : tr("disabled")}
            </Badge>
            {user?.is_email_verified && (
              <Badge className="bg-white/15 text-emerald-300 font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-xl border-none flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> {t("verified")}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2 pt-1 text-[11px] text-slate-400 font-mono">
            <Hash className="h-3 w-3 text-slate-500" /><span className="truncate max-w-[220px]">{user?.id}</span>
            <button type="button" onClick={handleCopyId} title={t("copyId")} className="p-1 hover:text-white rounded transition-colors">
              {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center sm:justify-start gap-2 mt-6 pt-4 border-t border-white/10 flex-wrap">
        <Button size="sm" variant="outline" onClick={handleResend} disabled={isResending} className="h-8 rounded-xl bg-white/10 hover:bg-white/20 border-white/10 text-white font-black text-[10px] uppercase tracking-wider flex items-center gap-1.5"><Send className="h-3 w-3" /> {t("emailVerified")}</Button>
        <Button size="sm" variant="outline" onClick={handleSendReset} disabled={isSendingReset} className="h-8 rounded-xl bg-white/10 hover:bg-white/20 border-white/10 text-white font-black text-[10px] uppercase tracking-wider flex items-center gap-1.5"><KeyRound className="h-3 w-3" /> {tr("sendPasswordReset")}</Button>
        {onEdit && (
          <Button size="sm" variant="outline" onClick={() => { onClose(); onEdit(user); }} className="h-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 border-none text-white font-black text-[10px] uppercase tracking-wider flex items-center gap-1.5">{tr("editAccount")}</Button>
        )}
      </div>
    </div>
  );
}
