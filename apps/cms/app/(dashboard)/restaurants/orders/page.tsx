import { OrderFilterSkeleton, OrderFilterHeader } from '@/components/page-components/restaurants/pages/orders/order-filter-header'
import { OrderTable } from '@/components/page-components/restaurants/pages/orders/order-table'
import { DashboardProvider } from '@/components/providers/dashboard-wrapper'
import { CustomTableWrapper } from '@/components/table/custom-table-wrapper'

import { Suspense } from 'react'

const OrdersPage = () => {
    return (
        <DashboardProvider>
            <CustomTableWrapper
                title='All Orders'
                filterHeader={
                    <Suspense fallback={<OrderFilterSkeleton />}>
                        <OrderFilterHeader />
                    </Suspense>
                }
            >

                <OrderTable />
            </CustomTableWrapper>
        </DashboardProvider>
    )
}

export default OrdersPage