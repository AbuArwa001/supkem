import type { Service } from "@/app/[locale]/(dashboard)/portal/applications/new/_types";

export interface ServiceFlags {
  isOrganizationRequired: boolean;
  isIndividualService: boolean;
  isMarriageService: boolean;
  isHajjUmrahService: boolean;
  isEducationService: boolean;
  isTravelVisaService: boolean;
  isEmploymentService: boolean;
}

export function deriveServiceFlags(service: Service | undefined): ServiceFlags {
  const cat = service?.category?.toLowerCase() ?? "";
  const name = service?.name?.toLowerCase() ?? "";
  return {
    isOrganizationRequired: service?.target_audience === "Organization",
    isIndividualService: service?.target_audience === "Individual",
    isMarriageService: service?.category === "Marriage",
    isHajjUmrahService: !!(cat.includes("hajj") || name.includes("hajj") || cat.includes("umrah") || name.includes("umrah")),
    isEducationService: !!(cat.includes("education") || name.includes("study") || name.includes("abroad")),
    isTravelVisaService: !!(cat.includes("travel") || name.includes("visa")),
    isEmploymentService: !!(cat.includes("employment") || name.includes("referral")),
  };
}
