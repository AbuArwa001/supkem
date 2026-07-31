interface LetterMetaProps {
  serialNumber: string;
  today: string;
}

/** EDU-prefixed reference block on the left, admissions/embassy addressee on the right. */
export function LetterMeta({ serialNumber, today }: LetterMetaProps) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <p className="font-bold">Ref: SUPKEM/EDU/{serialNumber}</p>
        <p className="font-bold">Date: {today}</p>
      </div>
      <div className="text-right">
        <p className="font-black uppercase tracking-wider text-primary">To Whom It May Concern</p>
        <p className="text-sm font-medium">Addressed to Admissions Office / Embassy</p>
      </div>
    </div>
  );
}
