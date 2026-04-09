import { motion, AnimatePresence } from "framer-motion";
import { Award, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { EligibleApplication } from "@/app/(dashboard)/admin/certificates/_types";

interface IssueCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  eligibleApplications: EligibleApplication[];
  isLoadingApplications: boolean;
  isIssuing: boolean;
  selectedAppId: string;
  setSelectedAppId: (id: string) => void;
  message: { type: "success" | "error"; text: string } | null;
  handleIssueCertificate: (e: React.FormEvent) => void;
}

export default function IssueCertificateModal({
  isOpen,
  onClose,
  eligibleApplications,
  isLoadingApplications,
  isIssuing,
  selectedAppId,
  setSelectedAppId,
  message,
  handleIssueCertificate,
}: IssueCertificateModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-lg rounded-[16px] overflow-hidden shadow-2xl border border-border"
          >
            <div className="p-8 border-b border-border flex items-center justify-between bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-outfit text-primary tracking-tight">
                    Issue New Certificate
                  </h3>
                  <p className="text-xs font-medium text-foreground/40">
                    Select an approved application
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white rounded-xl transition-colors"
              >
                <X size={20} className="text-foreground/40" />
              </button>
            </div>

            <form onSubmit={handleIssueCertificate} className="p-8 space-y-6">
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "p-4 rounded-2xl flex items-center gap-3 font-medium text-sm",
                    message.type === "success"
                      ? "bg-green-50 text-green-600 border border-green-100"
                      : "bg-red-50 text-red-600 border border-red-100",
                  )}
                >
                  {message.type === "success" ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <AlertCircle size={18} />
                  )}
                  {message.text}
                </motion.div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-foreground/40 ml-1">
                  Application Reference
                </label>
                <div className="relative">
                  <select
                    required
                    value={selectedAppId}
                    onChange={(e) => setSelectedAppId(e.target.value)}
                    className="w-full p-4 bg-white border border-border rounded-[20px] text-sm appearance-none outline-none focus:border-primary/20 transition-all shadow-sm disabled:opacity-50"
                    disabled={
                      isLoadingApplications ||
                      isIssuing ||
                      message?.type === "success"
                    }
                  >
                    <option value="">
                      {isLoadingApplications
                        ? "Loading approved applications..."
                        : "Select approved application..."}
                    </option>
                    {eligibleApplications.map((app) => (
                      <option key={app.id} value={app.id}>
                        {app.organization_name} - {app.service_name} (
                        {app.id.slice(0, 8)})
                      </option>
                    ))}
                  </select>
                  {!isLoadingApplications &&
                    eligibleApplications.length === 0 && (
                      <p className="text-[10px] text-red-500 mt-2 ml-1">
                        No approved applications pending certification.
                      </p>
                    )}
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={
                    !selectedAppId || isIssuing || message?.type === "success"
                  }
                  className="w-full py-4 bg-primary text-white rounded-[20px] font-bold text-sm hover-lift premium-gradient shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:transform-none"
                >
                  {isIssuing ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Issuing
                      Digital Certificate...
                    </>
                  ) : (
                    <>
                      <Award size={18} /> Generate Certificate
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-4 text-foreground/40 font-bold text-sm hover:text-primary transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
