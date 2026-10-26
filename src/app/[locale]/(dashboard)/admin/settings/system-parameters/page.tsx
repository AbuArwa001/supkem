"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { RoleGuard } from "@/components/RoleGuard";
import { canAccessModule } from "@/lib/permissions";
import { useTranslations } from "next-intl";
import { SystemParamsHeader } from "./_components/SystemParamsHeader";
import { SystemParamsFilterBar } from "./_components/SystemParamsFilterBar";
import { SystemParamItemCard } from "./_components/SystemParamItemCard";
import { useSystemParameters } from "./_components/useSystemParameters";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

export default function SystemParametersPage() {
  return (
    <RoleGuard module="settings_system_parameters">
      <SystemParametersContent />
    </RoleGuard>
  );
}

function SystemParametersContent() {
  const t = useTranslations("Dashboard.admin.settings.systemParams");
  const { user } = useAuth();
  const canAccess = canAccessModule(user, "settings_system_parameters");
  const {
    search, setSearch, selectedCategory, setSelectedCategory,
    pendingChanges, updatingKey, isLoading, mutate,
    handleValueChange, handleSave, filteredParameters,
  } = useSystemParameters(canAccess);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-12">
      <SystemParamsHeader onRefresh={() => mutate()} isLoading={isLoading} />
      <SystemParamsFilterBar
        search={search} setSearch={setSearch}
        selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
      />

      <div className="grid grid-cols-1 gap-6">
        {isLoading ? (
          [...Array(4)].map((_, i) => (
            <Card key={i} className="border-none shadow-sm rounded-[2rem] overflow-hidden bg-white">
              <CardContent className="p-8">
                <Skeleton className="h-6 w-1/3 mb-4" />
                <Skeleton className="h-12 w-full rounded-xl" />
              </CardContent>
            </Card>
          ))
        ) : filteredParameters?.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-[2rem] border border-slate-100 shadow-sm text-slate-500 font-medium">
            {t("noParametersFound")}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredParameters?.map((param) => (
              <SystemParamItemCard
                key={param.id}
                param={param}
                pendingValue={pendingChanges[param.key]}
                isUpdating={updatingKey === param.key}
                onValueChange={handleValueChange}
                onSave={handleSave}
              />
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}
