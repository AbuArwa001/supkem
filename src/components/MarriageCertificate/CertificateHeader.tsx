import Image from "next/image";

interface CertificateHeaderProps {
  serialNumber?: string;
}

export const CertificateHeader = ({ serialNumber }: CertificateHeaderProps) => (
  <div className="flex justify-between items-start mb-6">
    {/* Top Left: Form designation */}
    <div className="text-left space-y-1 pt-1 min-w-[140px]">
      <p className="text-xs font-serif font-bold tracking-tight text-slate-800">
        FORM MM3 <span className="italic font-normal text-[11px]">r.9</span>
      </p>
      <p className="text-sm font-serif font-black tracking-wider uppercase text-slate-950">
        ORIGINAL
      </p>
    </div>

    {/* Top Center: Official State Header */}
    <div className="text-center space-y-1 flex-1 px-2">
      <div className="w-16 h-16 mx-auto mb-1 relative">
        <Image
          src="/images/kenya_coat_of_arms.png"
          alt="Republic of Kenya Coat of Arms"
          width={64}
          height={64}
          className="mx-auto object-contain drop-shadow-sm"
          priority
        />
      </div>

      <div className="space-y-0.5">
        <h2 className="text-sm sm:text-base font-serif font-black uppercase tracking-[0.18em] text-slate-900">
          REPUBLIC OF KENYA
        </h2>
        <h3 className="text-xs font-serif font-bold uppercase tracking-[0.12em] text-slate-800">
          MARRIAGE ACT, 2014
        </h3>
        <h1 className="text-sm sm:text-base font-serif font-black uppercase tracking-wider text-slate-950 pt-0.5">
          MUSLIM MARRIAGE CERTIFICATE
        </h1>
        <p className="text-base font-bold text-slate-900 font-arabic pt-0.5" dir="rtl">
          شهادة الزواج للمسلمين
        </p>
      </div>
    </div>

    {/* Top Right: Serial Number in Red & Embossed Watermark */}
    <div className="text-right flex flex-col items-end min-w-[140px] pt-1 relative">
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-xs font-serif font-semibold text-slate-700">Serial No.</span>
        <span className="text-lg font-mono font-black text-red-600 tracking-tight">
          {serialNumber || "0781"}
        </span>
      </div>

      {/* Embossed circular watermark seal */}
      <div className="w-24 h-24 rounded-full border border-slate-300/60 flex flex-col items-center justify-center text-[7px] font-serif font-bold text-slate-400 uppercase leading-tight text-center p-2 select-none pointer-events-none -mt-3">
        <div className="border border-dotted border-slate-300/80 rounded-full p-2 h-full w-full flex flex-col items-center justify-center">
          <span>KADHI&apos;S COURT</span>
          <span className="text-[6px] tracking-widest mt-0.5">REP. OF KENYA</span>
        </div>
      </div>
    </div>
  </div>
);
