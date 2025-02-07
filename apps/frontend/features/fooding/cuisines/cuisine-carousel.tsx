import { settings } from "./settings";
import { SectionCarousel } from "@/components/section-carousel";
import CategoryCarouselItem from "./cuisines-carousel-item";
import { getData } from "@/app/data";
import { API_ROUTES } from "@repo/ui/lib/routes";
import { ResponseWithMeta } from "@repo/ui/types/response.type"
import { Restaurant } from "@repo/ui/types/restaurant.types"

export const CuisinesCarousel = async () => {
  const result = await getData<ResponseWithMeta<Restaurant.Cuisine.TCuisine[]>>({
    endPoint: API_ROUTES.fooding.cuisine.endpoint,
    tags: ["cusines"],
  });

  const data = result?.data;

  return (
    <SectionCarousel
      settings={settings}
      title="What's on your mind?"
      subtitle="Browse out top categories here to discover different food cuision."
      dataLength={data?.length || 0}
    >
      {data?.map((item) => (
        <CategoryCarouselItem key={item.id} item={item} />
      ))}
    </SectionCarousel>
  );
};
