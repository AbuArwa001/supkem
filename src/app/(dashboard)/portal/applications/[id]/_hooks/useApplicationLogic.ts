"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";

export const useApplicationLogic = () => {
  const params = useParams();
  const router = useRouter();
  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await api.get(`/applications/applications/${params.id}/`);
        setApplication(res.data);
      } catch (err: any) {
        console.error("Failed to fetch application", err);
        setError(
          err.response?.data?.detail ||
          "Application not found or you don't have access.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchApplication();
    }
  }, [params.id]);

  const handleBack = () => router.back();
  const handleReturnToDashboard = () => router.push("/portal");

  return {
    application,
    loading,
    error,
    handleBack,
    handleReturnToDashboard,
  };
};
