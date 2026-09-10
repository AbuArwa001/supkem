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
  Settings as SettingsIcon,
  Share2,
  Plug,
} from "lucide-react";
import { Link } from "@/i18n/routing";
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
      title: "Social Feeds & Aggregator",
      description: "Configure Tagembed live wall, aggregator widget ID, and manage official social media handles.",
      icon: Share2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      link: "/admin/settings/social",
      isAdminOnly: true
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
    {
      title: "Integrations",
      description: "Configure API credentials for Knock notifications, M-Pesa payments, Resend email, and OpenAI translation.",
      link: "/admin/settings/integrations",
      icon: Plug,
      color: "text-violet-600",
      bg: "bg-violet-50",
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
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-4">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-xl shadow-black/10">
            <SettingsIcon size={32} className="animate-[spin_4s_linear_infinite]" />
          </div>
          <div>
            <h1 className="text-4xl lg:text-5xl font-black font-outfit text-slate-900 tracking-tight">
              Settings <span className="text-slate-300 font-normal italic">Hub</span>
            </h1>
            <p className="text-slate-500 font-medium text-lg mt-2">
              Centralized platform configuration and administrative preferences.
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* User Management */}
        {isAdmin && (
          <motion.div variants={item}>
            <Link href="/admin/users">
              <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-slate-900 rounded-[32px] p-8 md:p-10 hover:shadow-[0_20px_50px_rgb(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-500 group border border-slate-800 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-rose-500/30 transition-colors duration-500" />
                <div className="flex flex-col h-full relative z-10">
                  <div className="bg-rose-500/20 p-5 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-500 border border-rose-500/30">
                    <Users className="h-8 w-8 text-rose-300" />
                  </div>
                  <h3 className="text-3xl font-black text-white mt-8 font-outfit tracking-tight">Team Management</h3>
                  <p className="text-slate-400 font-medium text-base mt-4 flex-grow leading-relaxed">
                    Administrate system access, institutional roles, and staff profiles.
                  </p>
                  <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-rose-400 font-black text-[11px] uppercase tracking-widest">
                    <span>Manage Registry</span>
                    <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        )}
        {settingsCategories.map((category, index) => {
          if (category.isAdminOnly && !isAdmin) return null;

          const cardContent = (
            <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-[32px] overflow-hidden hover:shadow-[0_20px_50px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-500 group cursor-pointer border border-slate-100 hover:border-slate-300 h-full">
              <CardHeader className="p-8 md:p-10 pb-0 flex flex-row items-start justify-between">
                <div className={`${category.bg} p-5 rounded-2xl group-hover:scale-110 transition-transform duration-500 border border-white`}>
                  <category.icon className={`h-8 w-8 ${category.color}`} />
                </div>
                <ChevronRight className="h-6 w-6 text-slate-200 group-hover:translate-x-2 transition-transform duration-500 group-hover:text-slate-400" />
              </CardHeader>
              <CardContent className="p-8 md:p-10">
                <CardTitle className="text-2xl font-black font-outfit text-slate-900 mb-4 tracking-tight group-hover:text-primary transition-colors">
                  {category.title}
                </CardTitle>
                <CardDescription className="text-slate-500 font-medium text-base leading-relaxed">
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
