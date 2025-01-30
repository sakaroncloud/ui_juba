"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@repo/ui/components/button"

import { DataTableColumnHeader } from "@/components/table/column-header"
import { useCustomSearchParams } from "@/hooks/useCustomSearchParams"
import { CustomCell } from "@/components/table/custom-cell"
import { useState, useTransition } from "react"
import { deleteHandler } from "@/lib/actions/global.action"
import { DeleteButton, EditButton } from "@/components/table/action-button"
import { CustomFormModal } from "@/components/form/custom-form-modal"
import { DialogFooter } from "@repo/ui/components/dialog"
import toast from "react-hot-toast"
import { useQueryClient } from "@tanstack/react-query"
import { TableBadge } from "@/components/table/table-badge"
import { TCity } from "@repo/ui/types/address.types"
import { API_ROUTES } from "@repo/ui/lib/routes"

export const columns: ColumnDef<TCity>[] = [

    {
        accessorKey: "id",
        header: "SN",
        cell: ({ row }) => {
            const { searchParams } = useCustomSearchParams();
            const page = parseInt(searchParams.get("page") || "1");
            const take = 10;
            const index = row.index + 1 + (page - 1) * take;

            return <CustomCell label={"#SN: " + index.toString()} />;
        },
    },

    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => {

            return (
                <div className="flex items-center gap-2">
                    <div className="text-sm font-medium capitalize">{row.original.name}</div>
                </div>
            )
        }
    },

    {
        accessorKey: "addresses",
        header: "Linked With",
        cell: ({ row }) => {

            return (
                <div className="flex items-center gap-2">
                    <div className="text-sm font-medium capitalize">{row.original.totalAddresses}</div>
                </div>
            )
        }
    },

    {
        accessorKey: "pincodes",
        header: "Pincodes",
        cell: ({ row }) => {
            const data = row.original?.pincodes;
            return <div className="flex flex-wrap gap-2 max-w-[300px]">
                {data?.map((menu) => <TableBadge key={menu} label={menu} />)}
            </div>
        }
    },

    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const data = row.original;
            const [open, setOpen] = useState(false);
            const queryClient = useQueryClient()
            const [pending, startTransition] = useTransition()

            const onDelete = async () => {
                startTransition(async () => {
                    const res = await deleteHandler({
                        ENDPOINT: API_ROUTES.city.endpoint,
                        PARAM: data.id
                    })
                    if (res.success == true) {
                        toast.success(res.message)
                        setOpen(false)
                    }
                    else {
                        toast.error(res.message)
                        setOpen(false)
                    }
                    queryClient.invalidateQueries({ queryKey: [API_ROUTES.city.queryKey] })
                });

            };
            return (
                <div className="flex gap-2">
                    <EditButton path={`/cities/${data.slug}/`} />
                    <CustomFormModal
                        open={open}
                        setOpen={setOpen}
                        title="Are you absolutely sure"
                        description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
                        customButton={<DeleteButton />}
                    >
                        <DialogFooter>
                            <Button onClick={() => setOpen(false)} variant="outline">
                                Cancel
                            </Button>
                            <Button disabled={pending} type="button" onClick={onDelete}>
                                Confirm Delete
                            </Button>
                        </DialogFooter>
                    </CustomFormModal>
                </div>
            );
        },
    },
]
