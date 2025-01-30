"use client";

import { useFetch } from "@/hooks/useFetch";
import { ProductItem } from "../products/product-item";
import { API_ROUTES } from "@repo/ui/lib/routes";
import { ResponseWithMeta } from "@repo/ui/types/response.type";
import { Restaurant } from "@repo/ui/types/restaurant.types";

type Props = {
  slug: string;
};
export const SingleCuisineProductGallery = ({ ...props }: Props) => {
  const { data: result } = useFetch<ResponseWithMeta<Restaurant.TRest[]>>({
    endPoint: API_ROUTES.singleCusineRestaurants.endpoint + `?slug=${props.slug}`,
    queryKey: `restaurantForCuisine-${props.slug}`,
  });

  console.log(result);

  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 items-start">
      {result?.data?.map((item) => {
        return <ProductItem key={item.id} item={item} />;
      })}
    </div>
  );
};
