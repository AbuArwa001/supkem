"use client";

import { useState } from "react";
import useSWR from "swr";
import { motion } from "framer-motion";
import { Shield, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { usePermissions } from "@/hooks/usePermissions";
import { RolePermissionsDialog } from "@/components/forms/RolePermissionsDialog";
import { AddRoleDialog } from "@/components/forms/AddRoleDialog";
import { RoleGuard } from "@/components/RoleGuard";
import { useTranslations } from "next-intl";
import { Role } from "./_components/accessControlTypes";
import { AccessControlHeader } from "./_components/AccessControlHeader";
import { AccessControlStats } from "./_components/AccessControlStats";
import { RoleGrid } from "./_components/RoleGrid";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function AccessControlPage() {
  return (
    <RoleGuard module="settings_access_control">
      <AccessControlContent />
    </RoleGuard>
  );
}

function AccessControlContent() {
  const t = useTranslations("Dashboard.admin.settings.accessControl");
  const { isSuperAdmin } = usePermissions();
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);

  const { data: rawRoles, isLoading, mutate } = useSWR<any>("/users/roles/", fetcher);
  const roles: Role[] = Array.isArray(rawRoles) ? rawRoles : rawRoles?.results || [];

  const filteredRoles = roles.filter((r) => r.role_name.toLowerCase().includes(search.toLowerCase()));

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-10">
      <AccessControlHeader isSuperAdmin={isSuperAdmin} onAddRole={() => setIsAddRoleOpen(true)} onRefresh={() => mutate()} isLoading={isLoading} />
      <AccessControlStats
        totalRoles={roles.length}
        coreRoles={roles.filter((r) => r.is_system_role).length}
        customRoles={roles.filter((r) => !r.is_system_role).length}
        totalGovernedUsers={roles.reduce((sum, r) => sum + (r.users_count || 0), 0)}
      />

      <div className="relative group">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
        <Input placeholder={t("searchPlaceholder")} className="h-16 pl-14 pr-6 rounded-[1.5rem] border-none shadow-premium bg-white font-bold text-lg focus:ring-4 focus:ring-primary/5 transition-all" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <RoleGrid isLoading={isLoading} filteredRoles={filteredRoles} onSelectRole={(role) => { setSelectedRole(role); setIsDialogOpen(true); }} />
      <RolePermissionsDialog isOpen={isDialogOpen} onClose={() => { setIsDialogOpen(false); setSelectedRole(null); }} role={selectedRole} />
      <AddRoleDialog isOpen={isAddRoleOpen} onClose={() => setIsAddRoleOpen(false)} />

      <footer className="pt-12 text-center pb-8">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-50/50 rounded-full border border-indigo-100/50">
          <Shield className="h-4 w-4 text-indigo-500" />
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-tight">RBAC infrastructure is active and enforcing security boundaries.</span>
        </div>
      </footer>
    </motion.div>
  );
}
