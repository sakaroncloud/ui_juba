"use client";
import { API_ROUTES } from "@repo/ui/lib/routes";
import { ProductsGrid } from "./products/products-grid";
import SectionTitle from "../../components/section-title";

import { useFetch } from "@/hooks/useFetch";
import { ResponseWithMeta } from "@repo/ui/types/response.type";
import { Restaurant } from "@repo/ui/types/restaurant.types";

export const PopularRestaurantsSection = () => {
  const { data: restaurants } = useFetch<ResponseWithMeta<Restaurant.TRest[]>>({
    endPoint: API_ROUTES.restaurant.endpoint,
    queryKey: "restaurants",
  });

  return (
    <div className="container space-y-8">
      <SectionTitle
        title="Restaurants around you"
        subtitle="Find nearby popular Restaurants."
      />

      <ProductsGrid restaurants={restaurants?.data} />
    </div>
  );
};
