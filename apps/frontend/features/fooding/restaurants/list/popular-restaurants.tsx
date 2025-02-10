"use client";
import { API_ROUTES } from "@repo/ui/lib/routes";

import { useFetch } from "@/hooks/useFetch";
import { ResponseWithMeta } from "@repo/ui/types/response.type";
import { Restaurant } from "@repo/ui/types/restaurant.types";
import SectionTitle from "@/components/section-title";
import { RestaurantsGrid } from "@/features/fooding/shared/restaurants-grid";

export const PopularRestaurantsSection = () => {
  const { data: restaurants } = useFetch<ResponseWithMeta<Restaurant.TRest[]>>({
    endPoint: API_ROUTES.fooding.restaurant.endpoint,
    queryKey: "restaurants",
  });

  return (
    <div className="container space-y-8">
      <SectionTitle
        title="Restaurants around you"
        subtitle="Find nearby popular Restaurants."
      />

      <RestaurantsGrid restaurants={restaurants?.data} />
    </div>
  );
};
