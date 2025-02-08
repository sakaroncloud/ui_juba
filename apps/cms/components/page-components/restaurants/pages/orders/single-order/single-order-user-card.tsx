import { formatDate } from '@repo/ui/lib/utils';
import React from 'react'

type Props = {
    createdAt: string,
    orderId: number,
    firstName: string,
    joinedAt: string,
}

export const SingleOrderUserCard = ({ createdAt, orderId, firstName, joinedAt }: Props) => {

    const orderDate = formatDate(createdAt, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });


    return (
        <div className="flex items-center justify-between border-b pb-4 border-gray-200">
            <div>
                <div className='text-sm'>Order ID: {orderId}</div>
                <div className='text-xs text-gray-500'>
                    {orderDate}
                </div>
            </div>
            <div className='flex items-center gap-3'>
                <div className='size-14 border-1 border rounded-xl'></div>
                <div>
                    <div className='font-medium text-sm'>
                        {firstName}
                    </div>
                    <div className='font-normal text-xs'>
                        User Since {
                            new Date(joinedAt).getFullYear()
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
