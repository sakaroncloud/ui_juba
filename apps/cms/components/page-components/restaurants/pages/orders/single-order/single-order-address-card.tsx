import React from 'react'
import { IoLocationSharp } from 'react-icons/io5'

export const SingleOrderAddressCard = () => {
    return (
        <div className="flex  justify-between border-b pb-4 border-gray-200">
            <div className='space-y-1'>
                <div className='font-normal text-sm  text-gray-500'>Delivery Address</div>
                <div className='flex items-center gap-1'>
                    <IoLocationSharp className='text-primary size-6' />
                    <span className='text-sm'>
                        Jharana Path, Dashrath Chowk
                    </span>
                </div>
                <p className='text-xs text-gray-500'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </div>
            <div className='flex gap-3'>
                <div>
                    <div className='text-sm  text-gray-500'>Estimate Time</div>
                    <div className='font-medium text-xs '>
                        10 Min
                    </div>
                </div>
            </div>
        </div>
    )
}
