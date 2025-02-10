import { getData } from "@/app/data";
import SectionTitle from "@/components/section-title";
import { CuisineHeader } from "@/features/fooding/cuisines/cuisine-header";
import { RestaurantsGrid } from "@/features/fooding/shared/restaurants-grid";
import { API_ROUTES } from "@repo/ui/lib/routes";
import { ResponseWithMeta } from "@repo/ui/types/response.type";
import { Restaurant } from "@repo/ui/types/restaurant.types";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const SingleCuisinePage = async ({ params }: Props) => {
  const param = await params;
  const result = await getData<ResponseWithMeta<Restaurant.Cuisine.TSingleCuisinePage>>({
    endPoint: API_ROUTES.fooding.cuisine.singleCuisinePage.endpoint,
    query: [{
      value: param.slug,
      key: "slug"
    }],
    tags: ["cuisine", param.slug],
  });

  const data = result?.data


  if (!data) {
    notFound()
  }

  return (
    <div>
      <CuisineHeader
        title={data.cuisine.name}
        description={data.cuisine.description}
      />
      <div className="container space-y-8 mt-10">
        <SectionTitle
          title="Restaurants to explore"
          subtitle="Satisfy your cravings with these fresh and flavoursome burgers."
        />
        <RestaurantsGrid restaurants={data.restaurants} />
      </div>
    </div>
  );
};

export default SingleCuisinePage;
