import { RestaurantHeader } from "@/components/page-components/fooding/single-restaurant/restaurant-header/restaurant-header";
type Props = {
  params: Promise<{
    slug: string;
  }>;
};
const SingleRestaurantPage = async ({ params }: Props) => {
  const param = await params;
  console.log(param.slug)

  return (
    <div>
      <RestaurantHeader slug={param.slug} />
      <section className="bg-slate-100">
        <div className="container py-6 flex justify-between gap-6 flex-wrap">

        </div>
      </section>
    </div>
  );
};

export default SingleRestaurantPage;
