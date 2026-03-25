import { motion } from "framer-motion";
import { Building2, Info, FilePlus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Organization, Service } from "./types";

interface ApplicationSidebarProps {
  organizations: Organization[];
  selectedService: Service | undefined;
  organizationValue: string;
  errors: Record<string, string>;
  canSelectOrganization: boolean;
  isIndividualService: boolean;
  isMarriageService: boolean;
  onOrganizationChange: (id: string) => void;
}

export function ApplicationSidebar({
  organizations,
  selectedService,
  organizationValue,
  errors,
  canSelectOrganization,
  isIndividualService,
  isMarriageService,
  onOrganizationChange,
}: ApplicationSidebarProps) {
  return (
    <div className="lg:col-span-4 space-y-6">
      <div className="sticky top-6">
        <div
          className={cn(
            "p-8 rounded-[20px] bg-white border border-border shadow-xl shadow-slate-200/50 space-y-6",
            !canSelectOrganization && "pointer-events-none opacity-40",
          )}
        >
          <div className="flex items-center gap-3 text-primary">
            <Building2 size={24} className="opacity-50" />
            <h3 className="text-xl font-black font-outfit">
              {isIndividualService ? "Registrar / Mosque" : "Applying Entity"}
            </h3>
          </div>
          
          {isIndividualService && !isMarriageService ? (
            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 flex gap-3">
              <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700/70 font-bold leading-relaxed">
                INDIVIDUAL SERVICE<br />
                This application will be filed under your personal profile.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {organizations.length === 0 ? (
                <p className="text-xs text-slate-400 font-bold italic p-4 text-center border-2 border-dashed border-slate-100 rounded-2xl">
                  {isIndividualService ? "Searching for accredited Mosques..." : "No organizations found."}
                </p>
              ) : (
                <>
                  {isIndividualService && (
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                      Select a recognized Registrar
                    </p>
                  )}
                  {organizations.map((org) => (
                    <label
                      key={org.id}
                      className={cn(
                        "p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between group",
                        organizationValue === org.id
                          ? "border-primary bg-primary/[0.03] shadow-lg shadow-primary/5"
                          : "border-slate-50 hover:border-primary/20 bg-slate-50 border-transparent",
                      )}
                    >
                      <input
                        type="radio"
                        name="organization"
                        value={org.id}
                        className="hidden"
                        onChange={() => onOrganizationChange(org.id)}
                      />
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center transition-all bg-white",
                          organizationValue === org.id ? "bg-primary text-white" : "text-slate-400"
                        )}>
                          <Building2 size={20} />
                        </div>
                        <span className={cn(
                          "text-sm font-bold transition-colors",
                          organizationValue === org.id ? "text-primary" : "text-slate-600"
                        )}>
                          {org.name}
                        </span>
                      </div>
                    </label>
                  ))}
                </>
              )}
              {errors.organization && (
                <p className="text-rose-500 text-[10px] font-bold mt-2 animate-pulse">{errors.organization}</p>
              )}
              {!isIndividualService && organizations.length === 0 && (
                <Link
                  href="/portal/organizations/new"
                  className="p-8 rounded-3xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-3 text-center text-foreground/40 hover:text-primary hover:border-primary/40 transition-all font-bold bg-slate-50/30"
                >
                  <FilePlus size={24} />
                  <span className="text-xs">Register Organization</span>
                </Link>
              )}
            </div>
          )}
        </div>

        {selectedService && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-8 rounded-[20px] bg-slate-900 text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <h4 className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-4">Application Summary</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs text-white/40 mb-1 font-bold">Service</p>
                  <p className="font-black font-outfit text-lg">{selectedService.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/40 mb-1 font-bold">Fee</p>
                  <p className="font-black text-amber-400">
                    {selectedService.fee > 0 ? `KES ${Number(selectedService.fee).toLocaleString()}` : "FREE"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
