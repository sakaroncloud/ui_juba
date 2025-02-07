"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@repo/ui/components/button"

import { DataTableColumnHeader } from "@repo/ui/components/table/column-header"
import { useCustomSearchParams } from "@/hooks/useCustomSearchParams"
import { CustomCell } from "@repo/ui/components/table/custom-cell"
import { useState, useTransition } from "react"
import { deleteForeverHandler, deleteHandler, restoreHandler } from "@/lib/actions/global.action"
import { DeleteButton, DeleteForeverButton, EditButton, RestoreButton, ViewIcon } from "@repo/ui/components/table/action-button"
import { CustomFormModal } from "@/components/form/custom-form-modal"
import { DialogFooter } from "@repo/ui/components/dialog"
import { API_ROUTES } from "@repo/ui/lib/routes"
import toast from "react-hot-toast"
import { Property } from "@repo/ui/types/property.types"

export const columns: ColumnDef<Property.TProperty & {
    isDeleted?: boolean | undefined
}>[] = [

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
                    <div className="text-sm font-medium capitalize">{row.original.name}</div>
                )
            }
        },
        {
            accessorKey: "city",
            header: ({ column }) => "City",
            cell: ({ row }) => {
                return (
                    <div className="text-sm font-medium capitalize">{row.original.address?.city?.name}</div>
                )
            }
        },
        {
            accessorKey: "totalRooms",
            header: "Total Rooms",
        },

        {
            accessorKey: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const data = row.original;
                const [open, setOpen] = useState(false);
                const [pending, startTransition] = useTransition()

                const onDeleteOrRestore = async (method: "delete" | "restore" | "forever") => {
                    const handler = method === "delete" ? deleteHandler : method === "restore" ? restoreHandler : deleteForeverHandler

                    startTransition(async () => {
                        const res = await handler({
                            ENDPOINT: API_ROUTES.fooding.restaurant.endpoint,
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
                    });
                };


                return (
                    <div className="flex gap-2">
                        {data?.isDeleted ?
                            <>
                                <RestoreButton onClick={() => onDeleteOrRestore("restore")} disabled={pending} />
                                <CustomFormModal
                                    open={open}
                                    setOpen={setOpen}
                                    title="Are you absolutely sure"
                                    description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
                                    customButton={<DeleteForeverButton />}
                                >
                                    <DialogFooter>
                                        <Button onClick={() => setOpen(false)} variant="outline">
                                            Cancel
                                        </Button>
                                        <Button disabled={pending} type="button" onClick={() => onDeleteOrRestore("forever")}>
                                            Confirm Delete
                                        </Button>
                                    </DialogFooter>
                                </CustomFormModal>
                            </>
                            : <>
                                <ViewIcon path={`/properties/${data.slug}`} />
                                <EditButton path={`/properties/${data.slug}/edit`} />
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
                                        <Button disabled={pending} type="button" onClick={() => onDeleteOrRestore("delete")}>
                                            Confirm Delete
                                        </Button>
                                    </DialogFooter>
                                </CustomFormModal>
                            </>}




                    </div>
                );
            },
        },
    ]
