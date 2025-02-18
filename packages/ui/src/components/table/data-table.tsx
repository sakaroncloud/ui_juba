"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";

import React from "react";
import { DataTablePagination } from "./pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { cn } from "@repo/ui/lib/utils";

interface DataTableProps<TData, TValue> {
  searchKey?: string;
  apiSearchKey?: string;
  searchLabel?: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  actionButton?: React.ReactNode;
  showViewColumn?: boolean;
  showPagination?: boolean;
  showDeleted?: boolean;
  facetedFilters?: {
    title: string;
    options: {
      label: string;
      value: string;
      icon?: React.ComponentType<{ className?: string }>;
    }[];
  };
}

export function DataTable<TData, TValue>({
  actionButton,
  columns,
  data,
  searchKey,
  apiSearchKey,
  searchLabel,
  showViewColumn = false,
  showPagination = true,
  showDeleted = false,
  facetedFilters,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="space-y-4 bg-white">
      <DataTableToolbar
        table={table}
        searchKey={searchKey}
        searchLabel={searchLabel}
        apiSearchKey={apiSearchKey}
        facetedFilters={facetedFilters}
        showViewColumn={showViewColumn}
      />
      <div
        className={cn(
          "rounded-md border p-2 ",
          showDeleted && "border-red-600"
        )}
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {showPagination && <DataTablePagination table={table} />}
    </div>
  );
}
