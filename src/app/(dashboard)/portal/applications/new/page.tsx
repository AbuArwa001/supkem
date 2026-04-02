"use client";

import { cn } from "@/lib/utils";
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
import { PaymentModal } from "./_components/PaymentModal";
import { useRouter } from "next/navigation";

export default function SubmitApplication() {
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
    showPaymentModal,
    setShowPaymentModal,
    createdAppId,
  } = useSubmitApplicationLogic();

  const router = useRouter();

  const isOtherService = isHajjUmrahService || isEducationService || isTravelVisaService || isEmploymentService;

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <ApplicationFormHeader 
        step={step} 
        isMarriageService={isMarriageService} 
        isOtherService={isOtherService} 
      />

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            {step === 1 && (
              <ServiceSelection
                services={services}
                selectedServiceId={formData.service}
                errors={errors}
                onSelect={(service) => {
                  setFormData({
                    ...formData,
                    service: service.id,
                    organization: service.target_audience === "Individual" ? "" : formData.organization,
                  });
                  if (errors.service) setErrors(prev => ({ ...prev, service: "" }));
                }}
              />
            )}

            {step === 2 && (
              <>
                {isMarriageService && (
                  <MarriageDetailsStep1
                    data={formData.marriage_details}
                    errors={errors}
                    onChange={(field, value) => updateSubDetails('marriage_details', field, value)}
                  />
                )}
                {isHajjUmrahService && (
                  <PilgrimDetailsForm
                    data={formData.pilgrim_details}
                    errors={errors}
                    onChange={(field, value) => updateSubDetails('pilgrim_details', field, value)}
                  />
                )}
                {isEducationService && (
                  <EducationDetailsForm
                    data={formData.education_details}
                    errors={errors}
                    onChange={(field, value) => updateSubDetails('education_details', field, value)}
                  />
                )}
                {isTravelVisaService && (
                  <TravelVisaDetailsForm
                    data={formData.travel_visa_details}
                    errors={errors}
                    onChange={(field, value) => updateSubDetails('travel_visa_details', field, value)}
                  />
                )}
                {isEmploymentService && (
                  <EmploymentDetailsForm
                    data={formData.employment_details}
                    errors={errors}
                    onChange={(field, value) => updateSubDetails('employment_details', field, value)}
                  />
                )}
              </>
            )}

            {step === 3 && isMarriageService && (
              <MarriageDetailsStep2
                data={formData.marriage_details}
                errors={errors}
                onChange={(field, value) => updateSubDetails('marriage_details', field, value)}
              />
            )}
          </div>

          <ApplicationSidebar
            organizations={organizations}
            selectedService={selectedService}
            organizationValue={formData.organization}
            errors={errors}
            canSelectOrganization={canSelectOrganization}
            isIndividualService={isIndividualService}
            isMarriageService={isMarriageService}
            onOrganizationChange={(id) => setFormData({ ...formData, organization: id })}
          />
        </div>

        <FormNavigation
          step={step}
          loading={loading}
          isMarriageService={isMarriageService}
          isOtherService={isOtherService}
          onBack={handlePrevStep}
          onNext={handleNextStep}
        />
      </form>

      {showPaymentModal && createdAppId && (
        <PaymentModal
          applicationId={createdAppId}
          onSuccess={() => {
            setShowPaymentModal(false);
            router.push(`/portal/applications/${createdAppId}`);
          }}
          onClose={() => {
            setShowPaymentModal(false);
            router.push(`/portal/applications`);
          }}
        />
      )}
    </div>
  );
}
