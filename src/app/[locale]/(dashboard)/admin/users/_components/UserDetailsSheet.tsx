"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useSWR from "swr";
import { userService } from "../_services/userService";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import { UserDossierHeader } from "./user-details/UserDossierHeader";
import { UserOverviewTab } from "./user-details/UserOverviewTab";
import { UserAccessTabs } from "./user-details/UserAccessTabs";

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
}: UserDetailsSheetProps) => {
  const t = useTranslations("Dashboard.admin.users.details");
  const [activeTab, setActiveTab] = useState<"overview" | "permissions" | "organizations">("overview");

  const { data: fullUser, isLoading } = useSWR(
    isOpen && initialUser?.id ? `/users/users/${initialUser.id}/` : null,
    userService.fetcher
  );

  const displayUser = fullUser || initialUser;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[580px] rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden bg-white text-slate-800">
        <UserDossierHeader user={displayUser} onEdit={onEdit} onClose={() => onOpenChange(false)} />

        <div className="flex border-b border-slate-100 px-6 pt-2 bg-slate-50/50">
          {(["overview", "permissions", "organizations"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-xs font-black uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
                activeTab === tab ? "border-emerald-600 text-emerald-700" : "border-transparent text-slate-400 hover:text-slate-700"
              }`}
            >
              {t(`${tab}Tab` as any)}
            </button>
          ))}
        </div>

        <div className="p-6 max-h-[50vh] overflow-y-auto custom-scrollbar">
          {isLoading ? (
            <div className="space-y-4 p-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-10 w-10 rounded-xl" />
                  <div className="space-y-2 flex-1"><Skeleton className="h-3 w-24" /><Skeleton className="h-4 w-full" /></div>
                </div>
              ))}
            </div>
          ) : activeTab === "overview" ? (
            <UserOverviewTab user={displayUser} />
          ) : (
            <UserAccessTabs user={displayUser} activeTab={activeTab} />
          )}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-black uppercase tracking-widest px-6">
          <span>{t("systemName")}</span>
          <span>SUPKEM GOVERNANCE</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
