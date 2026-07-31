import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ProtectedRouteLogicReturn } from "../useProtectedRouteLogic";

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
            {/* Animated Background Glow */}
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

            {/* Logo with Integrated Spinner Animation */}
            <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
              {/* Rotating Ring Container */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0"
              >
                {/* Spinner Track */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary/10"
                  />
                  {/* Animated Dash */}
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="88"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray="100 500"
                    strokeLinecap="round"
                    className="text-primary"
                    animate={{
                      strokeDasharray: ["20 500", "150 500", "20 500"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </svg>
              </motion.div>

              {/* Logo with Floating Animation */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: [0, -5, 0],
                }}
                transition={{
                  scale: { type: "spring", stiffness: 260, damping: 20 },
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
                className="relative w-32 h-32"
              >
                <Image
                  src="/logo.svg"
                  alt="SUPKEM Logo"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </motion.div>
            </div>

            {/* Status Text */}
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
