import { Row } from "./Row";
import { ResidenceRow } from "./ResidenceRow";
import { MarriageDetails } from "./types";

interface WifeDetailsProps {
  details: MarriageDetails;
}

export const WifeDetails = ({ details }: WifeDetailsProps) => (
  <>
    <Row
      en="Wife's Name"
      value={details.wife_name}
      ar="إسم الزوجة"
    />
    <Row
      en="Wife's ID. No/Passport"
      value={details.wife_id_passport}
      ar="رقم البطاقة الشخصية/ جواز السفر للزوجة"
    />
    <Row
      en="Age"
      value={`${details.wife_age} YEARS OLD`}
      ar="عمر الزوجة"
    />
    <Row
      en="Marital Status"
      value={details.wife_marital_status || "VIRGIN"}
      ar="الحالة الزوجية للزوجة وقت هذا الزواج"
    />
    <Row
      en="Occupation"
      value={details.wife_occupation}
      ar="وظيفة الزوجة"
    />
    <ResidenceRow
      county={details.wife_residence_county}
      subCounty={details.wife_residence_sub_county}
      arLabel="محل إقامة الزوجة"
    />
  </>
);
