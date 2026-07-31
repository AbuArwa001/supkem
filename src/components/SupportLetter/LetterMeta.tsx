/** Reference number / date block and the addressee block. */
export function LetterMeta({ serialNumber, today }: { serialNumber: string; today: string }) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <p className="font-bold">Our Ref: {serialNumber}</p>
        <p className="font-bold">Date: {today}</p>
      </div>
      <div className="text-right">
        <p className="font-bold uppercase tracking-wider text-primary">To Whom It May Concern</p>
        <p className="text-sm font-medium">Embassy of the Kingdom of Saudi Arabia</p>
        <p className="text-sm font-medium">Nairobi, Kenya</p>
      </div>
    </div>
  );
}
