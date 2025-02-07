import { OrderTable } from '@/features/fooding/product/table/order-table'
import { AccountMainWrapper } from '@/features/account/account-main-wrapper'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/components/tabs';

const OrdersPage = () => {
    return (
        <AccountMainWrapper
            title='Orders'
            subtitle='All of your orders'
        >
            <Tabs defaultValue="all" className="w-full">
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="to-receive">To Receive</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                    <OrderTable status='all' />
                </TabsContent>
                <TabsContent value="to-receive">
                    <OrderTable status='to-receive' />
                </TabsContent>
                <TabsContent value="cancelled">
                    <OrderTable status='cancelled' />
                </TabsContent>
                <TabsContent value="pending">
                    <OrderTable status='pending' />
                </TabsContent>
                <TabsContent value="completed">
                    <OrderTable status='delivered' />
                </TabsContent>
            </Tabs>
        </AccountMainWrapper>
    )
}

export default OrdersPage