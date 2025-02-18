import {
  OrderFilterSkeleton,
  OrderFilterHeader,
} from "@/features/fooding/restaurants/orders/order-filter-header";
import { OrderTable } from "@/features/fooding/restaurants/orders/order-table";
import { DashboardProvider } from "@/components/providers/dashboard-wrapper";
import { CustomTableWrapper } from "@repo/ui/components/table/custom-table-wrapper";

import { Suspense } from "react";
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const OrdersPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
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
        <OrderTable
          status={params?.status as string}
          search={params?.search as string}
        />
      </CustomTableWrapper>
    </DashboardProvider>
  );
};

export default OrdersPage;
