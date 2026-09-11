"use client";

// React/Next.js core
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";

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

  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const handleWithdraw = async (reason?: string): Promise<{ success: boolean; error?: string }> => {
    if (!application) return { success: false, error: "No application loaded" };
    setIsWithdrawing(true);
    try {
      const updated = await portalApplicationService.withdraw(application.id, reason);
      setApplication(updated as PortalApplicationDetail);
      return { success: true };
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { detail?: string } } };
      return {
        success: false,
        error: apiError.response?.data?.detail ?? "Failed to withdraw application.",
      };
    } finally {
      setIsWithdrawing(false);
    }
  };

  return {
    application,
    loading,
    error,
    isWithdrawing,
    handleBack: () => router.back(),
    handleReturnToDashboard: () => router.push("/portal"),
    handlePay,
    handleWithdraw,
    refreshParams: fetchApplication,
  };
};
