"use client";
import FallbackImage from "@/components/fallback-image";
import { MdStars } from "react-icons/md";
import { Dot } from "lucide-react";
import { AspectRatio } from "@repo/ui/components/aspect-ratio";
import { useRouter } from "next/navigation";
import { Restaurant } from "@repo/ui/types/restaurant.types";

type Props = {
  item: Restaurant.TRest;
};

export const RestaurantItem = ({ item }: Props) => {
  const router = useRouter();


  return (
    <div
      onClick={() => router.push(`/restaurant/${item.slug}`)}
      className="bg-white group p-3 rounded-xl hover:scale-95 wie__transition__200 cursor-pointer hover:shadow-wie"
    >
      <AspectRatio ratio={16 / 12} className="bg-muted">
        <FallbackImage
          alt={item.name}
          src={item.bannerImage.url}
          type="rectangle"
          fill
          className="h-full w-full rounded-xl object-cover "
        />
        <div className="absolute bottom-0 text-lg font-semibold flex flex-col justify-end inset-x-0 bg-gradient-to-t px-4 py-3  from-black  h-1/2 w-full rounded-xl">
          <div className="text-white capitalize">upto $2</div>
          <div className="text-white capitalize">25% off</div>
        </div>
      </AspectRatio>
      <div className="p-2 space-y-1">
        <div className=" font-medium">{item.name}</div>
        <div className="flex items-center gap-x-1 text-[15px] font-medium">
          <MdStars className="text-green-700 text-2xl" />
          <span>4.3</span>
          <Dot />
          <span>{item.averagePreparationTime + 15}-{item.averagePreparationTime + 20} mins</span>
        </div>
        <div className="text-base text-gray-600 line-clamp-1 leading-6">
          {item?.cuisines
            ?.slice(0, 4)
            ?.map((cuisine) => {
              const cusineName = cuisine.name;
              const capitalizedName =
                cusineName.charAt(0).toUpperCase() + cusineName.slice(1);
              return capitalizedName;
            })
            .join(", ")}
        </div>

        <div className="text-base text-gray-600 line-clamp-1 leading-6">
          {item?.address?.area}
        </div>
      </div>
    </div>
  );
};
