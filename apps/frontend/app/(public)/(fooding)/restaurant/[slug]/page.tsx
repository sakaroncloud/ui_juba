import { getData } from "@/app/data";
import { SingleRestaurantBody } from "@/features/restaurant/single-restaurant/single-restaurant-body";
import { SingleRestaurantHeader } from "@/features/restaurant/single-restaurant/single-restaurant-header";
import { API_ROUTES } from "@repo/ui/lib/routes";
import { ResponseWithNoMeta } from "@repo/ui/types/response.type";
import { Restaurant } from "@repo/ui/types/restaurant.types";
import { notFound } from "next/navigation";
type Props = {
  params: Promise<{
    slug: string;
  }>;
};
const SingleRestaurantPage = async ({ params }: Props) => {
  const { slug } = await params;
  const result = await getData<ResponseWithNoMeta<Restaurant.Menu.TMenusResponse>>({
    endPoint: API_ROUTES.menu.endpoint,
    query: {
      key: "restaurantSlug",
      value: slug
    },
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
