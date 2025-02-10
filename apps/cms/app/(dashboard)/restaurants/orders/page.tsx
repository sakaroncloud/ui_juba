import {
  OrderFilterSkeleton,
  OrderFilterHeader,
} from "@/features/fooding/restaurants/orders/order-filter-header";
import { OrderTable } from "@/features/fooding/restaurants/orders/order-table";
import { DashboardProvider } from "@/components/providers/dashboard-wrapper";
import { CustomTableWrapper } from "@repo/ui/components/table/custom-table-wrapper";

import { Suspense } from "react";

const OrdersPage = () => {
  return (
    <DashboardProvider>
      <CustomTableWrapper
        title="All Orders"
        filterHeader={
          <Suspense fallback={<OrderFilterSkeleton />}>
            <OrderFilterHeader />
          </Suspense>
        }
      >
        <OrderTable />
      </CustomTableWrapper>
    </DashboardProvider>
  );
};

export default OrdersPage;
