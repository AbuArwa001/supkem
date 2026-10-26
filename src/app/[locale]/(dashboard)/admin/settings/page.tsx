"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { canAccessModule } from "@/lib/permissions";
import { RoleGuard } from "@/components/RoleGuard";
import { useTranslations } from "next-intl";
import { SettingsHubHeader } from "./_components/SettingsHubHeader";
import { UserManagementCard } from "./_components/UserManagementCard";
import { SettingsCategoryCard } from "./_components/SettingsCategoryCard";
import { getSettingsCategories } from "./_components/settingsCategoryList";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function SettingsHub() {
  const { user } = useAuth();
  const t = useTranslations("Dashboard.admin.settings.hub");

  const categories = getSettingsCategories(t).filter((cat) => canAccessModule(user, cat.module));
  const canUsers = canAccessModule(user, "users");

  return (
    <RoleGuard module="settings">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-12">
        <SettingsHubHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {canUsers && (
            <motion.div variants={item}>
              <UserManagementCard />
            </motion.div>
          )}

          {categories.map((category, index) => (
            <motion.div key={index} variants={item}>
              <SettingsCategoryCard category={category} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </RoleGuard>
  );
}
