import FallbackImage from "@/components/fallback-image";
import { AspectRatio } from "@repo/ui/components/aspect-ratio";
import { Button } from "@repo/ui/components/button";
import { Restaurant } from "@repo/ui/types/restaurant.types";
import { Plus } from "lucide-react";

export const TabMenuItem = ({ product }: { product: Restaurant.Product.TProduct }) => {
  return (
    <>
      <div className="flex justify-between gap-4 sm:flex-row flex-col">
        {/* left */}
        <div className="left flex-1 flex gap-4 items-center">
          <div className="md:w-[120px] w-20">
            <AspectRatio ratio={16 / 14} className="bg-muted">
              <FallbackImage
                alt={""}
                src={product.bannerImage.url}
                type="rectangle"
                fill
                className="h-full w-full rounded-xl object-cover "
              />
            </AspectRatio>
          </div>
          <div className="space-y-3 flex-1">
            <div className="font-semibold">{product.name}</div>
            <span className="text-sm text-gray-600">SSP. {product.price}</span>

            <div className="text-gray-600 text-sm">{product.description}</div>
          </div>
        </div>

        {/* right */}
        <div className="w-fit flex items-center justify-center">
          <Button variant={"outline"}>
            <Plus /> Add
          </Button>
        </div>
      </div>
    </>
  );
};
