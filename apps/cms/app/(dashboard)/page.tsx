import DashboardCardWrapper from "@/components/dashboard/dashboard-cards/dashboard-cards-wrapper";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardProvider } from "@/components/providers/dashboard-wrapper";
import { OrderTable } from "@/features/fooding/restaurants/orders/order-table";

export default function DashboardPage() {
  return (
    <DashboardProvider>
      <DashboardHeader />
      <DashboardCardWrapper />
      <div className="grid grid-cols-2 gap-6"></div>
      <OrderTable />
    </DashboardProvider>
  );
}
