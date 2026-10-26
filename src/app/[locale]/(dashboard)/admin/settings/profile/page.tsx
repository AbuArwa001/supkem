"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { useTranslations } from "next-intl";
import { ProfileHeader } from "./_components/ProfileHeader";
import { PersonalInfoForm } from "./_components/PersonalInfoForm";
import { SecurityPasswordForm } from "./_components/SecurityPasswordForm";
import { ProfileAccessCard } from "./_components/ProfileAccessCard";

export default function ProfileSettings() {
  const t = useTranslations("Dashboard.admin.settings.profile");
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    phone_number: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        middle_name: user.middle_name || "",
        last_name: user.last_name || "",
        phone_number: user.phone_number || "",
      });
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await api.patch("/users/users/me/", formData);
      setSuccess(t("updateSuccess"));
    } catch (err: any) {
      console.error("Update failed", err);
      setError(err.response?.data?.detail || t("updateFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <ProfileHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <PersonalInfoForm
              formData={formData} setFormData={setFormData}
              email={user?.email} loading={loading}
              success={success} error={error} onSave={handleUpdateProfile}
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <SecurityPasswordForm />
          </motion.div>
        </div>

        <ProfileAccessCard userRoleName={user?.role?.role_name || user?.role_name} />
      </div>
    </div>
  );
}
