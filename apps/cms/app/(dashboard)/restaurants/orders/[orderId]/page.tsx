import { getData } from '@/app/data';
import { OrderItemCard } from '@/features/fooding/restaurants/orders/single-order/order-item';
import { SingleOrderStage } from '@/features/fooding/restaurants/orders/single-order/order-stage';
import { SingleOrderUserAddressCard } from '@/features/fooding/restaurants/orders/single-order/single-order-user-address-card';
import { SingleOrderFooterAction } from '@/features/fooding/restaurants/orders/single-order/single-order-footer-action';
import { SingleOrderRiderCard } from '@/features/fooding/restaurants/orders/single-order/single-order-rider-card';
import { SingleOrderSectionTitle } from '@/features/fooding/restaurants/orders/single-order/single-order-single-title';
import { SingleOrderUserCard } from '@/features/fooding/restaurants/orders/single-order/single-order-user-card';
import { DashboardProvider } from '@/components/providers/dashboard-wrapper'
import { API_ROUTES } from '@repo/ui/lib/routes';
import { TParams } from '@repo/ui/types/global.type';
import { Order } from '@repo/ui/types/order.types';
import { ResponseWithNoMeta } from '@repo/ui/types/response.type';
import { notFound } from 'next/navigation';
import { SingleOrderRestaurantAddressCard } from '@/features/fooding/restaurants/orders/single-order/single-order-restaurantr-address-card';

const SingleOrderPage = async ({ params }: TParams) => {

    const { orderId } = (await params)

    const result = await getData<ResponseWithNoMeta<Order.TOrder>>({
        endPoint: API_ROUTES.fooding.order.endpoint,
        param: orderId,
        tags: ["orders", orderId]
    })

    if (!result?.data) {
        notFound()
    }

    const order = result.data


    return (
        <DashboardProvider>
            <div>
                <div className='p-6 border rounded-sm bg-white space-y-6'>
                    <SingleOrderSectionTitle
                        headingTwo='Order Details'
                    />
                    <SingleOrderStage orderStatus={order.orderStatus}
                        cancelledReason={order?.cancelledReason}
                        orderId={order.id}
                    />

                    {/* Order Id - Data and User */}
                    <SingleOrderUserCard
                        createdAt={order.createdAt}
                        orderId={order.id}
                        fullName={order.user.customerProfile?.fullName || ""}
                        joinedAt={order.user.createdAt}
                    />
                    <div className='grid grid-cols-2'>
                        <div className='w-full gap-3 '>
                            <SingleOrderUserAddressCard address={order.address}
                                estimateTime={order.estimateTime}
                                phone={order.user.customerProfile?.phone}
                            />

                            <SingleOrderRiderCard
                                rider={order?.rider}
                                orderStatus={order.orderStatus}
                                orderId={order.id}
                            />
                        </div>
                        <SingleOrderRestaurantAddressCard restaurant={order.restaurant}
                        />
                    </div>



                    <SingleOrderSectionTitle
                        headingTwo='Order Items'
                    />
                    {/* Order Items */}
                    <OrderItemCard orderItems={order.orderItems} totalAmount={order.totalAmount} totalCommission={order.totalCommission} />

                    <SingleOrderFooterAction order={order} />
                </div>
            </div>
        </DashboardProvider >
    )
}

export default SingleOrderPage