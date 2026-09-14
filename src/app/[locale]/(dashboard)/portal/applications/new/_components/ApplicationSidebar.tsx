import { cn } from "@/lib/utils";
import { Organization, Service } from "./types";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { IndividualServiceNotice } from "./sidebar/IndividualServiceNotice";
import { OrganizationPicker } from "./sidebar/OrganizationPicker";
import { ApplicationSummaryCard } from "./sidebar/ApplicationSummaryCard";
import { ArrowRight, ArrowLeft, ShieldCheck, Sparkles, Loader2, Lock } from "lucide-react";
import { useLocale } from "next-intl";
import { Skeleton } from "@/components/ui/skeleton";

export function SidebarSkeleton() {
  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Applying Entity Box Skeleton */}
      <div className="p-7 sm:p-8 rounded-[24px] bg-white border border-slate-200/90 shadow-xl shadow-slate-200/50 space-y-6">
        <div className="flex items-center gap-3">
          <Skeleton className="w-6 h-6 rounded-lg bg-slate-200/80" />
          <Skeleton className="h-6 w-36 rounded-lg bg-slate-200/80" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-14 w-full rounded-2xl bg-slate-200/60" />
          <Skeleton className="h-14 w-full rounded-2xl bg-slate-200/60" />
        </div>
      </div>

      {/* Action Box Skeleton */}
      <div className="p-6 rounded-[24px] bg-white border border-slate-200/90 shadow-xl shadow-slate-200/60 space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-24 rounded-full bg-slate-200/80" />
          <Skeleton className="h-4 w-20 rounded bg-slate-200/60" />
        </div>
        <Skeleton className="h-14 w-full rounded-2xl bg-slate-200/80" />
        <Skeleton className="h-3 w-44 rounded-full mx-auto bg-slate-200/60" />
      </div>
    </div>
  );
}

interface ApplicationSidebarProps {
  organizations: Organization[];
  selectedService: Service | undefined;
  organizationValue: string;
  errors: Record<string, string>;
  canSelectOrganization: boolean;
  isIndividualService: boolean;
  isMarriageService: boolean;
  isOtherService?: boolean;
  step?: number;
  loading?: boolean;
  dataLoading?: boolean;
  onOrganizationChange: (id: string) => void;
  onNext?: () => void;
  onBack?: () => void;
}

export function ApplicationSidebar({
  organizations,
  selectedService,
  organizationValue,
  errors,
  canSelectOrganization,
  isIndividualService,
  isMarriageService,
  isOtherService = false,
  step = 1,
  loading = false,
  dataLoading = false,
  onOrganizationChange,
  onNext,
  onBack,
}: ApplicationSidebarProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const showIndividualNotice = isIndividualService && !isMarriageService;

  if (dataLoading) {
    return (
      <div className="lg:col-span-4 space-y-6">
        <div className="sticky top-6">
          <SidebarSkeleton />
        </div>
      </div>
    );
  }

  const hasMultipleSteps = isMarriageService || isOtherService;
  const isLastStep =
    (isMarriageService && step === 3) ||
    (isOtherService && step === 2) ||
    (!hasMultipleSteps && step === 1);
  const maxSteps = isMarriageService ? 3 : isOtherService ? 2 : 1;

  return (
    <div className="lg:col-span-4 space-y-6">
      <div className="sticky top-6 space-y-5">
        {/* 1. Applying Entity / Registrar Box */}
        <div
          className={cn(
            "p-7 sm:p-8 rounded-[24px] bg-white border border-slate-200/90 shadow-xl shadow-slate-200/50 space-y-6 transition-all duration-300",
            !canSelectOrganization && "opacity-75",
          )}
        >
          <SidebarHeader isIndividualService={isIndividualService} />

          {showIndividualNotice ? (
            <IndividualServiceNotice />
          ) : (
            <OrganizationPicker
              organizations={organizations}
              organizationValue={organizationValue}
              isIndividualService={isIndividualService}
              errors={errors}
              onOrganizationChange={onOrganizationChange}
            />
          )}
        </div>

        {/* 2. Luxurious Action Box directly below Applying Entity */}
        <div className="p-6 rounded-[24px] bg-gradient-to-b from-white to-slate-50/90 border border-slate-200/90 shadow-xl shadow-slate-200/60 space-y-4 relative overflow-hidden">
          {/* Subtle top ambient bar */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-emerald-500 to-accent" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none -translate-y-8 translate-x-8" />

          {/* Step Meta Pill */}
          <div className="flex items-center justify-between gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider">
              <Sparkles size={12} className="text-secondary animate-pulse" />
              <span>
                {isLastStep
                  ? (isAr ? "المرحلة النهائية" : "Final Step")
                  : (isAr ? `الخطوة ${step} من ${maxSteps}` : `Step ${step} of ${maxSteps}`)}
              </span>
            </div>
            <span className="text-[11px] font-bold text-slate-400">
              {isLastStep
                ? (isAr ? "جاهز للإرسال" : "Ready to submit")
                : (isAr ? "المتابعة للبيانات" : "Ready to proceed")}
            </span>
          </div>

          {/* Action Button(s) */}
          <div className="pt-1">
            {!isLastStep ? (
              <div className="flex items-center gap-3">
                {step > 1 && onBack && (
                  <button
                    type="button"
                    onClick={onBack}
                    className="py-4 px-4 sm:px-5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-black font-outfit text-sm rounded-2xl transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer hover:scale-105 active:scale-95 shadow-xs"
                    title={isAr ? "رجوع" : "Back"}
                  >
                    <ArrowLeft size={18} className="rtl:rotate-180" />
                    <span className="hidden sm:inline">{isAr ? "رجوع" : "Back"}</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={onNext}
                  className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-primary via-emerald-600 to-accent hover:opacity-95 text-white font-black text-base font-outfit shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer border border-white/20 group"
                >
                  <span>{isAr ? "المتابعة للخطوة التالية" : "Next Step"}</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {step > 1 && onBack && (
                  <button
                    type="button"
                    onClick={onBack}
                    disabled={loading}
                    className="py-4 px-4 sm:px-5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-black font-outfit text-sm rounded-2xl transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer hover:scale-105 active:scale-95 shadow-xs disabled:opacity-50"
                    title={isAr ? "رجوع" : "Back"}
                  >
                    <ArrowLeft size={18} className="rtl:rotate-180" />
                    <span className="hidden sm:inline">{isAr ? "رجوع" : "Back"}</span>
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-primary to-accent hover:opacity-95 text-white font-black text-base font-outfit shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer border border-white/20 disabled:opacity-50 disabled:pointer-events-none group"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>{isAr ? "جاري المعالجة..." : "Processing..."}</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={20} className="text-emerald-200" />
                      <span>{isAr ? "إكمال وتقديم الطلب" : "Complete Submission"}</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1.5" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Trust Seal */}
          <div className="flex items-center justify-center gap-1.5 pt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <Lock size={12} className="text-emerald-600" />
            <span>{isAr ? "إجراء رسمي آمن ومعتمد من سوبكيم" : "Official SUPKEM Secure Accreditation"}</span>
          </div>
        </div>

        {/* 3. Application Summary Card */}
        {selectedService && (
          <ApplicationSummaryCard service={selectedService} />
        )}
      </div>
    </div>
  );
}



