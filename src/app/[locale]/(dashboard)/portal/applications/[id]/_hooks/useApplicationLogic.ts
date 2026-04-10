"use client";

// React/Next.js core
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

// Internal — services
import { portalApplicationService } from "@/app/[locale]/(dashboard)/portal/applications/[id]/_services/portalApplicationService";
import type { PortalApplicationDetail } from "@/app/[locale]/(dashboard)/portal/applications/new/_types";

export const useApplicationLogic = () => {
  const params = useParams();
  const router = useRouter();
  const [application, setApplication] = useState<PortalApplicationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchApplication = async () => {
    try {
      const data = await portalApplicationService.fetchById(params.id as string);
      setApplication(data as PortalApplicationDetail);
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { detail?: string } } };
      setError(apiError.response?.data?.detail ?? "Application not found or you don't have access.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) fetchApplication();
  }, [params.id]);

  const handlePay = () => {
    if (!application) return;
    const appId = application.id;
    const svc = (application as any).service;
    const serviceName = svc?.name ?? application.service_name ?? "Service";
    const fee = svc?.fee ?? application.service_fee ?? 0;
    router.push(`/portal/applications/new/confirm?appId=${appId}&service=${encodeURIComponent(serviceName)}&fee=${fee}`);
  };

  return {
    application,
    loading,
    error,
    handleBack: () => router.back(),
    handleReturnToDashboard: () => router.push("/portal"),
    handlePay,
    refreshParams: fetchApplication,
  };
};
