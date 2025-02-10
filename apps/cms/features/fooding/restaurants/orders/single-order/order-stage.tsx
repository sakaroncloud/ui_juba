"use client"
import SubmitButton from "@/components/form/submit-button"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@repo/ui/components/alert-dialog"
import { updateOrder } from '@/lib/actions/food/action.order'
import React, { useTransition } from 'react'
import { OrderStatus, OrderStatusDisplay } from "@repo/ui/types/order.types"
import { cn, handleToast } from "@repo/ui/lib/utils"

type Props = {
    orderStatus: OrderStatus,
    orderId: number,
    cancelledReason?: string
}

const orderState = [
    OrderStatus.PENDING,
    OrderStatus.CONFIRMED,
    OrderStatus.PROCESSING,
    OrderStatus.READY,
    OrderStatus.OUT_FOR_DELIVERY,
    OrderStatus.DELIVERED,
]

const isActive = (testCaseStatus: OrderStatus, currentStatus: OrderStatus) =>
    orderState.indexOf(currentStatus) >= orderState.indexOf(testCaseStatus)

const tabs = orderState.map((status) => ({
    label: OrderStatusDisplay[status],
    value: status,
}))

const SingleOrderStageItem = ({
    label,
    index,
    isLast,
    active,
    orderId,
}: {
    label: string
    index: number
    isLast: boolean
    active: boolean,
    orderId: number,
}) => {
    const [open, setOpen] = React.useState(false)
    const [isPending, startTransition] = useTransition();

    const onSubmit = () => {
        startTransition(async () => {
            const response = await updateOrder(orderId, orderState[index] as OrderStatus)
            handleToast(response, () => setOpen(false))
        })
    }



    return (
        <div className="flex items-center gap-x-2 w-full">
            <div onClick={() => {
                !active && setOpen(true)
            }} className="flex items-center gap-x-2 cursor-pointer">
                <div
                    className={cn(
                        'rounded-full size-6 bg-gray-300 text-xs flex items-center justify-center text-white',
                        active && 'bg-emerald-100 text-emerald-400'
                    )}
                >
                    {index + 1}
                </div>
                <div className="flex-1 text-gray-700">{label}</div>
            </div>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to change the status of this order to {label}?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <SubmitButton
                            onClick={onSubmit}
                            type="submit" label="Confirm" pending={isPending} className='' size={"lg"} />
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {!isLast && <div className="h-[0.5px] flex-1 bg-gray-200" />}
        </div>
    )
}

export const SingleOrderStage = ({ cancelledReason, orderStatus, orderId }: Props) => {

    if (orderStatus === OrderStatus.CANCELLED) {
        return (
            <div className="p-4 bg-white shadow-md rounded-xl text-center text-pretty font-semibold">
                <p>Order is cancelled</p>
                <p className="italic text-xs font-gray-500">{cancelledReason}</p>
            </div>
        )
    }
    return (
        <div className="flex items-center justify-between gap-4 p-4 bg-white shadow-md rounded-xl">
            {tabs.map((tab, index) => (
                <SingleOrderStageItem
                    key={tab.value}
                    label={tab.label}
                    index={index}
                    isLast={index === tabs.length - 1}
                    active={isActive(tab.value, orderStatus)}
                    orderId={orderId}
                />
            ))}
        </div>
    )
}
