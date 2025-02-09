import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@repo/ui/components/table"
import FallbackImage from '@/components/fallback-image'
import React from 'react'
import { Order } from '@repo/ui/types/order.types'

type Props = {
    orderItems: Order.TOrderItem[]
    totalAmount: number,
    totalCommission: number
}

export const OrderItemCard = ({ orderItems, totalAmount, totalCommission }: Props) => {
    return (
        <div className=' pb-4 border-gray-300'>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Comission (%)</TableHead>
                        <TableHead>Comission (Amt)</TableHead>
                        <TableHead className="text-right">Total Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orderItems?.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell className="flex items-center gap-4">
                                <div className='border rounded-lg border-gray-300 border-primary size-20 flex items-center justify-center'>
                                    <FallbackImage src={item.product?.bannerImage?.url || "/"} alt={item.product?.name || ""} width={60} height={60}
                                        type='square'
                                    />
                                </div>
                            </TableCell>
                            <TableCell>{item.product?.name}</TableCell>
                            <TableCell>${item.price}</TableCell>
                            <TableCell>x{item.quantity}</TableCell>
                            <TableCell>
                                {item.commissionPercentage}%
                            </TableCell>
                            <TableCell>
                                $ {item.totalCommission}
                            </TableCell>
                            <TableCell className="text-right">${item.totalAmount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={6}>Total Commission Earned</TableCell>
                        <TableCell className="text-right">${totalCommission}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={6}>Total</TableCell>
                        <TableCell className="text-right">${totalAmount}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell colSpan={6}>To Pay</TableCell>
                        <TableCell className="text-right">${totalAmount - totalCommission}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>

        </div>
    )
}

