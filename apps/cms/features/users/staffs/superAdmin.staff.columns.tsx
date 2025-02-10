"use client";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@repo/ui/components/table/column-header";
import { useCustomSearchParams } from "@/hooks/useCustomSearchParams";
import { CustomCell } from "@repo/ui/components/table/custom-cell";

import { CircleAlert, CircleCheck } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/tooltip";
import { Gender, Role } from "@repo/ui/types/user.types";
import { EditButton, ViewIcon } from "@/components/table/action-button";

type TColumn = {
  id: string;
  fullName: string;
  email: string;
  phone: string | undefined;
  role: Role;
  gender: Gender;
  emailVerified?: string;
};

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
      const data = row.original;
      return (
        <div className="flex items-center gap-2">
          <div className="p-1 border border-slate-200 bg-white rounded-lg size-[41px] flex items-center justify-center">
            {" "}
          </div>
          <div className="text-sm font-medium capitalize">{data.fullName}</div>
        </div>
      );
    },
  },

  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex items-center gap-2">
          <TooltipProvider delayDuration={50}>
            <Tooltip>
              <TooltipTrigger asChild>
                {data?.emailVerified ? (
                  <CircleCheck className="w-5 h-5 text-emerald-500" />
                ) : (
                  <CircleAlert className="w-5 h-5 text-red-500" />
                )}
              </TooltipTrigger>
              <TooltipContent>
                <p>{data?.emailVerified ? "Verified" : "NotVerified"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="text-sm font-medium lowercase">{data.email}</div>
        </div>
      );
    },
  },

  {
    accessorKey: "phone",
    header: "Phone",
  },

  {
    accessorKey: "role",
    header: "Role",
  },

  {
    accessorKey: "action",
    header: "Action",

    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex gap-2">
          <ViewIcon path={`/staffs/${data.id}`} />
          <EditButton path={`/staffs/${data.id}/edit`} />
        </div>
      );
    },
  },
];
