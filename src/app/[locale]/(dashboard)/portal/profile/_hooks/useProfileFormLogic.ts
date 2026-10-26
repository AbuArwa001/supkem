"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { useTranslations } from "next-intl";

export function useProfileFormLogic() {
  const t = useTranslations("Dashboard.portal.profilePage");
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
      setSuccess(t("success"));
    } catch (err: any) {
      console.error("Update failed", err);
      setError(err.response?.data?.detail || t("failed"));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return { user, loading, formData, success, error, handleChange, handleUpdateProfile };
}
