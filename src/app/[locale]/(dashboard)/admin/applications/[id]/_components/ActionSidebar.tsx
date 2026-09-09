// External libraries
import { ThumbsUp, ThumbsDown, Trash2 } from "lucide-react";

// Internal components & types
import { cn } from "@/lib/utils";
import TimelineStatus from "@/app/[locale]/(dashboard)/admin/applications/[id]/_components/TimelineStatus";
import type { ApplicationDetail } from "@/app/[locale]/(dashboard)/admin/applications/_types";
import { useState } from "react";
import DocumentIssuanceStudio from "@/app/[locale]/(dashboard)/admin/certificates/_components/DocumentIssuanceStudio";
import { certificateService } from "@/app/[locale]/(dashboard)/admin/certificates/_services/certificateService";
import { Award, FileText } from "lucide-react";

interface ActionSidebarProps {
  app: ApplicationDetail;
  submitting: boolean;
  handleAction: (status: string) => void;
  handleDelete: () => void;
}

export default function ActionSidebar({
  app,
  submitting,
  handleAction,
  handleDelete,
}: ActionSidebarProps) {
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [isIssuing, setIsIssuing] = useState(false);
  const [issueMessage, setIssueMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [selectedAppId, setSelectedAppId] = useState<string>(app.id.toString());

  const handleIssueDocument = async (payload: any) => {
    setIsIssuing(true);
    setIssueMessage(null);
    try {
      await certificateService.issueDocument(payload);
      setIssueMessage({ type: 'success', text: `${payload.documentType} issued successfully!` });
      setTimeout(() => {
        setIsStudioOpen(false);
        window.location.reload(); // Quick refresh to update the UI with the new document
      }, 2000);
    } catch (err: any) {
      console.error("Failed to issue document", err);
      setIssueMessage({ type: 'error', text: err.response?.data?.detail || "Failed to issue document. Please try again." });
    } finally {
      setIsIssuing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="p-8 md:p-10 rounded-[32px] bg-slate-900 text-white shadow-[0_20px_50px_rgb(0,0,0,0.15)] border border-slate-800 space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="space-y-4 relative z-10">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Current Status
          </p>
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "w-4 h-4 rounded-full animate-pulse shadow-lg",
                app.status === "Approved"
                  ? "bg-emerald-400 shadow-emerald-400/50"
                  : app.status === "Rejected"
                    ? "bg-rose-400 shadow-rose-400/50"
                    : "bg-amber-400 shadow-amber-400/50",
              )}
            />
            <h3 className="text-3xl font-black font-outfit">{app.status}</h3>
          </div>
        </div>

        {(!app.payment || app.payment.status !== "Completed") && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-100 relative z-10 text-sm font-medium">
            <strong className="block text-amber-400 mb-1">⚠️ Payment Incomplete</strong>
            Admin override: You can still process this application even though the payment was not completed by the user.
          </div>
        )}

        <div className="space-y-4 relative z-10">
          {app.status === "Approved" ? (
            <div className="space-y-4">
              <button
                onClick={() => setIsStudioOpen(true)}
                className="w-full py-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-[24px] font-bold text-lg hover:shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Award size={20} /> Issue Official Document
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => handleAction("Approved")}
                disabled={submitting}
                className="w-full py-5 bg-white text-slate-900 rounded-[24px] font-bold text-lg hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/10 hover:shadow-emerald-500/20"
              >
                <ThumbsUp size={20} /> Approve Entry
              </button>
              <button
                onClick={() => handleAction("Rejected")}
                disabled={submitting}
                className="w-full py-5 bg-slate-800 text-white border border-slate-700 rounded-[24px] font-bold text-lg hover:bg-rose-600 hover:border-rose-600 hover:shadow-lg hover:shadow-rose-600/20 transition-all flex items-center justify-center gap-2"
              >
                <ThumbsDown size={20} /> Reject Submission
              </button>
            </>
          )}
        </div>
      </div>

      <DocumentIssuanceStudio
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
        eligibleApplications={[{
          id: app.id.toString(),
          organization_name: app.organization_name,
          user_name: (app as any).user_name,
          service_name: app.service_name
        }]}
        isLoadingApplications={false}
        isIssuing={isIssuing}
        selectedAppId={selectedAppId}
        setSelectedAppId={setSelectedAppId}
        message={issueMessage}
        handleIssueDocument={handleIssueDocument}
      />

      <TimelineStatus app={app} />

      <div className="pt-4 border-t border-slate-100">
        <button
          onClick={handleDelete}
          disabled={submitting}
          className="w-full py-5 bg-white border border-rose-100 text-rose-500 rounded-[24px] font-bold text-base hover:bg-rose-500 hover:text-white hover:border-rose-500 hover:shadow-xl hover:shadow-rose-500/20 transition-all flex items-center justify-center gap-2"
        >
          <Trash2 size={20} /> Delete Application
        </button>
      </div>
    </div>
  );
}
