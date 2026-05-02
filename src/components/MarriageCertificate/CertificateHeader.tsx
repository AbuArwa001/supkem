import Image from "next/image";

interface CertificateHeaderProps {
  serialNumber?: string;
}

export const CertificateHeader = ({ serialNumber }: CertificateHeaderProps) => (
  <div className="flex justify-between items-start mb-10">
    <div className="text-left space-y-0.5">
      <p className="text-[11px] font-black font-sans tracking-widest">
        FORM MM3 <span className="italic font-normal">r.9</span>
      </p>
      <p className="text-sm font-black tracking-tighter uppercase font-sans border-b-2 border-slate-900 inline-block">
        ORIGINAL
      </p>
    </div>
    <div className="text-center space-y-1.5 flex-1 px-4">
      <Image
        src="/logo.svg"
        alt="Republic of Kenya"
        width={85}
        height={85}
        className="mx-auto mb-3 drop-shadow-sm"
      />
      <div className="space-y-0 text-slate-800">
        <h2 className="text-base font-black uppercase tracking-[0.25em] font-sans">
          REPUBLIC OF KENYA
        </h2>
        <p className="text-sm font-black" dir="rtl">
          جمهورية كينيا
        </p>
      </div>
      <h3 className="text-[11px] font-black uppercase font-sans tracking-[0.1em] text-slate-600">
        Marriage Act, 2014
      </h3>
      <div className="h-0.5 w-32 bg-slate-900 mx-auto my-2" />
      <h1 className="text-xl font-black uppercase tracking-tight font-sans bg-slate-900 text-white px-4 py-1 inline-block">
        Muslim Marriage Certificate
      </h1>
      <p className="text-lg font-black mt-2 text-slate-800" dir="rtl">
        شهادة الزواج للمسلمين
      </p>
    </div>
    <div className="text-right flex flex-col items-end">
      <div className="border-2 border-slate-300 p-1 rounded-sm mb-2">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 text-center">
          Serial No.
        </p>
        <p className="text-2xl font-black text-rose-600 font-mono tracking-tighter bg-rose-50 px-3 py-1 rounded shadow-inner">
          {serialNumber || "0781"}
        </p>
      </div>
      <div className="w-20 h-20 rounded-full border-[1.5px] border-slate-300/50 flex flex-col items-center justify-center text-[7px] font-black text-slate-300 uppercase leading-none text-center p-2">
        <div className="border border-slate-300/50 rounded-full p-2 h-full w-full flex items-center justify-center">
          KADHI'S <br /> COURT <br /> STAMP
        </div>
      </div>
    </div>
  </div>
);
