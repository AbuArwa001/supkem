"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { UserForm } from "@/components/forms/UserForm";
import { UserDetailsSheet } from "./UserDetailsSheet";

interface UserDialogsProps {
  isAddOpen: boolean;
  onAddOpenChange: (open: boolean) => void;
  isEditOpen: boolean;
  onEditOpenChange: (open: boolean) => void;
  isDetailOpen: boolean;
  onDetailOpenChange: (open: boolean) => void;
  selectedUser: any;
  onSuccess: () => void;
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
}: UserDialogsProps) => {
  return (
    <>
      <Dialog open={isAddOpen} onOpenChange={onAddOpenChange}>
        <DialogContent className="sm:max-w-[650px] rounded-[2.5rem] border-none shadow-premium p-0 overflow-hidden bg-white">
          <div className="bg-gradient-to-br from-rose-600 to-rose-700 p-10 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mt-10 -mr-10" />
            <DialogTitle className="text-3xl font-black tracking-tight uppercase">
              New Account
            </DialogTitle>
            <p className="text-rose-100/70 text-[11px] font-black mt-2 uppercase tracking-[0.2em]">
              Register team member
            </p>
          </div>
          <div className="p-10">
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
        <DialogContent className="sm:max-w-[650px] rounded-[2.5rem] border-none shadow-premium p-0 overflow-hidden bg-white">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-10 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mt-10 -mr-10" />
            <DialogTitle className="text-3xl font-black tracking-tight uppercase">
              Edit Account
            </DialogTitle>
            <p className="text-slate-300 text-[11px] font-black mt-2 uppercase tracking-[0.2em]">
              Modify team member profile
            </p>
          </div>
          <div className="p-10">
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
      />
    </>
  );
};
