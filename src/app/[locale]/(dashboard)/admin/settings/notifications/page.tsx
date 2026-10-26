"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { RoleGuard } from "@/components/RoleGuard";
import { canAccessModule } from "@/lib/permissions";
import { useTranslations } from "next-intl";
import { NotificationsHeader } from "./_components/NotificationsHeader";
import { NotificationParamCard } from "./_components/NotificationParamCard";
import { useNotificationsSettings } from "./_components/useNotificationsSettings";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function NotificationsSettingsPage() {
  return (
    <RoleGuard module="settings_notifications">
      <NotificationsSettingsContent />
    </RoleGuard>
  );
}

function NotificationsSettingsContent() {
  const t = useTranslations("Dashboard.admin.settings.notifications");
  const { user } = useAuth();
  const canAccess = canAccessModule(user, "settings_notifications");
  const {
    parameters, roles, paramsLoading, mutateParams,
    pendingChanges, updatingKey, handleValueChange, handleSave, toggleRole,
  } = useNotificationsSettings(canAccess);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-12">
      <NotificationsHeader onRefresh={() => mutateParams()} isLoading={paramsLoading} />

      <div className="grid grid-cols-1 gap-8">
        {paramsLoading ? (
          [...Array(3)].map((_, i) => (
            <Card key={i} className="border-none shadow-premium rounded-[2.5rem] bg-white">
              <CardContent className="p-10">
                <Skeleton className="h-8 w-1/3 mb-6" />
                <Skeleton className="h-20 w-full rounded-2xl" />
              </CardContent>
            </Card>
          ))
        ) : (
          parameters?.map((param) => (
            <NotificationParamCard
              key={param.id}
              param={param}
              roles={roles}
              pendingValue={pendingChanges[param.key]}
              isUpdating={updatingKey === param.key}
              onValueChange={handleValueChange}
              onSave={handleSave}
              toggleRole={toggleRole}
            />
          ))
        )}
      </div>

      <footer className="pt-12 text-center pb-8">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 rounded-full">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">
            {t("realtimeFooter")}
          </span>
        </div>
      </footer>
    </motion.div>
  );
}
