import { cn } from "@/lib/utils";
import { Organization, Service } from "./types";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { IndividualServiceNotice } from "./sidebar/IndividualServiceNotice";
import { OrganizationPicker } from "./sidebar/OrganizationPicker";
import { ApplicationSummaryCard } from "./sidebar/ApplicationSummaryCard";
import { SidebarSkeleton } from "./sidebar/SidebarSkeleton";
import { SidebarActionBox } from "./sidebar/SidebarActionBox";

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

        <SidebarActionBox
          step={step}
          maxSteps={maxSteps}
          isLastStep={isLastStep}
          loading={loading}
          onNext={onNext}
          onBack={onBack}
        />

        {selectedService && <ApplicationSummaryCard service={selectedService} />}
      </div>
    </div>
  );
}
