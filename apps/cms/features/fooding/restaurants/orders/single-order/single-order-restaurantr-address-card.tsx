import { Order } from '@repo/ui/types/order.types'
import React from 'react'
import { IoLocationSharp } from 'react-icons/io5'

type Props = {
    restaurant: Order.TOrder['restaurant']
}

export const SingleOrderRestaurantAddressCard = ({ restaurant }: Props) => {


    const addressText = [
        restaurant?.name,
        restaurant?.address?.streetOne,
        restaurant?.address?.area,
        restaurant?.address?.pincode,
        restaurant?.address?.buildingName,
        restaurant?.address?.landmark,
        restaurant?.address?.city.name,
        restaurant?.phone
    ].filter(Boolean).join(", ")
    return (
        <div className=" pb-4  w-full relative space-y-2">
            <div className='space-y-1 flex-1'>
                <div className='text-sm'>Restaurant Address</div>
                <div className='flex items-center gap-1'>
                    <IoLocationSharp className='text-primary size-4' />
                    <span className='text-xs text-gray-500'>
                        {addressText}
                    </span>
                </div>
            </div>

            <div className='rounded-xl overflow-hidden'>
                <iframe src={restaurant.address?.mapLink} title={restaurant.name} width="100%" height="120" style={{ border: "none" }}></iframe>
            </div>

        </div>
    )
}
