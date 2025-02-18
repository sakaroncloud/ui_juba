import { DashboardProvider } from "@/components/providers/dashboard-wrapper";

import { RestaurantTable } from "@/features/fooding/restaurants/restaurant-table/restaurant-table";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const AllRestaurantsPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  return (
    <DashboardProvider>
      <RestaurantTable showDeleted={params?.deleted === "true"} />
    </DashboardProvider>
  );
};

export default AllRestaurantsPage;
