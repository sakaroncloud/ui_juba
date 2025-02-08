"use client"

import { useModal } from "@/hooks/useModal";
import { deleteAddress } from "@/lib/actions/address/action.address";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@repo/ui/components/alert-dialog";
import { handleToast } from "@repo/ui/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { startTransition } from "react";

export const AddressDeleteModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "address-delete-modal";
    const queryClient = useQueryClient()

    const onDelete = async () => {
        startTransition(async () => {
            const response = await deleteAddress(data.addressId)
            handleToast(response, () => {
                queryClient.invalidateQueries()
                handleClose()
            })
        })
    }
    const handleClose = () => {
        onClose()
    }


    return (
        <AlertDialog open={isModalOpen} onOpenChange={handleClose} >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this address?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Be careful, this action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            if (data?.addressId) {
                                onDelete()
                            }
                        }}
                    >Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
