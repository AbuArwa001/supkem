"use client";

import { Save, Loader2, UserCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useProfileFormLogic } from "./_hooks/useProfileFormLogic";
import { ProfileFormFields } from "./_components/ProfileFormFields";
import { ProfileStatusCard } from "./_components/ProfileStatusCard";

export default function PortalProfileSettings() {
  const t = useTranslations("Dashboard.portal.profilePage");
  const { user, loading, formData, success, error, handleChange, handleUpdateProfile } = useProfileFormLogic();

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold font-outfit text-primary">{t("title")}</h1>
          <p className="text-foreground/60 font-medium tracking-tight">{t("subtitle")}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-10 rounded-[24px] bg-white border border-border shadow-sm space-y-10"
          >
            <div className="flex items-center gap-4 text-primary">
              <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center shrink-0">
                <UserCircle size={28} />
              </div>
              <h3 className="text-2xl font-bold font-outfit">{t("personalInfo")}</h3>
            </div>

            {success && (
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl text-sm font-bold border border-emerald-100">
                {success}
              </div>
            )}
            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100">
                {error}
              </div>
            )}

            <ProfileFormFields formData={formData} email={user?.email} onChange={handleChange} />

            <div className="pt-6">
              <button
                onClick={handleUpdateProfile}
                disabled={loading}
                className="px-10 py-4 bg-primary text-white rounded-[24px] font-extrabold text-sm hover-lift premium-gradient shadow-xl shadow-primary/20 flex items-center gap-3 disabled:opacity-50 cursor-pointer"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                {loading ? t("saving") : t("saveChanges")}
              </button>
            </div>
          </motion.div>
        </div>

        <ProfileStatusCard roleName={user?.role?.role_name} />
      </div>
    </div>
  );
}
