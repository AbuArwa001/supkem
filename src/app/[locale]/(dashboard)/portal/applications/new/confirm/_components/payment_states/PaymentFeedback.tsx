// External libraries
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

export function PaymentProcessing({ title, sub }: { title: string, sub: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-500">
      <div className="relative">
        <div className="w-20 h-20 bg-[#25D366]/20 rounded-full flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-[#25D366] animate-spin" />
        </div>
        <div className="absolute inset-0 border-2 border-[#25D366]/40 rounded-full animate-ping" />
      </div>
      <div><h4 className="text-2xl font-black text-white">{title}</h4><p className="text-white/50 font-medium mt-2 text-lg">{sub}</p></div>
    </div>
  );
}

export function PaymentWaiting({ phone, onCancel }: { phone: string, onCancel: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in duration-500">
      <div className="relative">
        <div className="w-24 h-24 bg-white/10 border border-white/20 rounded-full flex items-center justify-center relative z-10 backdrop-blur-md">
          <div className="w-16 h-16 border-4 border-t-[#25D366] border-white/10 rounded-full animate-spin" />
        </div>
        <div className="absolute inset-0 bg-[#25D366]/20 rounded-full animate-ping z-0" />
      </div>
      <div className="space-y-3">
        <h4 className="text-3xl font-black text-white tracking-tight">Check Your Phone</h4>
        <p className="text-base font-medium text-white/70 max-w-sm mx-auto leading-relaxed">
          An M-Pesa prompt has been sent to <strong className="text-white">{phone}</strong>.<br />Please enter your PIN.
        </p>
      </div>
      <button onClick={onCancel} className="px-6 py-2 rounded-full border border-white/10 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/10 transition-all">Cancel Transaction</button>
    </div>
  );
}

export function PaymentSuccess() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-500">
      <div className="w-28 h-28 bg-[#25D366]/20 rounded-full flex items-center justify-center"><CheckCircle2 className="w-14 h-14 text-[#25D366]" /></div>
      <div>
        <h4 className="text-3xl font-black text-white">Payment Successful</h4>
        <p className="text-white/60 mt-2 font-medium text-lg">Your application is now processing.</p>
        <div className="mt-8 flex items-center justify-center gap-2 text-[#25D366]">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-xs font-bold uppercase tracking-widest">Redirecting</span>
        </div>
      </div>
    </div>
  );
}

export function PaymentError({ msg, onRetry }: { msg: string, onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in duration-500">
      <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center"><XCircle className="w-12 h-12 text-red-500" /></div>
      <div className="w-full">
        <h4 className="text-2xl font-black text-white">Transaction Failed</h4>
        <div className="mt-4 bg-red-500/10 border border-red-500/30 px-6 py-4 rounded-[20px]"><p className="text-red-400 font-bold">{msg}</p></div>
      </div>
      <button onClick={onRetry} className="w-full bg-white text-[#0b4a2d] hover:bg-slate-100 py-5 px-6 rounded-[20px] font-black text-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300">Retry Payment</button>
    </div>
  );
}
