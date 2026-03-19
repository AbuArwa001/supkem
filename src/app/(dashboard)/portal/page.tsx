"use client";

import { useAuth } from "@/hooks/useAuth";
import { FileText, ShieldCheck, Clock } from "lucide-react";
import { useDashboardData } from "./_hooks/useDashboardData";
import PortalWelcomeBanner from "./_components/PortalWelcomeBanner";
import StatCard from "./_components/StatCard";
import ActiveApplicationsList from "./_components/ActiveApplicationsList";
import PortalSidebar from "./_components/PortalSidebar";

export default function UserPortal() {
  const { user } = useAuth();
  const { activeApps, certsDocs, lettersDocs, loading } = useDashboardData();

  const metrics = [
    {
      icon: FileText,
      label: "Active Applications",
      value: activeApps.length.toString().padStart(2, "0"),
      color: "bg-gradient-to-br from-amber-600 to-amber-700",
      delay: 0.1,
    },
    {
      icon: ShieldCheck,
      label: "Certificates",
      value: certsDocs.length.toString().padStart(2, "0"),
      color: "bg-gradient-to-br from-indigo-600 to-indigo-700",
      delay: 0.2,
    },
    {
      icon: Clock,
      label: "Letters Issued",
      value: lettersDocs.length.toString().padStart(2, "0"),
      color: "bg-gradient-to-br from-blue-600 to-blue-700",
      delay: 0.3,
    },
  ];

  return (
    <div className="space-y-8 md:space-y-12 pb-20 p-6 sm:p-10 bg-slate-50 min-h-screen">
      <PortalWelcomeBanner user={user} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((m, i) => (
          <StatCard key={i} {...m} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <ActiveApplicationsList apps={activeApps} loading={loading} />
        <PortalSidebar certificates={certsDocs} letters={lettersDocs} />
      </div>
    </div>
  );
}
