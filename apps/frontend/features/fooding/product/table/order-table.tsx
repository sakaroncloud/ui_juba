"use client"
import { API_ROUTES } from '@repo/ui/lib/routes';
import { Order, OrderStatus } from '@repo/ui/types/order.types';
import { ResponseWithMeta } from '@repo/ui/types/response.type';
import { OrderItem } from './order-item';
import { OrderHeader } from './order-header';
import { useFetch } from '@/hooks/useFetch';
import Link from 'next/link';

type Props = {
    status: string
}

export const OrderTable = ({ status }: Props) => {
    const { data: result, isLoading } = useFetch<ResponseWithMeta<Order.TOrder[]>>({
        endPoint: API_ROUTES.fooding.order.endpoint,
        queryKey: `orders-${status}`,
        query: [{
            key: "status",
            value: status
        }]
    });

    const orders = result?.data

    if (!isLoading && orders?.length === 0) {
        return (
            <div className="h-40 flex flex-col justify-center items-center gap-2">
                <div className='font-semibold'>Your order list is empty</div>
                <p className='text-sm font-light'>Start by exploring our products and great deals!</p>
                <Link href="/" className='px-6 py-2 bg-primary text-white capitalize text-xs rounded'>
                    Continue Shopping
                </Link>
            </div>
        )

    }


    return (
        <div className='space-y-4'>
            {orders?.map((order) => {
                return (
                    <div key={order.id} className='space-y-2 '>
                        <OrderHeader order={order} />
                        {order?.orderItems.map((item) => {
                            return (
                                <OrderItem key={item.id} item={item} />
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}





