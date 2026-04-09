// External libraries
import { XCircle } from "lucide-react";
import Image from "next/image";

interface PaymentModalHeaderProps {
  showCloseButton: boolean;
  onClose: () => void;
}

export function PaymentModalHeader({ showCloseButton, onClose }: PaymentModalHeaderProps) {
  return (
    <div className="relative h-48 w-full bg-[#06331e] overflow-hidden flex flex-col justify-end p-6 border-b border-white/10">
      <Image
        src="/payment-bg.png"
        alt="Payment Background"
        layout="fill"
        objectFit="cover"
        className="opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#06331e] to-transparent opacity-90" />
      <div className="relative z-10 flex justify-between items-end">
        <div>
          <p className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-1">
            Secure Checkout
          </p>
          <h3 className="font-black text-2xl text-white">Application Payment</h3>
        </div>
        {showCloseButton && (
          <button
            onClick={onClose}
            className="mb-2 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white/70 hover:text-white transition-colors"
            title="Cancel & Close"
          >
            <XCircle className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}
