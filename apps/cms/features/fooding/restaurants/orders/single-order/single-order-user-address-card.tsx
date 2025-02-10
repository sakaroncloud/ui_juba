import { Order } from '@repo/ui/types/order.types'
import React from 'react'
import { IoLocationSharp } from 'react-icons/io5'

type Props = {
    address: Order.TOrder['address'],
    estimateTime: number,
    phone?: string,
}

export const SingleOrderUserAddressCard = ({ address, estimateTime, phone }: Props) => {
    const addressText = [
        address?.streetOne,
        address?.area,
        address?.pincode,
        address?.buildingName,
        address?.landmark,
        address?.city,
        phone
    ].filter(Boolean).join(", ")


    return (
        <div className="pb-4 w-full  space-y-2">
            <div className='space-y-1 flex-1'>
                <div className='text-sm'>Delivery Address</div>
                <div className='flex items-center gap-1'>
                    <IoLocationSharp className='text-primary size-4' />
                    <span className='text-xs text-gray-500'>
                        {addressText}
                    </span>
                </div>
            </div>
            <div className='w-fit'>
                <div className='text-sm'>Estimate Time</div>
                <div className='text-xs text-gray-500'>
                    {estimateTime} Min
                </div>
            </div>
        </div>

    )
}
