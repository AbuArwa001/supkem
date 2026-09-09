"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { UserForm } from "@/components/forms/UserForm";
import { UserDetailsSheet } from "./UserDetailsSheet";
import { useTranslations } from "next-intl";

interface UserDialogsProps {
  isAddOpen: boolean;
  onAddOpenChange: (open: boolean) => void;
  isEditOpen: boolean;
  onEditOpenChange: (open: boolean) => void;
  isDetailOpen: boolean;
  onDetailOpenChange: (open: boolean) => void;
  selectedUser: any;
  onSuccess: () => void;
  onOpenEdit?: (user: any) => void;
  onToggleActive?: (user: any) => void;
}

export const UserDialogs = ({
  isAddOpen,
  onAddOpenChange,
  isEditOpen,
  onEditOpenChange,
  isDetailOpen,
  onDetailOpenChange,
  selectedUser,
  onSuccess,
  onOpenEdit,
  onToggleActive,
}: UserDialogsProps) => {
  const t = useTranslations("Dashboard.admin.users.dialogs");

  return (
    <>
      <Dialog open={isAddOpen} onOpenChange={onAddOpenChange}>
        <DialogContent className="sm:max-w-[650px] rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden bg-white">
          <div className="bg-gradient-to-br from-emerald-800 to-teal-900 p-8 md:p-10 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full blur-3xl -mt-10 -mr-10 pointer-events-none" />
            <DialogTitle className="text-2xl md:text-3xl font-black tracking-tight uppercase font-outfit">
              {t("newAccount")}
            </DialogTitle>
            <p className="text-emerald-100/80 text-[11px] font-black mt-2 uppercase tracking-[0.2em]">
              {t("registerDesc")}
            </p>
          </div>
          <div className="p-8 md:p-10">
            <UserForm
              onSuccess={() => {
                onAddOpenChange(false);
                onSuccess();
              }}
            />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={onEditOpenChange}>
        <DialogContent className="sm:max-w-[650px] rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden bg-white">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 p-8 md:p-10 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full blur-3xl -mt-10 -mr-10 pointer-events-none" />
            <DialogTitle className="text-2xl md:text-3xl font-black tracking-tight uppercase font-outfit">
              {t("editAccount")}
            </DialogTitle>
            <p className="text-slate-300 text-[11px] font-black mt-2 uppercase tracking-[0.2em]">
              {t("modifyDesc")}
            </p>
          </div>
          <div className="p-8 md:p-10">
            {selectedUser && (
              <UserForm
                user={selectedUser}
                onSuccess={() => {
                  onEditOpenChange(false);
                  onSuccess();
                }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <UserDetailsSheet
        isOpen={isDetailOpen}
        onOpenChange={onDetailOpenChange}
        user={selectedUser}
        onEdit={onOpenEdit}
        onToggleActive={onToggleActive}
      />
    </>
  );
};
