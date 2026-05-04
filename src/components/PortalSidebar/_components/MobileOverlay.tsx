import { AnimatePresence, motion } from "framer-motion";
import { PortalSidebarLogicReturn } from "../types";

export const MobileOverlay = ({ logic }: { logic: PortalSidebarLogicReturn }) => {
  const { isOpen, onClose } = logic;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden"
        />
      )}
    </AnimatePresence>
  );
};
