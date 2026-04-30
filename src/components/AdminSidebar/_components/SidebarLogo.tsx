import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const SidebarLogo = ({
  isCollapsed,
  t,
}: {
  isCollapsed: boolean;
  t: (key: string) => string;
}) => {
  return (
    <Link
      href="/"
      className={cn(
        "p-8 pb-6 flex items-center gap-4 cursor-pointer overflow-hidden",
        isCollapsed && "p-4 justify-center"
      )}
    >
      <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-lg group">
        <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-colors" />
        <Image
          src="/logo.svg"
          alt="Logo"
          width={28}
          height={28}
          className="relative z-10"
        />
      </div>
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
        >
          <p className="font-outfit font-black text-white text-xl tracking-tight leading-none">
            SUPKEM
          </p>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400/80 mt-1">
            {t("administrator")}
          </p>
        </motion.div>
      )}
    </Link>
  );
};
