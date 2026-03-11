"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  UserCircle,
  ShieldCheck,
  Bell,
  Cpu,
  ChevronRight,
  Database,
  Users,
  Settings as SettingsIcon
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function SettingsHub() {
  const { user } = useAuth();
  const isAdmin =
    user?.is_superuser ||
    user?.is_staff ||
    user?.role?.role_name?.toLowerCase().includes("admin") ||
    user?.role_name?.toLowerCase().includes("admin");

  const settingsCategories = [
    {
      title: "Account Profile",
      description: "Manage your personal information, security preferences, and account identity.",
      icon: UserCircle,
      color: "text-blue-600",
      bg: "bg-blue-50",
      link: "/admin/settings/profile"
    },
    {
      title: "System Parameters",
      description: "Fine-tune core application behaviors, service defaults, and facility configurations.",
      icon: Cpu,
      color: "text-primary",
      bg: "bg-primary/5",
      link: "/admin/settings/system-parameters",
      isAdminOnly: true
    },
    {
      title: "Notifications",
      description: "Configure automated alerts for applications, certificates, and system events.",
      icon: Bell,
      color: "text-amber-600",
      bg: "bg-amber-50",
      link: "/admin/settings/notifications",
    },
    {
      title: "Access Control",
      description: "Manage role-based permissions and administrative security protocols.",
      link: "/admin/settings/access-control",
      icon: ShieldCheck,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      isAdminOnly: true
    },
    {
      title: "Data Audit Logs",
      description: "Review system activity logs and monitor administrative changes.",
      link: "/admin/settings/audit",
      icon: Database,
      color: "text-slate-600",
      bg: "bg-slate-50",
      isAdminOnly: true
    },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-12"
    >
      <header>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
            <SettingsIcon size={28} />
          </div>
          <div>
            <h1 className="text-4xl font-bold font-outfit text-primary tracking-tight">
              Settings <span className="text-foreground/40 italic">Hub</span>
            </h1>
            <p className="text-foreground/60 font-medium tracking-tight">
              Centralized platform configuration and administrative preferences.
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* User Management */}
        <motion.div variants={item}>
          <Link href="/admin/users">
            <Card className="border-none shadow-premium bg-white rounded-[2.5rem] p-8 hover:shadow-premium-hover transition-all duration-500 group border border-transparent hover:border-rose-100 h-full">
              <div className="flex flex-col h-full">
                <div className="bg-rose-50 p-4 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-500">
                  <Users className="h-8 w-8 text-rose-600" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mt-6 font-outfit uppercase tracking-tight">Team Management</h3>
                <p className="text-slate-500 font-semibold text-sm mt-3 flex-grow">
                  Administrate system access, institutional roles, and staff profiles.
                </p>
                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between text-rose-600 font-black text-[10px] uppercase tracking-widest">
                  <span>Manage Registry</span>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card>
          </Link>
        </motion.div>
        {settingsCategories.map((category, index) => {
          if (category.isAdminOnly && !isAdmin) return null;

          const cardContent = (
            <Card className="border-none shadow-premium bg-white rounded-[2rem] overflow-hidden hover:shadow-premium-hover transition-all duration-500 group cursor-pointer border border-transparent hover:border-primary/10 h-full">
              <CardHeader className="p-8 pb-0 flex flex-row items-start justify-between">
                <div className={`${category.bg} p-5 rounded-2xl group-hover:scale-110 transition-transform duration-500`}>
                  <category.icon className={`h-8 w-8 ${category.color}`} />
                </div>
                <ChevronRight className="h-6 w-6 text-slate-200 group-hover:translate-x-2 transition-transform duration-500 group-hover:text-primary/40" />
              </CardHeader>
              <CardContent className="p-8">
                <CardTitle className="text-2xl font-bold font-outfit text-slate-900 mb-3 tracking-tight">
                  {category.title}
                </CardTitle>
                <CardDescription className="text-slate-500 font-semibold text-base leading-relaxed">
                  {category.description}
                </CardDescription>
              </CardContent>
            </Card>
          );

          return (
            <motion.div key={index} variants={item}>
              {category.link ? (
                <Link href={category.link}>
                  {cardContent}
                </Link>
              ) : cardContent}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
