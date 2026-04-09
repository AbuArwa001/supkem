// React/Next.js core
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

// Internal — services
import { portalApplicationService } from "@/app/(dashboard)/portal/applications/[id]/_services/portalApplicationService";

interface InvoiceApp {
  payment?: { amount?: string; receipt_number?: string; updated_at?: string; status?: string };
  service?: { name?: string; fee?: number };
  organization?: { name?: string };
  submitted_at?: string;
}

export function useInvoice() {
  const params = useParams();
  const router = useRouter();
  const appId = params.id as string;
  const [app, setApp] = useState<InvoiceApp | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!appId) return;
    portalApplicationService
      .fetchById(appId)
      .then((data) => setApp(data as InvoiceApp))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [appId]);

  const refCode = `APP-${appId?.split("-").pop()?.toUpperCase()}`;
  const fee = Number(app?.payment?.amount ?? app?.service?.fee ?? 0);
  const receiptNo = app?.payment?.receipt_number ?? "—";
  const serviceName = app?.service?.name ?? "Service";
  const paidAt = app?.payment?.updated_at ? new Date(app.payment.updated_at) : new Date();
  const submittedAt = app?.submitted_at ? new Date(app.submitted_at) : new Date();
  const isOrg = !!app?.organization;

  return {
    app, loading, appId, router,
    refCode, fee, receiptNo, serviceName, paidAt, submittedAt, isOrg,
    handleBack: () => router.push(`/portal/applications/${appId}`),
    handlePrint: () => window.print(),
  };
}
