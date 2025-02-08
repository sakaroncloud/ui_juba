import { getData } from '@/app/data';
import { OrderItemCard } from '@/components/page-components/restaurants/pages/orders/single-order/order-item';
import { SingleOrderStage } from '@/components/page-components/restaurants/pages/orders/single-order/order-stage';
import { SingleOrderAddressCard } from '@/components/page-components/restaurants/pages/orders/single-order/single-order-address-card';
import { SingleOrderFooterAction } from '@/components/page-components/restaurants/pages/orders/single-order/single-order-footer-action';
import { SingleOrderRiderCard } from '@/components/page-components/restaurants/pages/orders/single-order/single-order-rider-card';
import { SingleOrderSectionTitle } from '@/components/page-components/restaurants/pages/orders/single-order/single-order-single-title';
import { SingleOrderUserCard } from '@/components/page-components/restaurants/pages/orders/single-order/single-order-user-card';
import { DashboardProvider } from '@/components/providers/dashboard-wrapper'
import { API_ROUTES } from '@repo/ui/lib/routes';
import { TParams } from '@repo/ui/types/global.type';
import { Order } from '@repo/ui/types/order.types';
import { ResponseWithNoMeta } from '@repo/ui/types/response.type';
import { notFound } from 'next/navigation';

const SingleOrderPage = async ({ params }: TParams) => {

    const { orderId } = (await params)

    const result = await getData<ResponseWithNoMeta<Order.TOrder>>({
        endPoint: API_ROUTES.fooding.order.endpoint,
        param: orderId,
        tags: ["orders"]
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
                    <div className='w-full flex justify-between gap-3'>
                        <SingleOrderAddressCard />
                        <SingleOrderRiderCard
                            rider={order?.rider}
                            orderStatus={order.orderStatus}
                            orderId={order.id}
                        />
                    </div>

                    <SingleOrderSectionTitle
                        headingTwo='Order Items'
                    />
                    {/* Order Items */}
                    <OrderItemCard orderItems={order.orderItems} totalAmount={order.totalAmount} />

                    <SingleOrderFooterAction order={order} />
                </div>
            </div>
        </DashboardProvider >
    )
}

export default SingleOrderPage