"use client";
import { useFetch } from "@/hooks/useFetch";
import { TDashboardData } from "@repo/ui/types/dashboard.types";
import { TResponse } from "@repo/ui/types/response.type";
import { StatsCard } from "./stats-card";
import { OrderAnalytics } from "./orders-analytics";
import { PiUsers } from "react-icons/pi";
import { CiDollar, CiMoneyBill, CiShoppingCart } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";

const DashboardCardWrapper = () => {
  const { data: result } = useFetch<TResponse<TDashboardData>>({
    queryKey: "dashboard",
    endPoint: "/stats/fooding",
  });

  if (!result?.data) return null;

  const data = result?.data;

  const today = data.daily[0];
  const yesterday = data.daily[1];
  const thisWeek = data.weekly[0];
  const lastWeek = data.weekly[1];
  const thisMonth = data.monthly[0];
  const lastMonth = data.monthly[1];
  const thisYear = data.yearly[0];

  return (
    <div className="space-y-4">
      <div className="flex w-full gap-4">
        <StatsCard
          label="Total Users"
          subtitle="100"
          value="100"
          icon={PiUsers}
          iconColor="text-purple-500"
        />
        <StatsCard
          label="Total Restaurants"
          subtitle="100"
          value="100"
          icon={CiDollar}
          iconColor="text-orange-500"
        />
        <StatsCard
          label="Today Orders"
          subtitle="100"
          value="100"
          icon={CiShoppingCart}
          iconColor="text-blue-500"
        />
        <StatsCard
          label="Today Cancelled"
          subtitle="10"
          value="10"
          icon={MdOutlineCancel}
          iconColor="text-red-500"
        />
        <StatsCard
          label="Today Revenue"
          subtitle="100"
          value="100"
          icon={CiDollar}
          iconColor="text-green-500"
        />
        <StatsCard
          label="Today Commission"
          subtitle="100"
          value="100"
          icon={CiMoneyBill}
          iconColor="text-pink-500"
        />
      </div>
      <div className="grid grid-cols-2">
        <OrderAnalytics
          title="Orders/Revenue Shares"
          data={data}
          subtitle="January - June 2024"
        />
      </div>
    </div>
  );
};

export default DashboardCardWrapper;
