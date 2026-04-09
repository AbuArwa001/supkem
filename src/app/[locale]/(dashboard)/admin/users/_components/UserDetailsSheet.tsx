"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Calendar, 
  CheckCircle2, 
  XCircle,
  Hash,
  User as UserIcon
} from "lucide-react";
import useSWR from "swr";
import { userService } from "../_services/userService";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { useTranslations } from "next-intl";

interface UserDetailsSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: any;
}

export const UserDetailsSheet = ({
  isOpen,
  onOpenChange,
  user: initialUser,
}: UserDetailsSheetProps) => {
  const t = useTranslations("Dashboard.admin.users.details");
  const tr = useTranslations("Dashboard.admin.users.row");

  // Fetch full user data to get all fields
  const { data: user, isLoading } = useSWR(
    isOpen && initialUser?.id ? `/users/users/${initialUser.id}/` : null,
    userService.fetcher
  );

  const displayUser = user || initialUser;

  const DetailRow = ({ icon: Icon, label, value, className = "" }: any) => (
    <div className={`flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors ${className}`}>
      <div className="bg-slate-100 p-2.5 rounded-xl text-slate-400">
        <Icon size={18} />
      </div>
      <div className="space-y-1 text-start">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none">
          {label}
        </p>
        <p className="text-sm font-bold text-slate-900 break-all">
          {value || "N/A"}
        </p>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] rounded-[2.5rem] border-none shadow-premium p-0 overflow-hidden bg-white">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-rose-600/10 rounded-full blur-3xl -mt-20 -mr-20" />
          
          <div className="relative flex flex-col items-center text-center space-y-4">
            <div className="h-24 w-24 rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
              <UserIcon size={40} className="opacity-50" />
            </div>
            
            <div>
              <DialogTitle className="text-3xl font-black tracking-tight uppercase font-outfit">
                {displayUser?.full_name || t("title")}
              </DialogTitle>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Badge className="bg-rose-600 hover:bg-rose-700 text-white font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-xl border-none">
                  {displayUser?.role?.role_name || displayUser?.role_name || tr("member")}
                </Badge>
                <Badge variant={displayUser?.is_active ? "default" : "secondary"} className={`rounded-xl px-3 py-1 text-[10px] font-black uppercase tracking-widest ${displayUser?.is_active ? "bg-emerald-500 text-white" : "bg-white/10 text-white/60"}`}>
                  {displayUser?.is_active ? tr("active") : tr("disabled")}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-2 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {isLoading ? (
            <div className="space-y-4 p-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-10 w-10 rounded-xl" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-1">
              <DetailRow 
                icon={Mail} 
                label={t("email")} 
                value={displayUser?.email} 
              />
              <DetailRow 
                icon={Phone} 
                label={t("phone")} 
                value={displayUser?.phone_number} 
              />
              <DetailRow 
                icon={MapPin} 
                label={t("locationBranch")} 
                value={displayUser?.location} 
              />
              <DetailRow 
                icon={Calendar} 
                label={t("memberSince")} 
                value={displayUser?.created_at ? format(new Date(displayUser.created_at), "MMMM dd, yyyy") : null} 
              />
              <DetailRow 
                icon={Hash} 
                label={t("userId")} 
                value={displayUser?.id} 
              />
              <DetailRow 
                icon={displayUser?.is_active ? CheckCircle2 : XCircle} 
                label={t("accountStatus")} 
                value={displayUser?.is_active ? t("verifiedActive") : t("suspendedDisabled")}
                className={displayUser?.is_active ? "text-emerald-600" : "text-rose-600"}
              />
            </div>
          )}
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                {t("systemName")}
            </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

