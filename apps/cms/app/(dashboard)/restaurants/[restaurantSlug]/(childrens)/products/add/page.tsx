import { CreatePageWrapper } from "@/components/providers/create-page-wrapper";
import { ProductForm } from "@/features/fooding/restaurants/products/product-form";
import { TParams } from "@repo/ui/types/global.type";

const AddProductPage = async ({ params }: TParams) => {
  const { restaurantSlug } = await params;

  return (
    <CreatePageWrapper title="Add New Product">
      <ProductForm restaurantSlug={restaurantSlug} />
    </CreatePageWrapper>
  );
};

export default AddProductPage;
