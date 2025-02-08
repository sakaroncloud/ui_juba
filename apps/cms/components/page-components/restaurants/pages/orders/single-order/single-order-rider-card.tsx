"use client"
import React from 'react'
import { RiderAssignForm } from './rider-assign-form'
import { AddItemButton } from '@/components/uploads/add-item-button'
import { CustomFormModal } from '@/components/form/custom-form-modal'
import { User } from '@repo/ui/types/user.types'
import { OrderStatus } from '@repo/ui/types/order.types'
type Props = {
    rider?: User.TRiderProfile,
    orderStatus: OrderStatus,
    orderId: number
}

export const SingleOrderRiderCard = ({ orderStatus, rider, orderId }: Props) => {
    const [open, setOpen] = React.useState(false);

    if (orderStatus === OrderStatus.PENDING || orderStatus === OrderStatus.CANCELLED) {
        return null
    }

    if (!rider) {
        return (
            <CustomFormModal
                open={open}
                setOpen={setOpen}
                title="Assign Rider"
                description="Assign Rider to this order"
                customButton={<AddItemButton
                    label='Assign Rider'
                />}
            >
                <RiderAssignForm orderId={orderId}
                    setOpen={setOpen}
                />
            </CustomFormModal>
        )
    }

    return (
        <div className="border-b pb-4 border-gray-200">
            <div className='flex items-center gap-3'>
                <div className='size-14 border-1 border rounded-xl'></div>
                <div>
                    <div className='font-medium text-sm'>
                        {rider?.fullName}
                    </div>
                    <div className='font-normal text-xs'>
                        {rider?.phone}
                    </div>
                    {orderStatus !== OrderStatus.DELIVERED && (
                        <div className='font-normal text-xs space-x-1'>
                            <span>Rider</span>
                            <CustomFormModal
                                open={open}
                                setOpen={setOpen}
                                title="Assign Rider"
                                description="Assign Rider to this order"
                                customButton={<span className='text-primary italic text-[10px] cursor-pointer'>Change Rider</span>
                                }
                            >
                                <RiderAssignForm orderId={orderId}
                                    setOpen={setOpen}
                                    defaultRiderId={rider?.id}
                                />
                            </CustomFormModal>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}
