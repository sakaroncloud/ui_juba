import { Restaurant } from "@repo/ui/types/restaurant.types";
import { ProductItem } from "./product-item";

type Props = {
  restaurants?: Restaurant.TRest[];
};

export const ProductsGrid = ({ restaurants }: Props) => {
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 items-start">
      {restaurants?.map((item) => {
        return <ProductItem key={item.id} item={item} />;
      })}
    </div>
  );
};
