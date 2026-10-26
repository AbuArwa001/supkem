"use client";

import { FormErrorBanner } from "@/app/[locale]/(dashboard)/portal/applications/new/_components/ui/FormErrorBanner";
import { useOrgRegistrationLogic } from "./_hooks/useOrgRegistrationLogic";
import { OrgFormHeader } from "./_components/OrgFormHeader";
import { OrgIdentitySection } from "./_components/OrgIdentitySection";
import { OrgLegalSection } from "./_components/OrgLegalSection";
import { OrgJurisdictionSection } from "./_components/OrgJurisdictionSection";
import { OrgContactSection } from "./_components/OrgContactSection";
import { OrgFormSubmit } from "./_components/OrgFormSubmit";

export default function RegisterOrganization() {
  const {
    loading,
    regions,
    councils,
    errors,
    formData,
    handleChange,
    handleRegionChange,
    handleSubmit,
  } = useOrgRegistrationLogic();

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <OrgFormHeader />
      <FormErrorBanner errors={errors} />

      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        <OrgIdentitySection formData={formData} errors={errors} onChange={handleChange} />
        <OrgLegalSection formData={formData} errors={errors} onChange={handleChange} />
        <OrgJurisdictionSection
          formData={formData}
          errors={errors}
          regions={regions}
          councils={councils}
          onRegionChange={handleRegionChange}
          onChange={handleChange}
        />
        <OrgContactSection formData={formData} onChange={handleChange} />
        <OrgFormSubmit loading={loading} />
      </form>
    </div>
  );
}
