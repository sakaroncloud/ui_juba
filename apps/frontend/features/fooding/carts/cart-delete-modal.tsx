"use client"

import { useModal } from "@/hooks/useModal";
import { deleteCart } from "@/lib/actions/fooding/action.cart";
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
import { useQueryClient } from "@tanstack/react-query";
import { startTransition } from "react";
import toast from "react-hot-toast";

export const CartDeleteModal = () => {
    const { isOpen, onClose, type } = useModal();
    const isModalOpen = isOpen && type === "cart-delete-modal";
    const queryClient = useQueryClient()

    const onDelete = async () => {
        startTransition(async () => {
            const response = await deleteCart()
            if (response?.success) {
                toast.success("Your cart has been cleared! Now you can add items to your cart.")
                onClose()
                queryClient.invalidateQueries()
            } else {
                toast.error(response.message || "Something went wrong")
            }
        })
    }

    return (
        <AlertDialog open={isModalOpen} onOpenChange={onClose} >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Items from another restaurant is already in cart
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Your cart contains items from a different restaurant. Would you like to reset your cart before browsing this restaurant?

                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onDelete}
                    >Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
