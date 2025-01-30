import { CuisineHeader } from "@/components/page-components/fooding/single-cuisine/cuisine-header/cuisine-header";
import SectionTitle from "@/components/page-components/fooding/sections/section-title/section-title";
import { SingleCuisineProductGallery } from "@/components/page-components/fooding/single-cuisine/single-cusine-product-gallery";

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
