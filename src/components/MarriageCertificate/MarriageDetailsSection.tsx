import { Row } from "./Row";
import { SignatureRow } from "./SignatureRow";
import { WitnessRow } from "./WitnessRow";
import { OfficerRow } from "./OfficerRow";
import { MarriageDetails } from "./types";

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

      {/* Signatures */}
      <SignatureRow
        enLabel="Husband's Signature or His Attorney"
        arLabel="توقيع الزوج او وكيله"
        signatureStyle="style1"
      />
      <SignatureRow
        enLabel="Wife's/Guardian's Signature"
        arLabel="توقيع الزوجة او وليها"
        signatureStyle="style2"
      />

      {/* Witnesses */}
      <WitnessRow
        orderNum="1"
        suffix="st"
        arLabel="إسم الشاهد الأول ورقم بطاقته الشخصية وتوقيعه"
        name={details.witness_1_name}
        idNo={details.witness_1_id}
      />
      <WitnessRow
        orderNum="2"
        suffix="nd"
        arLabel="إسم الشاهد الثاني ورقم بطاقته الشخصية وتوقيعه"
        name={details.witness_2_name}
        idNo={details.witness_2_id}
      />

      {/* Muslim Marriage Officer */}
      <OfficerRow
        name={details.marriage_officer_name}
        county={details.county_of_marriage || details.husband_residence_county}
      />

      {/* Date of Issuance row right in the table as in official Form MM3 */}
      <Row
        en="Date of Issuance"
        value={formattedIssuanceDate}
        ar="تاريخ الإصدار"
        className="border-b-0"
      />
    </>
  );
};
