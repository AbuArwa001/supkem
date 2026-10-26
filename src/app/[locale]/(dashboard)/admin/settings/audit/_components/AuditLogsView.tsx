import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Search, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { getActionBadge } from "./auditUtils";

interface AuditLogsViewProps {
  logs: any[];
  isLoading: boolean;
  search: string;
  setSearch: (val: string) => void;
}

export function AuditLogsView({ logs, isLoading, search, setSearch }: AuditLogsViewProps) {
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
      <Card className="border-none shadow-premium rounded-[2.5rem] bg-white overflow-hidden">
        <CardHeader className="p-8 pb-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <CardTitle className="text-2xl font-bold font-outfit text-slate-900">Activity Registry</CardTitle>
              <CardDescription className="font-medium text-slate-500">Real-time capture of administrative and system actions.</CardDescription>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search identifiers or users..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-12 rounded-2xl border-none bg-slate-50 font-medium focus:bg-white transition-all shadow-sm" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="hover:bg-transparent border-slate-100">
                  <TableHead className="px-8 h-14 font-black text-slate-400 uppercase tracking-[0.2em] text-[10px]">Operator</TableHead>
                  <TableHead className="h-14 font-black text-slate-400 uppercase tracking-[0.2em] text-[10px]">Action</TableHead>
                  <TableHead className="h-14 font-black text-slate-400 uppercase tracking-[0.2em] text-[10px]">Module</TableHead>
                  <TableHead className="h-14 font-black text-slate-400 uppercase tracking-[0.2em] text-[10px]">Resource</TableHead>
                  <TableHead className="h-14 font-black text-slate-400 uppercase tracking-[0.2em] text-[10px]">Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i} className="animate-pulse">
                      <TableCell colSpan={5} className="h-20 bg-slate-50/20" />
                    </TableRow>
                  ))
                ) : logs?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-40 text-center text-slate-400 font-bold">No activity logs detected in the specified timeframe.</TableCell>
                  </TableRow>
                ) : (
                  logs?.map((log: any) => (
                    <TableRow key={log.id} className="hover:bg-slate-50/50 border-slate-100 group transition-colors">
                      <TableCell className="px-8 py-5">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary font-black text-xs mr-3">
                            {log.user_details?.email?.charAt(0).toUpperCase() || "S"}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 break-all">{log.user_details?.email || "System Processor"}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{log.ip_address || "Internal Loop"}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getActionBadge(log.action)}</TableCell>
                      <TableCell>
                        <span className="text-primary font-bold px-3 py-1 bg-primary/5 rounded-lg text-xs uppercase tracking-tight">{log.content_type_name?.toUpperCase()}</span>
                      </TableCell>
                      <TableCell className="font-bold text-slate-500 max-w-[200px] truncate">{log.object_repr}</TableCell>
                      <TableCell>
                        <div className="flex items-center text-slate-400">
                          <Clock className="h-3 w-3 mr-1.5 opacity-40" />
                          <span className="text-xs font-bold font-mono">{format(new Date(log.timestamp), "MMM dd, HH:mm:ss")}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
