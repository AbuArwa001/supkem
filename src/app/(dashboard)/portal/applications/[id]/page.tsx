"use client";

import { ShieldAlert } from "lucide-react";
import { useApplicationLogic } from "./_hooks/useApplicationLogic";
import { ApplicationHeader } from "./_components/ApplicationHeader";
import { StatusBanner } from "./_components/StatusBanner";
import { DetailsGrid } from "./_components/DetailsGrid";
import { CertificateBanner } from "./_components/CertificateBanner";
import { PaymentModal } from "@/app/(dashboard)/portal/applications/new/_components/PaymentModal";

/**
 * Portal Application Detail Page
 * Adheres to 200-line limit and logic separation via custom hooks.
 */
export default function ApplicationDetail() {
  const { 
    application, 
    loading, 
    error, 
    handleBack, 
    handleReturnToDashboard,
    showPaymentModal,
    setShowPaymentModal,
    refreshParams
  } = useApplicationLogic();

  const isPaymentPending = !application?.payment || application.payment.status !== "Completed";

  if (loading) {
    return <LoadingState />;
  }

  if (error || !application) {
    return <ErrorState error={error} onReturn={handleReturnToDashboard} />;
  }

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      <ApplicationHeader 
        id={application.id} 
        submittedAt={application.submitted_at} 
        onBack={handleBack} 
      />

      <StatusBanner 
        status={application.status} 
        certification={application.certification} 
        isPaymentPending={isPaymentPending}
        onPayClick={() => setShowPaymentModal(true)}
      />

      <DetailsGrid application={application} />

      {application.status === "Approved" && application.certification && (
        <CertificateBanner certificationId={application.certification.id} />
      )}

      {showPaymentModal && application && (
        <PaymentModal
          applicationId={application.id}
          serviceName={application.service_name || "Service Payment"}
          serviceFee={1500} // The backend actually calculates the real fee dynamically anyway via initiate_payment
          onSuccess={() => {
            setShowPaymentModal(false);
            if (refreshParams) refreshParams();
          }}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
}

/**
 * Local Loading State UI
 */
const LoadingState = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
    <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
    <p className="text-primary/60 font-medium">Loading Application Details...</p>
  </div>
);

/**
 * Local Error State UI
 */
const ErrorState = ({ error, onReturn }: { error: string; onReturn: () => void }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
    <div className="w-24 h-24 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
      <ShieldAlert size={48} />
    </div>
    <div className="space-y-2 max-w-md">
      <h2 className="text-2xl font-black font-outfit text-slate-800">
        Application Error
      </h2>
      <p className="text-slate-500 font-medium">
        {error || "The application could not be loaded."}
      </p>
    </div>
    <button
      onClick={onReturn}
      className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors"
    >
      Return to Dashboard
    </button>
  </div>
);
