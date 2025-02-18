"use client";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@repo/ui/components/table/column-header";
import { CustomCell } from "@repo/ui/components/table/custom-cell";

import Link from "next/link";
import { Order } from "@repo/ui/types/order.types";
import { formatDate } from "@repo/ui/lib/utils";
import { OrderStatusBadge } from "./order-status-badge";

export const columns: ColumnDef<
  Order.TOrder & {
    isDeleted?: boolean | undefined;
    fullName?: string;
  }
>[] = [
  {
    accessorKey: "id",
    header: "Order",
    cell: ({ row }) => {
      return <CustomCell label={"#" + row.original.id} />;
    },
  },

  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex items-center gap-2">
          <div className="p-1 border border-slate-200 bg-white rounded-lg size-[41px] flex items-center justify-center">
            {" "}
          </div>
          <div className="text-sm  capitalize">{data.fullName}</div>
        </div>
      );
    },
  },

  {
    accessorKey: "totalItems",
    header: "Items",
  },

  {
    accessorKey: "totalAmount",
    header: "Amount",
  },

  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="text-sm capitalize">
          {formatDate(data.createdAt, {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </div>
      );
    },
  },

  {
    accessorKey: "orderStatus",
    header: "Order Status",
    cell: ({ row }) => {
      const data = row.original;
      return <OrderStatusBadge status={data.orderStatus} />;
    },
  },

  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex items-center gap-2">
          <Link
            href={`/restaurants/orders/${data.id}`}
            className=" capitalize p-2 bg-primary rounded-lg text-xs text-white"
          >
            View
          </Link>
        </div>
      );
    },
  },
];
