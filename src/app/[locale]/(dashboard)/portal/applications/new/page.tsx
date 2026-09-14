"use client";

// React / Framer / Icons / i18n
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, FilePlus } from "lucide-react";
import { useLocale } from "next-intl";

// Internal — logic, components
import { useSubmitApplicationLogic } from "./_components/useSubmitApplicationLogic";
import { ApplicationFormHeader } from "./_components/ApplicationFormHeader";
import { ServiceSelection } from "./_components/ServiceSelection";
import { MarriageDetailsStep1 } from "./_components/MarriageDetailsStep1";
import { MarriageDetailsStep2 } from "./_components/MarriageDetailsStep2";
import { PilgrimDetailsForm } from "./_components/PilgrimDetailsForm";
import { EducationDetailsForm } from "./_components/EducationDetailsForm";
import { TravelVisaDetailsForm } from "./_components/TravelVisaDetailsForm";
import { EmploymentDetailsForm } from "./_components/EmploymentDetailsForm";
import { ApplicationSidebar } from "./_components/ApplicationSidebar";
import { FormNavigation } from "./_components/FormNavigation";
import { FormErrorBanner } from "./_components/ui/FormErrorBanner";

/** Local component to handle conditional rendering of form steps */
function StepRenderer({ step, flags, formData, errors, services, updateSubDetails, setFormData, setErrors, onProceed }: any) {
  if (step === 1) return (
    <ServiceSelection
      services={services}
      selectedServiceId={formData.service}
      errors={errors}
      onProceed={onProceed}
      onSelect={(s) => {
        setFormData({
          ...formData,
          service: s.id,
          organization: s.target_audience === "Individual" ? "" : formData.organization,
        });
        if (errors.service) {
          setErrors((prev: any) => {
            const next = { ...prev };
            delete next.service;
            return next;
          });
        }
      }}
    />
  );


  if (step === 2) return (
    <>
      {flags.isMarriageService && (
        <MarriageDetailsStep1
          data={formData.marriage_details}
          errors={errors}
          onChange={(f, v) => updateSubDetails("marriage_details", f, v)}
        />
      )}
      {flags.isHajjUmrahService && (
        <PilgrimDetailsForm
          data={formData.pilgrim_details}
          errors={errors}
          onChange={(f, v) => updateSubDetails("pilgrim_details", f, v)}
        />
      )}
      {flags.isEducationService && (
        <EducationDetailsForm
          data={formData.education_details}
          errors={errors}
          onChange={(f, v) => updateSubDetails("education_details", f, v)}
        />
      )}
      {flags.isTravelVisaService && (
        <TravelVisaDetailsForm
          data={formData.travel_visa_details}
          errors={errors}
          onChange={(f, v) => updateSubDetails("travel_visa_details", f, v)}
        />
      )}
      {flags.isEmploymentService && (
        <EmploymentDetailsForm
          data={formData.employment_details}
          errors={errors}
          onChange={(f, v) => updateSubDetails("employment_details", f, v)}
        />
      )}
    </>
  );

  if (step === 3 && flags.isMarriageService) return (
    <MarriageDetailsStep2
      data={formData.marriage_details}
      errors={errors}
      onChange={(f, v) => updateSubDetails("marriage_details", f, v)}
    />
  );

  return null;
}

export default function SubmitApplication() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const {
    loading,
    organizations,
    services,
    formData,
    step,
    errors,
    selectedService,
    isIndividualService,
    isMarriageService,
    isHajjUmrahService,
    isEducationService,
    isTravelVisaService,
    isEmploymentService,
    canSelectOrganization,
    updateSubDetails,
    handleNextStep,
    handlePrevStep,
    handleSubmit,
    setFormData,
    setErrors,
  } = useSubmitApplicationLogic();

  const isOtherService =
    isHajjUmrahService || isEducationService || isTravelVisaService || isEmploymentService;
  const flags = {
    isMarriageService,
    isHajjUmrahService,
    isEducationService,
    isTravelVisaService,
    isEmploymentService,
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-24">
      <ApplicationFormHeader
        step={step}
        isMarriageService={isMarriageService}
        isOtherService={isOtherService}
        selectedServiceName={selectedService?.name}
      />

      {/* Prominent sticky/top animated error banner */}
      <FormErrorBanner errors={errors} />

      <form onSubmit={handleSubmit} className="space-y-10" noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-8 space-y-8">
            <StepRenderer
              step={step}
              flags={flags}
              formData={formData}
              errors={errors}
              services={services}
              updateSubDetails={updateSubDetails}
              setFormData={setFormData}
              setErrors={setErrors}
              onProceed={handleNextStep}
            />
          </div>

          <ApplicationSidebar
            organizations={organizations}
            selectedService={selectedService}
            organizationValue={formData.organization}
            errors={errors}
            canSelectOrganization={canSelectOrganization}
            isIndividualService={isIndividualService}
            isMarriageService={isMarriageService}
            step={step}
            onNext={handleNextStep}
            onOrganizationChange={(id) => {
              setFormData({ ...formData, organization: id });
              if (errors.organization) {
                setErrors((prev: any) => {
                  const next = { ...prev };
                  delete next.organization;
                  return next;
                });
              }
            }}
          />
        </div>

        <FormNavigation
          step={step}
          loading={loading}
          isMarriageService={isMarriageService}
          isOtherService={isOtherService}
          errors={errors}
          onBack={handlePrevStep}
          onNext={handleNextStep}
        />
      </form>

      {/* Seamless Floating Quick Action Dock when a service is selected on Step 1 */}
      <AnimatePresence>
        {step === 1 && selectedService && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-5 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-xl z-50 bg-slate-900/95 backdrop-blur-xl text-white border border-white/15 shadow-2xl shadow-slate-950/40 rounded-2xl sm:rounded-3xl p-3 sm:p-4 px-4 sm:px-6 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-md shadow-primary/30">
                <FilePlus size={20} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                    {Number(selectedService.fee) > 0
                      ? `KES ${Number(selectedService.fee).toLocaleString()}`
                      : isAr ? "مجاني" : "NO FEE"}
                  </span>
                  <span className="text-slate-600 text-xs">•</span>
                  <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider truncate">
                    {selectedService.target_audience}
                  </span>
                </div>
                <h5 className="font-bold text-sm sm:text-base font-outfit truncate text-white">
                  {isAr ? (selectedService.name_ar || selectedService.name) : selectedService.name}
                </h5>
              </div>
            </div>

            <button
              type="button"
              onClick={handleNextStep}
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-95 text-white font-black text-xs sm:text-sm font-outfit shrink-0 flex items-center gap-2 shadow-lg shadow-primary/30 cursor-pointer hover:scale-105 active:scale-95 transition-all"
            >
              <span>{isAr ? "المتابعة للخطوة التالية" : "Continue to Next Step"}</span>
              <ArrowRight size={16} className="rtl:rotate-180" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

