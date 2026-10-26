"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";
import { RoleGuard } from "@/components/RoleGuard";
import { AuditHeader } from "./_components/AuditHeader";
import { AuditLogsView } from "./_components/AuditLogsView";
import { AuditStatsView } from "./_components/AuditStatsView";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function DataLogsPage() {
  return (
    <RoleGuard module="settings_audit">
      <Suspense fallback={<div className="p-12 text-center text-slate-400 font-bold">Loading audit logs...</div>}>
        <DataLogsPageContent />
      </Suspense>
    </RoleGuard>
  );
}

function DataLogsPageContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") || searchParams.get("view")) === "stats" ? "stats" : "logs";
  const [view, setView] = useState<"logs" | "stats">(initialTab);
  const [search, setSearch] = useState("");

  const { data: logs, isLoading: isLoadingLogs } = useSWR(`/configurations/audit/logs/?search=${search}`, fetcher);
  const { data: stats } = useSWR("/configurations/audit/stats/", fetcher);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <AuditHeader view={view} setView={setView} />
      <AnimatePresence mode="wait">
        {view === "logs" ? (
          <AuditLogsView logs={logs} isLoading={isLoadingLogs} search={search} setSearch={setSearch} />
        ) : (
          <AuditStatsView stats={stats} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
