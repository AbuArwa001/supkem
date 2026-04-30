import { motion } from "framer-motion";
import { LogOut, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export const UserSection = ({
  isCollapsed,
  user,
  logout,
  t,
  tp,
}: {
  isCollapsed: boolean;
  user: any;
  logout: () => void;
  t: (key: string) => string;
  tp: (key: string) => string;
}) => {
  return (
    <div
      className={cn(
        "p-6 border-t border-white/5 bg-white/[0.02]",
        isCollapsed && "p-4"
      )}
    >
      <div
        className={cn(
          "flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 shadow-inner mb-4 overflow-hidden",
          isCollapsed && "p-0 h-10 w-10 mx-auto justify-center rounded-full"
        )}
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black shrink-0 shadow-md">
          <ShieldCheck size={20} />
        </div>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="overflow-hidden"
          >
            <p className="font-bold text-white truncate text-sm leading-tight">
              {user?.full_name || tp("member")}
            </p>
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest truncate mt-0.5">
              {user?.role?.role_name || t("administrator")}
            </p>
          </motion.div>
        )}
      </div>

      <button
        onClick={logout}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-red-400/80 hover:bg-red-500/10 hover:text-red-400 transition-all group",
          isCollapsed && "justify-center px-0 h-12 w-12 mx-auto"
        )}
      >
        <LogOut
          size={18}
          className="group-hover:-translate-x-1 transition-transform shrink-0"
        />
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm"
          >
            {tp("signOut")}
          </motion.span>
        )}
      </button>
    </div>
  );
};
