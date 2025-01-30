import { CuisineHeader } from "@/features/restaurant/cuisine-header";
import SectionTitle from "@/components/section-title";
import { SingleCuisineProductGallery } from "@/features/restaurant/single-restaurant/single-cusine-product-gallery";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};
const SingleCuisinePage = async ({ params }: Props) => {
  const param = await params;

  return (
    <div>
      <CuisineHeader slug={param.slug} />
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
