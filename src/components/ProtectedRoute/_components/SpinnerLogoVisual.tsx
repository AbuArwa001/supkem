import { motion } from "framer-motion";
import Image from "next/image";

export const SpinnerLogoVisual = () => {
  return (
    <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
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
            animate={{ strokeDasharray: ["20 500", "150 500", "20 500"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, y: [0, -5, 0] }}
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
  );
};
