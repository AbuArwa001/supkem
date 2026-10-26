"use client";

import useSWR from "swr";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/i18n/routing";
import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/api";
import { RoleGuard } from "@/components/RoleGuard";
import { useTranslations } from "next-intl";
import { INTEGRATIONS, IntegrationParam, groupByKey } from "./_components/integrationTypes";
import { IntegrationsHeader } from "./_components/IntegrationsHeader";
import { IntegrationCard } from "./_components/IntegrationCard";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };
const fetcher = (url: string) => api.get(url).then((r) => r.data);

export default function IntegrationsPage() {
  return (
    <RoleGuard module="settings_integrations">
      <IntegrationsPageContent />
    </RoleGuard>
  );
}

function IntegrationsPageContent() {
  const t = useTranslations("Dashboard.admin.settings.integrations");
  const { user } = useAuth();
  const isAdmin = user?.is_superuser || user?.is_staff ||
    ["Super Admin", "Admin", "IT Officer"].includes(user?.role?.role_name ?? user?.role_name ?? "");

  const { data: rawData, error, isLoading, mutate } = useSWR<IntegrationParam[] | { results: IntegrationParam[] }>(
    isAdmin ? "/configurations/integrations/" : null, fetcher, { revalidateOnFocus: false }
  );
  const params = rawData ? groupByKey(Array.isArray(rawData) ? rawData : rawData.results ?? []) : {};

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4 text-slate-500">
        <XCircle size={40} className="text-rose-400" />
        <p className="font-semibold">You don&apos;t have permission to view this page.</p>
        <Link href="/admin/settings" className="text-sm underline text-slate-400">← {t("backToSettings")}</Link>
      </div>
    );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}><IntegrationsHeader params={params} /></motion.div>

      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-24 rounded-[28px] bg-slate-100" />)}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 p-6 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700">
          <XCircle size={20} />
          <p className="font-medium">Failed to load integration settings. Please refresh.</p>
        </div>
      )}

      {!isLoading && !error && (
        <div className="space-y-4">
          {INTEGRATIONS.map((integration) => (
            <motion.div key={integration.id} variants={item}>
              <IntegrationCard integration={integration} params={params} onSaved={() => mutate()} />
            </motion.div>
          ))}
        </div>
      )}

      <motion.div variants={item} className="flex items-start gap-4 p-5 bg-slate-50 border border-slate-200 rounded-2xl">
        <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center shrink-0 mt-0.5">🔒</div>
        <div>
          <p className="text-sm font-bold text-slate-700">Security Note</p>
          <p className="text-sm text-slate-500 mt-1 leading-relaxed">
            Secret keys are <strong>write-only</strong> — once saved, they display as{" "}
            <code className="bg-slate-200 px-1 py-0.5 rounded text-xs font-mono">••••••••</code> and are never returned in API responses.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
