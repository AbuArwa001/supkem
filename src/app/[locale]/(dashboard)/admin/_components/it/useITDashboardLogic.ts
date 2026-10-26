import useSWR from "swr";
import api from "@/lib/api";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { SystemStats, AuditItem } from "./itTypes";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export function useITDashboardLogic() {
  const t = useTranslations("Dashboard.admin.it");

  const {
    data: stats, isLoading: isStatsLoading, isValidating: isStatsValidating, mutate: mutateStats,
  } = useSWR<SystemStats>("/configurations/audit/stats/", fetcher, { revalidateOnFocus: false });

  const {
    data: logs, isLoading: isLogsLoading, isValidating: isLogsValidating, mutate: mutateLogs,
  } = useSWR<AuditItem[]>("/configurations/audit/logs/", fetcher, { revalidateOnFocus: false });

  const {
    data: parameters, isLoading: isParamsLoading, mutate: mutateParams,
  } = useSWR<any[]>("/configurations/system-parameters/", fetcher, { revalidateOnFocus: false });

  const isRefreshing = isStatsValidating || isLogsValidating;

  const handleRefresh = () => {
    mutateStats();
    mutateLogs();
    mutateParams();
    toast.success(t("successRefresh"));
  };

  const totalUsers = stats?.user_stats?.total ?? 0;
  const activeUsers = stats?.user_stats?.active ?? 0;
  const activeRatio = totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 100;
  const totalParams = Array.isArray(parameters) ? parameters.length : 0;
  const dbEngine = stats?.database_engine || "PostgreSQL / Cloud SQL";

  return {
    stats, logs, isStatsLoading, isLogsLoading, isParamsLoading, isRefreshing,
    handleRefresh, totalUsers, activeUsers, activeRatio, totalParams, dbEngine,
  };
}
