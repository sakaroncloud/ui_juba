"use client";
import FallbackImage from "@/components/fallback-image";
import { Restaurant } from "@repo/ui/types/restaurant.types";
import { useRouter } from "next/navigation";

type Props = {
  item: Restaurant.Cuisine.TCuisine;
};

const CuisineCarouselItem = ({ item }: Props) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/cuisines/${item.slug}`)}
      key={item.id}
      className="pr-4"
    >
      <div className="bg-slate-100 flex items-center flex-col justify-center p-6 rounded-xl h-[150px] hover:scale-95 wie__transition__200 hover:bg-primary/10 group hover:border-2 hover:border-primary/50 cursor-pointer ">
        {
          item.bannerImage?.url && (
            <FallbackImage
              src={item.bannerImage.url}
              type="rectangle"
              alt={"Picture of " + item.name}
              width={100}
              height={100}
              className="object-cover size-[75px] rounded-full"
            />
          )
        }
        <div className="capitalize">{item.name}</div>
      </div>
    </div>
  );
};

export default CuisineCarouselItem;
