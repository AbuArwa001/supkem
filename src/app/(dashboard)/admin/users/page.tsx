"use client";

import { useState } from "react";
import useSWR from "swr";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Users as UsersIcon,
  Plus,
  Search,
  RefreshCw,
  MoreVertical,
  Edit2,
  Trash2,
  Mail,
  MapPin,
  Shield,
  ChevronLeft
} from "lucide-react";
import api from "@/lib/api";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserForm } from "@/components/forms/UserForm";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function UsersPage() {
  const { user: currentUser } = useAuth();
  const isAdmin =
    currentUser?.is_superuser ||
    currentUser?.is_staff ||
    currentUser?.role?.role_name?.toLowerCase().includes("admin") ||
    currentUser?.role_name?.toLowerCase().includes("admin");

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const {
    data: userData,
    error,
    isLoading,
    mutate,
    isValidating
  } = useSWR(isAdmin ? `/users/users/?search=${searchQuery}&page=${page}` : null, fetcher);

  const isArray = Array.isArray(userData);
  const users = isArray ? userData : (userData?.results || []);
  const totalCount = isArray ? userData.length : (userData?.count || 0);
  const hasNext = !isArray && !!userData?.next;
  const hasPrev = !isArray && !!userData?.previous;

  const handleDelete = async (user: any) => {
    if (confirm(`Are you sure you want to permanently remove ${user.full_name}?`)) {
      try {
        await api.delete(`/users/users/${user.id}/`);
        toast.success("User deleted successfully");
        mutate();
      } catch (err) {
        toast.error("Failed to delete user. They might have dependent records.");
      }
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="bg-rose-50 p-6 rounded-full">
          <Shield className="h-12 w-12 text-rose-500" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Access Restricted</h2>
        <p className="text-slate-500 font-semibold max-w-md text-center">
          You do not have the required administrative clearance to manage the team directory.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-12"
    >
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/settings"
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-primary self-start mt-2"
          >
            <ChevronLeft size={24} />
          </Link>
          <div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 font-outfit leading-tight uppercase">
              Team <span className="text-rose-600 italic">Management</span>
            </h2>
            <p className="text-slate-500 font-semibold mt-2 text-lg">
              Administrate operational staff and system{" "}
              <span className="text-rose-500 font-black underline decoration-rose-500/20 decoration-4 underline-offset-4">
                access privileges
              </span>.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => mutate()}
            className="rounded-2xl border-slate-200 h-12 w-12 hover:bg-slate-50 shadow-sm transition-all flex-none"
          >
            <RefreshCw
              className={`h-5 w-5 text-slate-600 ${isValidating ? "animate-spin" : ""}`}
            />
          </Button>

          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="rounded-2xl font-black bg-rose-600 hover:bg-rose-700 h-12 px-6 md:px-8 shadow-xl shadow-rose-600/20 transition-all active:scale-95 flex items-center gap-3 text-white uppercase tracking-widest text-xs"
          >
            <Plus className="h-5 w-5" /> ADD USER
          </Button>

          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogContent className="sm:max-w-[650px] rounded-[2.5rem] border-none shadow-premium p-0 overflow-hidden bg-white">
              <div className="bg-gradient-to-br from-rose-600 to-rose-700 p-10 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mt-10 -mr-10" />
                <DialogTitle className="text-3xl font-black tracking-tight uppercase">
                  New Account
                </DialogTitle>
                <p className="text-rose-100/70 text-[11px] font-black mt-2 uppercase tracking-[0.2em]">
                  Register team member
                </p>
              </div>
              <div className="p-10">
                <UserForm onSuccess={() => { setIsAddModalOpen(false); mutate(); }} />
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="sm:max-w-[650px] rounded-[2.5rem] border-none shadow-premium p-0 overflow-hidden bg-white">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-10 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mt-10 -mr-10" />
                <DialogTitle className="text-3xl font-black tracking-tight uppercase">
                  Edit Account
                </DialogTitle>
                <p className="text-slate-300 text-[11px] font-black mt-2 uppercase tracking-[0.2em]">
                  Modify team member profile
                </p>
              </div>
              <div className="p-10">
                {selectedUser && (
                  <UserForm
                    user={selectedUser}
                    onSuccess={() => { setIsEditModalOpen(false); mutate(); }}
                  />
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <motion.div variants={item} className="space-y-8">
        <div className="relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-rose-600 transition-colors" />
          <Input
            placeholder="Search team members by name or email..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            className="pl-14 h-16 rounded-[1.5rem] border-none bg-white shadow-premium focus:ring-4 focus:ring-rose-500/5 transition-all text-lg font-bold placeholder:text-slate-300"
          />
        </div>

        <Card className="border-none shadow-premium bg-white rounded-[2.5rem] overflow-hidden">
          <CardHeader className="border-b border-slate-50 p-8">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-black tracking-tight text-slate-900 uppercase font-outfit">
                  Team <span className="text-rose-600 italic">Directory</span>
                </CardTitle>
                <p className="text-[10px] text-slate-400 font-black mt-1 uppercase tracking-widest flex items-center gap-2">
                  <UsersIcon className="h-3 w-3" />
                  {totalCount} Verified Members
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto no-scrollbar">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-slate-50/50 h-16">
                    <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 px-8">
                      Member Details
                    </TableHead>
                    <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">
                      System Role
                    </TableHead>
                    <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">
                      Location
                    </TableHead>
                    <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">
                      Status
                    </TableHead>
                    <TableHead className="text-right px-8 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    [1, 2, 3].map((i) => (
                      <TableRow key={i} className="border-slate-50 h-24">
                        <TableCell colSpan={5} className="px-8">
                          <Skeleton className="h-12 w-full rounded-2xl" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : users.length > 0 ? (
                    users.map((user: any) => (
                      <TableRow
                        key={user.id}
                        className="hover:bg-slate-50/50 transition-colors border-slate-50/50 group h-24"
                      >
                        <TableCell className="px-8">
                          <div className="flex items-center space-x-4">
                            <div className="bg-slate-100 h-12 w-12 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-rose-600 group-hover:text-white transition-all duration-500">
                              <UsersIcon className="h-6 w-6" />
                            </div>
                            <div>
                              <p className="font-black text-slate-900 tracking-tighter text-lg leading-none mb-1 uppercase font-outfit">
                                {user.full_name}
                              </p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none flex items-center gap-1">
                                <Mail className="h-2.5 w-2.5" /> {user.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="rounded-xl border-rose-100 bg-rose-50/50 text-rose-600 font-black text-[9px] px-3 py-1 uppercase tracking-widest flex items-center w-fit gap-2"
                          >
                            <Shield className="h-3 w-3" />
                            {user.role?.role_name || user.role_name || "MEMBER"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-slate-600 font-black text-[10px] uppercase tracking-wider gap-2">
                            <MapPin className="h-3 w-3 text-slate-300" />
                            {user.location || "N/A"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={user.is_active ? "default" : "secondary"}
                            className={`rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-tighter ${user.is_active ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "bg-slate-100 text-slate-400"}`}
                          >
                            {user.is_active ? "Active" : "Disabled"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right px-8">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-xl hover:bg-slate-100 h-10 w-10"
                              >
                                <MoreVertical className="h-5 w-5 text-slate-400" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="rounded-[1.5rem] border-none shadow-premium p-3 min-w-[200px] bg-white"
                            >
                              <DropdownMenuItem
                                className="rounded-xl font-black text-[10px] py-4 px-4 cursor-pointer text-slate-600 focus:bg-slate-50 focus:text-slate-900 transition-all uppercase tracking-widest"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setIsEditModalOpen(true);
                                }}
                              >
                                <Edit2 className="h-4 w-4 mr-3 text-slate-300" />
                                Edit Account
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="rounded-xl font-black text-[10px] py-4 px-4 cursor-pointer text-rose-600 focus:bg-rose-50 focus:text-rose-700 transition-all uppercase tracking-widest"
                                onClick={() => handleDelete(user)}
                              >
                                <Trash2 className="h-4 w-4 mr-3 opacity-40" />
                                Remove Access
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-64 text-center">
                        <div className="flex flex-col items-center justify-center space-y-6">
                          <div className="bg-slate-50 p-10 rounded-2xl">
                            <UsersIcon className="h-16 w-16 text-slate-200" />
                          </div>
                          <p className="text-slate-400 font-black italic uppercase tracking-widest text-[10px]">
                            No results found for "{searchQuery}"
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="p-8 border-t border-slate-50 flex items-center justify-between">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Registry Page {page}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={!hasPrev || isLoading}
                  className="rounded-xl font-black text-[10px] px-4 uppercase tracking-widest h-10"
                >
                  PREV
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={!hasNext || isLoading}
                  className="rounded-xl font-black text-[10px] px-4 uppercase tracking-widest h-10"
                >
                  NEXT
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
