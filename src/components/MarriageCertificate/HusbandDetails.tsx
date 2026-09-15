import { Row } from "./Row";
import { ResidenceRow } from "./ResidenceRow";
import { MarriageDetails } from "./types";

interface HusbandDetailsProps {
  details: MarriageDetails;
}

export const HusbandDetails = ({ details }: HusbandDetailsProps) => {
  const husbandId = details.husband_id_passport
    ? (details.husband_id_passport.toUpperCase().startsWith("ID")
        ? details.husband_id_passport.toUpperCase()
        : `ID NO: ${details.husband_id_passport}`)
    : "";

  const husbandAge = details.husband_age
    ? (details.husband_age.toString().includes("YEAR")
        ? details.husband_age.toString().toUpperCase()
        : `${details.husband_age} YEARS OLD`)
    : "";

  return (
    <>
      <Row
        en="Husband's Name"
        value={details.husband_name}
        ar="إسم الزوج"
      />
      <Row
        en="Husband's ID. No/Passport"
        value={husbandId}
        ar="رقم البطاقة الشخصية/ جواز السفر للزوج"
      />
      <Row
        en="Age"
        value={husbandAge}
        ar="عمر الزوج"
      />
      <Row
        en="Marital Status"
        value={details.husband_marital_status || "FIRST MARRIAGE"}
        ar="الحالة الزوجية للزوج وقت هذا الزواج"
      />
      <Row
        en="Occupation"
        value={details.husband_occupation}
        ar="وظيفة الزوج"
      />
      <ResidenceRow
        county={details.husband_residence_county}
        subCounty={details.husband_residence_sub_county}
        arLabel="محل إقامة الزوج"
      />
    </>
  );
};
