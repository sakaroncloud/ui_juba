"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@repo/ui/components/button"

import { DataTableColumnHeader } from "@repo/ui/components/table/column-header"
import { useCustomSearchParams } from "@/hooks/useCustomSearchParams"
import { CustomCell } from "@repo/ui/components/table/custom-cell"
import { useState, useTransition } from "react"
import { deleteForeverHandler, deleteHandler, restoreHandler } from "@/lib/actions/global.action"
import { CustomFormModal } from "@/components/form/custom-form-modal"
import { DialogFooter } from "@repo/ui/components/dialog"
import { API_ROUTES } from "@repo/ui/lib/routes"
import toast from "react-hot-toast"
import { UserFormModal } from "@/components/modals/add-staff-form-modal"
import { useSession } from "@/components/providers/session-context"
import { CircleAlert, CircleCheck, Eye, MoreHorizontal } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@repo/ui/components/tooltip"
import { Gender, Role } from "@repo/ui/types/user.types"
import { DeleteButton, EditButton, ViewIcon } from "@/components/table/action-button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@repo/ui/components/dropdown-menu"
import Link from "next/link"

type TColumn = {
    id: string;
    fullName: string;
    email: string;
    phone: string | undefined;
    role: Role;
    gender: Gender;
}

export const superAdminStaffColumn: ColumnDef<TColumn>[] = [

    {
        accessorKey: "id",
        header: "SN",
        cell: ({ row }) => {
            const { searchParams } = useCustomSearchParams();
            const page = parseInt(searchParams.get("page") || "1");
            const take = 10;
            const index = row.index + 1 + (page - 1) * take;

            return <CustomCell label={"#: " + index.toString()} />;
        },
    },

    {
        accessorKey: "fullName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => {
            const data = row.original
            return (
                <div className="flex items-center gap-2">
                    <div className="p-1 border border-slate-200 bg-white rounded-lg size-[41px] flex items-center justify-center"> </div>
                    <div className="text-sm font-medium capitalize">
                        {data.fullName}
                    </div>
                </div>
            )
        }
    },

    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => {
            const data = row.original
            return (
                <div className="flex items-center gap-2">
                    <TooltipProvider delayDuration={50}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                {data ? <CircleCheck className="w-5 h-5 text-emerald-500" /> : <CircleAlert className="w-5 h-5 text-red-500" />}
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>
                                    {data ? "Verified" : "NotVerified"}
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <div className="text-sm font-medium lowercase">{data.email}</div>
                </div>
            )
        }
    },

    {
        accessorKey: "phone",
        header: "Phone"
    },


    {
        accessorKey: "role",
        header: "Role"
    },

    {
        accessorKey: "action",
        header: "Action",

        cell: ({ row }) => {
            const data = row.original;
            return (
                <div className="flex gap-2">
                    <ViewIcon path={`/customers/${data.id}`} />
                    <EditButton path={`/customers/${data.id}/edit`} />
                </div>
            )
        }
    },


]
