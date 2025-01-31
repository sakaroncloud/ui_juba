import { getData } from "@/app/data";
import SectionTitle from "@/components/section-title";
import { SingleCuisineProductGallery } from "@/features/restaurant/single-restaurant/single-cusine-product-gallery";
import { API_ROUTES } from "@repo/ui/lib/routes";
import { ResponseWithMeta } from "@repo/ui/types/response.type";
import { Restaurant } from "@repo/ui/types/restaurant.types";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};
const SingleCuisinePage = async ({ params }: Props) => {
  const param = await params;
  const result = await getData<ResponseWithMeta<Restaurant.TRest>>({
    endPoint: API_ROUTES.singleCusineRestaurants.endpoint,
    query: [{
      value: param.slug,
      key: "slug"
    }],
    tags: ["cuisine", param.slug],
  });


  return (
    <div>
      <div className="container space-y-8 mt-10">
        <SectionTitle
          title="Restaurants to explore"
          subtitle="Satisfy your cravings with these fresh and flavoursome burgers."
        />
        <SingleCuisineProductGallery slug={param.slug} />
      </div>
    </div>
  );
};

export default SingleCuisinePage;
