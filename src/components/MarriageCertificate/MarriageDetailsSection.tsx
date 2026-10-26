import { Row } from "./Row";
import { OfficerRow } from "./OfficerRow";
import { MarriageDetails } from "./types";
import { MarriageSignaturesSection } from "./MarriageSignaturesSection";
import { MarriageWitnessesSection } from "./MarriageWitnessesSection";

interface MarriageDetailsSectionProps {
  details: MarriageDetails;
  dateOfIssuance?: string;
}

export const MarriageDetailsSection = ({ details, dateOfIssuance }: MarriageDetailsSectionProps) => {
  const waliyyValue = details.wife_waliyy_name
    ? `${details.wife_waliyy_name.toUpperCase()}${
        details.wife_waliyy_relationship
          ? `, ${details.wife_waliyy_relationship.toUpperCase()}`
          : ""
      }`
    : "";

  const formattedIssuanceDate = dateOfIssuance
    ? new Date(dateOfIssuance)
        .toLocaleDateString(undefined, {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
        .toUpperCase()
    : new Date().toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).toUpperCase();

  return (
    <>
      <Row
        en="Wife's Waliyy and relationship"
        value={waliyyValue}
        ar="اسم ولي الزوجة ونوع القرابة"
      />
      <Row
        en="Agreed Mahr"
        value={details.agreed_mahr}
        ar="المهر المتفق عليه"
      />
      <Row
        en="Paid Mahr and Deferred Mahr"
        value={details.paid_mahr_and_deferred}
        ar="المهر المسلم والمهر المؤجل"
      />
      <Row
        en="Particulars of gifts"
        value={details.particulars_of_gifts || "NIL"}
        ar="تفاصيل الهدايا"
      />
      <Row
        en="Place of Marriage"
        value={details.place_of_marriage}
        ar="المكان الذي عقد فيه الزواج"
      />
      <Row
        en="County of Marriage"
        value={details.county_of_marriage}
        ar="الاقليم الذي عقد فيه الزواج"
      />

      <MarriageSignaturesSection />
      <MarriageWitnessesSection details={details} />

      <OfficerRow
        name={details.marriage_officer_name}
        county={details.county_of_marriage || details.husband_residence_county}
      />

      <Row
        en="Date of Issuance"
        value={formattedIssuanceDate}
        ar="تاريخ الإصدار"
        className="border-b-0"
      />
    </>
  );
};
