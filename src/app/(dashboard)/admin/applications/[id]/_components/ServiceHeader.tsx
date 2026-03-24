import Image from "next/image";

export default function ServiceHeader({ app }: { app: any }) {
  return (
    <>
      <div className="flex items-center gap-4 text-primary">
        <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center shrink-0">
          <Image src="/logo.svg" alt="Logo" width={24} height={24} />
        </div>
        <h3 className="text-2xl font-bold font-outfit">Service Details</h3>
      </div>

      <div className="p-8 rounded-[16px] bg-primary/[0.02] border border-primary/10 flex items-center justify-between">
        <div>
          <h4 className="text-2xl font-bold text-primary font-outfit mb-1">
            {app.service_name}
          </h4>
          <p className="text-sm font-bold text-secondary uppercase tracking-widest">
            Ref: SER-00{app.service}
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-primary">
            KES {Number(app.service_fee || 0).toLocaleString()}
          </p>
          <p className="text-xs font-bold text-foreground/40 tracking-widest uppercase mt-1">
            Standard Processing Fee
          </p>
        </div>
      </div>
    </>
  );
}
