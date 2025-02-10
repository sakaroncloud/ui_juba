import CustomButton from "@/components/custom-button";
import { CustomFormField } from "@/components/forms/form-field";
import { useModal } from "@/hooks/useModal";
import { cancelOrder } from "@/lib/actions/fooding/action.order";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@repo/ui/components/dialog";
import { Form } from "@repo/ui/components/form";
import { handleToast } from "@repo/ui/lib/utils";
import { orderCancelSchema, TOrderCancelSchema } from "@repo/ui/schemas/fooding/restaurant/restaurant.order.schema";
import { useQueryClient } from "@tanstack/react-query";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";

export const OrderCancelModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "order-cancel-modal";

    const [isPending, startTransition] = useTransition();
    const queryClient = useQueryClient()

    const form = useForm<TOrderCancelSchema>({
        resolver: zodResolver(orderCancelSchema),
        defaultValues: {
            cancelReason: ""
        }
    })

    const onSubmit = (values: TOrderCancelSchema) => {
        startTransition(async () => {
            const response = await cancelOrder(data?.orderId, values)
            handleToast(response, () => {
                queryClient.invalidateQueries()
                handleClose()
            })
        })
    }

    const handleClose = () => {
        form.reset()
        onClose()
    }
    if (!isModalOpen) return null

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Are you sure you want to cancel this order?
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <CustomFormField
                            elementName='input'
                            fieldId='cancelReason'
                            label='Please enter a reason'
                            className='w-full'
                        />
                        <div className="flex gap-2 justify-end">
                            <Button type="button" onClick={onClose} variant="outline">
                                Not Now
                            </Button>
                            <CustomButton type="submit" label="Confirm" pending={isPending} />
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}