import { WitnessRow } from "./WitnessRow";
import { MarriageDetails } from "./types";

export const MarriageWitnessesSection = ({ details }: { details: MarriageDetails }) => {
  return (
    <>
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
    </>
  );
};
