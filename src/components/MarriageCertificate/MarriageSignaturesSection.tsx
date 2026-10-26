import { SignatureRow } from "./SignatureRow";

export const MarriageSignaturesSection = () => {
  return (
    <>
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
    </>
  );
};
