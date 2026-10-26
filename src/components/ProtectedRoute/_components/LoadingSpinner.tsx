import { motion, AnimatePresence } from "framer-motion";
import { ProtectedRouteLogicReturn } from "../useProtectedRouteLogic";
import { SpinnerLogoVisual } from "./SpinnerLogoVisual";

export const LoadingSpinner = ({ logic }: { logic: ProtectedRouteLogicReturn }) => {
  const { loading, tc } = logic;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
        >
          <div className="relative flex flex-col items-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-primary/10 rounded-full blur-3xl -m-20"
            />

            <SpinnerLogoVisual />

            <div className="flex flex-col items-center">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-primary font-bold font-outfit uppercase tracking-[0.4em] text-xs"
              >
                {tc("loading")}
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
