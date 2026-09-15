import { Row } from "./Row";
import { ResidenceRow } from "./ResidenceRow";
import { MarriageDetails } from "./types";

interface WifeDetailsProps {
  details: MarriageDetails;
}

export const WifeDetails = ({ details }: WifeDetailsProps) => {
  const wifeId = details.wife_id_passport
    ? (details.wife_id_passport.toUpperCase().startsWith("ID")
        ? details.wife_id_passport.toUpperCase()
        : `ID NO: ${details.wife_id_passport}`)
    : "";

  const wifeAge = details.wife_age
    ? (details.wife_age.toString().includes("YEAR")
        ? details.wife_age.toString().toUpperCase()
        : `${details.wife_age} YEARS OLD`)
    : "";

  return (
    <>
      <Row
        en="Wife's Name"
        value={details.wife_name}
        ar="إسم الزوجه"
      />
      <Row
        en="Wife's ID.No/Passport"
        value={wifeId}
        ar="رقم البطاقة الشخصية/ جواز السفر للزوجة"
      />
      <Row
        en="Age"
        value={wifeAge}
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
};
