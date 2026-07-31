import { X } from "lucide-react";

export const MobileCloseButton = ({ onClose }: { onClose?: () => void }) => {
  return (
    <button
      onClick={onClose}
      className="lg:hidden absolute top-6 ltr:right-6 rtl:left-6 p-2 text-white/40 hover:text-white transition-colors z-[70]"
    >
      <X size={24} />
    </button>
  );
};
