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
import { UserFormModal } from "@/components/modals/user-form-modal"
import { useSession } from "@/components/providers/session-context"
import { CircleAlert, CircleCheck } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@repo/ui/components/tooltip"
import { Role, User } from "@repo/ui/types/user.types"
import { DeleteButton, EditButton } from "@/components/table/action-button"

export const columns: ColumnDef<User.TUser>[] = [

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
                    <div className="text-sm font-medium capitalize">-</div>
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
                                {data.emailVerified ? <CircleCheck className="w-5 h-5 text-emerald-500" /> : <CircleAlert className="w-5 h-5 text-red-500" />}
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>
                                    {data.emailVerified ? "Verified" : "NotVerified"}
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
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const data = row.original;
            const [open, setOpen] = useState(false);
            const [pending, startTransition] = useTransition()
            const { session } = useSession()


            const onDeleteOrRestore = async (method: "delete" | "restore" | "forever") => {
                const handler = method === "delete" ? deleteHandler : method === "restore" ? restoreHandler : deleteForeverHandler

                startTransition(async () => {
                    const res = await handler({
                        ENDPOINT: API_ROUTES.user.endpoint,
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
                    {session?.user?.role === Role.SUPER_ADMIN && <UserFormModal
                        userId={data.id}
                        formValues={
                            {
                                email: data.email,
                                // fullName: data.fullName,
                                // phone: data.phone,
                                role: data.role
                            }
                        }
                        customButton={<EditButton />} />}
                    {data.role !== Role.SUPER_ADMIN &&
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
                    }

                </div>
            );
        },
    },
]
