import { Row } from "./Row";
import { SignatureRow } from "./SignatureRow";
import { WitnessRow } from "./WitnessRow";
import { OfficerRow } from "./OfficerRow";
import { MarriageDetails } from "./types";

interface MarriageDetailsSectionProps {
  details: MarriageDetails;
}

export const MarriageDetailsSection = ({ details }: MarriageDetailsSectionProps) => (
  <>
    <Row
      en="Wife's Waliyy and relationship"
      value={`${details.wife_waliyy_name}, ${details.wife_waliyy_relationship.toUpperCase()}`}
      ar="اسم ولي الزوجة ونوع القرابة"
    />
    <Row en="Agreed Mahr" value={details.agreed_mahr} ar="المهر المتفق عليه" />
    <Row
      en="Paid Mahr and Deferred Mahr"
      value={details.paid_mahr_and_deferred}
      ar="المهر المسلم والمهر المؤجل"
    />
    <Row
      en="Particulars of gifts"
      value={details.particulars_of_gifts}
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

    <SignatureRow
      enLabel="Husband's Signature or His Attorney"
      arLabel="توقيع الزوج او وكيله"
      rotation={-5}
    />
    <SignatureRow
      enLabel="Wife's/Guardian's Signature"
      arLabel="توقيع الزوجة او وليها"
      rotation={3}
    />

    <WitnessRow
      enLabel="Name of 1st Witness, Identity card no. and Signature"
      arLabel="إسم الشاهد الأول ورقم بطاقته الشخصية وتوقيعه"
      name={details.witness_1_name}
      idNo={details.witness_1_id}
      sealRotationClass="-rotate-12"
    />
    <WitnessRow
      enLabel="Name of 2nd Witness, Identity card no. and Signature"
      arLabel="إسم الشاهد الثاني ورقم بطاقته الشخصية وتوقيعه"
      name={details.witness_2_name}
      idNo={details.witness_2_id}
      sealRotationClass="rotate-14"
    />

    <OfficerRow name={details.marriage_officer_name} />
  </>
);
