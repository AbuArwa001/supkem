"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useSessionExpiryMonitor } from "./sessionExpiry/useSessionExpiryMonitor";
import { SessionExpiryModalContent } from "./sessionExpiry/SessionExpiryModalContent";

export function SessionExpiryWarningModal() {
  const {
    isOpen,
    secondsRemaining,
    isExtending,
    handleLogout,
    handleExtendSession,
    progressPercent,
  } = useSessionExpiryMonitor();

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent
        className="fixed inset-x-0 bottom-0 top-auto translate-x-0 translate-y-0 sm:left-[50%] sm:top-[50%] sm:bottom-auto sm:translate-x-[-50%] sm:translate-y-[-50%] w-full sm:max-w-md p-0 overflow-hidden border-none shadow-2xl rounded-t-[28px] sm:rounded-3xl bg-white z-[9999] max-h-[92vh] flex flex-col focus:outline-none"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <SessionExpiryModalContent
          secondsRemaining={secondsRemaining}
          progressPercent={progressPercent}
          isExtending={isExtending}
          onLogout={handleLogout}
          onExtend={handleExtendSession}
        />
      </DialogContent>
    </Dialog>
  );
}
