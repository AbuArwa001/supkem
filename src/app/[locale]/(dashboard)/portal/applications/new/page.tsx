"use client";

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

/** Local component to handle the complex conditional rendering of form steps */
function StepRenderer({ step, flags, formData, errors, services, updateSubDetails, setFormData, setErrors }: any) {
  if (step === 1) return (
    <ServiceSelection
      services={services} selectedServiceId={formData.service} errors={errors}
      onSelect={(s) => {
        setFormData({ ...formData, service: s.id, organization: s.target_audience === "Individual" ? "" : formData.organization });
        if (errors.service) setErrors((prev: any) => ({ ...prev, service: "" }));
      }}
    />
  );

  if (step === 2) return (
    <>
      {flags.isMarriageService && <MarriageDetailsStep1 data={formData.marriage_details} errors={errors} onChange={(f, v) => updateSubDetails('marriage_details', f, v)} />}
      {flags.isHajjUmrahService && <PilgrimDetailsForm data={formData.pilgrim_details} errors={errors} onChange={(f, v) => updateSubDetails('pilgrim_details', f, v)} />}
      {flags.isEducationService && <EducationDetailsForm data={formData.education_details} errors={errors} onChange={(f, v) => updateSubDetails('education_details', f, v)} />}
      {flags.isTravelVisaService && <TravelVisaDetailsForm data={formData.travel_visa_details} errors={errors} onChange={(f, v) => updateSubDetails('travel_visa_details', f, v)} />}
      {flags.isEmploymentService && <EmploymentDetailsForm data={formData.employment_details} errors={errors} onChange={(f, v) => updateSubDetails('employment_details', f, v)} />}
    </>
  );

  if (step === 3 && flags.isMarriageService) return (
    <MarriageDetailsStep2 data={formData.marriage_details} errors={errors} onChange={(f, v) => updateSubDetails('marriage_details', f, v)} />
  );

  return null;
}

export default function SubmitApplication() {
  const { loading, organizations, services, formData, step, errors, selectedService, isIndividualService, isMarriageService,
    isHajjUmrahService, isEducationService, isTravelVisaService, isEmploymentService, canSelectOrganization,
    updateSubDetails, handleNextStep, handlePrevStep, handleSubmit, setFormData, setErrors } = useSubmitApplicationLogic();

  const isOtherService = isHajjUmrahService || isEducationService || isTravelVisaService || isEmploymentService;
  const flags = { isMarriageService, isHajjUmrahService, isEducationService, isTravelVisaService, isEmploymentService };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <ApplicationFormHeader step={step} isMarriageService={isMarriageService} isOtherService={isOtherService} />
      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            <StepRenderer step={step} flags={flags} formData={formData} errors={errors} services={services}
              updateSubDetails={updateSubDetails} setFormData={setFormData} setErrors={setErrors} />
          </div>
          <ApplicationSidebar organizations={organizations} selectedService={selectedService} organizationValue={formData.organization}
            errors={errors} canSelectOrganization={canSelectOrganization} isIndividualService={isIndividualService}
            isMarriageService={isMarriageService} onOrganizationChange={(id) => setFormData({ ...formData, organization: id })} />
        </div>
        <FormNavigation step={step} loading={loading} isMarriageService={isMarriageService} isOtherService={isOtherService}
          onBack={handlePrevStep} onNext={handleNextStep} />
      </form>
    </div>
  );
}
