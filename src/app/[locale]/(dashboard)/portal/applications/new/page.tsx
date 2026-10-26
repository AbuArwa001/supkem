"use client";

import { AnimatePresence } from "framer-motion";
import { useSubmitApplicationLogic } from "./_components/useSubmitApplicationLogic";
import { ApplicationFormHeader } from "./_components/ApplicationFormHeader";
import { ApplicationSidebar } from "./_components/ApplicationSidebar";
import { FormNavigation } from "./_components/FormNavigation";
import { FormErrorBanner } from "./_components/ui/FormErrorBanner";
import { StepRenderer } from "./_components/StepRenderer";
import { ServiceFloatingDock } from "./_components/ServiceFloatingDock";

export default function SubmitApplication() {
  const {
    loading,
    dataLoading,
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

  const isOtherService = isHajjUmrahService || isEducationService || isTravelVisaService || isEmploymentService;
  const flags = { isMarriageService, isHajjUmrahService, isEducationService, isTravelVisaService, isEmploymentService };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-24">
      <ApplicationFormHeader
        step={step}
        isMarriageService={isMarriageService}
        isOtherService={isOtherService}
        selectedServiceName={selectedService?.name}
      />
      <FormErrorBanner errors={errors} />

      <form onSubmit={handleSubmit} className="space-y-10" noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-8 space-y-8">
            <StepRenderer
              step={step} flags={flags} formData={formData} errors={errors}
              services={services} dataLoading={dataLoading} updateSubDetails={updateSubDetails}
              setFormData={setFormData} setErrors={setErrors} onProceed={handleNextStep}
            />
          </div>

          <ApplicationSidebar
            organizations={organizations} selectedService={selectedService} organizationValue={formData.organization}
            errors={errors} canSelectOrganization={canSelectOrganization} isIndividualService={isIndividualService}
            isMarriageService={isMarriageService} isOtherService={isOtherService} step={step}
            loading={loading} dataLoading={dataLoading} onNext={handleNextStep} onBack={handlePrevStep}
            onOrganizationChange={(id) => {
              setFormData({ ...formData, organization: id });
              if (errors.organization) setErrors((prev: any) => { const { organization, ...rest } = prev; return rest; });
            }}
          />
        </div>

        <FormNavigation
          step={step} loading={loading} isMarriageService={isMarriageService}
          isOtherService={isOtherService} errors={errors} onBack={handlePrevStep} onNext={handleNextStep}
        />
      </form>

      <AnimatePresence>
        {step === 1 && selectedService && (
          <ServiceFloatingDock selectedService={selectedService} onNext={handleNextStep} />
        )}
      </AnimatePresence>
    </div>
  );
}
