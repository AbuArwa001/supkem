import { cn } from "@/lib/utils";
import { Organization, Service } from "./types";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { IndividualServiceNotice } from "./sidebar/IndividualServiceNotice";
import { OrganizationPicker } from "./sidebar/OrganizationPicker";
import { ApplicationSummaryCard } from "./sidebar/ApplicationSummaryCard";

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
  const showIndividualNotice = isIndividualService && !isMarriageService;

  return (
    <div className="lg:col-span-4 space-y-6">
      <div className="sticky top-6">
        <div
          className={cn(
            "p-8 rounded-[20px] bg-white border border-border shadow-xl shadow-slate-200/50 space-y-6",
            !canSelectOrganization && "pointer-events-none opacity-40",
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

        {selectedService && (
          <ApplicationSummaryCard service={selectedService} />
        )}
      </div>
    </div>
  );
}

