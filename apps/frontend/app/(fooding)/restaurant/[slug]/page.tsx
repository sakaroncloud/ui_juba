import { getData } from "@/app/data";
import { SingleRestaurantBody } from "@/features/fooding/restaurants/single/single-restaurant-body";
import { SingleRestaurantHeader } from "@/features/fooding/restaurants/single/single-restaurant-header";
import { API_ROUTES } from "@repo/ui/lib/routes";
import { ResponseWithNoMeta } from "@repo/ui/types/response.type";
import { Restaurant } from "@repo/ui/types/restaurant.types";
import { notFound } from "next/navigation";
import { TQueryString } from "@repo/ui/types/endpoints";
type Props = {
  params: Promise<{
    slug: string;
  }>;
};
const SingleRestaurantPage = async ({ params }: Props) => {
  const { slug } = await params;
  const queryKeys: TQueryString[] = [
    {
      key: "restaurantSlug",
      value: slug
    },
    {
      key: "filterEmpty",
      value: "true"
    }
  ]
  const result = await getData<ResponseWithNoMeta<Restaurant.Menu.TMenusResponse>>({
    endPoint: API_ROUTES.fooding.menu.endpoint,
    query: queryKeys,
    tags: ["menu", slug]
  })



  if (!result?.data) {
    notFound()
  }


  return (
    <div>
      <SingleRestaurantHeader items={[{
        label: result.data.restaurant.name
      }]} pageTitle={result.data.restaurant.name} />

      <SingleRestaurantBody data={result.data} />
    </div>
  )
};

export default SingleRestaurantPage;
