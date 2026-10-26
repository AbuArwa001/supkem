"use client";

import { Organization } from "./types";
import { OrganizationTableRow } from "./OrganizationTableRow";

interface OrganizationTableProps {
    organizations: Organization[];
    onDelete?: (org: Organization) => void;
}

export function OrganizationTable({ organizations, onDelete }: OrganizationTableProps) {
    return (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-black uppercase tracking-wider text-slate-500">
                            <th className="py-4 px-6">Organization</th>
                            <th className="py-4 px-4">Status</th>
                            <th className="py-4 px-4">Location</th>
                            <th className="py-4 px-4">Reg No / PIN</th>
                            <th className="py-4 px-4 text-center">Activity</th>
                            <th className="py-4 px-6 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {organizations.map((org, index) => (
                            <OrganizationTableRow
                                key={org.id}
                                org={org}
                                index={index}
                                onDelete={onDelete}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
